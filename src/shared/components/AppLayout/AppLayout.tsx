import { Outlet } from 'react-router-dom'
import { Brand, Main, Shell, TopBar } from './AppLayout.styles'

export function AppLayout() {
  return (
    <Shell>
      <TopBar>
        <Brand to="/resources">Resources Management</Brand>
      </TopBar>
      <Main>
        <Outlet />
      </Main>
    </Shell>
  )
}
