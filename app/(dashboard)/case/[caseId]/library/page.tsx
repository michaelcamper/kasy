'use client';

import { AppShell, Container } from '@mantine/core';
import { LegalRepository } from '@/components/case/LegalRepository';

export default function LibraryPage() {
  return (
    <AppShell.Main>
      <LegalRepository />
    </AppShell.Main>
  );
}
