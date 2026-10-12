import styled from 'styled-components'

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`

export const HeaderRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  h2 {
    margin: 0;
    flex: 1;
    font-family: ${({ theme }) => theme.typography.heading};
  }
`

export const UnsavedBadge = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.warning};
  font-weight: 600;
`

export const Section = styled.section``

export const SectionTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.heading};
`

export const Grid = styled.dl`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin: 0;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

export const Field = styled.div<{ $wide?: boolean }>`
  grid-column: ${({ $wide }) => ($wide ? '1 / -1' : 'auto')};

  dt {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.inkMuted};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  dd {
    margin: 0;
    color: ${({ theme }) => theme.colors.inkStrong};
    white-space: pre-wrap;
  }
`
