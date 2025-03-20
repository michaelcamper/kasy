'use client';

import { Burger, Group, Title, Container, Button, Flex, ActionIcon } from '@mantine/core';
import { User } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [opened, setOpened] = useState(false);

  return (
    <Flex h="100%" justify="space-between" align="center" px="md">
       <Title order={3} style={{fontFamily: 'var(--font-poppins)'}}>Kasy</Title>

      <ActionIcon variant='light' size='lg'>
        <User size={20} />
      </ActionIcon>
    </Flex>
  );
}