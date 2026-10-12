export type CreateResourceDrawerProps = {
  isOpen: boolean
  onClose: () => void
  onCreate: (resourceName: string) => Promise<void>
  isPending: boolean
  errorMessage?: string
}
