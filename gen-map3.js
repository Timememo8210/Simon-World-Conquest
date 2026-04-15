#!/usr/bin/env node
// gen-map3.js - Realistic world map for Hex War (v3)
// 100x55 hex grid - NO overlaps, correct water gaps, accurate sizes
const COLS = 100, ROWS = 55;
const grid = [];
for (let r = 0; r < ROWS; r++) grid[r] = new Array(COLS).fill('.');

let overlapCount = 0;
function fill(r, c1, c2, code) {
  if (r < 0 || r >= ROWS) return 0;
  let cnt = 0;
  for (let c = Math.max(0, c1); c <= Math.min(COLS - 1, c2); c++) {
    if (grid[r][c] !== '.') {
      console.error(`OVERLAP row${r} col${c}: '${grid[r][c]}' -> '${code}'`);
      overlapCount++;
    }
    grid[r][c] = code;
    cnt++;
  }
  return cnt;
}

// ═══════════ RUSSIA ═══════════
// Northern Eurasia. Rows 4-14, cols 61-77.
// Must NOT overlap: Ukraine (R13-15 C57-61), Mongolia (R15-17 C71-74)
fill(4, 64,72,'R');   // 9
fill(5, 62,73,'R');   // 12
fill(6, 61,75,'R');   // 15
fill(7, 60,77,'R');   // 18
fill(8, 60,77,'R');   // 18
fill(9, 60,77,'R');   // 18
fill(10,61,77,'R');   // 17
fill(11,62,76,'R');   // 15
fill(12,63,74,'R');   // 12
fill(13,64,73,'R');   // 10
fill(14,65,70,'R');   // 6
// Total: 9+12+15+18+18+18+17+15+12+10+6 = 150

// ═══════════ CANADA ═══════════
fill(4, 6,11,'C');    // 6
fill(5, 5,12,'C');    // 8
fill(6, 4,14,'C');    // 11
fill(7, 4,15,'C');    // 12
fill(8, 4,17,'C');    // 14
fill(9, 4,18,'C');    // 15
fill(10,4,18,'C');    // 15
fill(11,5,17,'C');    // 13
fill(12,6,16,'C');    // 11
fill(13,7,15,'C');    // 9
// Total: 6+8+11+12+14+15+15+13+11+9 = 114

// ═══════════ USA ═══════════
fill(14,14,22,'U');   // 9
fill(15,12,24,'U');   // 13
fill(16,11,25,'U');   // 15
fill(17,11,24,'U');   // 14
fill(18,12,23,'U');   // 12
fill(19,14,21,'U');   // 8
// Total: 9+13+15+14+12+8 = 71

// ═══════════ MEXICO ═══════════
fill(20,15,20,'M');   // 6
fill(21,14,19,'M');   // 6
fill(22,15,18,'M');   // 4
// Total: 16

// ═══════════ GUATEMALA ═══════════
fill(23,16,17,'1');   // 2
fill(24,16,17,'1');   // 2
// Total: 4

// ═══════════ COLOMBIA ═══════════
fill(25,16,20,'2');   // 5
fill(26,16,21,'2');   // 6
fill(27,17,21,'2');   // 5
// Total: 16

// ═══════════ VENEZUELA ═══════════
fill(25,22,25,'3');   // 4
fill(26,23,26,'3');   // 4
// Total: 8

// ═══════════ BRAZIL ═══════════
// Eastern South America. Cols 20-33 (narrower than before)
fill(28,24,32,'B');   // 9
fill(29,24,33,'B');   // 10
fill(30,23,33,'B');   // 11
fill(31,23,32,'B');   // 10
fill(32,23,31,'B');   // 9
fill(33,23,30,'B');   // 8
fill(34,24,29,'B');   // 6
// Total: 9+10+11+10+9+8+6 = 63

// ═══════════ PERU ═══════════
fill(28,13,16,'4');   // 4
fill(29,13,16,'4');   // 4
fill(30,13,15,'4');   // 3
// Total: 11 → trim to 10
fill(30,15,15,'.');
// Now: 4+4+2 = 10

// ═══════════ CHILE ═══════════
// Thin strip, west of Argentina
fill(32,13,16,'5');   // 4
fill(33,13,16,'5');   // 4
fill(34,13,15,'5');   // 3
// Total: 11

// ═══════════ ARGENTINA ═══════════
// South of Brazil, rows 36-44
fill(36,17,27,'A');   // 11
fill(37,18,27,'A');   // 10
fill(38,19,27,'A');   // 9
fill(39,20,27,'A');   // 8
fill(40,21,26,'A');   // 6
fill(41,22,25,'A');   // 4
fill(42,23,24,'A');   // 2
// Total: 50

// ═══════════ EUROPE ═══════════

// IRELAND (3-5)
fill(9, 39,40,'Y');   // 2
fill(10,39,40,'Y');   // 2
// Total: 4

// UK (4-6) - island, water gap at row 12-13 from France
fill(9, 42,43,'K');   // 2
fill(10,42,43,'K');   // 2
fill(11,42,43,'K');   // 2
// Total: 6

// SWEDEN (8-12)
fill(8, 46,48,'7');   // 3
fill(9, 46,48,'7');   // 3
fill(10,46,48,'7');   // 3
// Total: 9

// GERMANY (8-12)
fill(11,49,52,'G');   // 4
fill(12,49,52,'G');   // 4
fill(13,49,51,'G');   // 3
// Total: 11

// POLAND (8-12)
fill(11,53,56,'P');   // 4
fill(12,53,56,'P');   // 4
fill(13,53,55,'P');   // 3
// Total: 11

// FRANCE (8-12) - below UK (rows 9-11), gap rows 12-13
fill(14,43,46,'F');   // 4
fill(15,43,46,'F');   // 4
fill(16,43,46,'F');   // 4
// Total: 12

// SPAIN (8-12) - Iberian peninsula, rows 17-18 (above Algeria at R19+)
fill(17,38,42,'S');   // 5
fill(18,38,42,'S');   // 5
// Total: 10

// ITALY (8-12) - boot peninsula, rows 14-18
fill(14,50,52,'I');   // 3
fill(15,49,51,'I');   // 3
fill(16,49,50,'I');   // 2
fill(17,49,50,'I');   // 2
fill(18,50,50,'I');   // 1
// Total: 11

// ROMANIA (5-8)
fill(14,53,55,'8');   // 3
fill(15,53,55,'8');   // 3
// Total: 6

// UKRAINE (10-15) - rows 13-15, cols 57-61
fill(13,57,61,'6');   // 5
fill(14,57,61,'6');   // 5
fill(15,57,61,'6');   // 5
// Total: 15

// TURKEY (8-12) - rows 16-17
fill(16,57,62,'T');   // 6
fill(17,57,62,'T');   // 6
// Total: 12

// ═══════════ MIDDLE EAST ═══════════

// IRAQ (6-10) - rows 18-19
fill(18,58,62,'c');   // 5
fill(19,59,62,'c');   // 4
// Total: 9

// IRAN (15-25) - rows 18-22
fill(18,63,67,'b');   // 5
fill(19,63,67,'b');   // 5
fill(20,63,67,'b');   // 5
fill(21,63,66,'b');   // 4
fill(22,63,66,'b');   // 4
// Total: 23

// SAUDI ARABIA (20-30) - rows 20-24, cols 57-61
fill(20,57,61,'Q');   // 5
fill(21,57,61,'Q');   // 5
fill(22,57,61,'Q');   // 5
fill(23,57,60,'Q');   // 4
fill(24,57,59,'Q');   // 3
// Total: 22

// ═══════════ AFRICA ═══════════
// North Africa starts at row 19 (below Spain rows 17-18)

// ALGERIA (25-35) - rows 19-22
fill(19,39,46,'D');   // 8
fill(20,39,46,'D');   // 8
fill(21,39,45,'D');   // 7
fill(22,39,44,'D');   // 6
// Total: 29

// LIBYA (10-15) - rows 19-21
fill(19,47,52,'9');   // 6
fill(20,47,52,'9');   // 6
fill(21,47,52,'9');   // 6
// Total: 18 → trim
fill(19,51,52,'.');   // -2
fill(20,51,52,'.');   // -2
// Now: 4+4+6 = 14

// EGYPT (10-15) - rows 19-21
fill(19,53,56,'E');   // 4
fill(20,53,56,'E');   // 4
fill(21,53,56,'E');   // 4
// Total: 12

// NIGERIA (20-30) - rows 23-26
fill(23,40,45,'N');   // 6
fill(24,40,45,'N');   // 6
fill(25,40,44,'N');   // 5
fill(26,40,43,'N');   // 4
// Total: 21

// ETHIOPIA (8-12) - rows 23-25
fill(23,50,53,'0');   // 4
fill(24,50,53,'0');   // 4
fill(25,50,52,'0');   // 3
// Total: 11

// DR CONGO (15-25) - rows 27-30
fill(27,43,49,'O');   // 7
fill(28,43,48,'O');   // 6
fill(29,43,48,'O');   // 6
fill(30,43,47,'O');   // 5
// Total: 24

// KENYA (6-10) - rows 27-29
fill(27,50,53,'a');   // 4
fill(28,50,52,'a');   // 3
fill(29,50,51,'a');   // 2
// Total: 9

// SOUTH AFRICA (20-30) - rows 33-36
fill(33,44,52,'Z');   // 9
fill(34,44,51,'Z');   // 8
fill(35,45,50,'Z');   // 6
fill(36,46,49,'Z');   // 4
// Total: 27

// ═══════════ ASIA ═══════════

// MONGOLIA (10-15) - rows 15-17
fill(15,71,74,'g');   // 4
fill(16,71,74,'g');   // 4
fill(17,71,73,'g');   // 3
// Total: 11

// CHINA (70-90) - rows 18-23
fill(18,68,80,'H');   // 13
fill(19,68,80,'H');   // 13
fill(20,68,80,'H');   // 13
fill(21,68,80,'H');   // 13
fill(22,68,79,'H');   // 12
fill(23,70,76,'H');   // 7
// Total: 71

// INDIA (30-45) - rows 23-29
// Must not overlap China R23 C70-76. India R23 C67-69 (3 hexes, no overlap)
fill(23,67,69,'V');   // 3
fill(24,67,75,'V');   // 9
fill(25,67,75,'V');   // 9
fill(26,68,74,'V');   // 7
fill(27,69,73,'V');   // 5
fill(28,70,73,'V');   // 4
fill(29,71,72,'V');   // 2
// Total: 39

// KOREA (8-12) - rows 18-20
fill(18,82,84,'d');   // 3
fill(19,82,84,'d');   // 3
fill(20,82,83,'d');   // 2
// Total: 8

// JAPAN (8-12) - rows 18-21, water gap from Korea
fill(18,88,90,'J');   // 3
fill(19,87,89,'J');   // 3
fill(20,87,89,'J');   // 3
fill(21,88,89,'J');   // 2
// Total: 11

// THAILAND (10-15) - rows 25-28
fill(25,76,79,'e');   // 4
fill(26,76,79,'e');   // 4
fill(27,77,79,'e');   // 3
fill(28,77,78,'e');   // 2
// Total: 13

// VIETNAM (8-12) - rows 25-28
fill(25,81,83,'f');   // 3
fill(26,81,83,'f');   // 3
fill(27,81,82,'f');   // 2
fill(28,81,82,'f');   // 2
// Total: 10

// INDONESIA (15-25) - rows 31-34
fill(31,73,80,'X');   // 8
fill(32,73,80,'X');   // 8
fill(33,74,79,'X');   // 6
// Total: 22

// ═══════════ OCEANIA ═══════════

// AUSTRALIA (50-70) - rows 37-43
fill(37,78,89,'W');   // 12
fill(38,77,90,'W');   // 14
fill(39,77,90,'W');   // 14
fill(40,78,89,'W');   // 12
fill(41,79,87,'W');   // 9
fill(42,80,86,'W');   // 7
// Total: 68 → trim
fill(37,88,89,'.');   // -2
fill(38,89,90,'.');   // -2
fill(39,89,90,'.');   // -2
fill(40,88,89,'.');   // -2
// Now: 10+12+12+10+9+7 = 60

// NEW ZEALAND (3-5) - rows 43-44
fill(43,93,94,'h');   // 2
fill(44,93,94,'h');   // 2
// Total: 4

// ═══════════ VALIDATION ═══════════
const counts = {};
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    const ch = grid[r][c];
    if (ch !== '.') counts[ch] = (counts[ch] || 0) + 1;
  }

const names = {
  C:'Canada',U:'USA',M:'Mexico',1:'Guatemala',2:'Colombia',3:'Venezuela',
  B:'Brazil',A:'Argentina',4:'Peru',5:'Chile',K:'UK',Y:'Ireland',
  F:'France',G:'Germany',S:'Spain',I:'Italy',P:'Poland',6:'Ukraine',
  7:'Sweden',8:'Romania',D:'Algeria',9:'Libya',E:'Egypt',N:'Nigeria',
  O:'DR Congo',Z:'South Africa',0:'Ethiopia',a:'Kenya',T:'Turkey',
  Q:'Saudi Arabia',b:'Iran',c:'Iraq',R:'Russia',H:'China',V:'India',
  J:'Japan',d:'Korea',e:'Thailand',f:'Vietnam',g:'Mongolia',X:'Indonesia',
  W:'Australia',h:'New Zealand'
};
const targets = {
  R:[150,180],C:[100,130],H:[70,90],U:[60,80],B:[50,70],W:[50,70],
  A:[40,55],V:[30,45],D:[25,35],N:[20,30],Q:[20,30],Z:[20,30],
  b:[15,25],O:[15,25],M:[15,25],X:[15,25],2:[12,20],
  e:[10,15],E:[10,15],g:[10,15],d:[8,12],f:[8,12],
  5:[8,12],4:[8,12],T:[8,12],G:[8,12],F:[8,12],S:[8,12],
  7:[8,12],9:[10,15],P:[8,12],6:[10,15],I:[8,12],
  a:[6,10],0:[8,12],c:[6,10],8:[5,8],1:[3,5],Y:[3,5],
  K:[4,6],h:[3,5],3:[8,12],J:[8,12]
};

console.log(`Overlaps during placement: ${overlapCount}`);
console.log('\n=== HEX COUNTS ===');
let totalLand = 0;
for (const code of Object.keys(names)) {
  const cnt = counts[code] || 0;
  totalLand += cnt;
  const t = targets[code];
  let s = '';
  if (t) {
    if (cnt < t[0]) s = ` ⚠ LOW (${t[0]}-${t[1]})`;
    else if (cnt > t[1]) s = ` ⚠ HIGH (${t[0]}-${t[1]})`;
    else s = ' ✓';
  }
  console.log(`  ${code} ${names[code].padEnd(15)}: ${String(cnt).padStart(3)}${s}`);
}
console.log(`\nTotal land: ${totalLand}`);

function checkWater(r, c1, c2) {
  for (let c = c1; c <= c2; c++)
    if (r >= 0 && r < ROWS && c >= 0 && c < COLS && grid[r][c] !== '.') return false;
  return true;
}
console.log('\n=== WATER GAP CHECKS ===');
console.log('UK-France (R12, C42-43):', checkWater(12,42,43) ? '✓' : 'FAIL');
console.log('Korea-Japan (R18, C86):', checkWater(18,86,86) ? '✓' : 'FAIL');
console.log('Indonesia-Australia (R36, C73-80):', checkWater(36,73,80) ? '✓' : 'FAIL');

console.log('\n=== MAP PREVIEW ===');
for (let r = 0; r < ROWS; r++) console.log(grid[r].join(''));

let output = 'var MAP_DATA = [\n';
for (let r = 0; r < ROWS; r++)
  output += `"${grid[r].join('')}"${r<ROWS-1?',':''}\n`;
output += '];\n';

require('fs').writeFileSync('/Users/openclaw_timememo/.openclaw/workspace/simon-game-v2/map-output.txt', output);
console.log('\nMap written to map-output.txt');
