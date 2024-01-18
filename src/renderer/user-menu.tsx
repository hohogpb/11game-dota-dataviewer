import { forwardRef } from 'react';
import {
  IconChevronRight,
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconLogout,
} from '@tabler/icons-react';
import { Group, Avatar, Text, Menu, UnstyledButton } from '@mantine/core';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image: string;
  name: string;
  accountId?: string;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, accountId, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: 'var(--mantine-spacing-md)',
        color: 'var(--mantine-color-text)',
        borderRadius: 'var(--mantine-radius-sm)',
      }}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {accountId}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ),
);

export default function UserMenu(props: any) {
  const baseData: any = props.baseData;

  function onClickExit() {
    console.log('exit');
    window.electron.exit();
  }

  return (
    <Menu shadow="md" withArrow={false}>
      <Menu.Target>
        <UserButton
          image={baseData.uicon}
          name={baseData.account_name}
          accountId={baseData.now_user_id}
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          color="red"
          leftSection={<IconLogout style={{ width: 14, height: 14 }} />}
          onClick={onClickExit}
        >
          退出
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
