import styled from 'styled-components'

export const Banner = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.warning};
  border: 1px solid ${({ theme }) => theme.colors.warning};
`
