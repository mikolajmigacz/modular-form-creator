import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { ResourceStatus, ResourcesListParams } from '../model/types'

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 10
const DEFAULT_SORT: ResourcesListParams['sortOrder'] = 'desc'

export function useResourceFilters(): {
  params: ResourcesListParams
  setParams: (patch: Partial<ResourcesListParams>) => void
} {
  const [searchParams, setSearchParams] = useSearchParams()

  const params = useMemo((): ResourcesListParams => {
    const page = Number(searchParams.get('page') ?? DEFAULT_PAGE)
    const pageSize = Number(searchParams.get('pageSize') ?? DEFAULT_PAGE_SIZE)
    const sortOrder =
      searchParams.get('sortOrder') === 'asc' ? 'asc' : DEFAULT_SORT
    const statusParam = searchParams.get('status')
    const status =
      statusParam === 'draft' || statusParam === 'completed'
        ? statusParam
        : undefined
    const name = searchParams.get('name') ?? undefined

    return {
      page: Number.isFinite(page) && page > 0 ? page : DEFAULT_PAGE,
      pageSize:
        Number.isFinite(pageSize) && pageSize > 0 ? pageSize : DEFAULT_PAGE_SIZE,
      sortOrder,
      status: status as ResourceStatus | undefined,
      name,
    }
  }, [searchParams])

  const setParams = useCallback(
    (patch: Partial<ResourcesListParams>) => {
      setSearchParams((current) => {
        const next = new URLSearchParams(current)
        if (patch.page !== undefined) {
          next.set('page', String(patch.page))
        }
        if (patch.pageSize !== undefined) {
          next.set('pageSize', String(patch.pageSize))
        }
        if (patch.sortOrder !== undefined) {
          next.set('sortOrder', patch.sortOrder)
        }
        if ('status' in patch) {
          if (patch.status) {
            next.set('status', patch.status)
          } else {
            next.delete('status')
          }
        }
        if ('name' in patch) {
          if (patch.name?.trim()) {
            next.set('name', patch.name.trim())
          } else {
            next.delete('name')
          }
        }
        return next
      })
    },
    [setSearchParams],
  )

  return { params, setParams }
}
