import type { useResourceQuery } from '../../hooks/useResources'

export type ResourceRouteContext = {
  resource: NonNullable<ReturnType<typeof useResourceQuery>['data']>
}
