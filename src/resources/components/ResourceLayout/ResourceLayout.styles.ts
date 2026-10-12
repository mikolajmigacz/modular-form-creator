import styled from 'styled-components'

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const SubNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};

  a {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.radii.pill};
    text-decoration: none;
    color: ${({ theme }) => theme.colors.ink};
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};

    &.active {
      border-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primaryStrong};
    }
  }
`

export const NavLocked = styled.span`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.inkMuted};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  opacity: 0.7;
  cursor: not-allowed;
  user-select: none;
`

export const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  h1 {
    margin: 0;
    font-family: ${({ theme }) => theme.typography.heading};
    flex: 1;
  }
`

export const DirtyNote = styled.span`
  color: ${({ theme }) => theme.colors.warning};
  font-weight: 600;
  font-size: 0.9rem;
`

export const NotFound = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`
