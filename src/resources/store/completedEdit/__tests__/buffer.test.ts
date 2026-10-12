import { describe, expect, it } from 'vitest'
import type { Resource } from '../../../model/types'
import {
  isBufferDirty,
  patchBasicInfo,
  syncBufferWithResource,
  toPutPayload,
} from '../buffer'

const completed: Resource = {
  _id: 'abc',
  resourceId: 1,
  name: 'Demo',
  status: 'completed',
  basicInfo: {
    resourceName: 'Demo',
    owner: 'Jane Doe',
    email: 'jane@example.com',
    description: 'Desc',
    priority: 'high',
  },
  projectDetails: {
    projectName: 'Project',
    budget: '1000',
    category: 'internal',
    options: ['FE devs'],
  },
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-02T00:00:00.000Z',
}

describe('completedEdit buffer', () => {
  it('creates a clean buffer for completed resources', () => {
    const buffers = syncBufferWithResource({}, completed)
    expect(isBufferDirty(buffers[1])).toBe(false)
    expect(buffers[1]?.draft.basicInfo).toEqual(completed.basicInfo)
  })

  it('keeps draft when server updatedAt is unchanged', () => {
    let buffers = syncBufferWithResource({}, completed)
    buffers = patchBasicInfo(buffers, 1, {
      ...completed.basicInfo,
      owner: 'John',
    })

    buffers = syncBufferWithResource(buffers, completed)

    expect(buffers[1]?.draft.basicInfo.owner).toBe('John')
    expect(isBufferDirty(buffers[1])).toBe(true)
  })

  it('clears buffer when resource leaves completed', () => {
    let buffers = syncBufferWithResource({}, completed)
    buffers = syncBufferWithResource(buffers, {
      ...completed,
      status: 'draft',
    })
    expect(buffers[1]).toBeUndefined()
  })

  it('builds PUT payload from draft', () => {
    let buffers = syncBufferWithResource({}, completed)
    buffers = patchBasicInfo(buffers, 1, {
      ...completed.basicInfo,
      owner: 'John Smith',
    })

    const payload = toPutPayload(completed, buffers[1])
    expect(payload.name).toBe('Demo')
    expect(payload.basicInfo.owner).toBe('John Smith')
  })
})
