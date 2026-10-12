import type {
  BasicInfo,
  ProjectDetails,
  Resource,
  ResourcePayload,
} from '../../model/types'
import { cloneFromResource, cloneSnapshot, isSameSnapshot } from './snapshot'
import type { BufferEntry, BufferMap } from './types'

export function createBufferEntry(resource: Resource): BufferEntry {
  const baseline = cloneFromResource(resource)
  return {
    name: resource.name,
    serverUpdatedAt: resource.updatedAt,
    baseline,
    draft: cloneSnapshot(baseline),
  }
}

export function removeBuffer(
  buffers: BufferMap,
  resourceId: number,
): BufferMap {
  if (!(resourceId in buffers)) return buffers
  const next = { ...buffers }
  delete next[resourceId]
  return next
}

export function syncBufferWithResource(
  buffers: BufferMap,
  resource: Resource,
): BufferMap {
  if (resource.status !== 'completed') {
    return removeBuffer(buffers, resource.resourceId)
  }

  const existing = buffers[resource.resourceId]
  if (existing?.serverUpdatedAt === resource.updatedAt) {
    return buffers
  }

  return {
    ...buffers,
    [resource.resourceId]: createBufferEntry(resource),
  }
}

export function patchBasicInfo(
  buffers: BufferMap,
  resourceId: number,
  basicInfo: BasicInfo,
): BufferMap {
  const entry = buffers[resourceId]
  if (!entry) return buffers

  return {
    ...buffers,
    [resourceId]: {
      ...entry,
      draft: {
        ...entry.draft,
        basicInfo: { ...basicInfo },
      },
    },
  }
}

export function patchProjectDetails(
  buffers: BufferMap,
  resourceId: number,
  projectDetails: ProjectDetails,
): BufferMap {
  const entry = buffers[resourceId]
  if (!entry) return buffers

  return {
    ...buffers,
    [resourceId]: {
      ...entry,
      draft: {
        ...entry.draft,
        projectDetails: {
          ...projectDetails,
          options: [...projectDetails.options],
        },
      },
    },
  }
}

export function resolveBasicInfo(
  resource: Resource,
  entry: BufferEntry | undefined,
): BasicInfo {
  if (resource.status === 'completed' && entry) {
    return entry.draft.basicInfo
  }
  return resource.basicInfo
}

export function resolveProjectDetails(
  resource: Resource,
  entry: BufferEntry | undefined,
): ProjectDetails {
  if (resource.status === 'completed' && entry) {
    return entry.draft.projectDetails
  }
  return resource.projectDetails
}

export function isBufferDirty(entry: BufferEntry | undefined): boolean {
  if (!entry) return false
  return !isSameSnapshot(entry.baseline, entry.draft)
}

export function toPutPayload(
  resource: Resource,
  entry: BufferEntry | undefined,
): ResourcePayload {
  if (!entry) {
    return {
      name: resource.name,
      basicInfo: resource.basicInfo,
      projectDetails: resource.projectDetails,
    }
  }

  return {
    name: entry.name,
    basicInfo: entry.draft.basicInfo,
    projectDetails: entry.draft.projectDetails,
  }
}
