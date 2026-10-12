import { useCallback, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import styled from 'styled-components'
import { ApiError } from '../../shared/api/errors'
import { ErrorBanner } from '../../shared/components/ErrorBanner'
import { PageHeader } from '../../shared/components/PageHeader'
import { ProjectDetailsForm } from '../components/ProjectDetailsForm'
import type { ResourceRouteContext } from '../components/ResourceLayout'
import { useResourceMutations } from '../hooks/useResourceMutations'
import { useCompletedEditStore } from '../store'
import { canAccessProjectDetails } from '../model/rules'
import type { ProjectDetailsFormValues } from '../model/schemas'
import type { TeamMemberOption } from '../model/types'

export function ProjectDetailsPage() {
  const { resource } = useOutletContext<ResourceRouteContext>()
  const { updateProjectDetails, replaceCompletedResource } =
    useResourceMutations()
  const getProjectDetails = useCompletedEditStore(
    (state) => state.getProjectDetails,
  )
  const setProjectDetails = useCompletedEditStore(
    (state) => state.setProjectDetails,
  )
  const getPutPayload = useCompletedEditStore((state) => state.getPutPayload)
  const initFromResource = useCompletedEditStore(
    (state) => state.initFromResource,
  )

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const locked = !canAccessProjectDetails(resource)
  const details = getProjectDetails(resource)

  const defaultValues: ProjectDetailsFormValues = {
    projectName: details.projectName,
    budget: details.budget,
    category: (details.category ||
      '') as ProjectDetailsFormValues['category'],
    options: [...details.options] as TeamMemberOption[],
  }

  const handleChange = useCallback(
    (values: ProjectDetailsFormValues) => {
      if (resource.status !== 'completed') return
      setProjectDetails(resource.resourceId, values)
    },
    [resource.resourceId, resource.status, setProjectDetails],
  )

  const handleSubmit = async (values: ProjectDetailsFormValues) => {
    setError(undefined)
    setSuccess(undefined)
    try {
      if (resource.status === 'draft') {
        await updateProjectDetails.mutateAsync({
          resourceId: resource.resourceId,
          projectDetails: values,
        })
        setSuccess('Project Details saved.')
        return
      }

      setProjectDetails(resource.resourceId, values)
      const payload = getPutPayload({
        ...resource,
        projectDetails: values,
      })
      const updated = await replaceCompletedResource.mutateAsync({
        resourceId: resource.resourceId,
        payload,
      })
      initFromResource(updated)
      setSuccess('Changes saved to server.')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Save failed')
    }
  }

  const isSubmitting =
    updateProjectDetails.isPending || replaceCompletedResource.isPending

  if (locked) {
    return (
      <>
        <PageHeader title="Project Details" />
        <LockedBox>
          <p>
            Project Details can be updated only after Basic Info is completed.
          </p>
          <Link to={`/resources/${resource.resourceId}/basic-info`}>
            Go to Basic Info
          </Link>
        </LockedBox>
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="Project Details"
        subtitle={
          resource.status === 'completed'
            ? 'Edits are buffered until you submit.'
            : 'Save updates this module for draft resources.'
        }
      />
      {error ? <ErrorBanner message={error} /> : null}
      {success ? <Success role="status">{success}</Success> : null}
      <ProjectDetailsForm
        key={`${resource.resourceId}-${resource.updatedAt}`}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        onChange={resource.status === 'completed' ? handleChange : undefined}
        isSubmitting={isSubmitting}
        submitLabel={
          resource.status === 'completed' ? 'Submit changes' : 'Save module'
        }
      />
    </>
  )
}

const Success = styled.p`
  color: ${({ theme }) => theme.colors.success};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`

const LockedBox = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};

  a {
    color: ${({ theme }) => theme.colors.primary};
  }
`
