'use client';

import { useState } from 'react';
import { Paper, Stack, Text, TextInput, ScrollArea, Group, ActionIcon, Flex } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Search, Plus, FileText } from 'lucide-react';
import dayjs from 'dayjs';

interface Note {
  id: string;
  title: string;
  content: string;
  lastEdited: string;
}

const MOCK_NOTES: Note[] = [
  {
    id: '1',
    title: 'Initial Case Analysis',
    content: `<h1>Case Overview: Smith v. Johnson Corp</h1>

<h2>Key Facts</h2>
<ul>
  <li>Plaintiff: John Smith (former employee)</li>
  <li>Defendant: Johnson Corporation</li>
  <li>Date of Incident: March 15, 2023</li>
  <li>Jurisdiction: District Court of California</li>
</ul>

<h2>Core Issues</h2>
<ol>
  <li>Wrongful Termination</li>
  <li>Discrimination Claims</li>
  <li>Breach of Contract</li>
</ol>

<h2>Preliminary Assessment</h2>
<p>The plaintiff alleges wrongful termination based on age discrimination. Key evidence includes:</p>
<ul>
  <li>Performance reviews showing consistent positive feedback</li>
  <li>Email correspondence indicating age-related comments</li>
  <li>Witness statements from former colleagues</li>
</ul>

<h2>Next Steps</h2>
<ul>
  <li>Review employment contract</li>
  <li>Gather witness statements</li>
  <li>Analyze company policies</li>
  <li>Review similar case law</li>
</ul>`,
    lastEdited: '2024-03-20',
  },
  {
    id: '2',
    title: 'Witness Statements',
    content: `<h1>Witness Testimonies</h1>

<h2>Sarah Wilson (Former HR Manager)</h2>
<ul>
  <li>Employed at Johnson Corp: 2018-2023</li>
  <li>Key Points:
    <ul>
      <li>Observed age-related comments in management meetings</li>
      <li>Documented performance review discrepancies</li>
      <li>Witnessed discriminatory hiring practices</li>
    </ul>
  </li>
</ul>

<h2>Michael Chen (Former Team Lead)</h2>
<ul>
  <li>Employed at Johnson Corp: 2020-2023</li>
  <li>Testimony:
    <ul>
      <li>Plaintiff was consistently top performer</li>
      <li>Noticed pattern of older employees being let go</li>
      <li>Has email evidence of discriminatory remarks</li>
    </ul>
  </li>
</ul>

<h2>Emily Rodriguez (Current Employee)</h2>
<ul>
  <li>Still employed at Johnson Corp</li>
  <li>Observations:
    <ul>
      <li>Confirms plaintiff's work quality</li>
      <li>Witnessed management's treatment of older employees</li>
      <li>Has relevant documentation</li>
    </ul>
  </li>
</ul>`,
    lastEdited: '2024-03-19',
  },
  {
    id: '3',
    title: 'Legal Precedents',
    content: `<h1>Relevant Case Law</h1>

<h2>Age Discrimination Cases</h2>
<ol>
  <li><strong>O'Connor v. Consolidated Coin Caterers Corp. (1996)</strong>
    <ul>
      <li>Key Holding: Plaintiff need not be replaced by someone outside protected class</li>
      <li>Relevance: Supports our position on discriminatory intent</li>
    </ul>
  </li>
  <li><strong>Gross v. FBL Financial Services (2009)</strong>
    <ul>
      <li>Key Holding: "But-for" causation standard</li>
      <li>Impact: Strengthens our burden of proof</li>
    </ul>
  </li>
  <li><strong>Babb v. Wilkie (2020)</strong>
    <ul>
      <li>Key Holding: Age need not be sole factor</li>
      <li>Application: Supports mixed-motive theory</li>
    </ul>
  </li>
</ol>

<h2>Recent Developments</h2>
<ul>
  <li>Recent 9th Circuit decisions favor plaintiffs</li>
  <li>New EEOC guidelines on age discrimination</li>
  <li>Emerging trends in age discrimination litigation</li>
</ul>`,
    lastEdited: '2024-03-18',
  },
];

export function NotesEditor() {
  const [selectedNote, setSelectedNote] = useState<string>('1');
  const [searchQuery, setSearchQuery] = useState('');

  const editor = useEditor({
    extensions: [StarterKit],
    content: MOCK_NOTES.find(n => n.id === selectedNote)?.content || '',
  });

  const filteredNotes = MOCK_NOTES.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!editor) {
    return null;
  }

  return (
    <Group align="flex-start" gap="md" pb="xl">
      {/* Left Sidebar - Notes List */}
      <Paper withBorder style={{ width: 300 }}>
        <Stack gap="xs" p="md">
          <Flex gap="sm" mb="md">
            <TextInput
              placeholder="Search notes..."
              style={{ flex: 1 }}
              leftSection={<Search size={16} />}
              value={searchQuery}
              onChange={e => setSearchQuery(e.currentTarget.value)}
            />

            <ActionIcon variant="light" size="input-sm" disabled>
              <Plus size={16} />
            </ActionIcon>
          </Flex>

          <ScrollArea>
            <Stack gap="xs">
              {filteredNotes.map(note => (
                <Paper
                  key={note.id}
                  p="sm"
                  withBorder
                  style={{
                    cursor: 'pointer',
                    backgroundColor:
                      selectedNote === note.id ? 'var(--mantine-color-blue-0)' : 'transparent',
                  }}
                  onClick={() => {
                    setSelectedNote(note.id);
                    editor.commands.setContent(note.content);
                  }}
                >
                  <Group gap="xs">
                    <div style={{ flex: 1 }}>
                      <Text size="sm" fw={500} truncate>
                        {note.title}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {dayjs(note.lastEdited).format('DD.MM.YYYY')}
                      </Text>
                    </div>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </ScrollArea>
        </Stack>
      </Paper>

      {/* Right Side - Editor */}
      <RichTextEditor editor={editor} flex={1}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </Group>
  );
}
