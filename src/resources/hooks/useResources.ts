import { useQuery } from '@tanstack/react-query'
import { resourcesApi } from '../api/resourcesApi'
import type { ResourcesListParams } from '../model/types'

export const resourceKeys = {
  all: ['resources'] as const,
  list: (params: ResourcesListParams) =>
    [...resourceKeys.all, 'list', params] as const,
  detail: (resourceId: number) =>
    [...resourceKeys.all, 'detail', resourceId] as const,
}

export function useResourcesListQuery(params: ResourcesListParams) {
  return useQuery({
    queryKey: resourceKeys.list(params),
    queryFn: () => resourcesApi.list(params),
  })
}

export function useResourceQuery(resourceId: number) {
  return useQuery({
    queryKey: resourceKeys.detail(resourceId),
    queryFn: () => resourcesApi.getById(resourceId),
    enabled: Number.isFinite(resourceId) && resourceId > 0,
  })
}
