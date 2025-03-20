'use client';

import {
  Paper,
  Group,
  TextInput,
  Card,
  Text,
  Badge,
  ActionIcon,
  Grid,
  Button,
  Stack,
  Menu,
  SegmentedControl,
  Popover,
  Container,
  Checkbox,
  Divider,
  Box,
  Center,
  Flex,
  Collapse,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import {
  Search,
  Download,
  Star,
  BookMarked,
  FileText,
  Gavel,
  Newspaper,
  Clock,
  MoreVertical,
  FolderTree,
  Share2,
  Trash,
  Calendar,
  SortAsc,
  SortDesc,
  X,
  ChevronDown,
  File,
  Filter,
  Tag,
  Plus,
  Eye,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
interface Document {
  id: string;
  title: string;
  type: 'case-law' | 'legislation' | 'document' | 'press';
  description: string;
  date: string;
  tags: string[];
  url: string;
}

const MOCK_DOCUMENTS: Document[] = [
  {
    id: '1',
    title: 'Smith v. Johnson (2024)',
    type: 'case-law',
    description: 'Supreme Court decision on environmental regulations and corporate liability',
    date: '2024-03-15',
    tags: ['precedent', 'environmental'],
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: '2',
    title: 'Environmental Protection Act',
    type: 'legislation',
    description: 'Latest amendments to environmental protection legislation',
    date: '2024-02-20',
    tags: ['statute', 'environmental'],
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: '3',
    title: 'Expert Witness Statement',
    type: 'document',
    description: "Dr. Smith's analysis of environmental impact",
    date: '2024-03-10',
    tags: ['evidence', 'expert'],
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
];

const CATEGORIES = {
  'case-law': ['Supreme Court', 'Appeals Court', 'District Court'],
  legislation: ['Federal Law', 'State Law', 'Regulations'],
  document: ['Evidence', 'Correspondence', 'Reports'],
  press: ['News Articles', 'Press Releases', 'Media Coverage'],
};

const TYPE_OPTIONS = [
  { value: 'case-law', label: 'Case Law' },
  { value: 'legislation', label: 'Legislation' },
  { value: 'document', label: 'Documents' },
  { value: 'press', label: 'Press' },
] satisfies { value: Document['type']; label: string }[];
export function LegalRepository() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<Document['type'][]>([]);
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const allTags = Array.from(new Set(MOCK_DOCUMENTS.flatMap(doc => doc.tags)));

  const filteredDocuments = MOCK_DOCUMENTS.filter(doc => {
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(doc.type);
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDate =
      (!dateRange.from || new Date(doc.date) >= dateRange.from) &&
      (!dateRange.to || new Date(doc.date) <= dateRange.to);
    const matchesTags =
      selectedTags.length === 0 || doc.tags.some(tag => selectedTags.includes(tag));

    return matchesType && matchesSearch && matchesDate && matchesTags;
  }).sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    if (sortBy === 'date') {
      return (new Date(b.date).getTime() - new Date(a.date).getTime()) * order;
    }
    return a.title.localeCompare(b.title) * order;
  });

  const FilterPanel = () => (
    <div>
      <Box p="sm">
        <Text size="sm" fw={700} mb="xs">
          Document Type
        </Text>
        <Stack gap="xs">
          {TYPE_OPTIONS.map(type => (
            <Checkbox
              key={type.value}
              size="sm"
              checked={selectedTypes.includes(type.value as Document['type'])}
              onChange={({ currentTarget: { checked } }) => {
                setSelectedTypes(current =>
                  checked
                    ? [...current, type.value as Document['type']]
                    : current.filter(t => t !== type.value)
                );
              }}
              label={type.label}
            />
          ))}
        </Stack>
      </Box>
      <Divider />
      <Box p="sm">
        <Text size="sm" fw={700} mb="xs">
          Date
        </Text>
        <Group align="center" gap="xs">
          <DateInput
            value={dateRange.from}
            onChange={(date: Date | null) => setDateRange(current => ({ ...current, from: date }))}
            size="xs"
            clearable
            placeholder="From"
            valueFormat="DD/MM/YYYY"
            w={100}
          />
          <Text size="sm" c="dimmed">
            -
          </Text>
          <DateInput
            value={dateRange.to}
            onChange={(date: Date | null) => setDateRange(current => ({ ...current, to: date }))}
            size="xs"
            clearable
            placeholder="Until"
            valueFormat="DD/MM/YYYY"
            w={100}
          />
        </Group>
      </Box>
      <Divider />
      <Box p="sm">
        <Text size="sm" fw={700} mb="xs">
          Tags
        </Text>
        <Stack gap="xs">
          {allTags.map(tag => (
            <Checkbox
              key={tag}
              size="sm"
              checked={selectedTags.includes(tag)}
              onChange={({ currentTarget: { checked } }) => {
                setSelectedTags(current =>
                  checked ? [...current, tag] : current.filter(t => t !== tag)
                );
              }}
              label={tag}
            />
          ))}
        </Stack>
      </Box>
    </div>
  );

  const DocumentCard = ({ doc }: { doc: Document }) => (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section>
        <Image
          style={{ width: '100%', height: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
          src="/placeholder.svg"
          height={160}
          width={160}
          alt="Norway"
        />
      </Card.Section>

      <Group gap="sm" my="sm" justify="space-between">
        <Badge>{doc.type}</Badge>
        <Text c="dimmed" size="sm">
          {new Date(doc.date).toLocaleDateString()}
        </Text>
      </Group>

      <Text size="lg" fw={500} truncate>
        {doc.title}
      </Text>

      <Text size="sm" c="dimmed" mt="sm" mb="xs" lineClamp={2}>
        {doc.description}
      </Text>

      <Group gap="xs" mt="sm" mb="md">
        {doc.tags.map(tag => (
          <Badge
            key={tag}
            size="sm"
            variant="light"
            style={{ cursor: 'pointer' }}
            onClick={() => setSelectedTags(current => [...current, tag])}
          >
            {tag}
          </Badge>
        ))}
      </Group>
      <Group gap="md" justify="space-between">
        <Button
          leftSection={<Eye size={20} />}
          variant="light"
          component="a"
          href={doc.url}
          target="_blank"
        >
          View
        </Button>
        <ActionIcon variant="subtle" color="red" size="lg">
          <Trash size={20} />
        </ActionIcon>
      </Group>
    </Card>
  );

  return (
    <>
      <Container mb="sm">
        <Group justify="space-between" wrap="nowrap" mb="xl">
          <Menu position="bottom-start">
            <Menu.Target>
              <Button variant="outline" leftSection={<Plus size={16} />}>
                Add Document
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<File size={16} />}>Upload</Menu.Item>
              <Menu.Item leftSection={<Sparkles size={16} />}>AI Search</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Group gap="sm" wrap="nowrap">
            <TextInput
              placeholder="Search documents..."
              leftSection={<Search size={16} />}
              value={searchQuery}
              w={300}
              onChange={e => setSearchQuery(e.currentTarget.value)}
            />
            <Popover position="bottom-start" offset={{ mainAxis: 5 }}>
              <Popover.Target>
                <ActionIcon variant="default" size="input-sm">
                  <Filter size={16} />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown p={0}>
                <FilterPanel />
              </Popover.Dropdown>
            </Popover>
          </Group>
          <Group wrap="nowrap" gap="sm">
            <Menu shadow="md">
              <Menu.Target>
                <Button
                  variant="default"
                  leftSection={sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
                >
                  {sortBy === 'date' ? 'Date' : 'Title'}
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<Clock size={16} />} onClick={() => setSortBy('date')}>
                  Date
                </Menu.Item>
                <Menu.Item leftSection={<FileText size={16} />} onClick={() => setSortBy('title')}>
                  Title
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item leftSection={<SortAsc size={16} />} onClick={() => setSortOrder('asc')}>
                  Ascending
                </Menu.Item>
                <Menu.Item
                  leftSection={<SortDesc size={16} />}
                  onClick={() => setSortOrder('desc')}
                >
                  Descending
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <SegmentedControl
              value={view}
              onChange={value => setView(value as 'grid' | 'list')}
              data={[
                { label: 'Grid', value: 'grid' },
                { label: 'List', value: 'list' },
              ]}
            />
          </Group>
        </Group>

        <Collapse
          in={
            selectedTypes.length > 0 ||
            selectedTags.length > 0 ||
            dateRange.from !== null ||
            dateRange.to !== null
          }
        >
          <Group gap="xs" align="center" wrap="nowrap" pb="sm">
            {dateRange.from && (
              <Badge
                size="lg"
                variant="light"
                leftSection={<Calendar size={14} />}
                rightSection={<X size={14} />}
                style={{ cursor: 'pointer' }}
                onClick={() => setDateRange(current => ({ ...current, from: null }))}
              >
                After {dateRange.from.toLocaleDateString()}
              </Badge>
            )}
            {dateRange.to && (
              <Badge
                size="lg"
                variant="light"
                leftSection={<Calendar size={14} />}
                rightSection={<X size={14} />}
                style={{ cursor: 'pointer' }}
                onClick={() => setDateRange(current => ({ ...current, to: null }))}
              >
                Before {dateRange.to.toLocaleDateString()}
              </Badge>
            )}

            {TYPE_OPTIONS.filter(type => selectedTypes.includes(type.value)).map(type => (
              <Badge
                key={type.value}
                size="lg"
                variant="light"
                leftSection={<File size={14} />}
                rightSection={<X size={14} />}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedTypes(current => current.filter(t => t !== type.value))}
              >
                {type.label}
              </Badge>
            ))}
            {selectedTags.map(tag => (
              <Badge
                key={tag}
                size="lg"
                variant="light"
                leftSection={<Tag size={14} />}
                rightSection={<X size={14} />}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedTags(current => current.filter(t => t !== tag))}
              >
                {tag}
              </Badge>
            ))}
          </Group>
        </Collapse>
      </Container>

      <Container>
        {view === 'grid' ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1rem',
            }}
          >
            {filteredDocuments.map(doc => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        ) : (
          <Stack gap="md">
            {filteredDocuments.map(doc => (
              <Paper radius="md" key={doc.id} withBorder p="md">
                <Group>
                  <File size={40} strokeWidth={1} />
                  <Box style={{ flex: 1 }}>
                    <Group gap="sm" mb="xs">
                      <Badge>{doc.type}</Badge>
                      <Text c="dimmed" size="sm">
                        {new Date(doc.date).toLocaleDateString()}
                      </Text>
                    </Group>
                    <Text fw={500}>{doc.title}</Text>
                    <Text size="sm" c="dimmed" lineClamp={2} mb="sm">
                      {doc.description}
                    </Text>

                    <Flex gap="sm" wrap="wrap">
                      {doc.tags.map(tag => (
                        <Badge
                          key={tag}
                          size="sm"
                          variant="light"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setSelectedTags(current => [...current, tag])}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </Flex>
                  </Box>

                  <Group gap="xs">
                    <Button
                      leftSection={<Eye size={20} />}
                      variant="light"
                      component="a"
                      href={doc.url}
                      target="_blank"
                    >
                      View
                    </Button>
                    <ActionIcon variant="subtle" color="red" size="lg">
                      <Trash size={20} />
                    </ActionIcon>
                  </Group>
                </Group>
              </Paper>
            ))}
          </Stack>
        )}
      </Container>
    </>
  );
}
