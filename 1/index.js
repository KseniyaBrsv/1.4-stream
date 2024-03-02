#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });
const randomNumber = Math.floor(Math.random() * 2) + 1; // загаданное число

console.log("Угадайте случайное число (1 или 2)");
const file = path.join(__dirname, '.', 'data.txt')
function writeLog(data) {
  fs.appendFile(file, data + '\n', (err) => {
    if (err) throw err;
  });
}
const guessNumber = () => {
  rl.question(`Введите число: \n`, (answer) => {
    let result = '';
    if(answer == Number(answer)) {
      if(answer == randomNumber) result = 'Вы угадали!';
      else result = 'Не угадали!'

      writeLog(result);

      rl.question('Хотите сыграть ещё раз? (да/нет): ', (again) => {
        if (again.toLowerCase() === 'да') {
          guessNumber();
        } else {
          console.log('Спасибо за игру!');
          writeLog('--- Конец игры ---');
          rl.close();
        }
      });
    } else {
      console.log('Вы ввели не число. Попробуйте еще раз.');
      guessNumber()
    }
  })
}

guessNumber();

