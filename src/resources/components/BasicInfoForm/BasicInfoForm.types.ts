import type { BasicInfoFormValues } from '../../model/schemas'

export type BasicInfoFormProps = {
  defaultValues: BasicInfoFormValues
  onSubmit: (values: BasicInfoFormValues) => Promise<void>
  onChange?: (values: BasicInfoFormValues) => void
  isSubmitting: boolean
  submitLabel: string
  nameLocked?: boolean
}
