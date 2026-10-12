import { Wrap } from './LoadingState.styles'
import type { LoadingStateProps } from './LoadingState.types'

export function LoadingState({ label = 'Loading…' }: LoadingStateProps) {
  return <Wrap aria-live="polite">{label}</Wrap>
}
