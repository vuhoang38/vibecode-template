import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { usersQueryOptions, userKeys } from '@/lib/api/users'

function wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  })
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

describe('usersQueryOptions', () => {
  it('uses a stable key so invalidation reaches it', () => {
    expect(usersQueryOptions().queryKey).toEqual(userKeys.list())
  })

  it('resolves the user list', async () => {
    const { result } = renderHook(() => useQuery(usersQueryOptions()), { wrapper })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    const first = result.current.data?.[0]
    expect(result.current.data?.length).toBeGreaterThan(0)
    expect(first?.id).toBeTypeOf('string')
    expect(first?.email).toContain('@')
  })
})
