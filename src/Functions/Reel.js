/*
**
** Setting Reel Symbol in order
**
*/
const reelSymbols = ['3xBAR', 'BAR', '2xBAR', '7', 'CHERRY'];

/*
**
** Setting Reel Lines,
** this is for debug mode.
**
*/
const reelLines = ['TOP','CENTER','BOTTOM'];

/*
**
** Get Symbol based on before or next symbol
**
*/
function getSymbol(symbol, which) {

  let newSymbol;
  let i = reelSymbols.indexOf(symbol);

  if( which === 'prev' ) {

    newSymbol = reelSymbols[i===0?reelSymbols.length-1:i-1];

  } else {

    newSymbol = reelSymbols[i===reelSymbols.length-1?0:i+1];

  }

  return newSymbol;

}

/*
**
** Get Random Symbol for first position and for random spin
**
*/
function getRandomSymbol() {

  return reelSymbols[Math.floor(Math.random()*reelSymbols.length)];

}

/*
**
** Setting Point Rules combination of lines
**
*/
function pointRules(line, linePosition) {

  let point = 0

  if(line[0]==="CHERRY" &&
     line[1]==="CHERRY" &&
     line[2]==="CHERRY") {
       // 3 CHERRY symbols on top line 2000
       if(linePosition === 'top') point = point + 2000
       // 3 CHERRY symbols on center line 1000
       else if(linePosition === 'center') point = point + 1000
       // 3 CHERRY symbols on bottom line 4000
       else if(linePosition === 'bottom') point = point + 4000
     }

  // 3 7 symbols on any line 150
  if(line[0]==="7" &&
     line[1]==="7" &&
     line[2]==="7") point = point + 150;

  // 3 3xBAR symbols on any line 50
  if(line[0]==="3xBAR" &&
     line[1]==="3xBAR" &&
     line[2]==="3xBAR") point = point + 50;

  // 3 2xBAR symbols on any line 20
  if(line[0]==="2xBAR" &&
     line[1]==="2xBAR" &&
     line[2]==="2xBAR") point = point + 20;

  // 3 BAR symbols on any line 10
  if(line[0]==="BAR" &&
     line[1]==="BAR" &&
     line[2]==="BAR") point = point + 10;

  // Combination of any BAR symbols on any line 5
  if(line[0]==="BAR" ||
     line[1]==="BAR" ||
     line[2]==="BAR") point = point + 5;

  // Any combination of CHERRY and 7 on any line 75
  if((line.indexOf("CHERRY") !== -1) && (line.indexOf("7") !== -1)) point = point + 75;

  return point;

}

export { reelSymbols, reelLines, pointRules, getSymbol, getRandomSymbol };
