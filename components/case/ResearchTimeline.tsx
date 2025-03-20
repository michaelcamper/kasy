'use client';

import { Paper, Timeline, Text, Title, Group, ActionIcon, TextInput, Select } from '@mantine/core';
import { Search, Filter } from 'lucide-react';

export function ResearchTimeline() {
  return (


      <Timeline active={1} bulletSize={24} lineWidth={2}>
        <Timeline.Item title="Case law research">
          <Text size="sm" mt={4}>Analyzed Supreme Court decisions related to environmental protection</Text>
          <Text size="xs" c="dimmed" mt={4}>2 hours ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Document added">
          <Text size="sm" mt={4}>Added expert witness statement</Text>
          <Text size="xs" c="dimmed" mt={4}>4 hours ago</Text>
        </Timeline.Item>

        <Timeline.Item title="Team meeting">
          <Text size="sm" mt={4}>Strategy discussion with legal team</Text>
          <Text size="xs" c="dimmed" mt={4}>Yesterday</Text>
        </Timeline.Item>
      </Timeline>
  );
}