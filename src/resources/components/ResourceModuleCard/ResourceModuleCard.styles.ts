import styled from 'styled-components'

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`

export const ModuleTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.heading};
  color: ${({ theme }) => theme.colors.inkStrong};
`

export const Hint = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.9rem;
`
