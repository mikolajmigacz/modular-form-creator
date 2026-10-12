import { z } from 'zod'
import {
  BUDGET_REGEX,
  EMAIL_REGEX,
  NAME_REGEX,
  OWNER_REGEX,
  TEAM_MEMBER_OPTIONS,
} from './constants'
import type { TeamMemberOption } from './types'

const teamMemberSchema = z.enum(
  TEAM_MEMBER_OPTIONS as [TeamMemberOption, ...TeamMemberOption[]],
)

export const createResourceNameSchema = z
  .string()
  .trim()
  .min(1, 'resourceName is required')
  .max(255, 'resourceName must be at most 255 characters long')
  .regex(
    NAME_REGEX,
    'resourceName can contain only letters, numbers, spaces, and hyphens',
  )

export const basicInfoFormSchema = z.object({
  resourceName: z
    .string()
    .trim()
    .min(1, 'resourceName is required')
    .max(255)
    .regex(NAME_REGEX),
  owner: z
    .string()
    .trim()
    .min(1, 'owner is required')
    .max(255)
    .regex(OWNER_REGEX, 'owner can contain only letters and spaces'),
  email: z
    .string()
    .trim()
    .min(1, 'email is required')
    .regex(EMAIL_REGEX, 'email must be a valid email format'),
  description: z
    .string()
    .trim()
    .min(1, 'description is required')
    .max(1000, 'description must be at most 1000 characters long'),
  priority: z.enum(['low', 'medium', 'high'], {
    message: 'priority is required',
  }),
})

export const projectDetailsFormSchema = z.object({
  projectName: z
    .string()
    .trim()
    .min(1, 'projectName is required')
    .max(255)
    .regex(NAME_REGEX),
  budget: z
    .string()
    .trim()
    .min(1, 'budget is required')
    .regex(BUDGET_REGEX, 'budget must contain only digits'),
  category: z.enum(['internal', 'external', 'vendor'], {
    message: 'category is required',
  }),
  options: z
    .array(teamMemberSchema)
    .min(1, 'At least one team member is required'),
})

export type BasicInfoFormValues = z.infer<typeof basicInfoFormSchema>
export type ProjectDetailsFormValues = z.infer<typeof projectDetailsFormSchema>
