import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const Shell = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.surfaceAlt};
`

export const TopBar = styled.header`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
`

export const Brand = styled(NavLink)`
  font-family: ${({ theme }) => theme.typography.heading};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primaryStrong};
  text-decoration: none;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const Main = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`
