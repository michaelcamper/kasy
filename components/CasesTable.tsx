'use client';

import { useState, useEffect } from 'react';
import {
  Group,
  Title,
  TextInput,
  ActionIcon,
  Paper,
  Table,
  Badge,
  Button,
  Loader,
  Tooltip,
  Center,
} from '@mantine/core';
import { Search, Filter, CheckCircle2, Clock3, AlertCircle, Plus } from 'lucide-react';
import { Case } from '@/types/case';
import { fetchAllCases } from '@/lib/data/handlers';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CaseStatus } from './case/CaseStatus';

dayjs.extend(relativeTime);

interface CasesTableProps {
  getStatusColor: (status: string) => string;
}

const StatusIcon = ({ status, color }: { status: string; color: string }) => {
  const iconProps = { size: 20, color: `var(--mantine-color-${color}-filled)` };

  switch (status) {
    case 'Active':
      return <CheckCircle2 {...iconProps} />;
    case 'Pending':
      return <Clock3 {...iconProps} />;
    case 'Review':
      return <AlertCircle {...iconProps} />;
    default:
      return null;
  }
};

export function CasesTable({ getStatusColor }: CasesTableProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState<Case[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAllCases();
        setCases(data);
      } catch (error) {
        console.error('Error loading cases:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredCases = cases.filter(
    c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCaseClick = (caseUid: string) => {
    router.push(`/case/${caseUid}`);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Group
        justify="space-between"
        align="center"
        mb="md"
        py="xs"
        pos="sticky"
        top={48}
        bg="white"
        style={{ zIndex: 50 }}
      >
        <Group>
          <Title order={4}>All Cases</Title>
          <Button leftSection={<Plus size={16} />} variant="outline" size="compact-sm">
            Create
          </Button>
        </Group>
        <Group>
          <TextInput
            placeholder="Search cases..."
            leftSection={<Search size={16} />}
            value={searchQuery}
            onChange={e => setSearchQuery(e.currentTarget.value)}
            style={{ width: '300px' }}
          />
          <ActionIcon variant="light" size="lg">
            <Filter size={20} />
          </ActionIcon>
        </Group>
      </Group>

      {loading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <Paper shadow="sm" radius="md" withBorder>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th hiddenFrom="sm">Status</Table.Th>
                <Table.Th pl="md">Case Name</Table.Th>
                <Table.Th visibleFrom="sm">Client</Table.Th>
                <Table.Th visibleFrom="sm">Status</Table.Th>
                <Table.Th>Last Updated</Table.Th>
                <Table.Th visibleFrom="sm">Created</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredCases.map(c => (
                <Table.Tr key={c.id}>
                  <Table.Td hiddenFrom="sm">
                    <Tooltip label={c.status}>
                      <div>
                        <StatusIcon status={c.status} color={getStatusColor(c.status)} />
                      </div>
                    </Tooltip>
                  </Table.Td>
                  <Table.Td pl="md">{c.name}</Table.Td>
                  <Table.Td visibleFrom="sm">{c.client}</Table.Td>
                  <Table.Td visibleFrom="sm">
                    <CaseStatus status={c.status} readonly />
                  </Table.Td>
                  <Table.Td>{dayjs(c.lastUpdated).fromNow()}</Table.Td>
                  <Table.Td visibleFrom="sm">{dayjs(c.createdAt).format('DD.MM.YY')}</Table.Td>
                  <Table.Td>
                    <Button variant="light" size="xs" component={Link} href={`/case/${c.id}`}>
                      View
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>{' '}
        </Paper>
      )}
    </div>
  );
}
