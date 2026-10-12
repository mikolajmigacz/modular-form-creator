import { useOutletContext } from 'react-router-dom'
import { PageHeader } from '../../shared/components/PageHeader'
import type { ResourceRouteContext } from '../components/ResourceLayout'
import { ResourceSummary } from '../components/ResourceSummary'
import { useCompletedEditStore } from '../store'

export function ResourceDetailsPage() {
  const { resource } = useOutletContext<ResourceRouteContext>()
  const getBasicInfo = useCompletedEditStore((state) => state.getBasicInfo)
  const getProjectDetails = useCompletedEditStore(
    (state) => state.getProjectDetails,
  )
  const isDirty = useCompletedEditStore((state) =>
    state.isDirty(resource.resourceId),
  )

  return (
    <>
      <PageHeader
        title="Resource details"
        subtitle="Summary of both modules and current status."
      />
      <ResourceSummary
        name={resource.name}
        status={resource.status}
        basicInfo={getBasicInfo(resource)}
        projectDetails={getProjectDetails(resource)}
        unsaved={isDirty}
      />
    </>
  )
}
