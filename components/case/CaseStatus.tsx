'use client';

import { Badge, Menu, ActionIcon } from '@mantine/core';
import { CheckCircle2, Clock3, AlertCircle, XCircle, ChevronDown } from 'lucide-react';

interface CaseStatusProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
  onStatusChange?: (status: string) => void;
  readonly?: boolean;
}

const statusConfig = {
  Active: {
    color: 'green',
    icon: CheckCircle2,
  },
  Pending: {
    color: 'yellow',
    icon: Clock3,
  },
  Review: {
    color: 'blue',
    icon: AlertCircle,
  },
  Closed: {
    color: 'gray',
    icon: XCircle,
  },
} as const;

export function CaseStatus({
  status,
  onStatusChange,
  readonly = false,
  size = 'md',
}: CaseStatusProps) {
  const currentStatus = statusConfig[status as keyof typeof statusConfig] || statusConfig.Pending;
  const StatusIcon = currentStatus.icon;

  if (readonly) {
    return (
      <Badge
        size={size}
        variant="light"
        color={currentStatus.color}
        leftSection={<StatusIcon size={14} />}
      >
        {status}
      </Badge>
    );
  }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <div
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
        >
          <Badge
            size="lg"
            variant="light"
            color={currentStatus.color}
            leftSection={<StatusIcon size={14} />}
          >
            {status}
          </Badge>
          <ActionIcon variant="subtle" color={currentStatus.color} size="sm">
            <ChevronDown size={14} />
          </ActionIcon>
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Change Status</Menu.Label>
        {Object.entries(statusConfig).map(([statusName, config]) => {
          const Icon = config.icon;
          return (
            <Menu.Item
              key={statusName}
              leftSection={<Icon size={14} color={`var(--mantine-color-${config.color}-filled)`} />}
              onClick={() => onStatusChange?.(statusName)}
              color={config.color}
            >
              {statusName}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
}
