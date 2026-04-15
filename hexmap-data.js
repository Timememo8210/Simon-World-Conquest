// 100x55 hex grid world map
// . = ocean
// Each letter = 1 hex belonging to a country
// Designed for odd-r offset coordinates, then converted to axial

const MAP = [
//  0         1         2         3         4         5         6         7         8         9
//0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
"....................................................................................................",//0
".............................................RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR..............",//1
"....................................RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR............",//2
"...................................RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR..........",//3
"..............................CCCCCCCCC.RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR.........",//4
"............................CCCCCCCCCCCCRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR.......",//5
"...........................CCCCCCCCCCCCCRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR...",//6
"..........................CCCCCCCCCCCCCCCCCRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR...",//7
".........................CCCCCCCCCCCCCCCCRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR..",//8
"........................CCCCCCCCCCCCCCCCCRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR..",//9
".......................CCCCCCCCCCCCCCCCRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR.",//10
"......................CCCCCCCCCCCCCCCCRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRHHHHHHHHHHHHHHHHHH..",//11
".....................CCCCCCCCCCCCCCCCC.RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRHHHHHHHHHHHHHHHHHHH.",//12
"....................CCCCCCCCCCCCCCCCC..RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRHHHHHHHHHHHHHHHHHHHH",//13
"....................CCCCCCCCCCCCCCCCC..KKEEGGPPPRRRRRRRRRRRRRRRRRRRRRRRRHHHHHHHHHHHHHHHHHHHHHHHHHHH",//14
"....................CCCCCCCCCCCCCCCCC..KKEEEGGPPPRRRRRRRRRRRRRRRRRRRRRRRHHHHHHHHHHHHHHHHHHHHHHHHHHHH",//15
".....................CCCCCCCCCCCCCCCC..KKFFSGGGPPRRRRRRRRRRRRRRRRRRRRRRRRRHHHHHHHHHHHHHHHHHHHHHHHHH",//16
"......................CCCCCCCCCCCCCCC....FFSSSGPPRRRRRRRRRRRRRRRRRRRRRRRRRHHHHHHHHHHHHHHHHHHHHHHHH",//17
".......................CCCCCCCCCCCCC....FFSSSIIPPRRRRRRRRRRRRRRRRRRRRRRRHHHHHHHHHHHHHHHHHHHHHHHHHH",//18
"........................UUUUUCCCCCCC....FSSSSIIIP.RRRRRRRRRRRRRRRRRRRRRRRRHHHHHHHHHHHHHHHHHHHHHHHHH",//19
".........................UUUUUUUCCCCC....DDSSSIITTTRRRRRRRRRRRRRRRRRRRRRRRHHHHHHHHHHHHHHHHHHHHHHHHH",//20
"..........................UUUUUUUUCC.....DDDDDITTTRRRRRRRRRRRRRRRRRRRRRRRRHHHHHHHHHHHHHHHHHHHHHHHH",//21
"............................UUUUUUU......DDDDIIITTRRRRRRRRRRRRRRRRRRRRRRHHHHHHHHHHHHHHHHHHHHHHH",//22
".............................UUUUUU......DDDDIIIIRRRRRRRRRRRRRRRRRRRRRRRRHHHHHHHHHHHHHHHHHHHHH",//23
"..............................UUUUU......DDDDDIIIRR.RRRRRRRRRRRRRRRRRRRRRRHHHHHHHHHHHHHHHHHHHH",//24
"...............................MMMMU.....DDDDDDDDIIRRRRRRRRRRRRRRRRRRRRRRRHHHHHHHHHHHHHHHHHHH",//25
"................................MMM......DDDNNNDDDD......RRRRRRRRRRRRRRRRRHHHHHHHHHHHHHHHHHH",//26
".................................LL.....DDDNNNNNDD.......WWWWWWWWWWWWWWWWWWW..HHHHHHHHHHHHHHH",//27
".................................LLL....DDNNNNNNNNDD......WWWWWWWWWWWWWWWWWWWWWW.HHHHHHHHHH",//28
".................................LLL....DNNNOOOONNDD.......WWWWWWWWWWWWWWWWWWWWWWW.HHHHHHHHH",//29
".................................ZLL.....NNNNOOOOO......WWWWWWWWWWWWWWWWWWWWWWWW.HHHHHHH",//30
".................................ZLL.....NNNOOOOO.......WWWWWWWWWWWWWWWWWWWWWWWWWW.HHHHHH",//31
".................................ZZLL....NNNOOOO........WWWWWWWWWWWWWWWWWWWWWWWWWW..HHHHH",//32
"................................ZZZL....NNNNO.........WWWWWWWWWWWWWWWWWWWWWWWWWW..HHHH",//33
"...............................ZZZZL.....NNNN...........WWWWWWWWWWWWWWWWWWWWWWWWW..HHH",//34
"..............................ZZZZZL......NNN...........WWWWWWWWWWWWWWWWWWWWWWWWW.HHH",//35
".............................B.BBZZZL......NNN............WWWWWWWWWWWWWWWWWWWWWW..HH",//36
"............................BBBB.ZZL........NN.............WWWWWWWWWWWWWWWWWWWWW..H",//37
"...........................BBBBB..ZL........N..............WWWWWWWWWWWWWWWWWWWW..H",//38
"..........................BBBBBB..LL.......................WWWWWWWWWWWWWWWWWWWW.",//39
".........................BBBBBBB.LLL........................WWWWWWWWWWWWWWWWWWWW.",//40
"........................BBBBBBBBB.LLL.......................WWWWWWWWWWWWWWWWWWWW.",//41
".......................BBBBBBBBBBB.LLL........................WWWWWWWWWWWWWWWWWWW.",//42
"......................AAAAAAAAAA..LL.........................WWWWWWWWWWWWWWWWWWWW.",//43
".....................AAAAAAAAAAA...L..........................WWWWWWWWWWWWWWWWWW.",//44
"......................AAAAAAAAA..................................WWWWWWWWWWWWWWWW.",//45
".......................AAAAAA....................................WWWWWWWWWWWWWWW.",//46
"........................AAAA......................................WWWWWWWWWWWWWW.",//47
".............................A...................................WWWWWWWWWWWWWW.",//48
"..............................A...................................WWWWWWWWWWWWW.",//49
".............................................................................XXXX.",//50
".............................................................................XXXX.",//51
"..............................................................................XXX.",//52
"..............................................................................XX..",//53
"...............................................................................X..",//54
];
