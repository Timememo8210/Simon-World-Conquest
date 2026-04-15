#!/usr/bin/env node
// Convert hexmap-data.js grid to COUNTRIES array format for the game

const MAP_DATA = [
".....................................................................................................",
".....................................................................................................",
"...........CC..RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR......................................................",
".........CCCCC.RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR......................................................",
"........CCCCCC.RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR......................................................",
".......CCCCCCC..RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR.JJJ................................................",
"......CCCCCCCC..RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR.JJJ...............................................",
".....CCCCCCCCC..RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR.JJJ...............................................",
".....CCCCCCCCC..RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR....................................................",
"......CCCCCCCCC.RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR...................................................",
"......CCCCCCCC...RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR...................................................",
".......CCCCCCC...RRRRRRRRRRRRRRRRRHHHHHHHHHHHHHHHH..................................................",
"........CCCCCC...EERRRRRRRRRRRRRRRRRHHHHHHHHHHHHHHH..................................................",
"........CCCCCC...EEEGGPPPRRRRRRRRRRHHHHHHHHHHHHHHHH.................................................",
".........CCCCC....EEFFFGGPPPRRRRRRRRRHHHHHHHHHHHHHHHH................................................",
"..........CCCC...EEFFSSSGGPPRRRRRRRRRRHHHHHHHHHHHHHHH...............................................",
"...........CCC...EE.FSSSIIIP.RRRRRRRRRRHHHHHHHHHHHHHHH..............................................",
"............CC....DDSSSS..ITTTRRRRRRRRRR.HHHHHHHHHHHHHH..............................................",
".............C....DDDDSSS..ITTTRRRRRRRRRRHHHHHHHHHHHHH..............................................",
"..............C....DDDDDDDD....RRRRRRRRRRRHHHHHHHHHHH...............................................",
"..............C....DDDDDDD.....RRRRRRRRR.HHHHHHHHHHHH...............................................",
"...............C...DDDDDDDD.....RRRRRRRR.HHHHHHHH...................................................",
"................C..DDDDDDDD......RRRRRRR.HHHHHH....................................................",
".................L..DDDNNNNDD.............HHHHH....................................................",
".................LL.DDNNNNNNDD..........HHHHH....................................................",
"................LLL.DNNNNNNNNDD......WWWWWWWWWW....................................................",
".................LLL..NNNOOOODD....WWWWWWWWWWWWWW..................................................",
"..................LLL..NNNOOOO....WWWWWWWWWWWWWWWW.................................................",
"..................LLL..NNNNNOOO.....WWWWWWWWWWWWWWWW................................................",
"..................ZLL...NNNOOO.......WWWWWWWWWWWWWWWW...............................................",
".................ZZLL....NNNO.........WWWWWWWWWWWWWW...............................................",
"................ZZZL.....NNN..........WWWWWWWWWWWW................................................",
"...............ZZZZL.....NNN...........WWWWWWWWWW..................................................",
"..............ZZZZL......NNN............WWWWWWWW..................................................",
".............B.BBZL.......N..............WWWWWW..................................................",
"............BBB.BZL........................WWWW..................................................",
"...........BBBB..ZL........................WWWW..................................................",
"..........BBBBB.LL........................XXXX..................................................",
".........BBBBBB.LLL........................XXXX.................................................",
"........BBBBBBB.LLL........................XXXX.................................................",
".......BBBBBBBB.LLL.........................XXX..................................................",
"......AAAAAAAA..LL..........................XXX..................................................",
".....AAAAAAAAA...L............................XX.................................................",
"......AAAAAAAA..........................................................X..........................",
"..............A........................................................XX.........................",
];

const COUNTRY_DEFS = {
  'R': {id:'russia',en:'Russia',zh:'俄罗斯',q:5,c:'#5C6BC0'},
  'C': {id:'canada',en:'Canada',zh:'加拿大',q:4,c:'#42A5F5'},
  'U': {id:'usa',en:'USA',zh:'美国',q:5,c:'#66BB6A'},
  'M': {id:'mexico',en:'Mexico',zh:'墨西哥',q:3,c:'#FFA726'},
  'B': {id:'brazil',en:'Brazil',zh:'巴西',q:4,c:'#26A69A'},
  'A': {id:'argentina',en:'Argentina',zh:'阿根廷',q:3,c:'#EF5350'},
  'L': {id:'colombia',en:'Colombia',zh:'哥伦比亚',q:3,c:'#AB47BC'},
  'K': {id:'uk',en:'UK',zh:'英国',q:4,c:'#1565C0'},
  'F': {id:'france',en:'France',zh:'法国',q:4,c:'#2196F3'},
  'G': {id:'germany',en:'Germany',zh:'德国',q:5,c:'#FDD835'},
  'S': {id:'spain',en:'Spain',zh:'西班牙',q:3,c:'#FF7043'},
  'I': {id:'italy',en:'Italy',zh:'意大利',q:4,c:'#7E57C2'},
  'P': {id:'poland',en:'Poland',zh:'波兰',q:3,c:'#EC407A'},
  'E': {id:'egypt',en:'Egypt',zh:'埃及',q:3,c:'#FFB300'},
  'T': {id:'turkey',en:'Turkey',zh:'土耳其',q:3,c:'#8D6E63'},
  'D': {id:'saudi',en:'Saudi Arabia',zh:'沙特阿拉伯',q:4,c:'#78909C'},
  'N': {id:'nigeria',en:'Nigeria',zh:'尼日利亚',q:2,c:'#43A047'},
  'O': {id:'drcongo',en:'DR Congo',zh:'刚果(金)',q:2,c:'#5D4037'},
  'Z': {id:'southafrica',en:'South Africa',zh:'南非',q:3,c:'#00897B'},
  'Q': {id:'algeria',en:'Algeria',zh:'阿尔及利亚',q:3,c:'#3F51B5'},
  'H': {id:'china',en:'China',zh:'中国',q:5,c:'#E53935'},
  'J': {id:'japan',en:'Japan',zh:'日本',q:4,c:'#F06292'},
  'W': {id:'australia',en:'Australia',zh:'澳大利亚',q:4,c:'#FF8A65'},
  'X': {id:'indonesia',en:'Indonesia',zh:'印度尼西亚',q:2,c:'#26C6DA'},
};

// Convert row,col to offset hex coordinates (odd-r offset)
// The game uses axial coordinates (q,r)
function offsetToAxial(col, row) {
  // odd-r offset to axial
  const q = col - (row - (row & 1)) / 2;
  const r = row;
  return { q, r };
}

// Group hexes by country
const countries = {};
for (let row = 0; row < MAP_DATA.length; row++) {
  for (let col = 0; col < MAP_DATA[row].length; col++) {
    const ch = MAP_DATA[row][col];
    if (ch === '.') continue;
    if (!COUNTRY_DEFS[ch]) continue;
    if (!countries[ch]) countries[ch] = [];
    const ax = offsetToAxial(col, row);
    countries[ch].push(ax);
  }
}

// Generate COUNTRIES array
const lines = ['const COUNTRIES=['];
for (const [code, hexes] of Object.entries(countries)) {
  const def = COUNTRY_DEFS[code];
  const hexStr = hexes.map(h => `{q:${h.q},r:${h.r},qi:${def.q}}`).join(',');
  lines.push(`{n:'${def.en}',nc:'${def.zh}',h:[${hexStr}],c:'${def.c}'},  // ${hexes.length} hexes`);
}
lines.push('];');

const output = lines.join('\n');

// Count total
let total = 0;
for (const hexes of Object.values(countries)) total += hexes.length;

console.error(`Total hexes: ${total}`);
console.error(`Countries: ${Object.keys(countries).length}`);
for (const [code, hexes] of Object.entries(countries)) {
  console.error(`  ${code} (${COUNTRY_DEFS[code].en}): ${hexes.length} hexes`);
}
console.log(output);
