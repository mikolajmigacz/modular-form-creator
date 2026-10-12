import { beforeEach, describe, expect, it } from 'vitest'
import type { Resource } from '../../../model/types'
import { useCompletedEditStore } from '../store'

const completedResource: Resource = {
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

describe('completedEditStore', () => {
  beforeEach(() => {
    useCompletedEditStore.setState({ buffers: {} })
  })

  it('wires buffer helpers through zustand actions', () => {
    const store = useCompletedEditStore.getState()
    store.initFromResource(completedResource)
    store.setBasicInfo(1, {
      ...completedResource.basicInfo,
      owner: 'John Smith',
    })

    expect(useCompletedEditStore.getState().isDirty(1)).toBe(true)
    expect(
      useCompletedEditStore.getState().getPutPayload(completedResource).basicInfo
        .owner,
    ).toBe('John Smith')
  })
})
