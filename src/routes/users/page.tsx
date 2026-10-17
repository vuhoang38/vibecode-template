import { useQuery } from '@tanstack/react-query'
import { UserPlus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PageHeader } from '@/components/shared/page-header'
import { DataTable } from '@/components/shared/data-table'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { usersQueryOptions, type User } from '@/lib/api/users'
import { ChangeRoleDialog } from '@/routes/users/components/change-role-dialog'
import { createUserColumns } from '@/routes/users/components/user-columns'

export default function UsersPage() {
  const { data, isPending } = useQuery(usersQueryOptions())

  // `editingUser` outlives `dialogOpen` so the dialog keeps its content while it
  // animates closed.
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const columns = useMemo(
    () =>
      createUserColumns((user) => {
        setEditingUser(user)
        setDialogOpen(true)
      }),
    [],
  )

  return (
    <>
      <PageHeader
        title="Users"
        description="Everyone with access to this workspace."
        actions={
          <Button>
            <UserPlus className="size-4" />
            Invite user
          </Button>
        }
      />

      {isPending || !data ? (
        <Skeleton className="h-96 w-full" />
      ) : (
        <DataTable
          columns={columns}
          data={data}
          filterColumn="name"
          filterPlaceholder="Filter by name or email..."
          emptyMessage="No users match that filter."
        />
      )}

      <ChangeRoleDialog open={dialogOpen} user={editingUser} onOpenChange={setDialogOpen} />
    </>
  )
}
