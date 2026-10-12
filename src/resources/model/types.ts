export type ResourceStatus = 'draft' | 'completed'

export type Priority = 'low' | 'medium' | 'high'

export type ProjectCategory = 'internal' | 'external' | 'vendor'

export type TeamMemberOption =
  | 'FE devs'
  | 'BE devs'
  | 'Designer'
  | 'Data Eng'
  | 'Product Owner'

export interface BasicInfo {
  resourceName: string
  owner: string
  email: string
  description: string
  priority: string
}

export interface ProjectDetails {
  projectName: string
  budget: string
  category: string
  options: string[]
}

export interface Resource {
  _id: string
  resourceId: number
  name: string
  status: ResourceStatus
  basicInfo: BasicInfo
  projectDetails: ProjectDetails
  createdAt: string
  updatedAt: string
}

export interface ResourcePayload {
  name: string
  basicInfo: BasicInfo
  projectDetails: ProjectDetails
}

export interface ResourcesListParams {
  page: number
  pageSize: number
  status?: ResourceStatus
  name?: string
  sortOrder: 'asc' | 'desc'
}

export interface ResourcesListResponse {
  items: Resource[]
  pagination: {
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
  }
}
