import { Badge } from '../../../design-system'
import { statusLabel } from '../../model/rules'
import type { ResourceStatusBadgeProps } from './ResourceStatusBadge.types'

export function ResourceStatusBadge({ status }: ResourceStatusBadgeProps) {
  const variant = status === 'completed' ? 'success' : 'info'
  return <Badge variant={variant}>{statusLabel(status)}</Badge>
}
