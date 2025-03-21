'use client';

import {
  Paper,
  Title,
  Grid,
  TextInput,
  Select,
  MultiSelect,
  Switch,
  Container,
  Stack,
  Group,
  Tabs,
  Text,
  Divider,
  AppShell,
  NavLink,
  Flex,
  Center,
} from '@mantine/core';
import {
  Save,
  File,
  Users,
  Bell,
  Layout,
  Workflow,
  Database,
  Link as LinkIcon,
} from 'lucide-react';
import { useState } from 'react';

export function CaseConfiguration() {
  return (
    <Container size="md" mt="md">
      <Tabs defaultValue="details" variant="pills" orientation="vertical">
        <Paper style={{ alignSelf: 'flex-start' }} bg="gray.0">
          <Tabs.List>
            {[
              { label: 'Details', icon: File, value: 'details' },
              { label: 'Team', icon: Users, value: 'team' },
              { label: 'Notifications', icon: Bell, value: 'notifications' },
              { label: 'Layout', icon: Layout, value: 'layout' },
              { label: 'Workflow', icon: Workflow, value: 'workflow' },
              { label: 'Integrations', icon: LinkIcon, value: 'integrations' },
              { label: 'Data Management', icon: Database, value: 'data' },
            ].map(tab => (
              <Tabs.Tab
                key={tab.value}
                value={tab.value}
                variant="light"
                leftSection={<tab.icon size={20} />}
              >
                <Text size="lg">{tab.label}</Text>
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Paper>

        <Paper p="md" withBorder ml="xl" flex={1} style={{ alignSelf: 'flex-start' }}>
          <Tabs.Panel value="details">
            <form>
              <Stack gap="xl">
                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Case Name"
                      placeholder="Enter case name"
                      defaultValue="Smith vs. Johnson Corp"
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Reference Number"
                      placeholder="Enter reference number"
                      defaultValue="CASE-2024-001"
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Select
                      label="Status"
                      placeholder="Select status"
                      defaultValue="active"
                      data={[
                        { value: 'active', label: 'Active' },
                        { value: 'pending', label: 'Pending' },
                        { value: 'review', label: 'Under Review' },
                        { value: 'closed', label: 'Closed' },
                      ]}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <MultiSelect
                      label="Team Members"
                      placeholder="Select team members"
                      data={[
                        { value: 'john', label: 'John Doe' },
                        { value: 'jane', label: 'Jane Smith' },
                        { value: 'bob', label: 'Bob Johnson' },
                      ]}
                    />
                  </Grid.Col>
                </Grid>
              </Stack>
            </form>
          </Tabs.Panel>
          <Tabs.Panel value="team">
            <Stack gap="xl">
              <div>
                <Title order={5}>Team Permissions</Title>
                <Text size="sm" c="dimmed">
                  Configure access levels for team members
                </Text>
              </div>

              <Divider />

              <Grid>
                <Grid.Col span={12}>
                  <MultiSelect
                    label="Administrators"
                    placeholder="Select administrators"
                    data={[
                      { value: 'john', label: 'John Doe' },
                      { value: 'jane', label: 'Jane Smith' },
                    ]}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <MultiSelect
                    label="Researchers"
                    placeholder="Select researchers"
                    data={[
                      { value: 'bob', label: 'Bob Johnson' },
                      { value: 'alice', label: 'Alice Williams' },
                    ]}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <MultiSelect
                    label="Viewers"
                    placeholder="Select viewers"
                    data={[
                      { value: 'charlie', label: 'Charlie Brown' },
                      { value: 'diana', label: 'Diana Prince' },
                    ]}
                  />
                </Grid.Col>
              </Grid>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="notifications">
            <Stack gap="xl">
              <div>
                <Title order={5}>Notification Settings</Title>
                <Text size="sm" c="dimmed">
                  Configure how and when you receive updates
                </Text>
              </div>

              <Divider />

              <Stack gap="md">
                <Switch label="Email notifications for research updates" defaultChecked />
                <Switch label="Email notifications for team comments" defaultChecked />
                <Switch label="Email notifications for document changes" defaultChecked />
                <Switch label="In-app notifications" defaultChecked />
                <Switch label="Daily digest email" />
                <Switch label="Weekly summary email" defaultChecked />
              </Stack>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="layout">
            <Stack gap="xl">
              <div>
                <Title order={5}>Dashboard Layout</Title>
                <Text size="sm" c="dimmed">
                  Customize your research dashboard view
                </Text>
              </div>

              <Divider />

              <Stack gap="md">
                <Switch label="Show research timeline" defaultChecked />
                <Switch label="Show team activity" defaultChecked />
                <Switch label="Show document preview" defaultChecked />
                <Switch label="Show statistics" defaultChecked />
                <Switch label="Show quick actions" defaultChecked />
                <Switch label="Compact view" />
              </Stack>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="workflow">
            <Stack gap="xl">
              <div>
                <Title order={5}>Research Workflow</Title>
                <Text size="sm" c="dimmed">
                  Configure your research process
                </Text>
              </div>

              <Divider />

              <Stack gap="md">
                <Switch label="Enable research stages" defaultChecked />
                <Switch label="Require citations" defaultChecked />
                <Switch label="Enable peer review" />
                <Switch label="Auto-save research notes" defaultChecked />
                <Switch label="Track research time" defaultChecked />
                <Switch label="Enable document versioning" defaultChecked />
              </Stack>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="integrations">
            <Stack gap="xl">
              <div>
                <Title order={5}>External Integrations</Title>
                <Text size="sm" c="dimmed">
                  Connect with external services
                </Text>
              </div>

              <Divider />

              <Stack gap="md">
                <Switch label="Legal Database Integration" defaultChecked />
                <Switch label="Document Management System" defaultChecked />
                <Switch label="Time Tracking Integration" />
                <Switch label="Citation Management" defaultChecked />
                <Switch label="Calendar Integration" defaultChecked />
              </Stack>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="data">
            <Stack gap="xl">
              <div>
                <Title order={5}>Data Management</Title>
                <Text size="sm" c="dimmed">
                  Configure data handling and retention
                </Text>
              </div>

              <Divider />

              <Stack gap="md">
                <Switch label="Auto-backup research data" defaultChecked />
                <Switch label="Enable version history" defaultChecked />
                <Switch label="Archive closed cases" defaultChecked />
                <Switch label="Data encryption" defaultChecked />
                <Switch label="Export capabilities" defaultChecked />
              </Stack>
            </Stack>
          </Tabs.Panel>
        </Paper>
      </Tabs>
    </Container>
  );
}
