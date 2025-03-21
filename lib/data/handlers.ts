import casesData from './cases.json';
import { Case } from '@/types/case';

const getRandomDelay = () => Math.floor(Math.random() * (800 - 200 + 1) + 200);

export const fetchAllCases = async (): Promise<Case[]> => {
  await new Promise(resolve => setTimeout(resolve, getRandomDelay()));
  return casesData.cases;
};

export const fetchRecentCases = async (): Promise<Case[]> => {
  await new Promise(resolve => setTimeout(resolve, getRandomDelay()));
  return [...casesData.cases]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 3);
};

export const fetchCaseById = (id: string): Case | null => {
  const foundCase = casesData.cases.find(c => c.id === id);
  return foundCase || null;
};
