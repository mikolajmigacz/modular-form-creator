import type { BasicInfo, ProjectDetails, Resource } from '../../model/types'
import type { ModuleSnapshot } from './types'

export function cloneFromResource(resource: Resource): ModuleSnapshot {
  return {
    basicInfo: { ...resource.basicInfo },
    projectDetails: {
      ...resource.projectDetails,
      options: [...resource.projectDetails.options],
    },
  }
}

export function cloneSnapshot(snapshot: ModuleSnapshot): ModuleSnapshot {
  return {
    basicInfo: { ...snapshot.basicInfo },
    projectDetails: {
      ...snapshot.projectDetails,
      options: [...snapshot.projectDetails.options],
    },
  }
}

function isSameBasicInfo(a: BasicInfo, b: BasicInfo): boolean {
  return (
    a.resourceName === b.resourceName &&
    a.owner === b.owner &&
    a.email === b.email &&
    a.description === b.description &&
    a.priority === b.priority
  )
}

function isSameProjectDetails(a: ProjectDetails, b: ProjectDetails): boolean {
  if (
    a.projectName !== b.projectName ||
    a.budget !== b.budget ||
    a.category !== b.category ||
    a.options.length !== b.options.length
  ) {
    return false
  }
  return a.options.every((value, index) => value === b.options[index])
}

export function isSameSnapshot(
  a: ModuleSnapshot,
  b: ModuleSnapshot,
): boolean {
  return (
    isSameBasicInfo(a.basicInfo, b.basicInfo) &&
    isSameProjectDetails(a.projectDetails, b.projectDetails)
  )
}
