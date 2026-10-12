import { apiRequest } from '../../shared/api/client'
import type {
  BasicInfo,
  ProjectDetails,
  Resource,
  ResourcePayload,
  ResourcesListParams,
  ResourcesListResponse,
} from '../model/types'

function buildListQuery(params: ResourcesListParams): string {
  const search = new URLSearchParams()
  search.set('page', String(params.page))
  search.set('pageSize', String(params.pageSize))
  search.set('sortOrder', params.sortOrder)
  if (params.status) {
    search.set('status', params.status)
  }
  if (params.name?.trim()) {
    search.set('name', params.name.trim())
  }
  return search.toString()
}

export const resourcesApi = {
  list(params: ResourcesListParams) {
    return apiRequest<ResourcesListResponse>(
      `/api/resources?${buildListQuery(params)}`,
    )
  },

  getById(resourceId: number) {
    return apiRequest<Resource>(`/api/resources/${resourceId}`)
  },

  create(resourceName: string) {
    return apiRequest<Resource>('/api/resources', {
      method: 'POST',
      body: { resourceName },
    })
  },

  updateBasicInfo(resourceId: number, basicInfo: BasicInfo) {
    return apiRequest<Resource>(`/api/resources/${resourceId}/basic-info`, {
      method: 'PATCH',
      body: basicInfo,
    })
  },

  updateProjectDetails(resourceId: number, projectDetails: ProjectDetails) {
    return apiRequest<Resource>(
      `/api/resources/${resourceId}/project-details`,
      {
        method: 'PATCH',
        body: projectDetails,
      },
    )
  },

  provision(resourceId: number) {
    return apiRequest<Resource>(`/api/resources/${resourceId}/provisioning`, {
      method: 'PATCH',
    })
  },

  replaceCompleted(resourceId: number, payload: ResourcePayload) {
    return apiRequest<Resource>(`/api/resources/${resourceId}`, {
      method: 'PUT',
      body: payload,
    })
  },

  remove(resourceId: number) {
    return apiRequest<Resource>(`/api/resources/${resourceId}`, {
      method: 'DELETE',
    })
  },
}
