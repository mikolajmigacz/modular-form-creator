import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, Input, Select } from '../../../design-system'
import { PRIORITY_OPTIONS } from '../../model/constants'
import {
  basicInfoFormSchema,
  type BasicInfoFormValues,
} from '../../model/schemas'
import { Form } from './BasicInfoForm.styles'
import type { BasicInfoFormProps } from './BasicInfoForm.types'

export function BasicInfoForm({
  defaultValues,
  onSubmit,
  onChange,
  isSubmitting,
  submitLabel,
  nameLocked = true,
}: BasicInfoFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BasicInfoFormValues>({
    resolver: zodResolver(basicInfoFormSchema),
    defaultValues,
    mode: 'onSubmit',
  })

  useEffect(() => {
    if (!onChange) return
    const subscription = watch((values) => {
      onChange(values as BasicInfoFormValues)
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
        name="resourceName"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Resource name"
            state={nameLocked ? 'locked' : 'normal'}
            error={errors.resourceName?.message}
          />
        )}
      />
      <Controller
        name="owner"
        control={control}
        render={({ field }) => (
          <Input {...field} label="Owner" error={errors.owner?.message} />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Email"
            type="email"
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Description"
            multiline
            rows={4}
            error={errors.description?.message}
          />
        )}
      />
      <Controller
        name="priority"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label="Priority"
            options={[
              { value: '', label: 'Select priority' },
              ...PRIORITY_OPTIONS.map((option) => ({
                value: option.value,
                label: option.label,
              })),
            ]}
            error={errors.priority?.message}
          />
        )}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : submitLabel}
      </Button>
    </Form>
  )
}
