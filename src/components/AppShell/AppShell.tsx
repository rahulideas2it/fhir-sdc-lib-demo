import {
  AppShell,
  Avatar,
  Box,
  Burger,
  Group,
  NavLink,
  ScrollArea,
  Title,
  Tooltip,
  useMantineTheme
} from '@mantine/core';

import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconAdjustments,
  IconBell,
  IconCalendarStats,
  IconFileAnalytics,
  IconHeartbeat,
  IconLock,
  IconMoon,
  IconNotes,
  IconPresentationAnalytics,
  IconSettings,
  IconSun,
  IconUsers
} from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserButton } from '../UserButton/UserButton';

const navbarData = [
  { label: 'Patients', icon: IconUsers, path: '/patients' },
  {
    label: 'Surveys',
    icon: IconNotes,
    path: '/surveys'
  },
  {
    label: 'Vitals',
    icon: IconCalendarStats
  },
  { label: 'Analytics', icon: IconPresentationAnalytics },
  { label: 'Contracts', icon: IconFileAnalytics },
  { label: 'Settings', icon: IconAdjustments, path: '/settings' },
  {
    label: 'Security',
    icon: IconLock
  }
];

export function NavbarSection({ children }: any) {
  const [opened, { toggle }] = useDisclosure();
  const theme = useMantineTheme();
  const location = useLocation();
  const [selected, setSelected] = useState<string | null>('/patients');
  const navigate = useNavigate();

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true
  });

  useEffect(() => {
    setSelected(location.pathname);
  }, []);

  const handleOnClick = (path: string) => {
    if (path !== location.pathname) {
      navigate(path);
      setSelected(path);
    }
  };

  const links = navbarData.map((item: any) => (
    <NavLink
      fw={500}
      px="lg"
      py="xs"
      key={item.label}
      active={item.path === selected}
      label={item.label}
      description={item.description}
      rightSection={item.rightSection}
      leftSection={
        <ActionIcon variant="light" aria-label="Settings">
          <item.icon size="1rem" stroke={1.5} />
        </ActionIcon>
      }
      onClick={() => {
        handleOnClick(item.path);
      }}
    />
  ));

  const calculatePadding = useCallback(() => {
    if (!location.pathname.startsWith('/forms/')) {
      return `
        calc(var(--app-shell-header-offset, 0px) + var(--app-shell-padding)) var(
    --_main-padding-right,calc(var(--app-shell-aside-offset, 0px) + var(--app-shell-padding))
  ) calc(var(--app-shell-footer-offset, 0px) + var(--app-shell-padding)) var(
    --_main-padding-left,calc(var(--app-shell-navbar-offset, 0px) + var(--app-shell-padding))
  )
      `;
    } else {
      return '80px 0px';
    }
  }, [location.pathname]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" w="100%" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Group justify="space-between">
              <Group
                align="center"
                gap={'xs'}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate('/patients');
                  setSelected('/patients');
                }}
              >
                <Avatar
                  radius={'xl'}
                  color={theme.primaryColor}
                  size={34}
                  variant="filled"
                >
                  <IconHeartbeat stroke={2.2} size={'1.3rem'} />
                </Avatar>
                <Title order={3} h={26} style={{ letterSpacing: 1 }}>
                  FHIR EHR
                </Title>
              </Group>
              {/* <Code fw ={600}>V1.0.0</Code> */}
            </Group>
          </Group>
          <Group gap={'sm'}>
            {!location.pathname.startsWith('/forms/') && (
              <>
                <Box>
                  <Tooltip label="Notifications" position="bottom" withArrow>
                    <ActionIcon
                      color="gray"
                      radius={'md'}
                      variant="default"
                      size="lg"
                      aria-label="Toggle notifications"
                    >
                      <IconBell stroke={2} size={16} />
                    </ActionIcon>
                  </Tooltip>
                </Box>

                <Box>
                  <Tooltip label="Settings" position="bottom" withArrow>
                    <ActionIcon
                      color="gray"
                      radius={'md'}
                      variant="default"
                      size="lg"
                      aria-label="Settings"
                    >
                      <IconSettings stroke={2} size={16} />
                    </ActionIcon>
                  </Tooltip>
                </Box>
              </>
            )}
            <Box>
              <Tooltip
                label={`${
                  computedColorScheme === 'light' ? 'Dark' : 'Light'
                } Mode`}
                position="bottom"
                withArrow
              >
                <ActionIcon
                  color="gray"
                  radius={'md'}
                  onClick={() =>
                    setColorScheme(
                      computedColorScheme === 'light' ? 'dark' : 'light'
                    )
                  }
                  variant="default"
                  size="lg"
                  aria-label="Toggle color scheme"
                >
                  {computedColorScheme === 'light' ? (
                    <IconMoon stroke={2} size={16} />
                  ) : (
                    <IconSun stroke={2} size={18} />
                  )}
                </ActionIcon>
              </Tooltip>
            </Box>
          </Group>
        </Group>
      </AppShell.Header>
      {!location.pathname.startsWith('/forms/') && (
        <AppShell.Navbar>
          <AppShell.Section grow my="md" component={ScrollArea}>
            <ScrollArea>
              <div>{links}</div>
            </ScrollArea>
          </AppShell.Section>
          <AppShell.Section>
            <UserButton />
          </AppShell.Section>
        </AppShell.Navbar>
      )}
      <AppShell.Main
        style={{ padding: calculatePadding() }}
        bg={
          computedColorScheme === 'light'
            ? theme.colors.gray[0]
            : theme.colors.dark[6]
        }
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
}

