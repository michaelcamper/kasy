import { Group, Title, SegmentedControl, ActionIcon } from '@mantine/core';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { CaseStatus } from './CaseStatus';
import { PropsWithChildren } from 'react';
import { fetchCaseById } from '@/lib/data/handlers';
import { redirect, RedirectType } from 'next/navigation';

interface CaseHeaderProps {
  segment: string | null;
  caseId: string;
}

export async function CaseHeader({
  segment,
  caseId,
  children,
}: PropsWithChildren<CaseHeaderProps>) {
  const caseData = await fetchCaseById(caseId);
  if (!caseData) {
    return redirect('/', RedirectType.replace);
  }

  return (
    
  );
}
