const list_countries = ["ECUADOR", "ARGENTINA", "CANADA", "PANAMA", "MEXICO", "BOLIVIA", "URUGUAY", 
    "PARAGUAY", "BRAZIL", "COLOMBIA", "FRANCE", "BELGIUM", "GERMANY", "POLAND", "SLOVAKIA", "SERBIA",
    "SLOVENIA", "ROMANIA", "BULGARIA", "ALBANIA", "KOSOVO", "LATVIA", "SWEDEN", "NORWAY", "FINLAND", 
    "DENMARK", "ESTONIA", "RUSSIA", "KAZAKHSTAN", "KYRGYZSTAN", "MONGOLIA", "THAILAND", "JORDAN", 
    "CAMBODIA", "BHUTAN", "MALAYSIA", "SINGAPORE", "BRUNEI", "TAIWAN", "TUNISIA", "UGANDA", "SOMALIA", 
    "ETHIOPIA", "ERITREA", "SENEGAL", "NAMIBIA", "NIGERIA", "ESWATINI", "LESOTHO", "ALGERIA", "ANGOLA", 
    "RWANDA", "BURUNDI", "BOTSWANA", "ZAMBIA", "ZIMBABWE", "TURKEY", "GREECE", "BELARUS", "CAMEROON",
    "MOROCCO", "MAURITANIA", "ANDORRA", "ARMENIA", "AUSTRALIA", "BAHAMAS", "BAHRAIN", "BELIZE", "COMOROS",
    "CYPRUS", "DJIBOUTI", "DOMINICA", "GEORGIA", "GUYANA", "HONDURAS", "ICELAND", "IRELAND", "JAMAICA",
    "KUWAIT", "LEBANON", "MALAWI", "MOLDOVA", "MYANMAR", "PAKISTAN", "SURINAME", "TUVALU", "VANUATU"];

const LettersGuessedUL = document.querySelector('#guessed-letters');
const GuessesRemaining = document.querySelector('#lives');
const GuessWord = document.querySelector('#guessword');
const NumWins = document.querySelector('#wins');
const LastCountry = document.querySelector('#lastcountry');

let wins = 0;
let GuessCountry = "";
let GuessProgress = "";
let numlives = 10;
let LetterGuessed = [];
let LetterGuessedHTML = '';
let theLastCountry = "";
    
const intakeLetter = function(event) {
    const key = event.key.toUpperCase();
    
    if (!(LetterGuessed.includes(key))) {

        if (GuessCountry.includes(key)) {
            for (let i = 0; i < GuessCountry.length; i++) {
                if (GuessCountry[i] === key) {
                    GuessProgress = GuessProgress.substring(0, i) + key + GuessProgress.substring(i+1);
                }
            }
        }

        else {
            LetterGuessedHTML += `<li>${key}<li>`;
            LetterGuessed.push(key);
            numlives--;
        }

        if (numlives === 0) {
            resetGame();
        }
    
        else if (GuessCountry === GuessProgress) {
            winGame();
        }

        else {
            updateGame();
        }
    }
}
    
const winGame = function() {
    wins++;
    resetGame();
}
    
const resetGame = function() {
    numlives = 10;
    GuessProgress = "";
    theLastCountry = GuessCountry;
    GuessCountry = list_countries[Math.floor(Math.random() * list_countries.length)];
    LetterGuessed = [];
    LetterGuessedHTML = '';

    for (let i = 0; i < GuessCountry.length; i++){
        GuessProgress += "_";
    }
    
    updateGame();
}
    
const updateGame = function() {
    GuessWord.innerText = GuessProgress;
    GuessesRemaining.innerText = numlives;
    LettersGuessedUL.innerHTML = LetterGuessedHTML;
    NumWins.innerText = wins;
    LastCountry.innerText = theLastCountry;
}

resetGame();

document.addEventListener('keyup', intakeLetter);