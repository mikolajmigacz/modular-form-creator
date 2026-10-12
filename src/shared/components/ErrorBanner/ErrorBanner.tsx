import { Banner } from './ErrorBanner.styles'
import type { ErrorBannerProps } from './ErrorBanner.types'

export function ErrorBanner({ message }: ErrorBannerProps) {
  if (!message) return null
  return <Banner role="alert">{message}</Banner>
}
