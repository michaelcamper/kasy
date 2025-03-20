'use client';

import {
  Stack,
  TextInput,
  ScrollArea,
  Group,
  Text,
  Button,
  Paper,
  ActionIcon,
  Alert,
  Card,
  Flex,
  Center,
} from '@mantine/core';
import { Send, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  name?: string;
}

interface ChatProps {
  messages: Message[];
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
}

export function Chat({ messages: initialMessages, onSendMessage, isLoading = false }: ChatProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message
    const newMessages: Message[] = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);

    // Show typing state
    setIsTyping(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Add assistant response
    setMessages([
      ...newMessages,
      {
        role: 'assistant' as const,
        content: 'Ok nice, that sounds very cool. tell me more',
      },
    ]);

    setIsTyping(false);

    if (onSendMessage) {
      onSendMessage(userMessage);
    }
  };

  return (
    <Flex direction="column" gap={0} h="100%">
      {messages.length === 0 ? (
        <Card bg="blue.0" mx="xl" my="auto" radius="md" shadow="sm">
          <Center mb="sm">
            <Sparkles size={48} strokeWidth={1} stroke="var(--mantine-color-blue-6)" />
          </Center>

          <Text ta="center">Ask me anything about the case and I'll do my magic.</Text>
        </Card>
      ) : (
        <ScrollArea flex={1}>
          <Stack gap={0}>
            {messages.map((message, i) => (
              <Paper
                key={i}
                p="md"
                bg={message.role === 'assistant' ? 'var(--mantine-color-gray-0)' : 'white'}
                style={{
                  borderBottom: '1px solid var(--mantine-color-gray-2)',
                  borderRadius: 0,
                }}
              >
                <div
                  style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    textAlign: message.role === 'user' ? 'right' : 'left',
                  }}
                >
                  {message.role === 'user' ? (
                    <Paper
                      p="sm"
                      bg="var(--mantine-color-blue-0)"
                      style={{ display: 'inline-block' }}
                    >
                      <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>
                        {message.content}
                      </Text>
                    </Paper>
                  ) : (
                    <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>
                      {message.content}
                    </Text>
                  )}
                </div>
              </Paper>
            ))}
            {isTyping && (
              <Paper
                p="xl"
                bg="var(--mantine-color-gray-0)"
                style={{
                  borderBottom: '1px solid var(--mantine-color-gray-2)',
                  borderRadius: 0,
                }}
              >
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                  <Text size="sm" style={{ opacity: 0.7 }}>
                    typing...
                  </Text>
                </div>
              </Paper>
            )}
          </Stack>
        </ScrollArea>
      )}

      <Paper p="sm" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
        <form onSubmit={handleSubmit}>
          <Group gap="xs" maw={800} mx="auto" mb="sm">
            <TextInput
              placeholder="Ask me anything..."
              style={{ flex: 1 }}
              value={input}
              onChange={e => setInput(e.currentTarget.value)}
              disabled={isLoading || isTyping}
            />
            <ActionIcon
              type="submit"
              size="input-sm"
              loading={isLoading || isTyping}
              disabled={!input.trim() || isLoading || isTyping}
            >
              <Send size={16} />
            </ActionIcon>
          </Group>
        </form>
      </Paper>
    </Flex>
  );
}
