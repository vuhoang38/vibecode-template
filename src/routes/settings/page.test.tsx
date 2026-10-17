import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import SettingsPage from '@/routes/settings/page'

describe('SettingsPage', () => {
  it('blocks submission and shows a message when a field is invalid', async () => {
    const user = userEvent.setup()
    renderWithProviders(<SettingsPage />)

    const email = screen.getByLabelText('Support email')
    await user.clear(email)
    await user.type(email, 'not-an-email')
    await user.click(screen.getByRole('button', { name: 'Save changes' }))

    expect(await screen.findByText('Enter a valid email address.')).toBeInTheDocument()
  })

  it('submits and confirms when every field is valid', async () => {
    const user = userEvent.setup()
    renderWithProviders(<SettingsPage />)

    const name = screen.getByLabelText('Workspace name')
    await user.clear(name)
    await user.type(name, 'Platform Ops')
    await user.click(screen.getByRole('button', { name: 'Save changes' }))

    await waitFor(() => {
      expect(screen.queryByText('Use at least 2 characters.')).not.toBeInTheDocument()
    })
    expect(name).toHaveValue('Platform Ops')
  })
})
