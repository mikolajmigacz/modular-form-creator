import { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../../design-system'
import { ApiError } from '../../shared/api/errors'
import { ErrorBanner } from '../../shared/components/ErrorBanner'
import type { ResourceRouteContext } from '../components/ResourceLayout'
import { ResourceModuleCard } from '../components/ResourceModuleCard'
import { useResourceMutations } from '../hooks/useResourceMutations'
import { useCompletedEditStore } from '../store'
import {
  canAccessProjectDetails,
  canProvision,
  isBasicInfoComplete,
  isProjectDetailsComplete,
} from '../model/rules'

export function ResourceOverviewPage() {
  const { resource } = useOutletContext<ResourceRouteContext>()
  const navigate = useNavigate()
  const { deleteResource, provisionResource } = useResourceMutations()
  const isDirty = useCompletedEditStore((state) =>
    state.isDirty(resource.resourceId),
  )
  const [error, setError] = useState<string | undefined>()

  const base = `/resources/${resource.resourceId}`
  const projectLocked = !canAccessProjectDetails(resource)

  const handleProvision = async () => {
    setError(undefined)
    try {
      await provisionResource.mutateAsync(resource.resourceId)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Provisioning failed')
    }
  }

  const handleDelete = async () => {
    if (!window.confirm(`Delete resource "${resource.name}"?`)) return
    setError(undefined)
    try {
      await deleteResource.mutateAsync(resource.resourceId)
      navigate('/resources')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Delete failed')
    }
  }

  return (
    <Stack>
      {error ? <ErrorBanner message={error} /> : null}
      {isDirty ? (
        <Hint>
          You have unsaved module edits. Submit from a module form to persist.
        </Hint>
      ) : null}

      <Grid>
        <ResourceModuleCard
          title="Basic Info"
          complete={isBasicInfoComplete(resource.basicInfo)}
          editPath={`${base}/basic-info`}
        />
        <ResourceModuleCard
          title="Project Details"
          complete={isProjectDetailsComplete(resource.projectDetails)}
          editPath={`${base}/project-details`}
          locked={projectLocked}
          lockedReason={
            projectLocked
              ? 'Complete Basic Info before editing Project Details.'
              : undefined
          }
        />
      </Grid>

      <Actions>
        <Link to={`${base}/details`}>
          <Button type="button" variant="secondary">
            View details summary
          </Button>
        </Link>

        {resource.status === 'draft' ? (
          <Button
            type="button"
            onClick={handleProvision}
            disabled={!canProvision(resource) || provisionResource.isPending}
          >
            {provisionResource.isPending
              ? 'Provisioning…'
              : 'Provision resource'}
          </Button>
        ) : (
          <ProvisionNote>
            Completed resources cannot be reprovisioned.
          </ProvisionNote>
        )}

        <Button type="button" variant="ghost" onClick={handleDelete}>
          Delete resource
        </Button>
      </Actions>
    </Stack>
  )
}

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
`

const Hint = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.warning};
`

const ProvisionNote = styled.span`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.9rem;
`
