'use client';

import { Title, Group, Card, Text, Button, Tooltip, Stack, Skeleton } from '@mantine/core';
import { Clock, CheckCircle2, Clock3, AlertCircle } from 'lucide-react';
import { Case } from '@/types/case';
import { fetchRecentCases } from '@/lib/data/handlers';
import { useEffect, useState, Suspense } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

dayjs.extend(relativeTime);

interface RecentCasesProps {
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

const CaseCard = ({
  c,
  getStatusColor,
  onViewDetails,
}: {
  c: Case;
  getStatusColor: (status: string) => string;
  onViewDetails: () => void;
}) => (
  <Card
    key={c.id}
    shadow="sm"
    padding="lg"
    radius="md"
    withBorder
    component={Link}
    href={`/case/${c.id}`}
  >
    <Group justify="space-between" mb="xs" wrap="nowrap">
      <Text
        fw={500}
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '70%',
        }}
        title={c.name}
      >
        {c.name}
      </Text>
      <Tooltip label={c.status}>
        <div>
          <StatusIcon status={c.status} color={getStatusColor(c.status)} />
        </div>
      </Tooltip>
    </Group>
    <Text size="sm" c="dimmed" mb="xs">
      {c.client}
    </Text>
    <Group gap="xs" color="dimmed">
      <Clock size={16} />
      <Text span>{dayjs(c.lastUpdated).fromNow()}</Text>
    </Group>
  </Card>
);

const SkeletonCard = () => (
  <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Group justify="space-between" mb={16} wrap="nowrap">
      <Skeleton height={20} width="60%" />
      <Skeleton circle height={20} />
    </Group>
    <Skeleton height={12} width="40%" mb="md" />
    <Group gap="xs">
      <Skeleton circle height={16} />
      <Skeleton height={16} width="30%" />
    </Group>
  </Card>
);

const LoadingState = () => (
  <>
    <Stack hiddenFrom="sm" gap="md">
      {[1, 2, 3].map(i => (
        <SkeletonCard key={i} />
      ))}
    </Stack>
    <Group grow visibleFrom="sm">
      {[1, 2, 3].map(i => (
        <SkeletonCard key={i} />
      ))}
    </Group>
  </>
);

const CasesList = ({
  cases,
  getStatusColor,
  onViewDetails,
}: {
  cases: Case[];
  getStatusColor: (status: string) => string;
  onViewDetails: (uid: string) => void;
}) => (
  <>
    <Stack hiddenFrom="sm" gap="md">
      {cases.map(c => (
        <CaseCard
          key={c.id}
          c={c}
          getStatusColor={getStatusColor}
          onViewDetails={() => onViewDetails(c.uid)}
        />
      ))}
    </Stack>
    <Group grow visibleFrom="sm">
      {cases.map(c => (
        <CaseCard
          key={c.id}
          c={c}
          getStatusColor={getStatusColor}
          onViewDetails={() => onViewDetails(c.uid)}
        />
      ))}
    </Group>
  </>
);

export function RecentCases({ getStatusColor }: RecentCasesProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState<Case[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchRecentCases();
        setCases(data);
      } catch (error) {
        console.error('Error loading recent cases:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleViewDetails = (uid: string) => {
    router.push(`/case/${uid}`);
  };

  return (
    <div>
      <Title order={4} mb="md">
        Recent Cases
      </Title>
      <Suspense fallback={<LoadingState />}>
        {loading ? (
          <LoadingState />
        ) : (
          <CasesList
            cases={cases}
            getStatusColor={getStatusColor}
            onViewDetails={handleViewDetails}
          />
        )}
      </Suspense>
    </div>
  );
}
