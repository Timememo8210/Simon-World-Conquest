// Fix: Restore ocean around islands that got filled in by expansion
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

function getCodeForId(id) {
  for (const [code, def] of Object.entries(COUNTRY_DEFS)) {
    if (def.id === id) return code;
  }
  return null;
}

// Islands that should be separated from mainland by ocean
const islands = {
  'greenland': {minOceanWidth: 2},
  'uk': {minOceanWidth: 1},
  'ireland': {minOceanWidth: 1},
  'japan': {minOceanWidth: 1},
  'australia': {minOceanWidth: 2},
  'indonesia': {minOceanWidth: 1},
  'newzealand': {minOceanWidth: 2}
};

for (const [islandId, opts] of Object.entries(islands)) {
  const iCode = getCodeForId(islandId);
  if (!iCode) { console.log(`Skip ${islandId}: not found`); continue; }
  
  // Collect island hexes
  const iHexes = new Set();
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (grid[r][c] === iCode) iHexes.add(r + ',' + c);
  
  if (iHexes.size === 0) { console.log(`Skip ${islandId}: no hexes`); continue; }
  
  // Find all non-island, non-ocean hexes adjacent to island
  const toOceanize = new Set();
  for (const key of iHexes) {
    const [r, c] = key.split(',').map(Number);
    for (const [nr, nc] of getNb(r, c)) {
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
        const nch = grid[nr][nc];
        if (nch !== '.' && nch !== iCode) {
          toOceanize.add(nr + ',' + nc);
        }
      }
    }
  }
  
  // Oceanize those hexes
  let count = 0;
  for (const key of toOceanize) {
    const [r, c] = key.split(',').map(Number);
    grid[r][c] = '.';
    count++;
  }
  console.log(`${islandId} (${iCode}): removed ${count} land hexes to restore ocean`);
  
  // For minOceanWidth > 1, also remove hexes adjacent to the newly oceanized hexes
  // that belong to non-island countries and touch the oceanized area
  if (opts.minOceanWidth > 1) {
    for (let w = 1; w < opts.minOceanWidth; w++) {
      const extraRemove = new Set();
      for (const key of toOceanize) {
        const [r, c] = key.split(',').map(Number);
        for (const [nr, nc] of getNb(r, c)) {
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
            const nch = grid[nr][nc];
            if (nch !== '.' && nch !== iCode) {
              extraRemove.add(nr + ',' + nc);
            }
          }
        }
      }
      for (const key of extraRemove) {
        const [r, c] = key.split(',').map(Number);
        grid[r][c] = '.';
        toOceanize.add(key);
        count++;
      }
    }
    console.log(`  After ${opts.minOceanWidth}-hex ocean: total ${count} removed`);
  }
}

// Rebuild
const newMapData = grid.map(row => '"' + row.join('') + '"');
const newMapStr = 'var MAP_DATA = [\n' + newMapData.join(',\n') + '\n];';
html = html.substring(0, ms) + newMapStr + html.substring(me);

// Re-assign warm/cool colors since hex counts changed
// (reuse the same warm/cool logic)
const adj = {};
const hexCounts = {};
for(let r=0;r<ROWS;r++){
  for(let c=0;c<COLS;c++){
    const ch = grid[r][c];
    if(ch==='.')continue;
    hexCounts[ch] = (hexCounts[ch]||0) + 1;
    if(!adj[ch]) adj[ch] = new Set();
    for(const [nr,nc] of getNb(r,c)){
      if(nr>=0 && nr<ROWS && nc>=0 && nc<COLS){
        const nch = grid[nr][nc];
        if(nch!=='.' && nch!==ch) adj[ch].add(nch);
      }
    }
  }
}

const warmColors = ['#E53935','#F4511E','#FB8C00','#FFB300','#D81B60','#C2185B','#F06292','#E64A19','#FF8F00','#F9A825','#AD1457','#880E4F','#FF6D00','#DD2C00','#FF5722','#FF7043','#E91E63','#F44336','#EF5350','#FFAB00'];
const coolColors = ['#1565C0','#1E88E5','#00838F','#00ACC1','#2E7D32','#43A047','#5E35B1','#3949AB','#0277BD','#00897B','#283593','#4527A0','#00695C','#0288D1','#0097A7','#388E3C','#1976D2','#009688','#3F51B5','#00897B'];

const codes = Object.keys(hexCounts).sort((a,b) => (adj[b]?.size||0) - (adj[a]?.size||0));
const assigned = {};
const colorType = {};

for(const code of codes){
  const neighbors = adj[code] || new Set();
  let warmN = 0, coolN = 0;
  for(const nb of neighbors){
    if(colorType[nb]==='warm') warmN++;
    if(colorType[nb]==='cool') coolN++;
  }
  let palette, type;
  if(warmN >= coolN){ palette = coolColors; type = 'cool'; }
  else { palette = warmColors; type = 'warm'; }
  
  const usedByN = new Set();
  for(const nb of neighbors) if(assigned[nb]) usedByN.add(assigned[nb]);
  
  let color = palette[0];
  for(const c of palette){ if(!usedByN.has(c)){ color = c; break; } }
  assigned[code] = color;
  colorType[code] = type;
}

// Update COUNTRY_DEFS colors
const ds2 = html.indexOf('var COUNTRY_DEFS = {');
const de2 = html.indexOf('};', ds2) + 2;
let defsText = html.substring(ds2, de2);
for(const code of codes){
  const esc = code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp('(' + esc + ':\\{[^}]*color:)\'[^\']*\'');
  defsText = defsText.replace(pattern, "$1'" + assigned[code] + "'");
}
html = html.substring(0, ds2) + defsText + html.substring(de2);

// Font size: scale with area
html = html.replace(
  /var fontSize = Math\.max\(\d+, Math\.min\(\d+, Math\.sqrt\(count\) \*\d+\)\);/,
  'var fontSize = Math.max(10, Math.min(32, Math.sqrt(count) * 3));'
);

fs.writeFileSync('/Users/openclaw_timememo/.openclaw/workspace/simon-game-v2/index.html', html);

let landCount = 0;
for(let r=0;r<ROWS;r++) for(let c=0;c<COLS;c++) if(grid[r][c]!=='.') landCount++;
console.log('Final land:', landCount, 'Countries:', codes.length);
console.log('Warm:', codes.filter(c=>colorType[c]==='warm').length, 'Cool:', codes.filter(c=>colorType[c]==='cool').length);
