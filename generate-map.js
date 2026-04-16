#!/usr/bin/env node
// Generate a realistic world hex map for Simon's strategy game
// Grid: 120 cols × 65 rows, proportional country areas

const COLS = 120;
const ROWS = 65;
const OCEAN = '.';

// Initialize grid
let grid = [];
for (let r = 0; r < ROWS; r++) {
  grid[r] = new Array(COLS).fill(OCEAN);
}

// Country definitions: code, name, area (k km²), center (col, row), and shape hints
// Scale: 1 hex ≈ 69,000 km²
// Positions mapped from real lon/lat to grid coords
const countries = [
  // === NORTH AMERICA ===
  { code: 'C', name: 'Canada', area: 9985, center: [24, 7], stretch: [1.8, 0.7] },
  { code: 'U', name: 'USA', area: 9834, center: [21, 16], stretch: [1.6, 0.8] },
  { code: 'M', name: 'Mexico', area: 1964, center: [16, 23], stretch: [1.0, 0.8] },
  { code: 'A', name: 'Alaska', area: 1720, center: [8, 8], stretch: [1.2, 0.6] },
  { code: 'L', name: 'Greenland', area: 2166, center: [36, 4], stretch: [0.7, 0.9], island: true },
  
  // === CENTRAL AMERICA ===
  { code: 'k', name: 'Costa Rica', area: 51, center: [16, 28], stretch: [0.6, 0.5], minHexes: 3 },
  { code: 'N', name: 'Nicaragua', area: 130, center: [16, 30], stretch: [0.5, 0.5], minHexes: 3 },
  { code: 'q', name: 'Panama', area: 75, center: [17, 32], stretch: [0.8, 0.4], minHexes: 3 },
  { code: 'u', name: 'Cuba', area: 110, center: [21, 27], stretch: [1.0, 0.4], island: true, minHexes: 3 },

  // === SOUTH AMERICA ===
  { code: 'B', name: 'Brazil', area: 8516, center: [29, 37], stretch: [1.0, 1.2] },
  { code: 'G', name: 'Argentina', area: 2780, center: [27, 47], stretch: [0.6, 1.3] },
  { code: '5', name: 'Chile', area: 756, center: [24, 48], stretch: [0.3, 1.5] },
  { code: '4', name: 'Peru', area: 1285, center: [24, 38], stretch: [0.6, 0.8] },
  { code: '2', name: 'Colombia', area: 1142, center: [23, 33], stretch: [0.6, 0.6] },
  { code: '3', name: 'Venezuela', area: 916, center: [28, 32], stretch: [0.7, 0.5] },
  { code: 'E', name: 'Ecuador', area: 284, center: [21, 35], stretch: [0.4, 0.5] },
  { code: 'O', name: 'Bolivia', area: 1098, center: [27, 42], stretch: [0.6, 0.6] },
  { code: 'P', name: 'Paraguay', area: 407, center: [29, 44], stretch: [0.4, 0.5] },
  { code: 'R', name: 'Uruguay', area: 176, center: [31, 45], stretch: [0.4, 0.4] },

  // === EUROPE ===
  { code: 'K', name: 'UK', area: 244, center: [49, 12], stretch: [0.4, 0.8], island: true },
  { code: 'Y', name: 'Ireland', area: 84, center: [47, 12], stretch: [0.4, 0.5], island: true, minHexes: 3 },
  { code: 'X', name: 'France', area: 644, center: [51, 17], stretch: [0.6, 0.7] },
  { code: 'S', name: 'Spain', area: 506, center: [49, 20], stretch: [0.6, 0.5] },
  { code: 'D', name: 'Germany', area: 357, center: [54, 13], stretch: [0.5, 0.6] },
  { code: 'I', name: 'Italy', area: 301, center: [54, 18], stretch: [0.3, 0.9] },
  { code: 'l', name: 'Portugal', area: 92, center: [47, 20], stretch: [0.3, 0.5] },
  { code: 'h', name: 'Netherlands', area: 42, center: [52, 13], stretch: [0.3, 0.3], minHexes: 3 },
  { code: 'b', name: 'Belgium', area: 31, center: [52, 14], stretch: [0.3, 0.3], minHexes: 3 },
  { code: 'a', name: 'Poland', area: 313, center: [57, 13], stretch: [0.5, 0.5] },
  { code: 'F', name: 'Finland', area: 338, center: [59, 6], stretch: [0.4, 0.9] },
  { code: 'n', name: 'Norway', area: 385, center: [57, 5], stretch: [0.3, 1.2] },
  { code: '7', name: 'Sweden', area: 450, center: [58, 8], stretch: [0.3, 0.9] },
  { code: 'm', name: 'Denmark', area: 43, center: [55, 11], stretch: [0.4, 0.3], minHexes: 3 },
  { code: 'Z', name: 'Austria', area: 84, center: [55, 15], stretch: [0.4, 0.3], minHexes: 3 },
  { code: 'c', name: 'Czech', area: 79, center: [55, 14], stretch: [0.3, 0.3], minHexes: 3 },
  { code: 'v', name: 'Switzerland', area: 41, center: [53, 16], stretch: [0.3, 0.3], minHexes: 3 },
  { code: 'y', name: 'Hungary', area: 93, center: [57, 15], stretch: [0.4, 0.3], minHexes: 3 },
  { code: 'o', name: 'Romania', area: 238, center: [59, 16], stretch: [0.5, 0.4] },
  { code: 'r', name: 'Serbia', area: 88, center: [57, 17], stretch: [0.3, 0.3], minHexes: 3 },
  { code: 'z', name: 'Bulgaria', area: 111, center: [59, 18], stretch: [0.3, 0.3], minHexes: 3 },
  { code: 'g', name: 'Greece', area: 132, center: [57, 20], stretch: [0.4, 0.4] },

  // === NORTH AFRICA & MIDDLE EAST ===
  { code: '1', name: 'Algeria', area: 2382, center: [51, 24], stretch: [1.0, 0.6] },
  { code: 'e', name: 'Morocco', area: 447, center: [48, 23], stretch: [0.4, 0.5] },
  { code: '0', name: 'Egypt', area: 1002, center: [56, 24], stretch: [0.5, 0.5] },
  { code: 'Q', name: 'Saudi Arabia', area: 2150, center: [63, 26], stretch: [0.8, 0.8] },
  { code: 'i', name: 'Iraq', area: 438, center: [64, 21], stretch: [0.4, 0.5] },
  { code: 's', name: 'Syria', area: 185, center: [62, 21], stretch: [0.3, 0.3] },
  { code: 'T', name: 'Turkey', area: 784, center: [59, 19], stretch: [0.7, 0.4] },
  { code: 'j', name: 'Iran', area: 1648, center: [67, 21], stretch: [0.8, 0.7] },

  // === SUB-SAHARAN AFRICA ===
  { code: 'x', name: 'DR Congo', area: 2345, center: [56, 33], stretch: [0.7, 0.8] },
  { code: 'W', name: 'Nigeria', area: 924, center: [52, 30], stretch: [0.5, 0.5] },
  { code: 'w', name: 'Ethiopia', area: 1104, center: [61, 32], stretch: [0.5, 0.5] },
  { code: 'L1', name: 'Libya', code: '6', area: 1760, center: [55, 28], stretch: [0.8, 0.7] },
  
  // === ASIA ===
  { code: '6', name: 'Russia', area: 17098, center: [78, 6], stretch: [2.5, 0.7] },
  { code: 'H', name: 'China', area: 9597, center: [80, 18], stretch: [1.2, 0.9] },
  { code: 'V', name: 'India', area: 3287, center: [73, 26], stretch: [0.7, 1.0] },
  { code: '9', name: 'Mongolia', area: 1564, center: [82, 13], stretch: [0.9, 0.4] },
  { code: 'J', name: 'Japan', area: 378, center: [95, 15], stretch: [0.3, 1.0], island: true },
  { code: 'd', name: 'Korea', area: 220, center: [91, 16], stretch: [0.3, 0.6] },
  { code: 'f', name: 'Vietnam', area: 331, center: [83, 24], stretch: [0.3, 0.8] },
  { code: 't', name: 'Thailand', area: 513, center: [81, 27], stretch: [0.4, 0.6] },
  { code: 'p', name: 'Philippines', area: 300, center: [90, 25], stretch: [0.3, 0.5], island: true },
  { code: '8', name: 'Indonesia', area: 1905, center: [87, 34], stretch: [1.2, 0.4], island: true },
  
  // === OCEANIA ===
  { code: 'a1', name: 'Australia', code: 'a', area: 7692, center: [92, 45], stretch: [1.1, 0.8], island: true },
  { code: 'n1', name: 'New Zealand', code: 'n', area: 268, center: [100, 49], stretch: [0.3, 0.7], island: true },
];

// Fix duplicate codes - need unique single-char codes
// Let me redo this with unique codes matching COUNTRY_DEFS
const countryMap = {};

// Remove the temp entries and use clean codes
const cleanCountries = [
  // North America
  { code: 'C', name: 'Canada', area: 9985, cx: 24, cy: 7, sx: 1.8, sy: 0.7 },
  { code: 'U', name: 'USA', area: 9834, cx: 21, cy: 16, sx: 1.6, sy: 0.8 },
  { code: 'M', name: 'Mexico', area: 1964, cx: 16, cy: 23, sx: 1.0, sy: 0.8 },
  { code: 'A', name: 'Alaska', area: 1720, cx: 8, cy: 8, sx: 1.2, sy: 0.6 },
  { code: 'L', name: 'Greenland', area: 2166, cx: 36, cy: 4, sx: 0.7, sy: 0.9, island: true },
  
  // Central America & Caribbean
  { code: 'k', name: 'Costa Rica', area: 51, cx: 16, cy: 28, sx: 0.6, sy: 0.4, minHex: 3 },
  { code: 'N', name: 'Nicaragua', area: 130, cx: 16, cy: 30, sx: 0.5, sy: 0.4, minHex: 3 },
  { code: 'q', name: 'Panama', area: 75, cx: 17, cy: 32, sx: 0.7, sy: 0.3, minHex: 3 },
  { code: 'u', name: 'Cuba', area: 110, cx: 21, cy: 27, sx: 0.9, sy: 0.3, island: true, minHex: 3 },

  // South America
  { code: 'B', name: 'Brazil', area: 8516, cx: 29, cy: 37, sx: 1.0, sy: 1.2 },
  { code: 'G', name: 'Argentina', area: 2780, cx: 27, cy: 47, sx: 0.6, sy: 1.3 },
  { code: '5', name: 'Chile', area: 756, cx: 24, cy: 48, sx: 0.25, sy: 1.5 },
  { code: '4', name: 'Peru', area: 1285, cx: 24, cy: 38, sx: 0.6, sy: 0.8 },
  { code: '2', name: 'Colombia', area: 1142, cx: 23, cy: 33, sx: 0.6, sy: 0.5 },
  { code: '3', name: 'Venezuela', area: 916, cx: 28, cy: 32, sx: 0.7, sy: 0.4 },
  { code: 'E', name: 'Ecuador', area: 284, cx: 21, cy: 35, sx: 0.4, sy: 0.4 },
  { code: 'O', name: 'Bolivia', area: 1098, cx: 27, cy: 42, sx: 0.6, sy: 0.6 },
  { code: 'P', name: 'Paraguay', area: 407, cx: 29, cy: 44, sx: 0.35, sy: 0.45 },
  { code: 'R', name: 'Uruguay', area: 176, cx: 31, cy: 45, sx: 0.3, sy: 0.35 },

  // Europe - North
  { code: 'K', name: 'UK', area: 244, cx: 49, cy: 12, sx: 0.35, sy: 0.7, island: true },
  { code: 'Y', name: 'Ireland', area: 84, cx: 47, cy: 12, sx: 0.3, sy: 0.4, island: true, minHex: 3 },
  { code: 'n', name: 'Norway', area: 385, cx: 56, cy: 4, sx: 0.3, sy: 1.1 },
  { code: '7', name: 'Sweden', area: 450, cx: 58, cy: 7, sx: 0.3, sy: 0.8 },
  { code: 'F', name: 'Finland', area: 338, cx: 60, cy: 5, sx: 0.35, sy: 0.8 },
  { code: 'm', name: 'Denmark', area: 43, cx: 55, cy: 11, sx: 0.35, sy: 0.25, minHex: 3 },
  
  // Europe - West/Central
  { code: 'h', name: 'Netherlands', area: 42, cx: 52, cy: 13, sx: 0.3, sy: 0.25, minHex: 3 },
  { code: 'b', name: 'Belgium', area: 31, cx: 51, cy: 14, sx: 0.25, sy: 0.25, minHex: 3 },
  { code: 'D', name: 'Germany', area: 357, cx: 54, cy: 14, sx: 0.5, sy: 0.55 },
  { code: 'X', name: 'France', area: 644, cx: 51, cy: 17, sx: 0.6, sy: 0.65 },
  { code: 'S', name: 'Spain', area: 506, cx: 49, cy: 20, sx: 0.55, sy: 0.4 },
  { code: 'l', name: 'Portugal', area: 92, cx: 47, cy: 20, sx: 0.2, sy: 0.35, minHex: 3 },
  { code: 'v', name: 'Switzerland', area: 41, cx: 53, cy: 16, sx: 0.25, sy: 0.2, minHex: 3 },
  { code: 'c', name: 'Czech', area: 79, cx: 55, cy: 14, sx: 0.25, sy: 0.25, minHex: 3 },
  { code: 'Z', name: 'Austria', area: 84, cx: 55, cy: 15, sx: 0.35, sy: 0.2, minHex: 3 },
  { code: 'a', name: 'Poland', area: 313, cx: 57, cy: 13, sx: 0.45, sy: 0.45 },
  { code: 'I', name: 'Italy', area: 301, cx: 54, cy: 19, sx: 0.25, sy: 0.8 },
  
  // Europe - East/Balkans
  { code: 'y', name: 'Hungary', area: 93, cx: 57, cy: 16, sx: 0.3, sy: 0.2, minHex: 3 },
  { code: 'o', name: 'Romania', area: 238, cx: 59, cy: 16, sx: 0.45, sy: 0.35 },
  { code: 'r', name: 'Serbia', area: 88, cx: 57, cy: 18, sx: 0.25, sy: 0.2, minHex: 3 },
  { code: 'z', name: 'Bulgaria', area: 111, cx: 59, cy: 18, sx: 0.25, sy: 0.2, minHex: 3 },
  { code: 'g', name: 'Greece', area: 132, cx: 57, cy: 20, sx: 0.3, sy: 0.35 },

  // North Africa & Middle East
  { code: 'e', name: 'Morocco', area: 447, cx: 48, cy: 23, sx: 0.35, sy: 0.4 },
  { code: '1', name: 'Algeria', area: 2382, cx: 52, cy: 24, sx: 0.9, sy: 0.55 },
  { code: '6', name: 'Libya', area: 1760, cx: 56, cy: 27, sx: 0.7, sy: 0.6 },
  { code: '0', name: 'Egypt', area: 1002, cx: 57, cy: 24, sx: 0.45, sy: 0.45 },
  { code: 'T', name: 'Turkey', area: 784, cx: 59, cy: 20, sx: 0.65, sy: 0.3 },
  { code: 's', name: 'Syria', area: 185, cx: 62, cy: 21, sx: 0.2, sy: 0.25 },
  { code: 'i', name: 'Iraq', area: 438, cx: 64, cy: 22, sx: 0.35, sy: 0.35 },
  { code: 'j', name: 'Iran', area: 1648, cx: 67, cy: 22, sx: 0.75, sy: 0.6 },
  { code: 'Q', name: 'Saudi Arabia', area: 2150, cx: 63, cy: 27, sx: 0.7, sy: 0.7 },

  // Sub-Saharan Africa
  { code: 'W', name: 'Nigeria', area: 924, cx: 52, cy: 30, sx: 0.4, sy: 0.4 },
  { code: 'x', name: 'DR Congo', area: 2345, cx: 56, cy: 34, sx: 0.65, sy: 0.7 },
  { code: 'w', name: 'Ethiopia', area: 1104, cx: 61, cy: 32, sx: 0.45, sy: 0.4 },

  // Asia
  { code: '6', name: 'Russia_override', skip: true }, // placeholder to avoid dup
  { code: 'R', name: 'Russia_REAL', skip: true },  // placeholder
  // Actually, Russia has code '6' in COUNTRY_DEFS! Let me check...
  // Russia is code '6'. Libya... let me recheck COUNTRY_DEFS.
];

// Wait - I need to re-examine. In COUNTRY_DEFS, Russia is '6' and there's no separate Libya entry.
// Let me check what code Libya should use. Looking at COUNTRY_DEFS again...
// Libya is NOT in COUNTRY_DEFS. We have exactly 43 countries.
// The country list doesn't include Libya. Let me recount.

// From COUNTRY_DEFS (43 entries):
// 0:egypt, 1:algeria, 2:colombia, 3:venezuela, 4:peru, 5:chile, 6:russia, 7:sweden, 8:indonesia,
// 9:mongolia, A:alaska, B:brazil, C:canada, D:germany, E:ecuador, F:finland, G:argentina,
// H:china, I:italy, J:japan, K:uk, L:greenland, M:mexico, N:nicaragua, O:bolivia, P:paraguay,
// Q:saudiarabia, R:uruguay, S:spain, T:turkey, U:usa, V:india, W:nigeria, X:france, Y:ireland,
// Z:austria, a:poland, b:belgium, c:czech, d:korea, e:morocco, f:vietnam, g:greece, h:netherlands,
// i:iraq, j:iran, k:costarica, l:portugal, m:denmark, n:norway, o:romania, p:philippines,
// q:panama, r:serbia, s:syria, t:thailand, u:cuba, v:switzerland, w:ethiopia, x:drcongo,
// y:hungary, z:bulgaria
// That's 10 digits + 26 uppercase + 26 lowercase = 62 possible, we use 43.

// No Libya, no South Africa, no New Zealand, no Australia in the current defs!
// Wait, let me recount...
// 0-9 = 10, A-Z = 26, a-z = 26 = 62 total codes, we use 43.
// Let me check: is Australia there? No! Is South Africa? No!
// We have exactly the countries in COUNTRY_DEFS. No Australia, no New Zealand, no South Africa, no Libya.

// OK this simplifies things. Let me rewrite with ONLY the 43 countries from COUNTRY_DEFS.

//console.log("Revising country list to match COUNTRY_DEFS exactly...");
//process.exit(0);

// ============ CLEAN IMPLEMENTATION ============

const SCALE = 69000; // km² per hex

const C = [
  // code, name, area_kkm2, center_col, center_row, stretch_x, stretch_y, isIsland, minHexes
  // North America
  ['A', 'Alaska',     1720,   8,  8,  1.2, 0.6,  false, 0],
  ['C', 'Canada',     9985,  24,  7,  1.8, 0.7,  false, 0],
  ['U', 'USA',        9834,  21, 16,  1.6, 0.8,  false, 0],
  ['L', 'Greenland',  2166,  36,  4,  0.7, 0.9,  true,  0],
  ['M', 'Mexico',     1964,  16, 23,  1.0, 0.8,  false, 0],
  ['u', 'Cuba',        110,  20, 27,  0.8, 0.3,  true,  3],
  ['k', 'CostaRica',    51,  15, 28,  0.4, 0.3,  false, 3],
  ['N', 'Nicaragua',   130,  15, 30,  0.4, 0.3,  false, 3],
  ['q', 'Panama',       75,  16, 32,  0.5, 0.3,  false, 3],
  
  // South America
  ['2', 'Colombia',   1142,  23, 33,  0.55, 0.45, false, 0],
  ['3', 'Venezuela',   916,  27, 32,  0.6, 0.35, false, 0],
  ['E', 'Ecuador',     284,  21, 35,  0.3, 0.35, false, 0],
  ['4', 'Peru',       1285,  24, 38,  0.55, 0.75, false, 0],
  ['B', 'Brazil',     8516,  30, 37,  1.0, 1.15, false, 0],
  ['O', 'Bolivia',    1098,  27, 42,  0.55, 0.55, false, 0],
  ['P', 'Paraguay',    407,  29, 44,  0.3, 0.4,  false, 0],
  ['R', 'Uruguay',     176,  31, 45,  0.25, 0.3, false, 0],
  ['G', 'Argentina',  2780,  27, 48,  0.55, 1.3, false, 0],
  ['5', 'Chile',       756,  24, 49,  0.22, 1.4, false, 0],
  
  // Europe - Nordic
  ['n', 'Norway',      385,  55,  4,  0.25, 1.0, false, 0],
  ['7', 'Sweden',      450,  57,  7,  0.25, 0.75, false, 0],
  ['F', 'Finland',     338,  59,  5,  0.3, 0.75, false, 0],
  ['m', 'Denmark',      43,  54, 11,  0.3, 0.2, false, 3],
  
  // Europe - Islands
  ['Y', 'Ireland',      84,  47, 12,  0.25, 0.35, true, 3],
  ['K', 'UK',          244,  49, 12,  0.3, 0.65, true, 0],
  
  // Europe - West
  ['l', 'Portugal',     92,  47, 20,  0.2, 0.3,  false, 3],
  ['S', 'Spain',       506,  49, 20,  0.5, 0.35, false, 0],
  ['X', 'France',      644,  51, 17,  0.55, 0.6, false, 0],
  ['h', 'Netherlands',  42,  52, 13,  0.25, 0.2, false, 3],
  ['b', 'Belgium',      31,  51, 14,  0.2, 0.2,  false, 3],
  ['D', 'Germany',     357,  54, 14,  0.45, 0.5, false, 0],
  ['v', 'Switzerland',  41,  53, 16,  0.2, 0.2,  false, 3],
  ['c', 'Czech',        79,  56, 12,  0.25, 0.25, false, 3],
  ['Z', 'Austria',      84,  55, 15,  0.3, 0.2,  false, 3],
  ['a', 'Poland',      313,  57, 13,  0.4, 0.4,  false, 0],
  ['I', 'Italy',       301,  54, 19,  0.22, 0.75, false, 0],
  
  // Europe - East/Balkans
  ['y', 'Hungary',      93,  57, 16,  0.25, 0.2, false, 3],
  ['o', 'Romania',     238,  59, 16,  0.4, 0.3,  false, 0],
  ['r', 'Serbia',       88,  57, 18,  0.22, 0.2, false, 3],
  ['z', 'Bulgaria',    111,  60, 17,  0.25, 0.25, false, 3],
  ['g', 'Greece',      132,  57, 20,  0.25, 0.3, false, 0],
  
  // North Africa & Middle East
  ['e', 'Morocco',     447,  48, 23,  0.3, 0.35, false, 0],
  ['1', 'Algeria',    2382,  52, 24,  0.85, 0.5, false, 0],
  ['0', 'Egypt',      1002,  57, 24,  0.4, 0.4, false, 0],
  ['T', 'Turkey',      784,  60, 19,  0.6, 0.25, false, 0],
  ['s', 'Syria',       185,  62, 20,  0.18, 0.2, false, 3],
  ['i', 'Iraq',        438,  64, 21,  0.3, 0.3, false, 0],
  ['j', 'Iran',       1648,  67, 22,  0.7, 0.55, false, 0],
  ['Q', 'SaudiArabia',2150,  63, 27,  0.65, 0.65, false, 0],
  
  // Sub-Saharan Africa
  ['W', 'Nigeria',     924,  52, 30,  0.35, 0.35, false, 0],
  ['x', 'DR Congo',   2345,  56, 34,  0.6, 0.65, false, 0],
  ['w', 'Ethiopia',   1104,  61, 32,  0.4, 0.35, false, 0],
  
  // Asia
  ['6', 'Russia',    17098,  78,  6,  2.4, 0.65, false, 0],
  ['9', 'Mongolia',   1564,  82, 13,  0.85, 0.35, false, 0],
  ['H', 'China',      9597,  80, 18,  1.1, 0.85, false, 0],
  ['d', 'Korea',       220,  91, 16,  0.22, 0.5, false, 0],
  ['J', 'Japan',       378,  95, 15,  0.22, 0.9, true, 0],
  ['V', 'India',      3287,  73, 26,  0.65, 0.9, false, 0],
  ['f', 'Vietnam',     331,  83, 25,  0.22, 0.7, false, 0],
  ['t', 'Thailand',    513,  80, 27,  0.35, 0.5, false, 0],
  ['p', 'Philippines', 300,  90, 25,  0.22, 0.45, true, 3],
  ['8', 'Indonesia',  1905,  87, 34,  1.1, 0.3, true, 0],
];

// Calculate target hexes for each country
function targetHexes(area) {
  return Math.max(3, Math.round(area * 1000 / SCALE));
}

// For hex grids, the 6 neighbors of (r,c) depend on whether row is even or odd
function hexNeighbors(r, c) {
  if (r % 2 === 0) {
    return [[r-1,c-1],[r-1,c],[r,c-1],[r,c+1],[r+1,c-1],[r+1,c]];
  } else {
    return [[r-1,c],[r-1,c+1],[r,c-1],[r,c+1],[r+1,c],[r+1,c+1]];
  }
}

function inBounds(r, c) {
  return r >= 0 && r < ROWS && c >= 0 && c < COLS;
}

// Generate an elliptical country blob
// Place hexes in an ellipse centered at (cx, cy) with radii proportional to stretch and target area
function placeCountry(code, cx, cy, sx, sy, target, isIsland) {
  // Calculate ellipse radii to achieve target area
  // Hex area in ellipse: roughly π * rx * ry ≈ target
  // But we need to account for hex grid discreteness
  let rx = Math.sqrt(target / Math.PI) * sx;
  let ry = Math.sqrt(target / Math.PI) * sy;
  
  // Scale to hit target
  let currentArea = Math.PI * rx * ry;
  if (currentArea > 0) {
    let scale = Math.sqrt(target / currentArea);
    rx *= scale;
    ry *= scale;
  }
  
  let placed = 0;
  let candidates = [];
  
  // Try placing in an ellipse
  for (let dr = -Math.ceil(ry) - 1; dr <= Math.ceil(ry) + 1; dr++) {
    for (let dc = -Math.ceil(rx) - 2; dc <= Math.ceil(rx) + 2; dc++) {
      let r = cy + dr;
      let c = cx + dc;
      if (!inBounds(r, c)) continue;
      
      // Hex offset: odd rows are shifted right by 0.5
      let adjustedDc = dc;
      if (cy % 2 !== 0 && r % 2 === 0) adjustedDc -= 0.5;
      if (cy % 2 === 0 && r % 2 !== 0) adjustedDc += 0.5;
      
      let nx = adjustedDc / rx;
      let ny = dr / ry;
      let dist = nx * nx + ny * ny;
      
      if (dist <= 1.0) {
        candidates.push({ r, c, dist });
      }
    }
  }
  
  // Sort by distance from center (place center first)
  candidates.sort((a, b) => a.dist - b.dist);
  
  for (let cand of candidates) {
    if (placed >= target) break;
    if (grid[cand.r][cand.c] !== OCEAN) continue;
    
    // For islands, check we're not adjacent to other land
    if (isIsland) {
      let adjLand = false;
      for (let [nr, nc] of hexNeighbors(cand.r, cand.c)) {
        if (inBounds(nr, nc) && grid[nr][nc] !== OCEAN && grid[nr][nc] !== code) {
          adjLand = true;
          break;
        }
      }
      if (adjLand) continue;
    }
    
    grid[cand.r][cand.c] = code;
    placed++;
  }
  
  // If we haven't placed enough, try flood-fill expansion from placed hexes
  if (placed < target && placed > 0) {
    let queue = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (grid[r][c] === code) queue.push([r, c]);
      }
    }
    
    let visited = new Set();
    while (placed < target && queue.length > 0) {
      let [r, c] = queue.shift();
      for (let [nr, nc] of hexNeighbors(r, c)) {
        if (!inBounds(nr, nc)) continue;
        let key = nr * COLS + nc;
        if (visited.has(key)) continue;
        visited.add(key);
        if (grid[nr][nc] !== OCEAN) continue;
        
        if (isIsland) {
          let adjLand = false;
          for (let [nnr, nnc] of hexNeighbors(nr, nc)) {
            if (inBounds(nnr, nnc) && grid[nnr][nnc] !== OCEAN && grid[nnr][nnc] !== code) {
              adjLand = true;
              break;
            }
          }
          if (adjLand) continue;
        }
        
        grid[nr][nc] = code;
        placed++;
        queue.push([nr, nc]);
        if (placed >= target) break;
      }
    }
  }
  
  return placed;
}

// Sort countries: place larger ones first (they need more space)
// But also respect geographic order to avoid overlap
// Strategy: place by continent, largest first within each region

let placementOrder = [
  // Large landmasses first
  '6', // Russia (huge, spans top)
  'C', // Canada
  'U', // USA
  'H', // China
  'B', // Brazil
  'A', // Alaska
  '1', // Algeria
  'x', // DR Congo
  'j', // Iran
  'Q', // Saudi Arabia
  'V', // India
  '9', // Mongolia
  'M', // Mexico
  '4', // Peru
  'G', // Argentina
  'O', // Bolivia
  'w', // Ethiopia
  '8', // Indonesia
  'J', // Japan
  'L', // Greenland
  'W', // Nigeria
  'X', // France
  'D', // Germany
  'T', // Turkey
  'S', // Spain
  'I', // Italy
  '5', // Chile
  '2', // Colombia
  '3',
  'a', // Poland
  '7', // Sweden
  'n', // Norway
  'F', // Finland
  'f', // Vietnam
  't', // Thailand
  '0', // Egypt
  'e', // Morocco
  'i', // Iraq
  'o', // Romania
  'K', // UK
  'd', // Korea
  'p', // Philippines
  'g', // Greece
  'r', // Serbia
  'z', // Bulgaria
  'y', // Hungary
  'Z', // Austria
  'c', // Czech
  'P', // Paraguay
  'R', // Uruguay
  'E', // Ecuador
  'Y', // Ireland
  'l', // Portugal
  's', // Syria
  'u', // Cuba
  'k', // Costa Rica
  'N', // Nicaragua
  'q', // Panama
  'h', // Netherlands
  'b', // Belgium
  'v', // Switzerland
  'm', // Denmark
];

// Build a map from code to country data
let codeToCountry = {};
for (let c of C) {
  codeToCountry[c[0]] = c;
}

// Place countries in order
let results = [];
for (let code of placementOrder) {
  let c = codeToCountry[code];
  if (!c) continue;
  let [ccode, name, area, cx, cy, sx, sy, isIsland, minHex] = c;
  let target = targetHexes(area);
  if (minHex > target) target = minHex;
  
  let placed = placeCountry(ccode, cx, cy, sx, sy, target, isIsland);
  results.push({ code: ccode, name, area, target, placed });
}

// Print stats
console.log("\n=== Country Placement Stats ===");
let totalLand = 0;
for (let r of results) {
  totalLand += r.placed;
  let pct = r.target > 0 ? Math.round(r.placed / r.target * 100) : 0;
  console.log(`${r.code} ${r.name.padEnd(14)} area=${String(r.area).padStart(5)}k  target=${String(r.target).padStart(3)}  placed=${String(r.placed).padStart(3)}  ${pct}%`);
}
console.log(`\nTotal land hexes: ${totalLand} / ${COLS * ROWS} (${(totalLand/(COLS*ROWS)*100).toFixed(1)}%)`);

// Generate MAP_DATA string
let mapLines = [];
for (let r = 0; r < ROWS; r++) {
  mapLines.push('"' + grid[r].join('') + '"');
}

let mapDataStr = 'var MAP_DATA = [\n' + mapLines.join(',\n') + '\n];';

// Output
let fs = require('fs');
let htmlPath = '/Users/openclaw_timememo/.openclaw/workspace/simon-game-v2/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace MAP_COLS and MAP_ROWS
html = html.replace(/var MAP_COLS = \d+;/, 'var MAP_COLS = ' + COLS + ';');
html = html.replace(/var MAP_ROWS = \d+;/, 'var MAP_ROWS = ' + ROWS + ';');

// Replace MAP_DATA
let startIdx = html.indexOf('var MAP_DATA = [');
let endIdx = html.indexOf('];', startIdx) + 2;
html = html.substring(0, startIdx) + mapDataStr + html.substring(endIdx);

fs.writeFileSync(htmlPath, html);
console.log('\nMap written to index.html!');

// Verify JS syntax
try {
  let s = html.indexOf('<script>') + 8;
  let e = html.lastIndexOf('</script>');
  new Function(html.substring(s, e));
  console.log('JS syntax check: OK');
} catch (err) {
  console.log('JS syntax ERROR:', err.message);
}
