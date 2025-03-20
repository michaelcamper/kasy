'use client';

import { Paper, Divider, Stack, Text, Group, ScrollArea } from '@mantine/core';
import { FileText, Edit, Plus, Upload, Search, BookMarked } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Fragment } from 'react';
dayjs.extend(relativeTime);

interface Activity {
  id: string;
  type: 'note_added' | 'note_edited' | 'document_added' | 'research_started' | 'case_law_added';
  user: {
    name: string;
  };
  timestamp: string;
  details: {
    title?: string;
    documentType?: string;
    caseLawTitle?: string;
  };
}

const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    type: 'note_added',
    user: {
      name: 'John Doe',
    },
    timestamp: '2025-03-20T10:30:00',
    details: {
      title: 'Initial Case Analysis',
    },
  },
  {
    id: '2',
    type: 'document_added',
    user: {
      name: 'Sarah Smith',
    },
    timestamp: '2025-03-20T09:15:00',
    details: {
      title: 'Witness Statement - Jane Wilson',
      documentType: 'PDF',
    },
  },
  {
    id: '3',
    type: 'note_edited',
    user: {
      name: 'John Doe',
    },
    timestamp: '2025-03-20T08:45:00',
    details: {
      title: 'Legal Precedents',
    },
  },
  {
    id: '4',
    type: 'case_law_added',
    user: {
      name: 'Mike Johnson',
    },
    timestamp: '2025-03-20T08:20:00',
    details: {
      caseLawTitle: 'Smith v. State (2023)',
    },
  },
  {
    id: '5',
    type: 'research_started',
    user: {
      name: 'Sarah Smith',
    },
    timestamp: '2025-03-20T08:00:00',
    details: {},
  },
];

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'note_added':
      return <Plus size={20} />;
    case 'note_edited':
      return <Edit size={20} />;
    case 'document_added':
      return <Upload size={20} />;
    case 'research_started':
      return <Search size={20} />;
    case 'case_law_added':
      return <BookMarked size={20} />;
  }
};

const getActivityText = (activity: Activity) => {
  switch (activity.type) {
    case 'note_added':
      return `added a note: ${activity.details.title}`;
    case 'note_edited':
      return `edited note: ${activity.details.title}`;
    case 'document_added':
      return `added document: ${activity.details.title}`;
    case 'research_started':
      return 'started research on the case';
    case 'case_law_added':
      return `added case law: ${activity.details.caseLawTitle}`;
  }
};

export function ResearchActivity() {
  return (
    <ScrollArea>
      <Stack gap="md">
        {MOCK_ACTIVITIES.map((activity, index) => (
          <Fragment key={activity.id}>
            {index > 0 && <Divider />}
            <Group align="center" wrap="nowrap">
              <Paper
                p="sm"
                withBorder
                c="dimmed"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {getActivityIcon(activity.type)}
              </Paper>
              <div style={{ flex: 1 }}>
                <Group gap="xs" wrap="nowrap">
                  <Text size="sm" fw={500}>
                    {activity.user.name}
                  </Text>
                  <Text size="sm">{getActivityText(activity)}</Text>
                </Group>
                <Text size="xs" c="dimmed" mt={2}>
                  {dayjs(activity.timestamp).fromNow()}
                </Text>
              </div>
            </Group>
          </Fragment>
        ))}
      </Stack>
    </ScrollArea>
  );
}
