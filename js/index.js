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

    constructor() {
        this.#buttonPrompts = [];
        this.#pressedButtons = [];
        this.#currentButtonPrompt = 0;
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
    * Updates the game text to show the current round number 
    * @return none
    */
    #updateGameText() {
        $(".round-text").text("Round " + (this.#buttonPrompts.length + 1) + "!");
    }

    /*
    * Adds a button to the list of buttons the user must click
    * @return none
    */
    #addButtonToButtonPrompts() {
        let buttonId = this.#getNextButtonId();
        this.#buttonPrompts.push(buttonId);

        // console.log("button id is added: " + this.#buttonPrompts[0])
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
        let delayInMilliseconds;
        let buttonId;
        let self = this;
        let x = 0;

        // displays each button after a delay of (delayInMiliseconds + 100) miliseconds
        //this here is a loop with a delay (yup)
        (function displayEachButton(audio, delayInMilliseconds, buttonId, self, x) {
            setTimeout( function() {

                buttonId = self.#buttonPrompts[x];

                // console.log("id is" + buttonId);
    
                // highlights the button and plays its sound jingle
                switch (buttonId) {
    
                    case "button-green":
    
                        //highlights the button
                        $("#button-green").addClass("highlight-green");
    
                        audio = new Audio('resources/sounds/green.mp3');
                        audio.play();
    
                        delayInMilliseconds = 600; //timeout delay
    
                        //un-highlights the button after some time
                        setTimeout(function() {
                            $("#button-green").removeClass("highlight-green");
                        }, delayInMilliseconds);
    
                        break;
    
                    case "button-red":
    
                        //highlights the button
                        $("#button-red").addClass("highlight-red");
    
                        audio = new Audio('resources/sounds/red.mp3');
                        audio.play();
    
                        delayInMilliseconds = 600; //timeout delay
    
                        //un-highlights the button after some time
                        setTimeout(function() {
                            $("#button-red").removeClass("highlight-red");
                            }, delayInMilliseconds);
    
                        break;
                        
                    case "button-yellow":
    
                        //highlights the button
                        $("#button-yellow").addClass("highlight-yellow");
    
                        audio = new Audio('resources/sounds/yellow.mp3');
                        audio.play();
    
                        delayInMilliseconds = 600; //timeout delay
    
                        //un-highlights the button after some time
                        setTimeout(function() {
                            $("#button-yellow").removeClass("highlight-yellow");
                            }, delayInMilliseconds);
    
                        break;  
    
                    case "button-blue":
    
                        //highlights the button
                        $("#button-blue").addClass("highlight-blue");
    
                        audio = new Audio('resources/sounds/blue.mp3');
                        audio.play();
    
                        delayInMilliseconds = 600; //timeout delay
    
                        //un-highlights the button after some time
                        setTimeout(function() {
                            $("#button-blue").removeClass("highlight-blue");
                            }, delayInMilliseconds);                    
                }
    

                if (x < self.#buttonPrompts.length - 1) {
                    x++;
                    displayEachButton(audio, delayInMilliseconds, buttonId, self, x);
                }

            }, delayInMilliseconds + 100);

        })(audio, delayInMilliseconds, buttonId, self, x);

    }

    /*
    * Displays animation that all button prompts were successfully entered
    */
    #displayCorrectButtonsClicked() {

        //makes all 3 buttons flash 3 times
        
        for (let x = 0; x < 3; x++) {

            //adds the effect
            $("#button-green").addClass("highlight-green");
            $("#button-red").addClass("highlight-red");
            $("#button-yellow").addClass("highlight-yellow");
            $("#button-blue").addClass("highlight-blue");

            let delayInMilliseconds = 300; //timeout delay

            //removes the effect 
            setTimeout(function() {
                $("#button-green").removeClass("highlight-green");
                $("#button-red").removeClass("highlight-red");
                $("#button-yellow").removeClass("highlight-yellow");
                $("#button-blue").removeClass("highlight-blue");
            }, delayInMilliseconds);
        }
    }

    /*
    * Displays animation that a button was incorrectly pressed
    */
    #displayWrongButtonClicked() {
        
        $("html body").addClass("game-over")
        let delayInMilliseconds = 500; //timeout delay

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
            console.log("pressed button is " + this.#pressedButtons[index]);
            console.log("button prompt is " + this.#buttonPrompts[index]);

            //removes click event from game buttons
            self.#setButtonsClickOff();

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
            
            console.log("pressed buttons is " + self.#pressedButtons + " button prompts is "  + self.#buttonPrompts);

            // user has inputted all the correct buttons
            if (self.#pressedButtons.join(',') === self.#buttonPrompts.join(',')) {

                console.log("CORRECT INPUT");

                //removes click event from game buttons
                self.#setButtonsClickOff();

                self.#displayCorrectButtonsClicked();

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

            let audio = new Audio('resources/sounds/green.mp3');
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

            let audio = new Audio('resources/sounds/red.mp3');
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

            let audio = new Audio('resources/sounds/yellow.mp3');
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

            let audio = new Audio('resources/sounds/blue.mp3');
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
        console.log("current buttom prompts is " + this.#buttonPrompts);
        console.log("pressed buttons is " + this.#pressedButtons);
        console.log("current Button Prompt is " + this.#currentButtonPrompt);

        //updates the game text prompt the user sees
        this.#updateGameText();

        //adds a new button prompt to the list of buttons
        this.#addButtonToButtonPrompts();

        //replays buttons prompt list
        this.#displayButtonPrompts();

        //gets user input and decides whether it's right or not as the user selects the buttons
        this.#readyUserInput();
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
