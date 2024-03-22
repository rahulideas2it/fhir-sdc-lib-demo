import {
  ActionIcon,
  Anchor,
  Group,
  Paper,
  ScrollArea,
  Table,
  Text,
  Tooltip
} from '@mantine/core';
import { IconExternalLink, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export default function QuestionnaireTable({
  resources,
  deleteResourceById
}: any) {
  const navigate = useNavigate();
  const rows = resources?.map((element: any) => {
    const item = element.resource;
    return (
      <Table.Tr key={item.id}>
        <Table.Td>
          <Group gap={6}>
            <Text>{item?.name}</Text>
          </Group>
        </Table.Td>
        <Table.Td>{item?.publisher}</Table.Td>
        <Table.Td>{item?.status?.toUpperCase()}</Table.Td>
        <Table.Td>{item?.description}</Table.Td>
        <Table.Td>
          <Anchor
            component="button"
            onClick={() => navigate(`/forms/${item.id}`)}
            fz={16}
            underline="always"
            c="green"
          >
            <Group gap={2}>
              <IconExternalLink size={16} /> Form
            </Group>
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Anchor
            component="button"
            onClick={() => navigate(`/surveys/${item.id}`)}
            fz={16}
            underline="always"
            c="green"
          >
            <Group gap={2}>
              <IconExternalLink size={16} /> Builder
            </Group>
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Anchor component="button" fz={16} underline="always" c="green">
            <Group gap={2}>
              <IconExternalLink size={16} /> Response
            </Group>
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Tooltip label="Delete" position="bottom" withArrow>
            <ActionIcon
              color="red"
              variant="subtle"
              aria-label="Settings"
              onClick={() => deleteResourceById(item?.id)}
            >
              <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Table.Td>
      </Table.Tr>
    );
  });

  if (!resources?.length) {
    return 'Loading ...';
  }

  return (
    <Paper withBorder>
      <ScrollArea mah={'calc(100vh - 165px)'} type="hover">
        <Table miw={800} highlightOnHover verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Publisher</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Survey Link</Table.Th>
              <Table.Th>Survey Builder</Table.Th>
              <Table.Th>Survey Responses</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}

