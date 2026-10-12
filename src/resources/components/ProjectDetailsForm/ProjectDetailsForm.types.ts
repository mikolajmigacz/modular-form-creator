import type { ProjectDetailsFormValues } from '../../model/schemas'

export type ProjectDetailsFormProps = {
  defaultValues: ProjectDetailsFormValues
  onSubmit: (values: ProjectDetailsFormValues) => Promise<void>
  onChange?: (values: ProjectDetailsFormValues) => void
  isSubmitting: boolean
  submitLabel: string
  disabled?: boolean
}
