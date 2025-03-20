'use client';
import { fetchCaseById } from '@/lib/data/handlers';
import { notFound } from 'next/navigation';
import { Case } from '@/types/case';
import { CaseSummary } from '@/components/case/CaseSummary';
import { ResearchTimeline } from '@/components/case/ResearchTimeline';
import {
  AppShell,
  Card,
  Center,
  Container,
  Fieldset,
  Flex,
  Paper,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';
import { ResearchActivity } from '@/components/case/ResearchActivity';
import { useEffect, useState } from 'react';
export default function CasePage({ params }: { params: { caseId: string } }) {
  const [caseData, setCaseData] = useState<Case | null>(null);

  useEffect(() => {
    const loadCase = async () => {
      const data = await fetchCaseById(params.caseId);
      setCaseData(data);
    };

    loadCase();
  }, [params.caseId]);

  return (
    <AppShell.Main display="grid">
      <Container size="xl" style={{ marginBlock: 'auto' }}>
        <CaseSummary caseId={params.caseId} />

        <SimpleGrid cols={2} mt="xl">
          <Card
            withBorder
            radius="md"
            pos="relative"
            pt="xl"
            style={{ overflow: 'visible', alignSelf: 'flex-start' }}
          >
            <Paper
              pos="absolute"
              top={0}
              left={8}
              bg="gray.0"
              withBorder
              radius="xl"
              style={{ transform: 'translateY(-50%)' }}
              px="md"
            >
              <Text fw={500} size="md">
                Progress
              </Text>
            </Paper>
            <ResearchTimeline />
          </Card>

          <Card withBorder radius="md" pos="relative" pt="xl" style={{ overflow: 'visible' }}>
            <Paper
              pos="absolute"
              top={0}
              left={8}
              bg="gray.0"
              withBorder
              radius="xl"
              style={{ transform: 'translateY(-50%)' }}
              px="md"
            >
              <Text fw={500} size="md">
                Activity
              </Text>
            </Paper>
            <ResearchActivity />
          </Card>
        </SimpleGrid>
      </Container>
    </AppShell.Main>
  );
}
