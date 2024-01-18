import RecentGames from './recent-games';

export default function GameRecordFactoryPage(props: any) {
  const { user, game, subModel } = props;

  // 应该在这里根据输入类型决定转到哪一个页面

  return <RecentGames user={user} game={game} subModel={subModel} />;
}
