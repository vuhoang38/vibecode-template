import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useUpdateUserRole, type User, type UserRole } from '@/lib/api/users'

const ROLES: UserRole[] = ['admin', 'member', 'viewer']

type ChangeRoleDialogProps = {
  open: boolean
  user: User | null
  onOpenChange: (open: boolean) => void
}

export function ChangeRoleDialog({ open, user, onOpenChange }: ChangeRoleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {user ? (
          // Keyed on the user, so opening a different row starts from that row's
          // role. No effect needed to sync state with props.
          <ChangeRoleForm key={user.id} user={user} onDone={() => onOpenChange(false)} />
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

function ChangeRoleForm({ user, onDone }: { user: User; onDone: () => void }) {
  const [role, setRole] = useState<UserRole>(user.role)
  const updateRole = useUpdateUserRole()

  async function save() {
    await updateRole.mutateAsync({ id: user.id, role })
    toast.success(`${user.name} is now a ${role}.`)
    onDone()
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Change role</DialogTitle>
        <DialogDescription>Update the workspace role for {user.name}.</DialogDescription>
      </DialogHeader>

      <div className="grid gap-2">
        <Label htmlFor="role">Role</Label>
        <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
          <SelectTrigger id="role">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ROLES.map((option) => (
              <SelectItem key={option} value={option} className="capitalize">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button onClick={() => void save()} disabled={updateRole.isPending}>
          {updateRole.isPending ? 'Saving...' : 'Save'}
        </Button>
      </DialogFooter>
    </>
  )
}
