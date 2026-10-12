import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.heading};
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.inkStrong};
  margin: 0;
`

export const Subtitle = styled.p`
  margin: ${({ theme }) => theme.spacing.sm} 0 0;
  color: ${({ theme }) => theme.colors.inkMuted};
`

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`
