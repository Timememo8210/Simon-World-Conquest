const COLS=80,ROWS=45;
const grid=Array.from({length:ROWS},()=>Array(COLS).fill('.'));
const defs=[
['C','Canada','加拿大',4,[[2,5,8,22]]],
['U','USA','美国',5,[[8,8,13,20],[9,5,12,7]]],
['M','Mexico','墨西哥',3,[[13,6,15,14],[14,4,14,5]]],
['L','Colombia','哥伦比亚',3,[[15,10,17,14],[16,8,16,9]]],
['B','Brazil','巴西',4,[[17,9,25,15],[18,7,18,8],[19,6,19,8]]],
['A','Argentina','阿根廷',3,[[25,9,34,14],[26,7,26,8],[27,6,27,8]]],
['K','UK','英国',4,[[7,32,8,33]]],
['F','France','法国',4,[[7,34,9,37]]],
['G','Germany','德国',5,[[7,36,9,38]]],
['S','Spain','西班牙',3,[[10,32,11,35]]],
['I','Italy','意大利',4,[[10,37,12,38]]],
['P','Poland','波兰',3,[[6,38,8,40]]],
['D','Algeria','阿尔及利亚',3,[[12,31,14,35]]],
['E','Egypt','埃及',3,[[14,36,16,38]]],
['N','Nigeria','尼日利亚',2,[[17,31,22,35],[18,29,18,30]]],
['O','DR Congo','刚果(金)',2,[[22,30,25,34],[23,28,23,29]]],
['Z','South Africa','南非',3,[[27,28,32,33],[28,26,28,27]]],
['T','Turkey','土耳其',3,[[11,39,12,42]]],
['R','Russia','俄罗斯',5,[[1,25,6,45],[0,30,0,44]]],
['V','India','印度',4,[[17,43,22,48],[16,44,16,45]]],
['H','China','中国',5,[[10,44,16,52],[9,46,9,50]]],
['J','Japan','日本',4,[[7,54,10,56]]],
['X','Indonesia','印度尼西亚',2,[[23,49,25,55],[24,47,24,48]]],
['W','Australia','澳大利亚',4,[[26,50,33,58],[25,52,25,56]]],
['Q','Saudi Arabia','沙特阿拉伯',4,[[14,39,18,42],[13,40,13,41]]],
];
for(let i=defs.length-1;i>=0;i--){
  const [code]=defs[i];
  const rects=defs[i][4];
  rects.forEach(([r1,c1,r2,c2])=>{
    for(let r=r1;r<=Math.min(r2,ROWS-1);r++)for(let c=c1;c<=Math.min(c2,COLS-1);c++)if(r>=0&&c>=0)grid[r][c]=code;
  });
}
const counts={};
grid.forEach(row=>row.forEach(c=>{if(c!=='.')counts[c]=(counts[c]||0)+1;}));
Object.entries(counts).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.error(k+':'+v));
console.error('Total:',Object.values(counts).reduce((a,b)=>a+b,0));
console.log('var MAP_DATA = [');
grid.forEach(row=>console.log('"'+row.join('')+'",'));
console.log('];');
