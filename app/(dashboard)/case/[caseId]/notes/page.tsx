'use client';
import { AppShell, Container } from '@mantine/core';
import { NotesEditor } from '@/components/case/NotesEditor';

export default function NotesPage() {
  return (
    <AppShell.Main>
      <Container size="xl" pt="md">
        <NotesEditor />
      </Container>
    </AppShell.Main>
  );
}
