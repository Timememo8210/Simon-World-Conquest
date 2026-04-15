// Programmatic world map generator for hex strategy game
// Generates a 2D array of country assignments approximating real-world geography
// Output: COUNTRIES JavaScript array

const COLS = 80, ROWS = 45;
const grid = Array.from({length: ROWS}, () => Array(COLS).fill('.'));

// Define countries as: [name, zh, quality, color, polygons (arrays of [row,col] rectangles)]
// Each polygon is [startRow, startCol, endRow, endCol] (inclusive)
const defs = [
  // North America
  ['Canada','加拿大',4,'#42A5F5', [[2,5,8,22]]],
  ['USA','美国',5,'#66BB6A', [[8,8,13,20],[9,5,12,7]]],
  ['Mexico','墨西哥',3,'#FFA726', [[13,6,15,14],[14,4,14,5]]],
  // South America
  ['Colombia','哥伦比亚',3,'#AB47BC', [[15,10,17,14],[16,8,16,9]]],
  ['Brazil','巴西',4,'#26A69A', [[17,9,25,15],[18,7,18,8],[19,6,19,8]]],
  ['Argentina','阿根廷',3,'#EF5350', [[25,9,34,14],[26,7,26,8],[27,6,27,8]]],
  // Europe
  ['UK','英国',4,'#1565C0', [[5,33,6,34]]],
  ['UK','英国',4,'#1565C0', [[7,32,8,33]]],
  ['France','法国',4,'#2196F3', [[7,34,9,37]]],
  ['Germany','德国',5,'#FDD835', [[7,36,9,38]]],
  ['Spain','西班牙',3,'#FF7043', [[10,32,11,35]]],
  ['Italy','意大利',4,'#7E57C2', [[10,37,12,38]]],
  ['Poland','波兰',3,'#EC407A', [[6,38,8,40]]],
  // Africa
  ['Algeria','阿尔及利亚',3,'#3F51B5', [[12,31,14,35]]],
  ['Egypt','埃及',3,'#FFB300', [[14,36,16,38]]],
  ['Nigeria','尼日利亚',2,'#43A047', [[17,31,22,35],[18,29,18,30]]],
  ['DR Congo','刚果(金)',2,'#5D4037', [[22,30,25,34],[23,28,23,29]]],
  ['South Africa','南非',3,'#00897B', [[27,28,32,33],[28,26,28,27]]],
  // Middle East
  ['Turkey','土耳其',3,'#8D6E63', [[11,39,12,42]]],
  ['Saudi Arabia','沙特阿拉伯',4,'#78909C', [[14,39,18,42],[13,40,13,41]]],
  // Asia
  ['Russia','俄罗斯',5,'#5C6BC0', [[1,25,6,45],[0,30,0,44]]],
  ['India','印度',4,'#E84B3A', [[17,43,22,48],[16,44,16,45]]],
  ['China','中国',5,'#E53935', [[10,44,16,52],[9,46,9,50]]],
  ['Japan','日本',4,'#F06292', [[7,54,10,56]]],
  // Oceania
  ['Indonesia','印度尼西亚',2,'#26C6DA', [[23,49,25,55],[24,47,24,48]]],
  ['Australia','澳大利亚',4,'#FF8A65', [[26,50,33,58],[25,52,25,56]]],
];

// Fill grid
defs.forEach(([name, zh, q, color, rects]) => {
  rects.forEach(([r1,c1,r2,c2]) => {
    for (let r = r1; r <= Math.min(r2, ROWS-1); r++) {
      for (let c = c1; c <= Math.min(c2, COLS-1); c++) {
        if (r >= 0 && c >= 0) grid[r][c] = name;
      }
    }
  });
});

// Convert to hex data
function offsetToAxial(col, row) {
  const q = col - Math.floor((row - (row & 1)) / 2);
  const r = row;
  return {q, r};
}

const countries = {};
let totalHexes = 0;
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const name = grid[r][c];
    if (name === '.') continue;
    if (!countries[name]) countries[name] = {hexes:[], q:0, zh:'', color:''};
    const ax = offsetToAxial(c, r);
    countries[name].hexes.push(ax);
    totalHexes++;
  }
}

// Match quality/zh/color from defs
defs.forEach(([name, zh, q, color]) => {
  if (countries[name]) {
    countries[name].q = q;
    countries[name].zh = zh;
    countries[name].color = color;
  }
});

// Generate output
console.error(`Total hexes: ${totalHexes}, Countries: ${Object.keys(countries).length}`);
const lines = ['const COUNTRIES=['];
Object.entries(countries).forEach(([name, data]) => {
  const hexStr = data.hexes.map(h => `{q:${h.q},r:${h.r},qi:${data.q}}`).join(',');
  lines.push(`{n:'${name}',nc:'${data.zh}',h:[${hexStr}],c:'${data.color}'},  // ${data.hexes.length} hexes`);
  console.error(`  ${name}: ${data.hexes.length} hexes`);
});
lines.push('];');
console.log(lines.join('\n'));
