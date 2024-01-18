import { useState } from 'react';
import { GameSumary, UserType } from '../common/game';
import { DataTable } from 'mantine-datatable';
import { Image, Stack } from '@mantine/core';
import GameDetails from './game-details';

interface GameTableProps {
  games: GameSumary[];
  user: UserType;
  loading?: boolean;
}

export default function GameTable(props: GameTableProps) {
  const { games, user, loading } = props;
  const [expandedRowKeys, setExpandedRowKeys] = useState<any>({});

  return (
    <DataTable
      withTableBorder
      minHeight={150}
      fetching={loading}
      // striped
      //withColumnBorders
      idAccessor="GameId"
      columns={[
        {
          accessor: 'index',
          title: '#',
          textAlign: 'right',
          width: 40,
          render: (record) => games.indexOf(record) + 1,
        },
        {
          title: '英雄',
          accessor: 'HeroName',
          render: ({ HeroName, HeroId }) => (
            <div className="flex gap-4">
              <Image
                h={24}
                w={24}
                src={`https://g.5211game.com/5211/11Score/RecordCenter/img/dota/out_hero_b/${HeroId}.jpg`}
              />
              <span>{HeroName}</span>
            </div>
          ),
        },
        {
          title: '胜负',
          accessor: 'Win',
          render: ({ Win }) => (Win ? '胜' : '负'),
        },
        { title: '评分', accessor: 'PingJi' },
        { title: '开始时间', accessor: 'GameDate' },
        {
          title: '杀死助',
          accessor: 'kda',
          render: ({ Kill, Death, Assist }) => `${Kill}/${Death}/${Assist}`,
        },
      ]}
      records={games}
      rowExpansion={{
        allowMultiple: true,
        content: ({ record }) => <GameDetails user={user} game={record} />,
      }}
    />
  );
}
