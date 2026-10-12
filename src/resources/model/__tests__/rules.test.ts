import { describe, expect, it } from 'vitest'
import {
  canAccessProjectDetails,
  canProvision,
  isBasicInfoComplete,
  isProjectDetailsComplete,
} from '../rules'
import type { Resource } from '../types'

const completeResource: Resource = {
  _id: 'abc',
  resourceId: 1,
  name: 'Demo',
  status: 'draft',
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
  createdAt: '',
  updatedAt: '',
}

describe('moduleCompletion rules', () => {
  it('detects complete basic info', () => {
    expect(isBasicInfoComplete(completeResource.basicInfo)).toBe(true)
    expect(
      isBasicInfoComplete({ ...completeResource.basicInfo, owner: '' }),
    ).toBe(false)
  })

  it('detects incomplete project details when options empty', () => {
    expect(
      isProjectDetailsComplete({
        ...completeResource.projectDetails,
        options: [],
      }),
    ).toBe(false)
  })

  it('locks project details for draft until basic info is complete', () => {
    expect(canAccessProjectDetails(completeResource)).toBe(true)
    expect(
      canAccessProjectDetails({
        ...completeResource,
        basicInfo: { ...completeResource.basicInfo, email: '' },
      }),
    ).toBe(false)
    expect(
      canAccessProjectDetails({
        ...completeResource,
        status: 'completed',
        basicInfo: { ...completeResource.basicInfo, email: '' },
      }),
    ).toBe(true)
  })

  it('allows provision only when draft and both modules complete', () => {
    expect(canProvision(completeResource)).toBe(true)
    expect(
      canProvision({ ...completeResource, status: 'completed' }),
    ).toBe(false)
    expect(
      canProvision({
        ...completeResource,
        projectDetails: { ...completeResource.projectDetails, options: [] },
      }),
    ).toBe(false)
  })
})
