var scores, roundscore, activePlayer, gameOn, lastRoll;  // Define your variables together to make it easier to read and organize

function newGame() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gameOn = true     //0 will be player one             and                1 will be player two



// (document) --------- refers to your html
//(.querySelector) -------- refers to your id or class that you want to select from the html
//("#current-0") --------- means you selected an 'id'(remember #) and not a 'class'(remember .)!
// .textContent -----------   want to change your text? BOOM, your welcome. {Note: it's only plain text}

//                       --------LOOK BELOW-------

//-------------document.querySelector("#current-0").textContent = dice;


// drop the 0 in "#current-0" and just add activePlayer...........more simple
//document.querySelector("#current-" + activePlayer).textContent = dice;

// .innerHTML changes the text within your HTML
// "<em>" of course means Italics...
//document.querySelector("#current-" + activePlayer).innerHTML  = "<em>" + dice + "</em>";



//    * BE CAREFUL *     your end value can only be premitives (strings, booleans, numbers)
document.querySelector(".dice").style.display = "none";


//.getElementById just another way other than .querySelector *{Note-- you dont need to "#" you id in this method}*
document.getElementById('current-0').textContent = "0";
document.getElementById('current-1').textContent = "0";
document.getElementById('score-0').textContent = "0";
document.getElementById('score-1').textContent = "0";

/* You can place/call your function on the outside of your parameters i.e."('click', btn)" like such below-----

function btn() {
  --Do Something
}
btn(); */

document.getElementById('name-0').textContent = "Player 1"
document.getElementById('name-1').textContent = "Player 2"


document.querySelector(".player-1-panel").classList.remove("active");
document.querySelector(".player-0-panel").classList.remove("active");
document.querySelector(".player-" + activePlayer + "-panel").classList.add("active");
document.querySelector(".player-0-panel").classList.remove("winner");
document.querySelector(".player-1-panel").classList.remove("winner");

};


newGame();                //  *refer to line 3*




// or place it inside
document.querySelector(".btn-roll").addEventListener('click', function() {
  //1. Random number
  //create random number with dice by using the math object!
  if (gameOn) {var dice = Math.floor(Math.random() * 6) + 1;

  //2. Display the result
  var diceIMG = document.querySelector(".dice");
  diceIMG.style.display = "none";
  diceIMG.src = "dice-" + dice + "png";

//===========UPDATING SCORE AND ALTERNATING PLAYERS===========================
 if (lastRoll === 6 && dice === 6) {
   scores[activePlayer] = 0;
   document.querySelector("#score-" + activePlayer).textContent = 0;
   nextPlayer();
 }
  //3. Update the round number IF roll != 1
  else if (dice !== 1) {
    //add number
    roundScore += dice
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    //Next players turn

                     //============OPTION 1=============
    /*activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // ternary if/else
    roundScore = 0; // roundScore is set back to 0 after a one is rolled.

    document.getElementById('current-0').textContent = "0";
    document.getElementById('current-1').textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active"); //toggle turns "active" on and off.
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";*/


    //same as
    /*if (activePlayer === 0){
      activePlayer = 1
    } else {
      activePlayer = 0
    }*/

                  //===============OPTION 2===============
                  //note------since youre using the dry method, you can just call the functions
    nextPlayer(); // <----------------------------------------- See?                               *refer to line 150*

  }
  lastRoll = dice;
 }
});


document.querySelector(".btn-hold").addEventListener("click", function(){
  //add current score to global score
  if (gameOn) {
    scores[activePlayer] += roundScore;

  //update user interface
  document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

  //check if player won game
  if (scores[activePlayer] >= 100) {
    document.querySelector("#name-" + activePlayer).textContent = "Player " + (activePlayer + 1) + " is the Winner";
//want to remove the active dot by players name

    //===============OPTION 1======================
    /*document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");*/

    //===========OPTION 2==================== less code, less work
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    gameOn = false;

//want to hide dice image once winner is declared
    document.querySelector(".dice").style.display = "none";
  } else {

     //Next player
    nextPlayer(); // <----------------------------------------- See?                     *refer to line 150*
  }
}



})
          //=============DONT REPEAT YOURSELF METHOD=========================
          //We created a seperate function just in case we make changes, it wont affect other properties.

function nextPlayer() {
  //Next players turn

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // ternary if/else
  roundScore = 0; // roundScore is set back to 0 after a one is rolled.

  document.getElementById('current-0').textContent = "0";
  document.getElementById('current-1').textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active"); //toggle turns "active" on and off.
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}


document.querySelector(".btn-new").addEventListener("click" , newGame); // instead of calling anonymous function, just call newGame function instead.
                                                              // ^
                                                      //  *refer to line 3*
