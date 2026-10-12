import { Link } from 'react-router-dom'
import { Badge, Button, Card } from '../../../design-system'
import { Hint, Inner, ModuleTitle, Row } from './ResourceModuleCard.styles'
import type { ResourceModuleCardProps } from './ResourceModuleCard.types'

export function ResourceModuleCard({
  title,
  complete,
  editPath,
  locked = false,
  lockedReason,
}: ResourceModuleCardProps) {
  return (
    <Card variant="elevated">
      <Inner>
        <Row>
          <ModuleTitle>{title}</ModuleTitle>
          <Badge variant={complete ? 'success' : 'warning'}>
            {complete ? 'Complete' : 'Incomplete'}
          </Badge>
        </Row>
        {locked && lockedReason ? <Hint>{lockedReason}</Hint> : null}
        {locked ? (
          <Button variant="secondary" state="locked">
            Locked
          </Button>
        ) : (
          <Link to={editPath}>
            <Button type="button" variant="secondary">
              Edit module
            </Button>
          </Link>
        )}
      </Inner>
    </Card>
  )
}
