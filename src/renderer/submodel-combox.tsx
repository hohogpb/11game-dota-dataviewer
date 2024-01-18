import { useState } from 'react';
import { Input, InputBase, Combobox, useCombobox } from '@mantine/core';
import { GameType } from '../common/game';

export default function SubmodelCombox(props: any) {
  const games: GameType[] = props.games;

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<GameType | undefined>();

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        const aGame = games.find((e) => `${e.gameType}` == val);
        setValue(aGame);
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
          style={{width: '10em'}}
        >
          {value?.name || <Input.Placeholder>请选择游戏</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {games.map((item) => (
            <Combobox.Option value={`${item.gameType}`} key={item.gameType}>
              {item.name}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
