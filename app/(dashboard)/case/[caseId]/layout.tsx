'use client';

import { ActionIcon, AppShell, Group, SegmentedControl, Title } from '@mantine/core';
import { redirect, RedirectType, useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';
import { fetchCaseById } from '@/lib/data/handlers';
import { Chat } from '@/components/Chat';
import { useDisclosure } from '@mantine/hooks';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { CaseStatus } from '@/components/case/CaseStatus';

export default function CaseLayout({
  children,
  params,
}: {
  params: { caseId: string };
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  const [chatOpen, { toggle }] = useDisclosure(false);

  const caseData = fetchCaseById(params.caseId);

  if (!caseData) {
    return redirect('/', RedirectType.replace);
  }

  return (
    <AppShell
      header={{ height: 48 }}
      aside={{
        width: { base: 320 },
        breakpoint: 'sm',
        collapsed: {
          desktop: !chatOpen,
        },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between" wrap="nowrap" px="md" h="100%">
          <Group wrap="nowrap" gap="sm">
            <ActionIcon variant="subtle" size="lg" component={Link} href="/">
              <ChevronLeft size={24} />
            </ActionIcon>
            <Group gap="sm" wrap="nowrap">
              <Title order={3} fw={500}>
                {caseData.name}
              </Title>
              <CaseStatus status={caseData.status} readonly />
            </Group>
          </Group>
          <Group>
            <SegmentedControl
              color="blue"
              value={segment || ''}
              styles={{
                label: {
                  padding: 0,
                },
              }}
              data={[
                { label: 'Research', value: '' },
                { label: 'Notes', value: 'notes' },
                { label: 'Library', value: 'library' },
                { label: 'Settings', value: 'config' },
              ].map(item => ({
                ...item,
                label: (
                  <Link
                    href={`/case/${params.caseId}/${item.value}`}
                    style={{
                      color: 'inherit',
                      display: 'block',
                      padding: '5px 10px',
                      textDecoration: 'none',
                      letterSpacing: '0.05em',
                      fontWeight: 500,
                    }}
                  >
                    {item.label}
                  </Link>
                ),
              }))}
            />
            <ActionIcon variant="light" size="lg" onClick={toggle}>
              <Sparkles size={20} />
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>

      {children}

      <AppShell.Aside>
        <Group
          justify="space-between"
          mb="lg"
          p="sm"
          style={{ borderBottom: '2px solid var(--mantine-color-gray-2)' }}
        >
          <Title order={4}>AI Assistant</Title>
        </Group>
        <Chat messages={[]} />
      </AppShell.Aside>
    </AppShell>
  );
}
