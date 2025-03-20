'use client';

import { AppShell, Container } from '@mantine/core';
import { Header } from '@/components/Header';

import { Stack } from '@mantine/core';
import { RecentCases } from '@/components/RecentCases';
import { CasesTable } from '@/components/CasesTable';

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    Active: 'green',
    Pending: 'yellow',
    Review: 'blue',
  };
  return colors[status] || 'gray';
};

export default function Dashboard() {
  return (
    <>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <Container size="xl" pt="xl">
          <Stack gap="xl">
            <RecentCases getStatusColor={getStatusColor} />
            <CasesTable getStatusColor={getStatusColor} />
          </Stack>
        </Container>
      </AppShell.Main>
    </>
  );
}
