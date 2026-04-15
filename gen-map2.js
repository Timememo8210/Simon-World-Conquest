const COLS=80,ROWS=45;
const grid=Array.from({length:ROWS},()=>Array(COLS).fill('.'));
const defs=[
// North America
['C','Canada','加拿大',4,[[2,5,6,22]]],
['U','USA','美国',5,[[7,8,13,20],[8,5,12,7]]],
['M','Mexico','墨西哥',3,[[13,6,15,14],[14,4,14,5]]],
['1','Guatemala','危地马拉',2,[[15,5,15,7]]],
['2','Colombia','哥伦比亚',3,[[16,8,17,14]]],
['3','Venezuela','委内瑞拉',2,[[16,15,17,17]]],
// South America  
['B','Brazil','巴西',4,[[18,7,25,15],[19,6,19,8]]],
['A','Argentina','阿根廷',3,[[26,8,32,14],[25,9,25,11]]],
['4','Peru','秘鲁',2,[[18,4,20,6]]],
['5','Chile','智利',2,[[28,5,33,7]]],
// Europe (more countries!)
['K','UK','英国',4,[[5,31,6,32]]],
['Y','Ireland','爱尔兰',2,[[5,29,6,30]]],
['F','France','法国',4,[[7,33,9,35]]],
['G','Germany','德国',5,[[7,36,8,38]]],
['S','Spain','西班牙',3,[[9,31,10,34]]],
['I','Italy','意大利',4,[[9,36,11,37]]],
['P','Poland','波兰',3,[[6,39,7,40]]],
['6','Ukraine','乌克兰',3,[[6,41,8,43]]],
['7','Sweden','瑞典',3,[[3,35,5,36]]],
['8','Romania','罗马尼亚',2,[[8,39,9,40]]],
// Africa
['D','Algeria','阿尔及利亚',3,[[11,30,13,34]]],
['9','Libya','利比亚',2,[[11,35,13,37]]],
['E','Egypt','埃及',3,[[14,36,16,38]]],
['N','Nigeria','尼日利亚',2,[[17,30,21,34]]],
['O','DR Congo','刚果(金)',2,[[22,29,24,33]]],
['Z','South Africa','南非',3,[[27,27,31,32]]],
['0','Ethiopia','埃塞俄比亚',2,[[17,38,19,40]]],
['a','Kenya','肯尼亚',2,[[19,38,21,40]]],
// Middle East
['T','Turkey','土耳其',3,[[10,38,11,40]]],
['Q','Saudi Arabia','沙特阿拉伯',4,[[13,40,16,43]]],
['b','Iran','伊朗',3,[[13,44,15,46]]],
['c','Iraq','伊拉克',2,[[12,41,13,43]]],
// Asia
['R','Russia','俄罗斯',5,[[1,25,5,48],[0,30,0,47]]],
['H','China','中国',5,[[10,44,16,52],[9,46,9,51]]],
['V','India','印度',4,[[17,44,22,48]]],
['J','Japan','日本',4,[[7,54,10,56]]],
['d','Korea','韩国',3,[[8,51,10,53]]],
['e','Thailand','泰国',2,[[20,49,22,51]]],
['f','Vietnam','越南',2,[[18,50,20,52]]],
['g','Mongolia','蒙古',2,[[7,45,9,48]]],
['X','Indonesia','印度尼西亚',2,[[23,49,25,55]]],
// Oceania
['W','Australia','澳大利亚',4,[[26,50,33,58]]],
['h','New Zealand','新西兰',2,[[30,59,33,60]]],
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
console.error('Countries:',Object.keys(counts).length);
console.error('Total hexes:',Object.values(counts).reduce((a,b)=>a+b,0));
console.log('var MAP_DATA = [');
grid.forEach(row=>console.log('"'+row.join('')+'",'));
console.log('];');
