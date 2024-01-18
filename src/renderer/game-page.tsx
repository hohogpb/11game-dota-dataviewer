import { useEffect, useState } from 'react';
import { GameSubmodel, GameType, UserType } from '../common/game';
import { SegmentedControl, Tabs, Space } from '@mantine/core';
import GameRecordFactoryPage from './game-record-factory-page';

interface GamePageProps {
  user: UserType;
  game: GameType;
}

export default function GamePage(props: GamePageProps) {
  const { user, game } = props;
  const [subModels, setSubModels] = useState<GameSubmodel[]>();
  const [currSubModel, setCurrSubModel] = useState<GameSubmodel>(() => {
    return window.electron.storeGet('lastScene.subModel');
  });

  async function fetchData() {
    const ret2 = await window.electron.invoke('getAllSubModels', game.id);
    setSubModels(ret2.data);
    console.log('oooxxx:', ret2.data);
  }

  useEffect(() => {
    fetchData();
  }, [user, game]);

  async function onChangeTab(value: any) {
    const aModel = subModels?.find((e) => e.gameName == value);
    if (!aModel) return;

    setCurrSubModel(aModel);

    window.electron.storeSet('lastScene', {
      user,
      game,
      subModel: aModel,
    });
  }

  if (!subModels) return null;

  return (
    <>
      <Tabs defaultValue={currSubModel?.gameName} onChange={onChangeTab}>
        <Tabs.List>
          {subModels.map((e) => (
            <Tabs.Tab key={e.gameName} value={e.gameName}>
              {e.gameName}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>

      <Space h="md" />

      {currSubModel ? (
        <GameRecordFactoryPage
          user={user}
          game={game}
          subModel={currSubModel}
        />
      ) : null}
    </>
  );
}


