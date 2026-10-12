import { useCallback, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import styled from 'styled-components'
import { ApiError } from '../../shared/api/errors'
import { ErrorBanner } from '../../shared/components/ErrorBanner'
import { PageHeader } from '../../shared/components/PageHeader'
import { BasicInfoForm } from '../components/BasicInfoForm'
import type { ResourceRouteContext } from '../components/ResourceLayout'
import { useResourceMutations } from '../hooks/useResourceMutations'
import { useCompletedEditStore } from '../store'
import type { BasicInfoFormValues } from '../model/schemas'

export function BasicInfoPage() {
  const { resource } = useOutletContext<ResourceRouteContext>()
  const { updateBasicInfo, replaceCompletedResource } = useResourceMutations()
  const getBasicInfo = useCompletedEditStore((state) => state.getBasicInfo)
  const setBasicInfo = useCompletedEditStore((state) => state.setBasicInfo)
  const getPutPayload = useCompletedEditStore((state) => state.getPutPayload)
  const initFromResource = useCompletedEditStore((state) => state.initFromResource)

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const defaultValues: BasicInfoFormValues = {
    resourceName: getBasicInfo(resource).resourceName,
    owner: getBasicInfo(resource).owner,
    email: getBasicInfo(resource).email,
    description: getBasicInfo(resource).description,
    priority: getBasicInfo(resource).priority as BasicInfoFormValues['priority'],
  }

  const handleChange = useCallback(
    (values: BasicInfoFormValues) => {
      if (resource.status !== 'completed') return
      setBasicInfo(resource.resourceId, values)
    },
    [resource.resourceId, resource.status, setBasicInfo],
  )

  const handleSubmit = async (values: BasicInfoFormValues) => {
    setError(undefined)
    setSuccess(undefined)
    try {
      if (resource.status === 'draft') {
        await updateBasicInfo.mutateAsync({
          resourceId: resource.resourceId,
          basicInfo: values,
        })
        setSuccess('Basic Info saved.')
        return
      }

      setBasicInfo(resource.resourceId, values)
      const payload = getPutPayload({ ...resource, basicInfo: values })
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
    updateBasicInfo.isPending || replaceCompletedResource.isPending

  return (
    <>
      <PageHeader
        title="Basic Info"
        subtitle={
          resource.status === 'completed'
            ? 'Edits are buffered until you submit.'
            : 'Save updates this module for draft resources.'
        }
      />
      {error ? <ErrorBanner message={error} /> : null}
      {success ? <Success role="status">{success}</Success> : null}
      <BasicInfoForm
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
