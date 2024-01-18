import { useState } from 'react';
import {
  Input,
  InputBase,
  Combobox,
  useCombobox,
  Image,
  Group,
} from '@mantine/core';
import { GameType } from '../common/game';

function SelectedItem(props: any) {
  const game: GameType = props.game;

  return (
    <Group gap={10}>
      <Image w={16} src={game.img} />
      {game.name}
    </Group>
  );
}

export default function GameCombox(props: any) {
  const games: GameType[] = props.games;
  const game: GameType = props.game;

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<GameType | undefined>(game);

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        const aGame = games.find((e) => `${e.gameType}` == val);
        setValue(aGame);
        props.onChange?.(aGame);
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
          {value ? (
            <SelectedItem game={value} />
          ) : (
            <Input.Placeholder>请选择游戏</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {games.map((item) => (
            <Combobox.Option value={`${item.gameType}`} key={item.gameType}>
              <SelectedItem game={item} />
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
