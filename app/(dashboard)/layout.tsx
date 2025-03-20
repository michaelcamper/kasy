'use client';

import { AppShell, Container } from '@mantine/core';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell header={{ height: 48 }} footer={{ height: 0 }} padding="md">
      {children}
    </AppShell>
  );
}
