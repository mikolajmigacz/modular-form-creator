import { useState, type FormEvent } from 'react'
import { Button, Drawer, Input } from '../../../design-system'
import { createResourceNameSchema } from '../../model/schemas'
import { Actions, Form } from './CreateResourceDrawer.styles'
import type { CreateResourceDrawerProps } from './CreateResourceDrawer.types'

export function CreateResourceDrawer({
  isOpen,
  onClose,
  onCreate,
  isPending,
  errorMessage,
}: CreateResourceDrawerProps) {
  const [resourceName, setResourceName] = useState('')
  const [localError, setLocalError] = useState<string | undefined>()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const parsed = createResourceNameSchema.safeParse(resourceName)
    if (!parsed.success) {
      setLocalError(parsed.error.issues[0]?.message)
      return
    }
    setLocalError(undefined)
    await onCreate(parsed.data)
    setResourceName('')
  }

  return (
    <Drawer title="Create resource" isOpen={isOpen} onClose={onClose}>
      <Form onSubmit={handleSubmit}>
        <Input
          label="Resource name"
          value={resourceName}
          onChange={(event) => setResourceName(event.target.value)}
          error={localError ?? errorMessage}
          disabled={isPending}
        />
        <Actions>
          <Button type="button" variant="ghost" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Creating…' : 'Create'}
          </Button>
        </Actions>
      </Form>
    </Drawer>
  )
}
