const fs = require('fs')

const  readerStream = fs.createReadStream('../1/data.txt')

let countLoss = 0; // количество проигранных партий,
let countWin = 0; // количество выигранных партий,
let currentLine = '';

readerStream
  .setEncoding('UTF8')
  .on('data', (chank) => {
    let lines = (currentLine + chank).split(/\r?\n/);
    currentLine = lines.pop();  // Сохраняем неполное окончание строки для следующей порции данных

    lines.forEach((line) => {
      if (line.includes('Вы угадали!')) {
        countWin++;
      };
      if(line.includes('Не угадали!')) {
        countLoss++;
      }
    });
  })
  .on('end', () => {
    if (currentLine.includes('Вы угадали!')
        || currentLine.includes('Не угадали!')
    ) {
      countWin++;
      countLoss++;
    }
    console.log('Общее количество партий:', countWin + countLoss);
    console.log('Количество выигранных/проигранных партий:', countWin, countLoss);
    console.log('Процентное соотношение выигранных партий:', (countWin/countLoss).toFixed(10));
  })
