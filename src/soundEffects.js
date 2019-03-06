import React from "react";
import { Speech } from 'expo';

/* Sounds to play for correct input */
const winSounds =  [
            "Awesome!", "Good Work!", "Keep Going!",
            "Doing Great!", "Wham Bam!", "That's it!"
        ];  
/* Sounds to play for incorrect input */
const loseSounds =  [
            "Oh no!", "Almost!", "Not quite!", 
            "Try again!", "You lost!", "Too bad!"
        ]; 

const soundEffects = {
    
    /**
     *  @function encouragementSound
     *  pass either a positive or negative message, randomly from the arrays above
     * @param {boolean}} didTheyWin - true if correct, false if incorrect
     */

    encouragementSound(didTheyWin) {
        var index =  Math.floor(Math.random() * Math.floor(winSounds.length));

        if(didTheyWin) {
            Speech.speak(winSounds[index]);
        }

        else if (!didTheyWin) {
            Speech.speak(loseSounds[index]);
        }
    },

    /**
     *  @function wordPromptSound
     *  Used in bingo to read a word aloud
     * @param {string} word - The current prompt word to voice
     */
    wordPromptSound(word) {
        Speech.speak(word);
    },

    /**
     *  @function nextLevelSound
     *  To play when successfully completing a level
     */
    nextLevelSound() {
        Speech.speak("Next Level!");
    },

    /**
     * @function gameOverSound 
     *  To play when user loses
     */
    gameOverSound() {
        Speech.speak("Game Over!");
    },

}

export default soundEffects;