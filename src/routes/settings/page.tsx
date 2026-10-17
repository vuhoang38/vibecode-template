import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

const settingsSchema = z.object({
  workspaceName: z.string().min(2, 'Use at least 2 characters.').max(48, 'Keep it under 48 characters.'),
  supportEmail: z.string().email('Enter a valid email address.'),
  description: z.string().max(280, 'Keep it under 280 characters.').optional(),
  defaultRole: z.enum(['admin', 'member', 'viewer']),
  weeklyDigest: z.boolean(),
})

type SettingsValues = z.infer<typeof settingsSchema>

const DEFAULT_VALUES: SettingsValues = {
  workspaceName: 'Acme Internal',
  supportEmail: 'support@example.com',
  description: 'Operations tooling for the platform team.',
  defaultRole: 'member',
  weeklyDigest: true,
}

export default function SettingsPage() {
  const form = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: DEFAULT_VALUES,
  })

  function onSubmit(values: SettingsValues) {
    // TEMPLATE: replace with a mutation from src/lib/api/.
    toast.success(`Saved settings for ${values.workspaceName}.`)
  }

  return (
    <>
      <PageHeader title="Settings" description="Workspace configuration and defaults." />

      <Form {...form}>
        <form
          noValidate
          onSubmit={(event) => void form.handleSubmit(onSubmit)(event)}
          className="flex max-w-2xl flex-col gap-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-h3">General</CardTitle>
              <CardDescription>How this workspace appears to its members.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="workspaceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="supportEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Support email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormDescription>Where members are told to send problems.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-h3">Members</CardTitle>
              <CardDescription>Defaults applied to new members.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="defaultRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default role</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weeklyDigest"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between gap-4 rounded-lg border p-4">
                    <div className="grid gap-1">
                      <FormLabel>Weekly digest</FormLabel>
                      <FormDescription>Send every member a Monday summary.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex items-center gap-2">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Save changes
            </Button>
            <Button type="button" variant="ghost" onClick={() => form.reset(DEFAULT_VALUES)}>
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
