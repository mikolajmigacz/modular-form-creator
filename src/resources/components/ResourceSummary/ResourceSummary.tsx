import { ResourceStatusBadge } from '../ResourceStatusBadge'
import {
  Field,
  Grid,
  HeaderRow,
  Section,
  SectionTitle,
  UnsavedBadge,
  Wrap,
} from './ResourceSummary.styles'
import type {
  ResourceSummaryItemProps,
  ResourceSummaryProps,
} from './ResourceSummary.types'

export function ResourceSummary({
  name,
  status,
  basicInfo,
  projectDetails,
  unsaved = false,
}: ResourceSummaryProps) {
  return (
    <Wrap>
      <HeaderRow>
        <h2>{name}</h2>
        <ResourceStatusBadge status={status} />
        {unsaved ? <UnsavedBadge>Unsaved changes</UnsavedBadge> : null}
      </HeaderRow>

      <Section>
        <SectionTitle>Basic Info</SectionTitle>
        <Grid>
          <Item label="Resource name" value={basicInfo.resourceName} />
          <Item label="Owner" value={basicInfo.owner} />
          <Item label="Email" value={basicInfo.email} />
          <Item label="Priority" value={basicInfo.priority} />
          <Item label="Description" value={basicInfo.description} wide />
        </Grid>
      </Section>

      <Section>
        <SectionTitle>Project Details</SectionTitle>
        <Grid>
          <Item label="Project name" value={projectDetails.projectName} />
          <Item label="Budget" value={projectDetails.budget} />
          <Item label="Category" value={projectDetails.category} />
          <Item label="Team" value={projectDetails.options.join(', ') || '-'} wide />
        </Grid>
      </Section>
    </Wrap>
  )
}

function Item({ label, value, wide }: ResourceSummaryItemProps) {
  return (
    <Field $wide={wide}>
      <dt>{label}</dt>
      <dd>{value || '-'}</dd>
    </Field>
  )
}
