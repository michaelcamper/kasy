'use client';

import { useState } from 'react';
import { Paper, Stack, Text, TextInput, ScrollArea, Group, ActionIcon, Flex } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Search, Plus, FileText } from 'lucide-react';

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
    content: 'Key findings and observations...',
    lastEdited: '2024-03-20',
  },
  {
    id: '2',
    title: 'Witness Statements',
    content: 'Summary of witness testimonies...',
    lastEdited: '2024-03-19',
  },
  {
    id: '3',
    title: 'Legal Precedents',
    content: 'Relevant case law references...',
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
    <Group align="flex-start" gap="md">
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

            <ActionIcon variant="light" size="input-sm">
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
                    <FileText size={16} />
                    <div style={{ flex: 1 }}>
                      <Text size="sm" fw={500} truncate>
                        {note.title}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {note.lastEdited}
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
      <RichTextEditor flex={1} editor={editor} style={{ height: '100%' }}>
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
