import { useEffect, useState } from 'react';
import { GameSubmodel, GameSumary, GameType, UserType } from '../common/game';
import GameTable from './game-table';

interface RecentGamesProps {
  user: UserType;
  game: GameType;
  subModel: GameSubmodel;
}

export default function RecentGames(props: RecentGamesProps) {
  const { user, game, subModel } = props;

  const [games, setGames] = useState<GameSumary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData() {
    setLoading(true);

    const ret = await window.electron.invoke(
      'getRecentGameDetail',
      subModel.gameType,
      subModel.subModel,
      user.userid,
    );
    setGames(ret.data);

    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [user, subModel]);

  return <GameTable games={games} user={user} loading={loading} />;
}
