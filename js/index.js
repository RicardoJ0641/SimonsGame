/*
* Class used to play Simon's Game
*/
class SimonsGame {
    
    //array that holds the order in which the user has to click the buttons
    #buttonPrompts;

    //pressed buttons by the user
    #pressedButtons;

    //current button prompt the user is entering
    #currentButtonPrompt;

    //delay it takes for each button to be displayed when starting a round
    #buttonDisplayDelayInMilliseconds;

    constructor() {
        this.#buttonPrompts = [];
        this.#pressedButtons = [];
        this.#currentButtonPrompt = 0;
        this.#buttonDisplayDelayInMilliseconds = 600;
    }

    /*
    * Resets all game variables so the game can be restarted
    * @return none
    */
    #resetGame() {
        this.#buttonPrompts = [];
    }

    /*
    * Resets all user inputted variables so a user can go on to the next round
    * @return none
    */
    #resetUserInput() {
        this.#pressedButtons = [];
        this.#currentButtonPrompt = 0;
    }

    /*
    * Plays the game over sound
    * @return none
    */
    #playGameOverSound() {

        let audio; 

        //randomly selects one of 4 game over sounds
        let soundPicker = Math.floor((Math.random() * 4) + 1);

        switch(soundPicker) {
            case 1:
                audio = new Audio('resources\\sounds\\gameover sounds\\zapsplat_multimedia_game_error_tone_001_24919.mp3');
                audio.play();
                break;
            case 2:
                audio = new Audio('resources\\sounds\\gameover sounds\\zapsplat_multimedia_game_error_tone_002_24920.mp3');
                audio.play();
                break;
            case 3:
                audio = new Audio('resources\\sounds\\gameover sounds\\zapsplat_multimedia_game_error_tone_003_24921.mp3');
                audio.play();
                break;
            case 4:
                audio = new Audio('resources\\sounds\\gameover sounds\\zapsplat_multimedia_game_error_tone_004_24922.mp3');
                audio.play();
        }
    }

    /*
    * Plays the victory sound
    * @return none
    */
    #playVictorySound() {
        let audio = new Audio('resources\\sounds\\victory sounds\\zapsplat_cartoon_bubble_pop_001_40315.mp3');
        audio.play();
    }

    /*
    * Resets the list that holds the order in which the user has to click the buttons
    * @return {string} id of the next button the user must click 
    */
    #getNextButtonId() {
      
        let nextButtonId = "";
        let nextButtonNumber = Math.floor((Math.random() * 4) + 1);

        switch(nextButtonNumber) {
            case 1:
                nextButtonId = "button-green";
                break;
            case 2:
                nextButtonId = "button-red";
                break;
            case 3:
                nextButtonId = "button-yellow";
                break;
            case 4:
                nextButtonId = "button-blue";
        }

        return nextButtonId;
    }

    /*
    * Updates the game round text to show the current round number 
    * @return none
    */
    #updateRoundText() {
        $(".round-text").text("Round " + (this.#buttonPrompts.length + 1) + "!");
    }

    /*
    * Updates the info text to show information about the game 
    * @param {string} info Information about the current state of the game
    * @return none
    */
    #updateInfoText(info) {
        $(".info-text").text(info);
    }

    /*
    * Adds a button to the list of buttons the user must click
    * @return none
    */
    #addButtonToButtonPrompts() {
        let buttonId = this.#getNextButtonId();
        this.#buttonPrompts.push(buttonId);
    }

    
    /*
    * Removes the click events from the game buttons
    * @return none
    */
    #setButtonsClickOff() {
        $("#button-green").unbind();
        $("#button-red").unbind();
        $("#button-yellow").unbind();
        $("#button-blue").unbind();
    }

    /*
    * Displays the button prompts in the game by highlighting the button and playing its audio queue
    */
    #displayButtonPrompts() {
        
        let audio;
        let delayInMilliseconds = this.#buttonDisplayDelayInMilliseconds;
        let buttonId;
        let self = this;
        let x = 0;

        // displays each button after a delay of (delayInMiliseconds + 100) miliseconds
        //this here is a loop with a delay (yup)
        (function displayEachButton(audio, delayInMilliseconds, buttonId, self, x) {
            setTimeout( function() {

                buttonId = self.#buttonPrompts[x];
    
                // highlights the button and plays its sound jingle
                switch (buttonId) {
    
                    case "button-green":
    
                        //highlights the button
                        $("#button-green").addClass("highlight-green");
    
                        audio = new Audio('resources\\sounds\\button sounds\\green button\\zapsplat_cartoon_fast_descend_delicate_glassy_001_64292.mp3');
                        audio.play();
    
                        //un-highlights the button after some time
                        setTimeout(function() {
                            $("#button-green").removeClass("highlight-green");
                        }, delayInMilliseconds  - 50);
    
                        break;
    
                    case "button-red":
    
                        //highlights the button
                        $("#button-red").addClass("highlight-red");
    
                        audio = new Audio('resources\\sounds\\button sounds\\red button\\zapsplat_cartoon_fast_descend_delicate_glassy_002_64207.mp3');
                        audio.play();
    
                        //un-highlights the button after some time
                        setTimeout(function() {
                            $("#button-red").removeClass("highlight-red");
                            }, delayInMilliseconds  - 50);
    
                        break;
                        
                    case "button-yellow":
    
                        //highlights the button
                        $("#button-yellow").addClass("highlight-yellow");
    
                        audio = new Audio('resources\\sounds\\button sounds\\yellow button\\zapsplat_cartoon_knocking_high_pitched_delicate_glass_002_64211.mp3');
                        audio.play();
    
                        //un-highlights the button after some time
                        setTimeout(function() {
                            $("#button-yellow").removeClass("highlight-yellow");
                            }, delayInMilliseconds  - 50);
    
                        break;  
    
                    case "button-blue":
    
                        //highlights the button
                        $("#button-blue").addClass("highlight-blue");
    
                        audio = new Audio('resources\\sounds\\button sounds\\blue button\\zapsplat_cartoon_bubble_pop_002_40274.mp3');
                        audio.play();
    
                        //un-highlights the button after some time
                        setTimeout(function() {
                            $("#button-blue").removeClass("highlight-blue");
                            }, delayInMilliseconds - 50);                    
                }
    

                if (x < self.#buttonPrompts.length - 1) {
                    x++;
                    displayEachButton(audio, delayInMilliseconds, buttonId, self, x);
                }

            }, delayInMilliseconds);

        })(audio, delayInMilliseconds, buttonId, self, x);

    }

    /*
    * Displays animation that all button prompts were successfully entered
    */
    #displayVictory() {


        let x = 0;

        //makes all 4 buttons flash a specified amount of times
        (function flashButtons(x) {
            setTimeout( function() {

                if (x % 2 == 0) {
                    //adds the effect
                    $("#button-green").addClass("highlight-green");
                    $("#button-red").addClass("highlight-red");
                    $("#button-yellow").addClass("highlight-yellow");
                    $("#button-blue").addClass("highlight-blue");
                }
                else {
                    //removes the effect
                    $("#button-green").removeClass("highlight-green");
                    $("#button-red").removeClass("highlight-red");
                    $("#button-yellow").removeClass("highlight-yellow");
                    $("#button-blue").removeClass("highlight-blue");
                }

                if (x < 1) {
                    x++;
                    flashButtons(x);
                }

            }, 150);

        })(x);
    }

    /*
    * Displays animation that a button was incorrectly pressed
    */
    #displayWrongButtonClicked() {
        
        $("html body").addClass("game-over")
        let delayInMilliseconds = 600; //timeout delay

        //removes the game over color
        setTimeout(function() {
            $("html body").removeClass("game-over");
            }, delayInMilliseconds);

    }

    /*
    * validates if the user has finished entering the buttons or if they 
    * entered the wrong one.
    * 
    * If all buttons were selected properly, will move the user onto the next round
    * 
    * If the user made a mistake, will display that the user made a mistake and reset
    * the button prompts
    * 
    * @param {SimonsGame} reference to the same object (this is used since this function is called from an event handler)
    * @return none
    */
    #validateInput(self) {

        let index = self.#currentButtonPrompt - 1;

        // last entered button is incorrect
        if (self.#pressedButtons[index] != self.#buttonPrompts[index]) {

            console.log("WRONG INPUT");
            this.#updateInfoText("Wrong!");

            //removes click event from game buttons
            self.#setButtonsClickOff();

            self.#playGameOverSound();

            self.#displayWrongButtonClicked();

            // waits before restarting the game
            let delayInMilliseconds = 1000; //timeout delay

            setTimeout(function() {
                
                 // restarts the game
                self.#resetGame();
                self.#resetUserInput(); 
                self.playGame();
            }, delayInMilliseconds);

        }

        else {

            // user has inputted all the correct buttons
            if (self.#pressedButtons.join(',') === self.#buttonPrompts.join(',')) {

                console.log("CORRECT INPUT");
                this.#updateInfoText("Correct!");

                //removes click event from game buttons
                self.#setButtonsClickOff();

                self.#playVictorySound();

                self.#displayVictory();

                // waits before running the next round
                let delayInMilliseconds = 1000; //timeout delay
                
                setTimeout(function() {
                    
                    // runs the next round
                    self.#resetUserInput(); 
                    self.playGame();

                }, delayInMilliseconds);

            }
        }
    }

    /*
    * Readies the game buttons to receive user input 
    * @return none 
    */
    #readyUserInput() {

        let self = this;

        /* Adds click event listeners to each of the 4 buttons */

        $("#button-green").click(function() {
            
            //highlights the button
            $("#button-green").addClass("highlight-green");

            let audio = new Audio('resources\\sounds\\button sounds\\green button\\zapsplat_cartoon_fast_descend_delicate_glassy_001_64292.mp3');
            audio.play();

            let delayInMilliseconds = 300; //timeout delay

            //un-highlights the button after some time
            setTimeout(function() {
                $("#button-green").removeClass("highlight-green");
              }, delayInMilliseconds);

            // adds button to list of pressed buttons
            self.#pressedButtons.push("button-green");
            self.#currentButtonPrompt++;

            // validates if the user has finished entering the buttons or if they entered the wrong one
            self.#validateInput(self);
        })

        $("#button-red").click(function() {
            
            //highlights the button
            $("#button-red").addClass("highlight-red");

            let audio = new Audio('resources\\sounds\\button sounds\\red button\\zapsplat_cartoon_fast_descend_delicate_glassy_002_64207.mp3');
            audio.play();

            let delayInMilliseconds = 300; //timeout delay

            //un-highlights the button after some time
            setTimeout(function() {
                $("#button-red").removeClass("highlight-red");
                }, delayInMilliseconds);

            // adds button to list of pressed buttons
            self.#pressedButtons.push("button-red");
            self.#currentButtonPrompt++;

            // validates if the user has finished entering the buttons or if they entered the wrong one
            self.#validateInput(self);
        })        

        $("#button-yellow").click(function() {
            
            //highlights the button
            $("#button-yellow").addClass("highlight-yellow");

            let audio = new Audio('resources\\sounds\\button sounds\\yellow button\\zapsplat_cartoon_knocking_high_pitched_delicate_glass_002_64211.mp3');
            audio.play();

            let delayInMilliseconds = 300; //timeout delay

            //un-highlights the button after some time
            setTimeout(function() {
                $("#button-yellow").removeClass("highlight-yellow");
                }, delayInMilliseconds);

            // adds button to list of pressed buttons
            self.#pressedButtons.push("button-yellow");
            self.#currentButtonPrompt++;

            // validates if the user has finished entering the buttons or if they entered the wrong one
            self.#validateInput(self);
        })

        $("#button-blue").click(function() {
            
            //highlights the button
            $("#button-blue").addClass("highlight-blue");

            let audio = new Audio('resources\\sounds\\button sounds\\blue button\\zapsplat_cartoon_bubble_pop_002_40274.mp3');
            audio.play();

            let delayInMilliseconds = 300; //timeout delay

            //un-highlights the button after some time
            setTimeout(function() {
                $("#button-blue").removeClass("highlight-blue");
                }, delayInMilliseconds);

            // adds button to list of pressed buttons
            self.#pressedButtons.push("button-blue");
            self.#currentButtonPrompt++;

            // validates if the user has finished entering the buttons or if they entered the wrong one
            self.#validateInput(self);
        })
    }

    /*
    * Gets the list that holds the order in which the user has to click the buttons 
    * @return {array} list with the order in which the user has to click the buttons 
    */
    get buttonPrompts() {
        return this.#buttonPrompts;
    }
    
    /*
    * Plays the game indefinitely
    */
    playGame() {

        console.log("NEW ROUND HAS STARTED");

        //updates the game text prompt the user sees
        this.#updateRoundText();
        this.#updateInfoText("Get Ready!");

        //adds a new button prompt to the list of buttons
        this.#addButtonToButtonPrompts();

        //replays buttons prompt list
        this.#displayButtonPrompts();

        let self = this;

        setTimeout(function() {
          
            //gets user input and validates it
            self.#updateInfoText("Click the Buttons!");
            self.#readyUserInput();

        }, this.#buttonDisplayDelayInMilliseconds * (this.#buttonPrompts.length + 1))
    }
}

let gameStarted = false;

//starts the game
$(document).on("click keypress", function() {

    if (!gameStarted) {
        gameStarted = true;

        $(".round-text").text("Get ready!");
        let simonsGame = new SimonsGame();
        simonsGame.playGame();

    }
  });
