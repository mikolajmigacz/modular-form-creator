import type { BasicInfo, ProjectDetails, Resource, ResourceStatus } from './types'

export function isBasicInfoComplete(basicInfo: BasicInfo): boolean {
  return Boolean(
    basicInfo.resourceName &&
      basicInfo.owner &&
      basicInfo.email &&
      basicInfo.description &&
      basicInfo.priority,
  )
}

export function isProjectDetailsComplete(projectDetails: ProjectDetails): boolean {
  return Boolean(
    projectDetails.projectName &&
      projectDetails.budget &&
      projectDetails.category &&
      projectDetails.options.length > 0,
  )
}

export function canAccessProjectDetails(resource: Resource): boolean {
  if (resource.status !== 'draft') {
    return true
  }
  return isBasicInfoComplete(resource.basicInfo)
}

export function canProvision(resource: Resource): boolean {
  return (
    resource.status === 'draft' &&
    isBasicInfoComplete(resource.basicInfo) &&
    isProjectDetailsComplete(resource.projectDetails)
  )
}

export function statusLabel(status: ResourceStatus): string {
  return status === 'draft' ? 'Draft' : 'Completed'
}
