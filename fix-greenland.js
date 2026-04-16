// Fix: Separate Greenland from Canada with ocean
const fs = require('fs');
let html = fs.readFileSync('/Users/openclaw_timememo/.openclaw/workspace/simon-game-v2/index.html','utf8');
const ms = html.indexOf('var MAP_DATA = [');
const me = html.indexOf('];', ms) + 2;
eval(html.substring(ms, me));
const ds = html.indexOf('var COUNTRY_DEFS = {');
const de = html.indexOf('};', ds) + 2;
eval(html.substring(ds, de));

const grid = MAP_DATA.map(row => row.split(''));
const ROWS = grid.length, COLS = grid[0].length;

function getNb(r, c) {
  if (r % 2 === 0) return [[r-1,c-1],[r-1,c],[r,c-1],[r,c+1],[r+1,c-1],[r+1,c]];
  return [[r-1,c],[r-1,c+1],[r,c-1],[r,c+1],[r+1,c],[r+1,c+1]];
}

// Find Greenland code
let glCode = null, caCode = null;
for (const [code, def] of Object.entries(COUNTRY_DEFS)) {
  if (def.id === 'greenland') glCode = code;
  if (def.id === 'canada') caCode = code;
}
console.log('Greenland:', glCode, 'Canada:', caCode);

// Collect all Greenland hexes
const glHexes = new Set();
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++)
    if (grid[r][c] === glCode) glHexes.add(r + ',' + c);

// Find Canada hexes that are adjacent to Greenland
const toRemove = [];
for (const key of glHexes) {
  const [r, c] = key.split(',').map(Number);
  for (const [nr, nc] of getNb(r, c)) {
    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc] === caCode) {
      toRemove.push([nr, nc]);
    }
  }
}

console.log('Canada hexes touching Greenland:', toRemove.length);

// Remove those Canada hexes (turn to ocean)
for (const [r, c] of toRemove) {
  grid[r][c] = '.';
}

// Now also add 1-hex ocean around UK, Japan, Australia, Indonesia if they touch neighbors
const islandIds = ['uk', 'japan', 'australia', 'indonesia', 'newzealand', 'ireland'];
for (const islandId of islandIds) {
  let iCode = null;
  for (const [code, def] of Object.entries(COUNTRY_DEFS)) {
    if (def.id === islandId) { iCode = code; break; }
  }
  if (!iCode) continue;
  
  const islandHexes = new Set();
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (grid[r][c] === iCode) islandHexes.add(r + ',' + c);
  
  // Find neighbor country hexes touching island
  const islandToRemove = [];
  for (const key of islandHexes) {
    const [r, c] = key.split(',').map(Number);
    for (const [nr, nc] of getNb(r, c)) {
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
        const nch = grid[nr][nc];
        if (nch !== '.' && nch !== iCode) {
          islandToRemove.push([nr, nc, nch]);
        }
      }
    }
  }
  
  if (islandToRemove.length > 0) {
    console.log(`${islandId} (${iCode}) touches neighbors: ${islandToRemove.length} hexes`);
    for (const [r, c, ch] of islandToRemove) {
      grid[r][c] = '.';
    }
  }
}

// Rebuild MAP_DATA
const newMapData = grid.map(row => '"' + row.join('') + '"');
const newMapStr = 'var MAP_DATA = [\n' + newMapData.join(',\n') + '\n];';
html = html.substring(0, ms) + newMapStr + html.substring(me);

fs.writeFileSync('/Users/openclaw_timememo/.openclaw/workspace/simon-game-v2/index.html', html);

let landCount = 0;
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++)
    if (grid[r][c] !== '.') landCount++;
console.log('Land after fix:', landCount);
console.log('Done!');
