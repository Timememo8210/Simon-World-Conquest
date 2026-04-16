const fs = require('fs');

const filePath = '/Users/openclaw_timememo/.openclaw/workspace/simon-game-v2/index.html';
let html = fs.readFileSync(filePath, 'utf8');

// Extract MAP_DATA
const mapMatch = html.match(/var MAP_DATA = \[([\s\S]*?)\];/);
if (!mapMatch) { console.error('Could not find MAP_DATA'); process.exit(1); }

const mapLines = mapMatch[1].trim().split('\n').map(l => l.trim().replace(/^"|"$/g, '').replace(/,$/, ''));
const MAP_COLS = 100;
const MAP_ROWS = 55;

// Build grid
let grid = mapLines.map(l => l.split(''));

// Get all valid country codes from COUNTRY_DEFS
const defsMatch = html.match(/var COUNTRY_DEFS = \{([\s\S]*?)\};/);
const validCodes = new Set();
const defRegex = /(\S):{/g;
let m;
while ((m = defRegex.exec(defsMatch[1])) !== null) {
  validCodes.add(m[1]);
}
console.log('Valid country codes:', [...validCodes].sort().join(''));

// Hex neighbors (pointy-top, offset coords)
function getNeighbors(r, c) {
  const odd = r % 2 === 1;
  if (odd) {
    return [[r-1,c],[r-1,c+1],[r,c-1],[r,c+1],[r+1,c],[r+1,c+1]];
  } else {
    return [[r-1,c-1],[r-1,c],[r,c-1],[r,c+1],[r+1,c-1],[r+1,c]];
  }
}

function inBounds(r, c) {
  return r >= 0 && r < MAP_ROWS && c >= 0 && c < grid[r].length;
}

// Task 1: Fill inland gaps
// Strategy: iteratively fill '.' hexes with 5+ land neighbors (truly enclosed)
// Then fill '.' with 4+ land neighbors
// Then fill '.' with 3+ land neighbors (only if 3+ DIFFERENT land countries surround it)
function fillGaps() {
  let totalFilled = 0;
  
  // Pass 1: Fill hexes with 5+ land neighbors
  let changed = true;
  let passCount = 0;
  while (changed) {
    changed = false;
    passCount++;
    for (let r = 0; r < MAP_ROWS; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c] !== '.') continue;
        const nbrs = getNeighbors(r, c).filter(([nr, nc]) => inBounds(nr, nc));
        const land = nbrs.filter(([nr, nc]) => validCodes.has(grid[nr][nc]));
        if (land.length >= 5) {
          const counts = {};
          land.forEach(([nr, nc]) => { const ch = grid[nr][nc]; counts[ch] = (counts[ch]||0)+1; });
          let best = null, bestN = 0;
          for (const ch in counts) { if (counts[ch] > bestN) { bestN = counts[ch]; best = ch; } }
          grid[r][c] = best;
          totalFilled++;
          changed = true;
        }
      }
    }
    if (passCount > 20) break;
  }
  console.log(`Pass 1 (5+ neighbors): ${totalFilled} filled`);
  
  // Pass 2: Fill hexes with 4+ land neighbors (single pass only)
  let pass2 = 0;
  for (let r = 0; r < MAP_ROWS; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] !== '.') continue;
      const nbrs = getNeighbors(r, c).filter(([nr, nc]) => inBounds(nr, nc));
      const land = nbrs.filter(([nr, nc]) => validCodes.has(grid[nr][nc]));
      if (land.length >= 4) {
        const counts = {};
        land.forEach(([nr, nc]) => { const ch = grid[nr][nc]; counts[ch] = (counts[ch]||0)+1; });
        let best = null, bestN = 0;
        for (const ch in counts) { if (counts[ch] > bestN) { bestN = counts[ch]; best = ch; } }
        grid[r][c] = best;
        pass2++;
      }
    }
  }
  console.log(`Pass 2 (4+ neighbors, single pass): ${pass2} filled`);
  
  // Pass 3: Fill hexes with 3+ land neighbors where they bridge same country
  let pass3 = 0;
  for (let r = 0; r < MAP_ROWS; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] !== '.') continue;
      const nbrs = getNeighbors(r, c).filter(([nr, nc]) => inBounds(nr, nc));
      const land = nbrs.filter(([nr, nc]) => validCodes.has(grid[nr][nc]));
      if (land.length >= 3) {
        const counts = {};
        land.forEach(([nr, nc]) => { const ch = grid[nr][nc]; counts[ch] = (counts[ch]||0)+1; });
        // Only fill if most common neighbor has 2+ (strong majority)
        let best = null, bestN = 0;
        for (const ch in counts) { if (counts[ch] > bestN) { bestN = counts[ch]; best = ch; } }
        if (bestN >= 2) {
          grid[r][c] = best;
          pass3++;
        }
      }
    }
  }
  console.log(`Pass 3 (3+ neighbors, majority>=2): ${pass3} filled`);
  
  return totalFilled + pass2 + pass3;
}

const filled = fillGaps();
console.log(`Total filled: ${filled}`);

// Task 2: Build adjacency graph and assign colors
function buildAdjacency() {
  const adj = {};
  for (let r = 0; r < MAP_ROWS; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const ch = grid[r][c];
      if (!validCodes.has(ch)) continue;
      if (!adj[ch]) adj[ch] = new Set();
      getNeighbors(r, c).forEach(([nr, nc]) => {
        if (inBounds(nr, nc) && validCodes.has(grid[nr][nc]) && grid[nr][nc] !== ch) {
          adj[ch].add(grid[nr][nc]);
        }
      });
    }
  }
  return adj;
}

const adjacency = buildAdjacency();

// Print adjacency
const allCountries = Object.keys(adjacency).sort();
for (const ch of allCountries) {
  console.log(`  ${ch} -> [${[...adjacency[ch]].sort().join(',')}]`);
}

// Diverse color palette (20 distinct colors)
const palette = [
  '#E53935','#43A047','#1E88E5','#FB8C00','#8E24AA','#00ACC1','#F4511E','#3949AB',
  '#7CB342','#C0CA33','#6D4C41','#00897B','#546E7A','#D81B60','#FFB300','#5E35B1',
  '#039BE5','#FDD835','#8D6E63','#26A69A'
];

// Greedy graph coloring - process countries in order of most neighbors first
const countryCodes = Object.keys(adjacency);
countryCodes.sort((a, b) => adjacency[b].size - adjacency[a].size);

const colorAssign = {};
for (const ch of countryCodes) {
  const usedColors = new Set();
  adjacency[ch].forEach(neighbor => {
    if (colorAssign[neighbor]) usedColors.add(colorAssign[neighbor]);
  });
  
  for (const color of palette) {
    if (!usedColors.has(color)) {
      colorAssign[ch] = color;
      break;
    }
  }
  if (!colorAssign[ch]) {
    colorAssign[ch] = palette[Object.keys(colorAssign).length % palette.length];
  }
}

console.log('\nColor assignments:');
for (const ch of allCountries) {
  console.log(`  ${ch}: ${colorAssign[ch]}`);
}

// Verify no adjacent countries share same color
let conflicts = 0;
for (const ch in adjacency) {
  adjacency[ch].forEach(neighbor => {
    if (colorAssign[ch] === colorAssign[neighbor]) {
      console.error(`CONFLICT: ${ch} and ${neighbor} share color ${colorAssign[ch]}`);
      conflicts++;
    }
  });
}
console.log(`\nColor conflicts: ${conflicts/2}`);

// Count unique colors used
const uniqueColors = new Set(Object.values(colorAssign));
console.log(`Unique colors used: ${uniqueColors.size} out of ${palette.length}`);

// Now update the HTML
// 1. Update MAP_DATA
const newMapStr = grid.map(row => '"' + row.join('') + '"').join(',\n');
const newMapBlock = `var MAP_DATA = [\n${newMapStr}\n];`;
html = html.replace(/var MAP_DATA = \[[\s\S]*?\];/, newMapBlock);

// 2. Update COUNTRY_DEFS colors
for (const ch in colorAssign) {
  // Match pattern like  C:{...color:'#42A5F5'}
  const escaped = ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped}:\\{[^}]*color:')([^']*)(')`);
  const match = html.match(regex);
  if (match) {
    html = html.replace(regex, `$1${colorAssign[ch]}$3`);
  } else {
    console.log(`WARNING: Could not find color for country ${ch}`);
  }
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('\nFile updated successfully!');
