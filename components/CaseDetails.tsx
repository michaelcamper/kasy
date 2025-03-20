'use client';

import { Paper, Title, Text, Group, Badge, Stack } from '@mantine/core';
import { Case } from '@/types/case';
import dayjs from 'dayjs';

interface CaseDetailsProps {
  initialData: Case;
}

export function CaseDetails({ initialData }: CaseDetailsProps) {
  return (
    <Paper p="xl" withBorder>
      <Group justify="space-between" align="center" mb="xl">
        <Title order={3}>{initialData.name}</Title>
        <Badge size="lg" variant="light" color={getStatusColor(initialData.status)}>
          {initialData.status}
        </Badge>
      </Group>

      <Stack gap="md">
        <Group>
          <Text fw={500}>Client:</Text>
          <Text>{initialData.client}</Text>
        </Group>

        <Group>
          <Text fw={500}>Last Updated:</Text>
          <Text>{dayjs(initialData.lastUpdated).format('DD.MM.YYYY HH:mm')}</Text>
        </Group>

        <Group>
          <Text fw={500}>Created:</Text>
          <Text>{dayjs(initialData.createdAt).format('DD.MM.YYYY HH:mm')}</Text>
        </Group>
      </Stack>
    </Paper>
  );
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    Active: 'green',
    Pending: 'yellow',
    Review: 'blue',
  };
  return colors[status] || 'gray';
};
