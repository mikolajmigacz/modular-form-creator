import type { BasicInfo, ProjectDetails, ResourceStatus } from '../../model/types'

export type ResourceSummaryProps = {
  name: string
  status: ResourceStatus
  basicInfo: BasicInfo
  projectDetails: ProjectDetails
  unsaved?: boolean
}

export type ResourceSummaryItemProps = {
  label: string
  value: string
  wide?: boolean
}
