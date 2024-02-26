// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function initialPrompt() {
  console.log("Let's play some scrabble!");
  const enteredWord = input.question('Enter a word: ');
  return enteredWord;
}

const userWord = initialPrompt();
console.log(userWord);

function oldScrabbleScorer(word) {
word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }

    }
  }
  return letterPoints;
}

const pointsScored = oldScrabbleScorer(userWord);
console.log(pointsScored);

function simpleScorer(userWord) {
  let score = 0;
  userWord = userWord.toUpperCase();
  for (let i = 0; i < userWord.length; i++) {
    score += 1; 
  }

  return score;
}

const simpleScorerPoints = simpleScorer(userWord); 
console.log(simpleScorerPoints);

function vowelBonusScorer(userWord) {
  let score = 0;
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  for (let i = 0; i < userWord.length; i++) {
    if (vowels.includes(userWord[i].toUpperCase())) {
      score += 3;
    } else {
      score += 1;
    }
  }
  return score;
}

const vowelPoints = vowelBonusScorer(userWord);
console.log(vowelPoints);

const scoringAlgorithms = [
{
  name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer,

},

  {
    name: "Bonus Vowels",
    description: "Vowels are 3 points, consonants are 1 point.",
    scorerFunction: vowelBonusScorer,

  },

  {
    name: "Scrabble",
    description: "The traditional Scoring algorithm.",
    scorerFunction: scrabbleScorer,

  }

];

function scorerPrompt() {
  console.log('Choose an algorithm');
  for (let i = 0; i < scoringAlgorithms.length; i++) {
    console.log(`Algorithm ${i + 1}: ${scoringAlgorithms[i].name}`);
  }
  let userChoice = input.question("Enter the number of your desired scoring algorithm: ");
  
  return userChoice;

}

function transform(oldPointStructure) {
  const newPointStructure = {};

  for (const pointValue in oldPointStructure) {
    let letter = oldPointStructure[pointValue];
    for (let i = 0; i < letter.length; i++) {
      let lowerCaseLetter = letter[i].toLowerCase();
      newPointStructure[lowerCaseLetter] = Number(pointValue);
    }
  }
  return newPointStructure;

}
const newPointStructure = transform(oldPointStructure);

function scrabbleScorer(word) {
  word = word.toLowerCase();
  let totalPoints = 0;
  
  for (let i = 0; i < word.length; i++) {
    totalPoints += newPointStructure[word[i]];
  }
return totalPoints
}
let scrabbleScorePoints = scrabbleScorer(userWord); 

function runProgram() {
  const userWord = initialPrompt();
  const userAlgorithm = scorerPrompt();
  console.log(userAlgorithm);

  let score = 0;

  if (userAlgorithm === '1') {
    score = simpleScorer(userWord);
  } else if (userAlgorithm === '2') {
    score = vowelBonusScorer(userWord);
  } else if (userAlgorithm === '3') {
    score = scrabbleScorer(userWord);
  } else {
    console.log('Sorry, invalid choice. Try Again.');
  }
  
    console.log(`Your score for ${userWord}: ${score}`);
}



// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt
};
