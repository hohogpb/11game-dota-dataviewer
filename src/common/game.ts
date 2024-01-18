export interface GameSumary {
  HeroId: string;
  HeroName: string;
  Win: number;
  PingJi: string;
  GameDate: string;
  GameId: string;
  submode: number;
  GameDateTime: string;
  Kill: number;
  Death: number;
  Assist: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  itemId1: string;
  itemId2: string;
  itemId3: string;
  itemId4: string;
  itemId5: string;
  itemId6: string;
  hero_score: number;
  hero_score_add: number;
  tianti_score: number;
  tianti_score_add: number;
}

export interface MatchUser {
  add_level: number;
  add_hero_demage: number;
  add_hero_demage_k: string;
  IsFriend: boolean;
  user_id: number;
  user_name: string;
  hero_id: number;
  hero_name: string;
  hero_id_str: string;
  level: number;
  kill: number;
  death: number;
  help: number;
  gpm: number;
  xpm: number;
  hero_score: number;
  hero_score_add: number;
  tianti_score: number;
  tianti_score_add: number;
  mj_level: number | null;
  mj_score: number | null;
  mj_rating: string;
  mj_score_add: string;
  is_mvp: boolean;
  is_fu: boolean;
  is_po: boolean;
  is_bu: boolean;
  is_zhu: boolean;
  is_jun: boolean;
  is_hun: boolean;
  is_tao: boolean;
  double_kill: number;
  triple_kill: number;
  soldier: number;
  neg_soldier: number;
  hit_tower: number;
  wild_ogre: number;
  money: string;
  teamId: number;
  team_color: null;
  left10: boolean;
  left15: boolean;
  left20: boolean;
  left25: boolean;
  right10: boolean;
  right15: boolean;
  right20: boolean;
  right25: boolean;
  str_left10: string | null;
  str_left15: string | null;
  str_left20: string | null;
  str_left25: string | null;
  str_right10: string | null;
  str_right15: string | null;
  str_right20: string | null;
  str_right25: string | null;
}

export interface MatchTeam {
  team_name: string;
  u_list: MatchUser[];
}

export interface MatchDetail {
  team_list: MatchTeam[];
  errMsg: string | null;
  user_id: number;
  user_name: string;
  show_talent: boolean;
  user_team_text: '近卫失败';
  gt: number;
  game_type: string;
  score_type: string;
  duration_time: string;
  map_name: string;
  game_id: string;
  start_time: string;
  score_1: number;
  score_2: number;
}

export interface GameType {
  id: number;
  gameType: number;
  name: string;
  img: string;
  show_rank: boolean;
  show_rank_hero: boolean;
}

export interface UserType {
  userid: number;
  username: string;
  accountid: number;
}

export interface GameSubmodel {
  parent_id: number;
  gameType: number;
  subModel: number;
  gameName: string;
  sort: number;
  enum_gt: number;
  show_recent_record: boolean;
  show_well_hero: boolean;
  show_honor_record: boolean;
  img: string;
  color: string;
  is_active: boolean;
}
