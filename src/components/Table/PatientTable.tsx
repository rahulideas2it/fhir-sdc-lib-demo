import cx from 'clsx';
import { useState } from 'react';
import {
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  rem,
  Paper,
  ActionIcon,
  Tooltip
} from '@mantine/core';
import classes from './PatientTable.module.css';
import {
  AddressDisplay,
  HumanNameDisplay
} from '@rahulideas2it/fhir-sdc-lib-react';
import { IconTrash } from '@tabler/icons-react';

export default function PatientTable({ resources, deleteResourceById }: any) {
  const [selection, setSelection] = useState(['initial']);

  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === resources?.length
        ? []
        : resources.map((item: any) => item.resource.id)
    );

  const rows = resources?.map((element: any, index: any) => {
    const item = element.resource;
    const selected = selection.includes(item.id);
    return (
      <Table.Tr
        key={item.id}
        className={cx({ [classes.rowSelected]: selected })}
      >
        <Table.Td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
          />
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Avatar
              size={26}
              src={`https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-${
                index + 1
              }.png`}
              radius={26}
            />
            <Text size="sm" fw={500}>
              <HumanNameDisplay value={item?.name?.[0]} />
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item?.telecom?.[0]?.value}</Table.Td>
        <Table.Td>
          <AddressDisplay value={item.address?.[0]} />
        </Table.Td>
        <Table.Td>{item?.birthDate}</Table.Td>
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
        <Table miw={800} verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: rem(40) }}>
                <Checkbox
                  onChange={toggleAll}
                  checked={selection.length === resources?.length}
                  indeterminate={
                    selection.length > 0 &&
                    selection.length !== resources?.length &&
                    selection[0] !== 'initial'
                  }
                />
              </Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Address</Table.Th>
              <Table.Th>Birth Date</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}

