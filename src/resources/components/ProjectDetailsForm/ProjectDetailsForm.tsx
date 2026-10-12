import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, CheckboxGroup, Input, Select } from '../../../design-system'
import { CATEGORY_OPTIONS, TEAM_MEMBER_OPTIONS } from '../../model/constants'
import {
  projectDetailsFormSchema,
  type ProjectDetailsFormValues,
} from '../../model/schemas'
import { Form } from './ProjectDetailsForm.styles'
import type { ProjectDetailsFormProps } from './ProjectDetailsForm.types'

export function ProjectDetailsForm({
  defaultValues,
  onSubmit,
  onChange,
  isSubmitting,
  submitLabel,
  disabled = false,
}: ProjectDetailsFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProjectDetailsFormValues>({
    resolver: zodResolver(projectDetailsFormSchema),
    defaultValues,
    mode: 'onSubmit',
  })

  useEffect(() => {
    if (!onChange) return
    const subscription = watch((values) => {
      onChange(values as ProjectDetailsFormValues)
    })
    return () => subscription.unsubscribe()
  }, [watch, onChange])

  return (
    <Form
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(values)
      })}
    >
      <Controller
        name="projectName"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Project name"
            disabled={disabled}
            error={errors.projectName?.message}
          />
        )}
      />
      <Controller
        name="budget"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Budget"
            inputMode="numeric"
            disabled={disabled}
            error={errors.budget?.message}
          />
        )}
      />
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label="Category"
            disabled={disabled}
            options={[
              { value: '', label: 'Select category' },
              ...CATEGORY_OPTIONS.map((option) => ({
                value: option.value,
                label: option.label,
              })),
            ]}
            error={errors.category?.message}
          />
        )}
      />
      <Controller
        name="options"
        control={control}
        render={({ field }) => (
          <CheckboxGroup
            label="Team members"
            options={[...TEAM_MEMBER_OPTIONS]}
            value={field.value ?? []}
            onChange={field.onChange}
            disabled={disabled}
            error={errors.options?.message}
          />
        )}
      />
      <Button type="submit" disabled={isSubmitting || disabled}>
        {isSubmitting ? 'Saving…' : submitLabel}
      </Button>
    </Form>
  )
}
