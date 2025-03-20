import { Paper, Title, Text } from '@mantine/core';

export default function NotFound() {
  return (
    <Paper p="xl" withBorder>
      <Title order={3}>Case Not Found</Title>
      <Text c="dimmed" mt="md">The requested case could not be found.</Text>
    </Paper>
  );
}