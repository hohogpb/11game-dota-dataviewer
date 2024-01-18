import { useEffect, useState } from 'react';
import UserCombox from './user-combox';
import GameCombox from './game-combox';
import UserMenu from './user-menu';
import HeaderLogo from './header-logo';
import { Container, Group } from '@mantine/core';
import styles from './home.module.css';
import { GameType, UserType } from '../common/game';
import GamePage from './game-page';

export default function Home() {
  const [baseData, setBaseData] = useState<any>();
  const [currUser, setCurrUser] = useState<UserType>(() => {
    return window.electron.storeGet('lastScene.user');
  });
  const [currGame, setCurrGame] = useState<GameType>(() => {
    return window.electron.storeGet('lastScene.game');
  });

  async function fetchData() {
    const ret = await window.electron.invoke('getBaseData');
    setBaseData(ret.data);
    console.log('baseData:', ret.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function onChangeUser(user: any) {
    setCurrUser(user);
    console.log('chang ueer', user);
  }

  function onChangeGame(game: any) {
    setCurrGame(game);
    console.log('chang game', game);
  }

  if (!baseData) return null;

  return (
    <div>
      <header className={styles.header}>
        <Container size="md">
          <div className={styles.inner}>
            <HeaderLogo />

            <Group gap={15}>
              <UserCombox
                users={baseData?.user_account}
                user={currUser}
                onChange={onChangeUser}
              />
              <GameCombox
                games={baseData?.all_games}
                game={currGame}
                onChange={onChangeGame}
              />
              <UserMenu baseData={baseData} />
            </Group>
          </div>
        </Container>
      </header>

      <Container size="xl">
        {currUser && currGame ? (
          <GamePage user={currUser} game={currGame} />
        ) : (
          '还未选中游戏或用户'
        )}
      </Container>
    </div>
  );
}
