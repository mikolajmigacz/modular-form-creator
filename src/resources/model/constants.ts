import type { ProjectCategory, Priority, TeamMemberOption } from './types'

export const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

export const CATEGORY_OPTIONS: { value: ProjectCategory; label: string }[] = [
  { value: 'internal', label: 'Internal' },
  { value: 'external', label: 'External' },
  { value: 'vendor', label: 'Vendor' },
]

export const TEAM_MEMBER_OPTIONS: TeamMemberOption[] = [
  'FE devs',
  'BE devs',
  'Designer',
  'Data Eng',
  'Product Owner',
]

export const NAME_REGEX = /^[A-Za-z0-9 -]+$/
export const OWNER_REGEX = /^[A-Za-z ]+$/
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const BUDGET_REGEX = /^\d+$/
