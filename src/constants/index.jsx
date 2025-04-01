
export const MAX_WIDTH = '1607px';
export const MAX_VERTICAL_WIDTH = '375px';
export const MAX_VERTICAL_HEIGHT = '667px';
export const OFFSET_X = 50;
export const OFFSET_Y = -182;
// export const ENV = DEVELOP
// export const ENV = PRODUCT
/*
#333F48 是深灰色
#707070 是淺灰色
#84bd00 是主色
*/
export const MAIN_COLOR = '#84bd00';
export const DARKGRAY_COLOR = '#333F48';
export const MEDIUMGRAY_COLOR = '#707070';

export const LIGHTGRAY_COLOR = '#eee';
export const DARKBLACK_COLOR = '#252F3B';
export const LIGHTBLACK_COLOR = '#3B3C3F';
export const ORANGE_COLOR = '#FF7F30';



// 定義背景顏色 
export const BACKGROUND_COLOR = '#f5f5f5';

// 針對MENU 所用的常數
export const KEY_BASIC_1 = 'keybasic1';
export const KEY_BASIC_2 = 'keybasic2';
export const KEY_DATA = 'keydata';
export const KEY_ERROR = 'keyerror';
export const KEY_MANAGE = 'keymanage';
export const KEY_MAINTAIN = 'keymaintain';
export const KEY_SETTINGS = 'keysettings';
export const KEY_CLUB_RANK = 'keyclubrank';
export const KEY_COMPETITION = 'keycompetition';
export const KEY_LOGOUT = 'keylogut';

export const SOCKET_URL = 'https://yctmake.com:12349';   
// 不可以用 https://yctmake.com:12349 加port會連不上, 因為它使用nginx把80 or 443
// 轉成12349了
// 它帶路由wsapi 才能連接
// 如果不用nginx 就要寫 12349
// export const SOCKET_URL = 'http://localhost:443';
export const GRAPHQL_URL = 'http://localhost:12340/api/graphql';


export const NAVIBAR_SIZE  = '57rem'