'use client';

import { Paper, Flex, ActionIcon, Text, Tooltip, Stack, SimpleGrid, Box } from '@mantine/core';
import { Clock, FileText, Users, BarChart } from 'lucide-react';
import { Case } from '@/types/case';
import Link from 'next/link';

interface CaseSummaryProps {
  caseId: string;
}

export function CaseSummary({ caseId }: CaseSummaryProps) {
  return (
    <SimpleGrid cols={4}>
      <Tooltip label="Time tracked on this case">
        <Paper withBorder style={{ flex: 1 }} radius="md">
          <Flex bg="orange.0" c="orange" align="center" justify="center" p="md">
            <BarChart size={40} />
          </Flex>
          <Flex align="center" justify="center" gap="sm" p="sm">
            <Text fw={500}>67%</Text>
            <Text size="sm" c="dimmed">
              complete
            </Text>
          </Flex>
        </Paper>
      </Tooltip>
      <Tooltip label="Time tracked on this case">
        <Paper withBorder style={{ flex: 1 }} radius="md">
          <Flex bg="blue.0" c="blue" align="center" justify="center" p="md">
            <Clock size={40} />
          </Flex>
          <Flex align="center" justify="center" gap="sm" p="sm">
            <Text fw={500}>24.5h</Text>
            <Text size="sm" c="dimmed">
              spent
            </Text>
          </Flex>
        </Paper>
      </Tooltip>
      <Tooltip label="Total documents in the case">
        <Paper
          withBorder
          style={{ flex: 1, cursor: 'pointer', color: 'initial' }}
          radius="md"
          component={Link}
          href={`/case/${caseId}/library`}
        >
          <Flex bg="green.0" c="green" align="center" justify="center" p="md">
            <FileText size={40} />
          </Flex>
          <Flex align="center" justify="center" gap="sm" p="sm">
            <Text fw={500}>47</Text>
            <Text size="sm" c="dimmed">
              Documents
            </Text>
          </Flex>
        </Paper>
      </Tooltip>
      <Tooltip label="Time tracked on this case">
        <Paper withBorder style={{ flex: 1 }} radius="md">
          <Flex bg="violet.0" c="violet" align="center" justify="center" p="md">
            <Users size={40} />
          </Flex>
          <Flex align="center" justify="center" gap="sm" p="sm">
            <Text fw={500}>8</Text>
            <Text size="sm" c="dimmed">
              Members
            </Text>
          </Flex>
        </Paper>
      </Tooltip>
    </SimpleGrid>
  );
}
