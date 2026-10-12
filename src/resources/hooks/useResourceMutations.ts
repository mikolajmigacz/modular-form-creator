import { useMutation, useQueryClient } from '@tanstack/react-query'
import { resourcesApi } from '../api/resourcesApi'
import type {
  BasicInfo,
  ProjectDetails,
  ResourcePayload,
} from '../model/types'
import { resourceKeys } from './useResources'

export function useResourceMutations() {
  const queryClient = useQueryClient()

  const invalidateResource = async (resourceId: number) => {
    await queryClient.invalidateQueries({ queryKey: resourceKeys.all })
    await queryClient.invalidateQueries({
      queryKey: resourceKeys.detail(resourceId),
    })
  }

  const createResource = useMutation({
    mutationFn: (resourceName: string) => resourcesApi.create(resourceName),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: resourceKeys.all })
    },
  })

  const deleteResource = useMutation({
    mutationFn: (resourceId: number) => resourcesApi.remove(resourceId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: resourceKeys.all })
    },
  })

  const updateBasicInfo = useMutation({
    mutationFn: ({
      resourceId,
      basicInfo,
    }: {
      resourceId: number
      basicInfo: BasicInfo
    }) => resourcesApi.updateBasicInfo(resourceId, basicInfo),
    onSuccess: async (_data, variables) => {
      await invalidateResource(variables.resourceId)
    },
  })

  const updateProjectDetails = useMutation({
    mutationFn: ({
      resourceId,
      projectDetails,
    }: {
      resourceId: number
      projectDetails: ProjectDetails
    }) => resourcesApi.updateProjectDetails(resourceId, projectDetails),
    onSuccess: async (_data, variables) => {
      await invalidateResource(variables.resourceId)
    },
  })

  const provisionResource = useMutation({
    mutationFn: (resourceId: number) => resourcesApi.provision(resourceId),
    onSuccess: async (_data, resourceId) => {
      await invalidateResource(resourceId)
    },
  })

  const replaceCompletedResource = useMutation({
    mutationFn: ({
      resourceId,
      payload,
    }: {
      resourceId: number
      payload: ResourcePayload
    }) => resourcesApi.replaceCompleted(resourceId, payload),
    onSuccess: async (_data, variables) => {
      await invalidateResource(variables.resourceId)
    },
  })

  return {
    createResource,
    deleteResource,
    updateBasicInfo,
    updateProjectDetails,
    provisionResource,
    replaceCompletedResource,
  }
}
