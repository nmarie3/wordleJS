#!/usr/bin/env node

import chalk from 'chalk';

interface Guess {
    guess: string;
    answer: string;
}

function checkGuess(word: string, guess: string) {
    let answer:string;
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === word[i]) {
            answer = chalk.green(guess[i]);
        }else{
            answer = chalk.red(guess[i])
        }
    }
    return answer;

}

export {checkGuess}

