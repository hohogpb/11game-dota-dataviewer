import { useState } from 'react';
import { Input, InputBase, Combobox, useCombobox } from '@mantine/core';
import { UserType } from '../common/game';

export default function UserCombox(props: any) {
  const users: UserType[] = props.users;
  const user: UserType = props.user;

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<UserType | undefined>(user);

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        const aUser = users.find((e) => `${e.userid}` == val);
        setValue(aUser);
        props.onChange?.(aUser);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
          style={{ width: '10em' }}
        >
          {value?.username || (
            <Input.Placeholder>请选择子账号</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {users.map((item) => (
            <Combobox.Option value={`${item.userid}`} key={item.userid}>
              {item.username}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
