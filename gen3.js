#!/usr/bin/env node
// Clean world map generator v3 - 62 countries, 150x80 grid
const fs = require('fs');
const COLS = 150, ROWS = 80;

let map = [];
for (let r = 0; r < ROWS; r++) map.push('.'.repeat(COLS).split(''));

let cur = '.'; // current paint character

function rect(r1,c1,r2,c2,ch) {
  if (ch !== undefined) cur = ch;
  for (let r = r1; r <= r2; r++)
    for (let c = Math.max(0,c1); c <= Math.min(COLS-1,c2); c++)
      if (r >= 0 && r < ROWS) map[r][c] = cur;
}

// ===== NORTH AMERICA =====
rect(2,26,12,33,'L'); // Greenland
rect(3,24,11,35);
rect(4,23,10,36);
rect(5,22,9,37);
rect(6,22,8,38);
rect(7,22,8,37);
rect(8,23,9,36);

rect(3,1,5,3,'A'); // Alaska
rect(4,1,6,6);
rect(5,2,7,9);
rect(6,3,8,12);
rect(7,4,9,13);
rect(8,6,9,13);
rect(9,7,10,13);
rect(10,8,10,12);

rect(4,13,8,18,'C'); // Canada
rect(5,12,9,22);
rect(6,12,10,24);
rect(7,13,11,26);
rect(8,14,12,28);
rect(9,14,13,30);
rect(10,15,14,32);
rect(11,16,15,34);
rect(12,17,16,36);
rect(13,18,16,38);
rect(9,35,13,44);
rect(8,34,12,42);
rect(7,32,11,40);
rect(6,30,10,38);
rect(5,28,9,34);
rect(10,36,13,45);
rect(11,37,14,46);
rect(12,38,15,47);
rect(13,38,16,47);
rect(10,20,14,34);
rect(11,20,15,34);
rect(12,20,16,34);

rect(14,13,16,27,'U'); // USA
rect(15,12,17,28);
rect(16,12,18,29);
rect(17,12,19,29);
rect(18,12,20,30);
rect(19,12,21,30);
rect(20,12,22,30);
rect(21,13,23,29);
rect(22,13,24,28);
rect(23,14,25,28);
rect(24,14,26,27);
rect(25,15,27,26);
rect(26,15,28,26);
rect(27,15,28,25);
rect(14,11,15,12);
rect(26,27,27,28);

rect(28,13,30,23,'M'); // Mexico
rect(29,12,31,24);
rect(30,11,32,23);
rect(31,11,33,21);
rect(32,10,34,20);
rect(33,10,35,18);
rect(34,11,36,17);
rect(35,11,37,15);

rect(30,24,30,30,'u'); // Cuba

rect(35,17,37,19,'N'); // Nicaragua
rect(36,16,38,18);
rect(37,16,38,20);

rect(39,18,40,21,'k'); // Costa Rica
rect(40,18,40,19);

rect(40,21,41,23,'q'); // Panama

// ===== SOUTH AMERICA =====
rect(41,16,45,23,'2'); // Colombia
rect(42,16,45,24);
rect(43,16,45,24);
rect(44,16,45,24);

rect(41,24,45,28,'3'); // Venezuela
rect(42,24,45,29);
rect(43,24,45,29);
rect(44,24,45,28);

rect(45,12,46,15,'E'); // Ecuador

rect(47,12,48,18,'4'); // Peru
rect(48,12,49,19);
rect(49,13,50,20);
rect(50,13,51,21);
rect(51,13,52,22);

rect(42,25,44,33,'B'); // Brazil
rect(43,25,44,34);
rect(44,25,45,35);
rect(45,25,46,35);
rect(46,22,47,35);
rect(47,19,48,34);
rect(48,19,49,35);
rect(49,20,50,36);
rect(50,22,51,37);
rect(51,23,52,37);
rect(52,23,53,37);
rect(53,24,54,37);
rect(54,25,55,37);
rect(55,26,56,36);
rect(56,28,57,35);
rect(57,30,58,35);

rect(53,19,55,23,'O'); // Bolivia
rect(54,19,56,24);
rect(55,19,56,25);
rect(56,22,56,27);

rect(57,27,58,30,'P'); // Paraguay

rect(58,30,59,34,'R'); // Uruguay

rect(56,18,57,21,'G'); // Argentina
rect(57,18,58,26);
rect(58,22,59,29);
rect(59,22,60,29);
rect(60,24,61,33);
rect(61,26,62,34);
rect(62,28,63,35);
rect(63,30,64,36);
rect(64,31,65,36);
rect(65,33,66,36);
rect(66,34,67,36);

rect(47,10,48,11,'5'); // Chile
rect(48,10,49,11);
rect(49,11,50,12);
rect(50,12,51,12);
rect(51,12,52,13);
rect(52,13,53,13);
rect(53,14,54,18);
rect(54,15,55,18);
rect(55,17,55,18);
rect(57,19,58,21);
rect(59,21,59,21);
rect(60,22,61,23);
rect(61,24,62,25);
rect(62,26,63,27);
rect(63,28,64,29);
rect(64,30,65,30);
rect(65,31,66,32);
rect(66,33,67,33);

// ===== EUROPE =====
rect(13,53,15,56,'Y'); // Ireland

rect(12,57,17,59,'K'); // UK
rect(13,57,15,61);
rect(16,58,16,60);

rect(3,62,3,63,'n'); // Norway
rect(4,62,4,64);
rect(5,63,5,64);
rect(6,63,6,65);
rect(7,64,7,65);
rect(8,64,8,66);
rect(9,65,9,66);
rect(10,65,10,67);
rect(11,65,11,67);
rect(12,66,12,67);
rect(13,66,13,68);

rect(8,67,8,69,'7'); // Sweden
rect(9,67,9,70);
rect(10,68,10,70);
rect(11,68,11,71);
rect(12,68,12,71);
rect(13,68,13,70);

rect(3,69,3,73,'F'); // Finland
rect(4,70,4,74);
rect(5,71,5,75);
rect(6,71,6,76);
rect(7,72,7,76);
rect(8,72,8,77);
rect(9,72,9,78);
rect(10,73,10,79);
rect(11,73,11,80);

rect(14,67,14,69,'m'); // Denmark

rect(21,59,23,61,'l'); // Portugal

rect(19,62,20,66,'S'); // Spain
rect(20,61,21,68);
rect(21,61,22,68);
rect(22,61,23,68);
rect(23,61,24,68);
rect(24,62,25,68);

rect(14,64,14,66,'h'); // Netherlands

rect(15,66,15,68,'b'); // Belgium

rect(15,62,15,65,'X'); // France
rect(16,63,16,68);
rect(17,64,17,69);
rect(18,65,18,70);
rect(19,66,19,70);
rect(18,70,18,73);
rect(17,71,17,73);
rect(16,70,16,72);

rect(14,70,14,73,'D'); // Germany
rect(15,70,15,74);
rect(16,72,16,76);
rect(17,73,17,76);
rect(18,73,18,76);

rect(19,70,19,73,'v'); // Switzerland

rect(18,74,19,77,'Z'); // Austria

rect(18,68,18,70,'I'); // Italy
rect(19,68,19,71);
rect(20,68,20,72);
rect(21,69,21,73);
rect(22,70,22,74);
rect(23,71,23,74);
rect(24,72,24,75);

rect(17,70,17,72,'c'); // Czech

rect(14,73,14,77,'a'); // Poland
rect(15,75,15,79);
rect(16,76,16,80);

rect(19,78,20,81,'y'); // Hungary

rect(20,82,22,86,'o'); // Romania
rect(21,82,21,86);
rect(22,81,22,85);

rect(20,74,20,77,'r'); // Serbia
rect(21,75,21,78);
rect(22,76,22,80);

rect(22,86,23,89,'z'); // Bulgaria
rect(23,85,23,89);

rect(23,77,23,81,'g'); // Greece
rect(24,77,24,80);
rect(25,77,25,79);

// ===== RUSSIA =====
rect(2,74,2,100,'6');
rect(3,74,3,105);
rect(4,75,4,110);
rect(5,76,5,115);
rect(6,77,6,118);
rect(7,78,7,122);
rect(8,78,8,125);
rect(9,79,9,128);
rect(10,80,10,132);
rect(11,81,11,136);
rect(12,83,12,140);
rect(13,85,13,142);
rect(14,88,14,144);
rect(15,90,15,146);
rect(16,92,16,148);
rect(17,93,17,148);
rect(14,80,14,88);
rect(15,82,15,90);
rect(16,82,16,92);
rect(17,82,17,93);

// ===== TURKEY =====
rect(21,86,24,93,'T');
rect(22,86,23,95);
rect(23,86,24,94);

// ===== SYRIA =====
rect(20,93,20,96,'s');

// ===== IRAQ =====
rect(22,98,24,102,'i');
rect(23,97,23,102);
rect(24,97,24,101);

// ===== IRAN =====
rect(20,103,25,110,'j');
rect(21,103,21,111);
rect(22,102,22,111);
rect(23,102,23,111);
rect(24,101,24,111);
rect(25,100,25,109);

// ===== SAUDI ARABIA =====
rect(25,91,28,98,'Q');
rect(26,91,27,99);
rect(27,91,27,99);
rect(28,93,28,99);

// ===== INDIA =====
rect(23,123,31,130,'V');
rect(24,123,24,131);
rect(25,123,25,131);
rect(26,124,26,131);
rect(27,125,27,130);
rect(28,126,28,130);
rect(29,127,29,130);
rect(30,128,30,130);
rect(31,129,31,130);

// ===== CHINA =====
rect(14,116,17,142,'H');
rect(15,117,15,142);
rect(16,116,16,142);
rect(17,113,17,142);
rect(18,116,18,142);
rect(19,119,19,142);
rect(20,118,20,128);
rect(21,119,21,130);
rect(22,119,22,132);
rect(23,119,23,132);
rect(24,134,24,142);
rect(25,134,25,142);
rect(26,134,26,142);
rect(27,136,27,142);
rect(28,136,28,142);

// ===== MONGOLIA =====
rect(14,143,16,148,'9');

// ===== KOREA =====
rect(18,143,20,144,'d');
rect(19,143,19,145);
rect(20,143,20,146);

// ===== JAPAN =====
rect(16,146,17,147,'J');
rect(17,146,18,148);
rect(18,146,19,148);
rect(19,146,20,149);
rect(20,147,21,149);
rect(21,147,22,149);

// ===== PHILIPPINES =====
rect(24,144,27,145,'p');
rect(25,144,26,146);

// ===== THAILAND =====
rect(28,137,31,140,'t');
rect(29,136,29,140);
rect(30,137,30,140);
rect(31,137,31,139);

// ===== VIETNAM =====
rect(25,140,30,142,'f');
rect(26,140,27,143);
rect(27,140,28,143);
rect(28,141,29,143);
rect(29,141,30,143);
rect(30,142,30,143);

// ===== INDONESIA =====
rect(33,130,37,145,'8');
rect(34,129,36,147);
rect(35,128,35,148);
rect(36,130,36,146);
rect(37,132,37,144);

// ===== AFRICA =====
rect(22,70,25,75,'0'); // Egypt
rect(23,70,24,76);
rect(24,70,25,76);

rect(22,63,28,68,'1'); // Algeria
rect(23,64,28,69);
rect(24,64,28,69);
rect(25,64,28,69);
rect(26,63,28,69);
rect(27,63,28,69);

rect(22,59,25,62,'e'); // Morocco
rect(23,59,24,63);

rect(30,60,34,66,'W'); // Nigeria
rect(31,60,34,66);
rect(32,60,33,66);
rect(33,60,33,66);

rect(29,73,32,80,'w'); // Ethiopia
rect(30,73,31,81);
rect(31,74,31,81);

rect(33,67,38,75,'x'); // DR Congo
rect(34,66,37,76);
rect(35,66,36,77);
rect(36,67,36,76);
rect(37,68,37,75);
rect(38,69,38,74);

// ============================================================
// Country definitions table
// ============================================================
const DEFS = {
  A:['alaska','Alaska','阿拉斯加',2],
  a:['poland','Poland','波兰',3],
  b:['belgium','Belgium','比利时',1],
  B:['brazil','Brazil','巴西',5],
  c:['czech','Czech Republic','捷克',1],
  C:['canada','Canada','加拿大',4],
  D:['germany','Germany','德国',5],
  d:['korea','Korea','韩国',3],
  E:['ecuador','Ecuador','厄瓜多尔',1],
  e:['morocco','Morocco','摩洛哥',1],
  f:['vietnam','Vietnam','越南',2],
  F:['finland','Finland','芬兰',2],
  g:['greece','Greece','希腊',1],
  G:['argentina','Argentina','阿根廷',3],
  H:['china','China','中国',5],
  h:['netherlands','Netherlands','荷兰',1],
  I:['italy','Italy','意大利',4],
  i:['iraq','Iraq','伊拉克',2],
  j:['iran','Iran','伊朗',3],
  J:['japan','Japan','日本',4],
  K:['uk','UK','英国',4],
  k:['costarica','Costa Rica','哥斯达黎加',1],
  l:['portugal','Portugal','葡萄牙',2],
  L:['greenland','Greenland','格陵兰',2],
  m:['denmark','Denmark','丹麦',1],
  M:['mexico','Mexico','墨西哥',3],
  n:['norway','Norway','挪威',2],
  N:['nicaragua','Nicaragua','尼加拉瓜',1],
  O:['bolivia','Bolivia','玻利维亚',2],
  o:['romania','Romania','罗马尼亚',2],
  P:['paraguay','Paraguay','巴拉圭',1],
  p:['philippines','Philippines','菲律宾',1],
  q:['panama','Panama','巴拿马',1],
  Q:['saudiarabia','Saudi Arabia','沙特阿拉伯',4],
  r:['serbia','Serbia','塞尔维亚',1],
  R:['uruguay','Uruguay','乌拉圭',1],
  S:['spain','Spain','西班牙',3],
  s:['syria','Syria','叙利亚',1],
  t:['thailand','Thailand','泰国',2],
  T:['turkey','Turkey','土耳其',3],
  U:['usa','USA','美国',5],
  u:['cuba','Cuba','古巴',1],
  V:['india','India','印度',4],
  v:['switzerland','Switzerland','瑞士',1],
  W:['nigeria','Nigeria','尼日利亚',2],
  w:['ethiopia','Ethiopia','埃塞俄比亚',2],
  X:['france','France','法国',4],
  x:['drcongo','DR Congo','刚果(金)',2],
  Y:['ireland','Ireland','爱尔兰',2],
  y:['hungary','Hungary','匈牙利',1],
  Z:['austria','Austria','奥地利',1],
  z:['bulgaria','Bulgaria','保加利亚',1],
  0:['egypt','Egypt','埃及',3],
  1:['algeria','Algeria','阿尔及利亚',2],
  2:['colombia','Colombia','哥伦比亚',2],
  3:['venezuela','Venezuela','委内瑞拉',2],
  4:['peru','Peru','秘鲁',2],
  5:['chile','Chile','智利',2],
  6:['russia','Russia','俄罗斯',5],
  7:['sweden','Sweden','瑞典',3],
  8:['indonesia','Indonesia','印度尼西亚',2],
  9:['mongolia','Mongolia','蒙古',2],
};

// Verify
let hexCounts = {};
let landTotal = 0;
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    const ch = map[r][c];
    if (ch !== '.') {
      hexCounts[ch] = (hexCounts[ch] || 0) + 1;
      landTotal++;
      if (!DEFS[ch]) console.error(`ERR: r=${r} c=${c} ch='${ch}' undefined!`);
    }
  }

console.log(`Land: ${landTotal}, Countries in map: ${Object.keys(hexCounts).length}, Defined: ${Object.keys(DEFS).length}`);
for (const code of Object.keys(DEFS)) {
  if (!hexCounts[code]) console.warn(`WARN: ${code} (${DEFS[code][1]}) has 0 hexes`);
}

// Generate colors (golden ratio)
function hsvHex(h,s,v) {
  h=((h%1)+1)%1; const i=Math.floor(h*6),f=h*6-i;
  const p=v*(1-s),q=v*(1-f*s),t=v*(1-(1-f)*s);
  let r2,g2,b2;
  switch(i%6){case 0:r2=v;g2=t;b2=p;break;case 1:r2=q;g2=v;b2=p;break;case 2:r2=p;g2=v;b2=t;break;case 3:r2=p;g2=q;b2=v;break;case 4:r2=t;g2=p;b2=v;break;case 5:r2=v;g2=p;b2=q;break;}
  const hx=x=>Math.round(x*255).toString(16).padStart(2,'0');
  return '#'+hx(r2)+hx(g2)+hx(b2);
}
const sortedCodes=Object.keys(DEFS).sort();
const colors={};
sortedCodes.forEach((code,i)=>{
  colors[code]=hsvHex(i*0.618033988749895, 0.55+(i%3)*0.15, 0.65+(i%4)*0.1);
});

// Build output strings
const mapLines = map.map(r => '"'+r.join('')+'"');
const mapDataStr = 'var MAP_DATA = [\n' + mapLines.join(',\n') + '\n];';

const defLines = sortedCodes.map(code => {
  const [id,en,zh,q] = DEFS[code];
  return `  ${code}:{id:'${id}',en:'${en}',zh:'${zh}',q:${q},color:'${colors[code]}'}`;
});
const defsStr = 'var COUNTRY_DEFS = {\n' + defLines.join(',\n') + '\n};';

// Patch index.html
const htmlPath = '/Users/openclaw_timememo/.openclaw/workspace/simon-game-v2/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');
html = html.replace(/var MAP_COLS = \d+;/, `var MAP_COLS = ${COLS};`);
html = html.replace(/var MAP_ROWS = \d+;/, `var MAP_ROWS = ${ROWS};`);
let mdStart = html.indexOf('var MAP_DATA = [');
let mdEnd = html.indexOf('];', mdStart) + 2;
html = html.substring(0, mdStart) + mapDataStr + html.substring(mdEnd);
let cdStart = html.indexOf('var COUNTRY_DEFS = {');
let cdEnd = html.indexOf('};', cdStart) + 2;
html = html.substring(0, cdStart) + defsStr + html.substring(cdEnd);
fs.writeFileSync(htmlPath, html);

// Stats
console.log('\n--- HEX COUNTS ---');
const sorted2 = Object.entries(hexCounts).sort((a,b) => b[1]-a[1]);
for (const [code,count] of sorted2) {
  const info = DEFS[code];
  if (info) console.log(`  ${code}: ${count.toString().padStart(3)} - ${info[1]}`);
}
console.log(`\nDONE: ${landTotal} hexes, ${Object.keys(hexCounts).length} countries`);
