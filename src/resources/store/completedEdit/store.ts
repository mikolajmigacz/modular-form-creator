import { create } from 'zustand'
import {
  isBufferDirty,
  patchBasicInfo,
  patchProjectDetails,
  removeBuffer,
  resolveBasicInfo,
  resolveProjectDetails,
  syncBufferWithResource,
  toPutPayload,
} from './buffer'
import type { CompletedEditStore } from './types'

export const useCompletedEditStore = create<CompletedEditStore>((set, get) => ({
  buffers: {},

  initFromResource: (resource) =>
    set((state) => ({
      buffers: syncBufferWithResource(state.buffers, resource),
    })),

  setBasicInfo: (resourceId, basicInfo) =>
    set((state) => ({
      buffers: patchBasicInfo(state.buffers, resourceId, basicInfo),
    })),

  setProjectDetails: (resourceId, projectDetails) =>
    set((state) => ({
      buffers: patchProjectDetails(state.buffers, resourceId, projectDetails),
    })),

  clear: (resourceId) =>
    set((state) => ({
      buffers: removeBuffer(state.buffers, resourceId),
    })),

  getBasicInfo: (resource) =>
    resolveBasicInfo(resource, get().buffers[resource.resourceId]),

  getProjectDetails: (resource) =>
    resolveProjectDetails(resource, get().buffers[resource.resourceId]),

  isDirty: (resourceId) => isBufferDirty(get().buffers[resourceId]),

  getPutPayload: (resource) =>
    toPutPayload(resource, get().buffers[resource.resourceId]),
}))
