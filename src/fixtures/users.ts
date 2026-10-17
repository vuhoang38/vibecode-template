import type { User } from '@/lib/api/users'

export const users: User[] = [
  { id: 'u_01', name: 'Amara Osei', email: 'amara@example.com', role: 'admin', status: 'active', lastActive: '2026-10-16T09:12:00Z' },
  { id: 'u_02', name: 'Jonas Weber', email: 'jonas@example.com', role: 'member', status: 'active', lastActive: '2026-10-16T14:48:00Z' },
  { id: 'u_03', name: 'Priya Raman', email: 'priya@example.com', role: 'member', status: 'invited', lastActive: '2026-10-11T08:03:00Z' },
  { id: 'u_04', name: 'Tomas Lind', email: 'tomas@example.com', role: 'viewer', status: 'active', lastActive: '2026-10-15T17:21:00Z' },
  { id: 'u_05', name: 'Wei Chen', email: 'wei@example.com', role: 'admin', status: 'suspended', lastActive: '2026-09-29T11:40:00Z' },
  { id: 'u_06', name: 'Sofia Marino', email: 'sofia@example.com', role: 'member', status: 'active', lastActive: '2026-10-17T06:55:00Z' },
  { id: 'u_07', name: 'Daniel Okafor', email: 'daniel@example.com', role: 'viewer', status: 'invited', lastActive: '2026-10-09T13:30:00Z' },
  { id: 'u_08', name: 'Hana Suzuki', email: 'hana@example.com', role: 'member', status: 'active', lastActive: '2026-10-17T10:05:00Z' },
  { id: 'u_09', name: 'Luka Novak', email: 'luka@example.com', role: 'member', status: 'active', lastActive: '2026-10-14T19:17:00Z' },
  { id: 'u_10', name: 'Mariam Haddad', email: 'mariam@example.com', role: 'admin', status: 'active', lastActive: '2026-10-16T22:02:00Z' },
  { id: 'u_11', name: 'Peter Lindqvist', email: 'peter@example.com', role: 'viewer', status: 'suspended', lastActive: '2026-08-30T07:44:00Z' },
  { id: 'u_12', name: 'Ines Carvalho', email: 'ines@example.com', role: 'member', status: 'active', lastActive: '2026-10-17T08:38:00Z' },
]
