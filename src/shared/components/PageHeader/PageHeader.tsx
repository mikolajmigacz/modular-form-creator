import { Actions, Header, Subtitle, Title } from './PageHeader.styles'
import type { PageHeaderProps } from './PageHeader.types'

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <Header>
      <div>
        <Title>{title}</Title>
        {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
      </div>
      {actions ? <Actions>{actions}</Actions> : null}
    </Header>
  )
}
