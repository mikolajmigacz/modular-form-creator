import type {
  BasicInfo,
  ProjectDetails,
  Resource,
  ResourcePayload,
} from '../../model/types'

export type ModuleSnapshot = {
  basicInfo: BasicInfo
  projectDetails: ProjectDetails
}

export type BufferEntry = {
  name: string
  serverUpdatedAt: string
  baseline: ModuleSnapshot
  draft: ModuleSnapshot
}

export type BufferMap = Record<number, BufferEntry>

export type CompletedEditStore = {
  buffers: BufferMap
  initFromResource: (resource: Resource) => void
  setBasicInfo: (resourceId: number, basicInfo: BasicInfo) => void
  setProjectDetails: (
    resourceId: number,
    projectDetails: ProjectDetails,
  ) => void
  clear: (resourceId: number) => void
  getBasicInfo: (resource: Resource) => BasicInfo
  getProjectDetails: (resource: Resource) => ProjectDetails
  isDirty: (resourceId: number) => boolean
  getPutPayload: (resource: Resource) => ResourcePayload
}
