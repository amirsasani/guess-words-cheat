/*  
  Name: Word guess games cheat
  Description: A script for cheating in guess word games
  Author: Amir Sasani
  Github: www.github.com/amirsasani
 */

// a function to make indexes array of given variable (here I named chars) with given array length
function makeIndexes(chars, wordLength) {
  let indexes = [];
  while (indexes.length < wordLength) {
    const index = Math.floor(Math.random() * chars.length);
    if (indexes.indexOf(index) === -1) indexes.push(index);
  }

  return indexes.join("");
}

// this function calculates factoril, it used to calculate the for loop to generate indexes
function fact(number) {
  let output = 1;
  for (let i = 1; i <= number; i++) {
    output *= i;
  }
  return output;
}

// define DOM variables to get input values and button event (Click) in "index.html" file
const charsInput = document.getElementById("charsInput");
const wordsLength = document.getElementById("wordsLength");
const charsButton = document.getElementById("charsButton");

// user input characters array
let chars = [];

// the button for generatin words in clicked
charsButton.onclick = function() {
  // empty the #list tag
  document.getElementById("list").innerHTML = "";

  // checks if the #wordsLength input is empty or the user entered zero, change it to 1 to prevent errors
  if (
    wordsLength.value == "" ||
    wordsLength.value == " " ||
    wordsLength.value == "0"
  )
    wordsLength.value = "1";

  // if the user entered something in #charsInput input
  if (charsInput.value != "") {
    // trim the input to delete spaces around characters
    chars = charsInput.value.trim().split("");
    // check if the characters (between other characters) are space, splice (delete) them
    chars.forEach((char, index) => {
      if (char == " ") chars.splice(index, 1);
    });

    // the indexes array
    const indexes = [];

    // calculates the end bound for generating indexes loop with permutation formula
    const loopEndBound =
      fact(chars.length) / fact(chars.length - parseInt(wordsLength.value));

    // make indexes in a while loop, I used while loop to sure that exactly equals the loopEndBound variable in previuos
    while (indexes.length < loopEndBound) {
      const index = makeIndexes(chars, parseInt(wordsLength.value));
      // check duplicate value in indexes array
      if (indexes.indexOf(index) === -1) {
        indexes.push(index);
      }
    }

    // sorts the indexes array for UX reasons
    indexes.sort();
    // the generated words array to show the user
    let words = [];
    // loop through indexes
    indexes.forEach(index => {
      // the indexes are string, so split them to convert them to characters
      index = index.split("");
      // a temporary variable for word to push to the main words variable
      let word = [];
      // loop the index element (in indexes array) and convert them into characters and push them to the word array variable
      index.forEach(i => {
        word.push(chars[parseInt(i)]);
      });
      // convert word array variable to string
      words.push(word.join(""));
    });

    // loop through generated words and add to the #list tag
    words.forEach(word => {
      document.getElementById("list").innerHTML +=
        "<div class='word'>" + word + "</div>";
    });
  }
};
