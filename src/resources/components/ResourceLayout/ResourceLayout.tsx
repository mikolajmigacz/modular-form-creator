import { useEffect } from 'react'
import { Link, NavLink, Outlet, useBlocker, useParams } from 'react-router-dom'
import { ApiError } from '../../../shared/api/errors'
import { ErrorBanner } from '../../../shared/components/ErrorBanner'
import { LoadingState } from '../../../shared/components/LoadingState'
import { useResourceQuery } from '../../hooks/useResources'
import { useCompletedEditStore } from '../../store'
import { canAccessProjectDetails } from '../../model/rules'
import { ResourceStatusBadge } from '../ResourceStatusBadge'
import {
  DirtyNote,
  NavLocked,
  NotFound,
  SubNav,
  TitleRow,
  Wrap,
} from './ResourceLayout.styles'

export function ResourceLayout() {
  const { resourceId: resourceIdParam } = useParams()
  const resourceId = Number(resourceIdParam)
  const { data: resource, isLoading, error } = useResourceQuery(resourceId)
  const initFromResource = useCompletedEditStore((state) => state.initFromResource)
  const clearBuffer = useCompletedEditStore((state) => state.clear)
  const isDirty = useCompletedEditStore((state) => state.isDirty(resourceId))

  useEffect(() => {
    if (resource) {
      initFromResource(resource)
    }
  }, [resource, initFromResource])

  const blocker = useBlocker(({ nextLocation }) => {
    if (!isDirty) return false
    const base = `/resources/${resourceId}`
    const stayingInside =
      nextLocation.pathname === base ||
      nextLocation.pathname.startsWith(`${base}/`)
    return !stayingInside
  })

  useEffect(() => {
    if (blocker.state !== 'blocked') return
    const proceed = window.confirm(
      'You have unsaved changes. Leave without saving?',
    )
    if (proceed) {
      clearBuffer(resourceId)
      blocker.proceed()
    } else {
      blocker.reset()
    }
  }, [blocker, clearBuffer, resourceId])

  if (!Number.isFinite(resourceId) || resourceId <= 0) {
    return <ErrorBanner message="Invalid resource id." />
  }

  if (isLoading) {
    return <LoadingState label="Loading resource…" />
  }

  if (error || !resource) {
    const message =
      error instanceof ApiError ? error.message : 'Resource not found.'
    return (
      <NotFound>
        <ErrorBanner message={message} />
        <Link to="/resources">Back to resources</Link>
      </NotFound>
    )
  }

  const projectDetailsPath = `/resources/${resourceId}/project-details`
  const projectDetailsUnlocked = canAccessProjectDetails(resource)

  return (
    <Wrap>
      <SubNav>
        <NavLink to={`/resources/${resourceId}`} end>
          Overview
        </NavLink>
        <NavLink to={`/resources/${resourceId}/basic-info`}>Basic Info</NavLink>
        {projectDetailsUnlocked ? (
          <NavLink to={projectDetailsPath}>Project Details</NavLink>
        ) : (
          <NavLocked
            aria-disabled="true"
            title="Complete Basic Info before editing Project Details."
          >
            Project Details
          </NavLocked>
        )}
        <NavLink to={`/resources/${resourceId}/details`}>Details</NavLink>
      </SubNav>
      <TitleRow>
        <h1>{resource.name}</h1>
        <ResourceStatusBadge status={resource.status} />
        {isDirty ? <DirtyNote>Unsaved changes</DirtyNote> : null}
      </TitleRow>
      <Outlet context={{ resource }} />
    </Wrap>
  )
}
