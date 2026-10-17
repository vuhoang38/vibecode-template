import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'
import { users as userFixtures } from '@/fixtures/users'

export type UserRole = 'admin' | 'member' | 'viewer'
export type UserStatus = 'active' | 'invited' | 'suspended'

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  lastActive: string
}

/**
 * Query keys live here and nowhere else. Writing a key inline in a component is
 * how invalidation silently stops working.
 */
export const userKeys = {
  all: ['users'] as const,
  list: () => [...userKeys.all, 'list'] as const,
  detail: (id: string) => [...userKeys.all, 'detail', id] as const,
}

export function usersQueryOptions() {
  return queryOptions({
    queryKey: userKeys.list(),
    // TEMPLATE: replace with `api.get<User[]>('/users')` and delete src/fixtures.
    queryFn: (): Promise<User[]> => Promise.resolve(userFixtures),
  })
}

export function userQueryOptions(id: string) {
  return queryOptions({
    queryKey: userKeys.detail(id),
    // TEMPLATE: replace with `api.get<User>(`/users/${id}`)`.
    queryFn: (): Promise<User | undefined> =>
      Promise.resolve(userFixtures.find((user) => user.id === id)),
  })
}

export type UpdateUserRoleInput = { id: string; role: UserRole }

export function useUpdateUserRole() {
  const queryClient = useQueryClient()

  return useMutation({
    // TEMPLATE: replace with `api.patch<User>(`/users/${id}`, { role })`.
    mutationFn: ({ id, role }: UpdateUserRoleInput): Promise<UpdateUserRoleInput> =>
      Promise.resolve({ id, role }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
  })
}
