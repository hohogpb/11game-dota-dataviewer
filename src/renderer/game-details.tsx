import { useEffect, useState } from 'react';
import { GameSumary, MatchDetail, UserType } from '../common/game';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
} from '@nextui-org/react';

interface GameDetailsProps {
  game: GameSumary;
  user: UserType;
}

export default function GameDetails(props: GameDetailsProps) {
  const { game, user } = props;
  const [matchDetail, setMatchDetail] = useState<MatchDetail>();

  async function fetchData() {
    const ret = await window.electron.invoke(
      'getMatchViewDetail',
      game.GameId,
      user.userid,
    );
    console.log('view detail', ret);

    setMatchDetail(ret);
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <Table
      removeWrapper
      //className="dark text-foreground bg-background"
      selectionMode="single"
      isCompact
    >
      <TableHeader>
        <TableColumn>玩家</TableColumn>
        <TableColumn>英雄</TableColumn>
        <TableColumn>等级</TableColumn>
        <TableColumn>杀/死/助</TableColumn>
        <TableColumn>KDA</TableColumn>
        <TableColumn>英雄积分</TableColumn>
        <TableColumn>天梯积分</TableColumn>
        <TableColumn>称号 </TableColumn>
        <TableColumn>双杀/三杀</TableColumn>
        <TableColumn>正/反补</TableColumn>
        <TableColumn>推塔</TableColumn>
        <TableColumn>野怪</TableColumn>
        <TableColumn>英雄伤害</TableColumn>
        <TableColumn>金钱</TableColumn>
        <TableColumn>金钱/分</TableColumn>
        <TableColumn>经验/分</TableColumn>
      </TableHeader>
      <TableBody>
        {matchDetail?.team_list.map((team) =>
          team.u_list.map((e, idx: number) => (
            <TableRow key={`${team.team_name}-${idx}`}>
              <TableCell>{e.user_name}</TableCell>
              <TableCell>
                <Avatar
                  radius="none"
                  size="sm"
                  src={`https://g.5211game.com/5211/11Score/RecordCenter/img/dota/hero/${e.hero_id_str}.jpg`}
                />
              </TableCell>
              <TableCell>{e.add_level}</TableCell>
              <TableCell>
                {e.kill}/{e.death}/{e.help}
              </TableCell>
              <TableCell>
                {Math.round(
                  ((e.kill + e.help) / (e.death == 0 ? 1 : e.death)) * 10,
                ) / 10}
              </TableCell>
              <TableCell>
                {e.hero_score}({e.hero_score_add})
              </TableCell>
              <TableCell>
                {e.tianti_score}({e.tianti_score_add})
              </TableCell>
              <TableCell>
                {e.is_mvp && 'MVP'}
                {e.is_fu && '富'}
                {e.is_po && '破'}
                {e.is_bu && '补'}
                {e.is_zhu && '助'}
                {e.is_jun && '军'}
                {e.is_hun && '魂'}
              </TableCell>
              <TableCell>
                {e.double_kill}/{e.triple_kill}
              </TableCell>
              <TableCell>
                {e.soldier}/{e.neg_soldier}
              </TableCell>
              <TableCell>{e.hit_tower}</TableCell>
              <TableCell>{e.wild_ogre}</TableCell>
              <TableCell>{e.add_hero_demage}</TableCell>
              <TableCell>{e.money}</TableCell>
              <TableCell>{e.gpm}</TableCell>
              <TableCell>{e.xpm}</TableCell>
            </TableRow>
          )),
        )}
      </TableBody>
    </Table>
  );
}
