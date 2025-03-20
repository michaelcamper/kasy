'use client';

import { CaseConfiguration } from '@/components/case/CaseConfiguration';
import { AppShell } from '@mantine/core';

export default function ConfigPage() {
  return (
    <AppShell.Main>
      <CaseConfiguration />
    </AppShell.Main>
  );
}
