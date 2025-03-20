'use client';

import {
  AppShell,
  Group,
  Title,
  SegmentedControl,
  ActionIcon,
  Container,
  LoadingOverlay,
  Button,
} from '@mantine/core';
import { ChevronLeft, Sparkles, MessageCircle, X, Bot } from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { CaseStatus } from '@/components/case/CaseStatus';
import { useEffect, useState } from 'react';
import { Case } from '@/types/case';
import { fetchCaseById } from '@/lib/data/handlers';
import { Chat } from '@/components/Chat';
import { useDisclosure } from '@mantine/hooks';

export default function CaseLayout({
  children,
  params,
}: {
  params: { caseId: string };
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [chatOpen, { toggle, close }] = useDisclosure(false);

  useEffect(() => {
    const loadCase = async () => {
      try {
        const data = await fetchCaseById(params.caseId);
        setCaseData(data);
      } catch (error) {
        console.error('Error loading case:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCase();
  }, [params.caseId]);

  if (loading) {
    return (
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      </div>
    );
  }

  if (!caseData) {
    return null; // Next.js will show the not-found page
  }

  return (
    <AppShell
      header={{ height: 48 }}
      aside={{
        width: { base: 320 },
        breakpoint: 'sm',
        collapsed: {
          desktop: !chatOpen,
          mobile: !chatOpen,
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
            <Group gap="xs" wrap="nowrap">
              <Title order={3}>{caseData.name}</Title>
              <CaseStatus status={caseData.status} readonly />
            </Group>
          </Group>

          <Group>
            <SegmentedControl
              color="blue"
              value={segment || ''}
              data={[
                { label: 'Research', value: '' },
                { label: 'Notes', value: 'notes' },
                { label: 'Library', value: 'library' },
                { label: 'Settings', value: 'config' },
              ]}
              onChange={value => {
                window.location.href = `/case/${params.caseId}${value ? `/${value}` : ''}`;
              }}
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
