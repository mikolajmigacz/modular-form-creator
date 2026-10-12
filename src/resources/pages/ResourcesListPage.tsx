import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Card, Input, Select } from '../../design-system'
import { ApiError } from '../../shared/api/errors'
import { ErrorBanner } from '../../shared/components/ErrorBanner'
import { LoadingState } from '../../shared/components/LoadingState'
import { PageHeader } from '../../shared/components/PageHeader'
import { CreateResourceDrawer } from '../components/CreateResourceDrawer'
import { ResourceStatusBadge } from '../components/ResourceStatusBadge'
import { useResourceFilters } from '../hooks/useResourceFilters'
import { useResourceMutations } from '../hooks/useResourceMutations'
import { useResourcesListQuery } from '../hooks/useResources'
import { isBasicInfoComplete, isProjectDetailsComplete } from '../model/rules'

export function ResourcesListPage() {
  const navigate = useNavigate()
  const { params, setParams } = useResourceFilters()
  const { data, isLoading, error } = useResourcesListQuery(params)
  const { createResource, deleteResource } = useResourceMutations()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [actionError, setActionError] = useState<string | undefined>()
  const [nameFilter, setNameFilter] = useState(params.name ?? '')

  const handleCreate = async (resourceName: string) => {
    setActionError(undefined)
    try {
      const created = await createResource.mutateAsync(resourceName)
      setDrawerOpen(false)
      navigate(`/resources/${created.resourceId}`)
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : 'Create failed')
      throw err
    }
  }

  const handleDelete = async (resourceId: number, name: string) => {
    if (!window.confirm(`Delete resource "${name}"?`)) return
    setActionError(undefined)
    try {
      await deleteResource.mutateAsync(resourceId)
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : 'Delete failed')
    }
  }

  return (
    <>
      <PageHeader
        title="Resources"
        subtitle="Create, track, and complete resources through module workflow."
        actions={
          <Button type="button" onClick={() => setDrawerOpen(true)}>
            Create resource
          </Button>
        }
      />

      <FiltersCard variant="outline">
        <FilterRow>
          <Input
            label="Search by name"
            value={nameFilter}
            onChange={(event) => setNameFilter(event.target.value)}
          />
          <Select
            label="Status"
            value={params.status ?? ''}
            onChange={(event) => {
              const value = event.target.value
              setParams({
                page: 1,
                status: value === 'draft' || value === 'completed' ? value : undefined,
              })
            }}
            options={[
              { value: '', label: 'All statuses' },
              { value: 'draft', label: 'Draft' },
              { value: 'completed', label: 'Completed' },
            ]}
          />
          <Select
            label="Sort"
            value={params.sortOrder}
            onChange={(event) =>
              setParams({
                sortOrder: event.target.value === 'asc' ? 'asc' : 'desc',
              })
            }
            options={[
              { value: 'desc', label: 'Newest first' },
              { value: 'asc', label: 'Oldest first' },
            ]}
          />
          <Button
            type="button"
            variant="secondary"
            onClick={() => setParams({ page: 1, name: nameFilter || undefined })}
          >
            Apply filters
          </Button>
        </FilterRow>
      </FiltersCard>

      {actionError ? <ErrorBanner message={actionError} /> : null}
      {error ? (
        <ErrorBanner
          message={error instanceof ApiError ? error.message : 'Failed to load'}
        />
      ) : null}

      {isLoading ? <LoadingState /> : null}

      {data && data.items.length === 0 ? (
        <Empty>No resources yet. Create your first resource.</Empty>
      ) : null}

      {data && data.items.length > 0 ? (
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Modules</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {data.items.map((resource) => (
                <tr
                  key={resource._id}
                  onClick={() => navigate(`/resources/${resource.resourceId}`)}
                >
                  <td>{resource.resourceId}</td>
                  <td>{resource.name}</td>
                  <td>
                    <ResourceStatusBadge status={resource.status} />
                  </td>
                  <td>
                    {isBasicInfoComplete(resource.basicInfo) ? 'Basic ✓' : 'Basic -'}
                    {' · '}
                    {isProjectDetailsComplete(resource.projectDetails)
                      ? 'Project ✓'
                      : 'Project -'}
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="ghost"
                      size="small"
                      onClick={(event) => {
                        event.stopPropagation()
                        void handleDelete(resource.resourceId, resource.name)
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      ) : null}

      {data && data.pagination.totalPages > 1 ? (
        <Pager>
          <Button
            type="button"
            variant="secondary"
            disabled={params.page <= 1}
            onClick={() => setParams({ page: params.page - 1 })}
          >
            Previous
          </Button>
          <span>
            Page {data.pagination.page} of {data.pagination.totalPages}
          </span>
          <Button
            type="button"
            variant="secondary"
            disabled={params.page >= data.pagination.totalPages}
            onClick={() => setParams({ page: params.page + 1 })}
          >
            Next
          </Button>
        </Pager>
      ) : null}

      <CreateResourceDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onCreate={handleCreate}
        isPending={createResource.isPending}
        errorMessage={actionError}
      />
    </>
  )
}

const FiltersCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`

const FilterRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  align-items: end;
`

const TableWrap = styled(Card)`
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    text-align: left;
    padding: ${({ theme }) => theme.spacing.md};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  tbody tr {
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.colors.surfaceAlt};
    }
  }
`

const Pager = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`

const Empty = styled.p`
  color: ${({ theme }) => theme.colors.inkMuted};
`
