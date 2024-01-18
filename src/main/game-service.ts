import jsdom from 'jsdom';
import setCookie from 'set-cookie-parser';
import store from './store';

export async function getAllSubModels(pid: number) {
  const { passportCookie }: any = store.get('loginInfo');

  const url = new URL(
    'https://record.5211game.com/NRecord/Data/GetAllSubModels',
  );
  url.search = new URLSearchParams({
    pid: `${pid}`,
  }).toString();

  const resp = await fetch(url, {
    headers: {
      cookie: `${passportCookie.name}=${encodeURIComponent(passportCookie.value)}`,
      accept: 'application/json, text/plain, */*',
      Referer: 'https://record.5211game.com/NWeb/',
      'User-Agent': 'WinHttpClient',
    },
    method: 'GET',
  });

  const ret = await resp.json();
  console.log('get all sub models:', ret);
  return ret;
}

export async function getBaseData() {
  const { passportCookie }: any = store.get('loginInfo');

  const url = new URL('https://record.5211game.com/NRecord/Data/GetBaseData');
  url.search = new URLSearchParams({
    // u: 'undefined',
    // pid: 'undefined'
  }).toString();

  const resp = await fetch(url, {
    headers: {
      cookie: `${passportCookie.name}=${encodeURIComponent(passportCookie.value)}`,
      accept: 'application/json, text/plain, */*',
      Referer: 'https://record.5211game.com/NWeb/',
      'User-Agent': 'WinHttpClient',
    },
    method: 'GET',
  });

  const ret = await resp.json();
  console.log('getBaseData:', ret);
  return ret;
}

export async function getGameScore(userId: string) {
  const { passportCookie }: any = store.get('loginInfo');

  const url = new URL('https://record.5211game.com/NRecord/Data/GetGameScore');
  url.search = new URLSearchParams({
    pid: '1',
    u: userId,
  }).toString();

  const resp = await fetch(url, {
    headers: {
      cookie: `${passportCookie.name}=${encodeURIComponent(passportCookie.value)}`,
      accept: 'application/json, text/plain, */*',
      Referer: 'https://record.5211game.com/NWeb/',
      'User-Agent': 'WinHttpClient',
    },
    method: 'GET',
  });

  const ret = await resp.json();
  console.log('getGameScore:', ret);
  return ret;
}

export async function getWellHeros(
  gameType: number,
  enum_gt: number,
  subModel: number,
  userId: string,
) {
  const { passportCookie }: any = store.get('loginInfo');

  const url = new URL('https://record.5211game.com/NRecord/Data/GetWellHeros');
  url.search = new URLSearchParams({
    gt: `${gameType}`,
    e_gt: `${enum_gt}`,
    sm: `${subModel}`,
    u: userId,
    hero_type: '',
  }).toString();

  const resp = await fetch(url, {
    headers: {
      cookie: `${passportCookie.name}=${encodeURIComponent(passportCookie.value)}`,
      accept: 'application/json, text/plain, */*',
      Referer: 'https://record.5211game.com/NWeb/',
      'User-Agent': 'WinHttpClient',
    },
    method: 'GET',
  });

  const ret = await resp.json();
  console.log('get well heros:', ret);
  return ret;
}

export async function getRecentGameDetail(
  gameType: number,
  subModel: number,
  userId: number,
) {
  const url = new URL(
    'https://record.5211game.com/NRecord/Data/GetRecentGameDetail',
  );
  url.search = new URLSearchParams({
    gt: `${gameType}`,
    sm: `${subModel}`,
    u: `${userId}`,
  }).toString();

  const loginInfo: any = store.get('loginInfo');

  const { passportCookie } = loginInfo;
  const cookie = [
    `${passportCookie.name}=${encodeURIComponent(passportCookie.value)}`,
  ].join('; ');

  const resp = await fetch(url, {
    headers: {
      cookie,
      accept: 'application/json, text/plain, */*',
      Referer: 'https://record.5211game.com/NWeb/',
      'User-Agent': 'WinHttpClient',
    },
    method: 'GET',
  });

  const ret = await resp.json();
  console.log('getRecentGameDetail:', ret);
  return ret;
}

export async function getMatchViewDetail(gameid: string, userid: string) {
  const url = new URL(
    'http://record.5211game.com/Web/RecordRequest/GetMatchViewDetail',
  );
  url.search = new URLSearchParams({
    gt: '10001',
    gameid,
    userid,
  }).toString();

  let loginInfo: any = store.get('loginInfo');
  if (!loginInfo.aspNetSessionId) {
    const { passportCookie } = loginInfo;

    const resp = await fetch(url, {
      headers: {
        accept: 'application/json, text/plain, */*',
        cookie: `${passportCookie.name}=${passportCookie.value}`,
        Referer: 'https://record.5211game.com/NWeb/',
        'User-Agent': 'WinHttpClient',
      },
      method: 'GET',
      redirect: 'manual',
    });

    const newAspNetSessionId = parseCookieItem(
      resp,
      (item) => item.name == 'ASP.NET_SessionId',
    );

    const tgw_l7_route = parseCookieItem(
      resp,
      (item) => item.name == 'tgw_l7_route',
    );

    store.set('loginInfo.aspNetSessionId', newAspNetSessionId);
    store.set('loginInfo.tgw_l7_route', tgw_l7_route);
    console.log('set session id', newAspNetSessionId);
  }

  loginInfo = store.get('loginInfo');
  const { aspNetSessionId, tgw_l7_route } = loginInfo;

  // 这里不能给提供 passwportcookie不然会错误
  const cookie = [
    `${aspNetSessionId.name}=${encodeURIComponent(aspNetSessionId.value)}`,
    `${tgw_l7_route.name}=${encodeURIComponent(tgw_l7_route.value)}`,
  ].join('; ');

  const resp = await fetch(url, {
    headers: {
      accept: 'application/json, text/plain, */*',
      cookie,
      Referer: 'https://record.5211game.com/NWeb/',
      'User-Agent': 'WinHttpClient',
    },
    method: 'GET',
  });
  const ret = await resp.text();

  const dom = new jsdom.JSDOM(ret, { runScripts: 'dangerously' });
  return dom.window.objData;
}

function parseCookieItem(
  resp: Response,
  pred: (cookie: setCookie.Cookie) => boolean,
) {
  const combinedCookieHeader = resp.headers.get('Set-Cookie');
  if (!combinedCookieHeader) return undefined;

  const splitCookieHeaders = setCookie.splitCookiesString(combinedCookieHeader);
  const cookies = setCookie.parse(splitCookieHeaders, {
    decodeValues: true,
  });

  // 取得 token 对应的cookie
  const aCookie = cookies.find((e) => pred(e));
  return aCookie;
}

interface olpassportResp {
  code: number;
  msg: string;
  data?: {
    st: string;
    userId: number;
    userName: string;
  };
}

export async function olpassportLogin(username: string, password: string) {
  const body = new URLSearchParams({
    user: username,
    password,
    code: '',
    srvid: '0',
    alive: 'false',
  });

  const resp = await fetch('https://olpassport.5211game.com/Login/Login', {
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'x-requested-with': 'XMLHttpRequest',
      'User-Agent': 'WinHttpClient',
      Referer: 'https://olpassport.5211game.com/Login',
    },
    body,
    method: 'POST',
  });

  const yyAuth = parseCookieItem(resp, (item) => item.name == 'yy_auth');
  const loginRet: olpassportResp = await resp.json();
  return { yyAuth, loginRet };
}

export async function NRecordLogin(yy_auth: string, st: string) {
  const url = new URL('https://record.5211game.com/NRecord/Login/Index');
  url.search = new URLSearchParams({
    returnUrl: `http://record.5211game.com/NWeb/?st=${st}#/`,
    st,
  }).toString();

  const resp = await fetch(url, {
    redirect: 'manual',
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'User-Agent': 'WinHttpClient',
      cookie: `yy_auth=${yy_auth}`,
      Referer: 'http://record.5211game.com/',
    },
    method: 'GET',
  });

  const passportCookie = parseCookieItem(resp, (item) =>
    item.name.startsWith('PassportCookie'),
  );

  return passportCookie;
}

async function webLogin(passportCookie: setCookie.Cookie) {}

export async function login(payload: any) {
  const { username, password, remeberMe } = payload;

  const { yyAuth, loginRet } = await olpassportLogin(username, password);
  if (!yyAuth || !loginRet.data) throw new Error(loginRet.msg);

  const passportCookie = await NRecordLogin(yyAuth.value, loginRet.data.st);

  const loginInfo = {
    username,
    password,
    remeberMe,
    yyAuth,
    loginRet,
    passportCookie,
    'ASP.NET_SessionId': null,
  };

  store.set('loginInfo', loginInfo);
  return loginInfo;
}

export function getLoginInfo() {
  const loginInfo = store.get('loginInfo');
  return loginInfo;
}

export async function saveLastScene(lastScene: any) {
  store.set('lastScene', lastScene);
}
