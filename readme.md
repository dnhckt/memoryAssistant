Memory Assistant
========================================
App developed by Aidan Hackett for Final Year Project.
    
    Project title: Memory Assistant: A Mobile Application for Memory Training in Older Users.
<img src="https://github.com/dnhckt/memoryAssistant/blob/master/AndroidSplash.png" width="200"></img>
<img src="https://github.com/dnhckt/memoryAssistant/blob/master/AndroidHome.png" width="200"></img>

The app contains two versions of two memory tests/games, essentially creating four games.
        
        Game A - Paired Associate Learning Test (Picture Match)
        Game B -  Free Recall & Recognition of Words Test (Word Bingo)     

<img src="https://github.com/dnhckt/memoryAssistant/blob/master/AndroidPALDisplay.png" width="200"></img>
<img src="https://github.com/dnhckt/memoryAssistant/blob/master/AndroidFRPrompt.png" width="200"></img>

These are varied by user group:
        
        Group 1 (Neutral/Generic Content)
        Group 2 (Personally Relevant Content)

This app was created as part of an experimental study.

App Structure
=== 
   
    App.js
        Home screen. This page links to the four games.

    screens
        PALScreen.js - The generic version of the picture match game.
        PALScreenCustom.js  - The personal version of the picture match game.
        FRScreen.js - The generic version of the word bingo game.
        FRScreenCustom.js - The personal version of the word bingo game.
    src
        Style.js - Stylesheet for the app screens.
        Sprites.js - The sprites that are used in the generic picture match game. 
        *FadeView.js - Creates an image that fades in and out:
            Image - Fades in and out immediately after mounting 
            Prompt - Fades in when mounted and out when unmounted
            Bingo - Fades in when mounted and out after 5 seconds 
        soundEffects.js - Functions that produce voice-based alerts 
    assets
        hawaiiSprites - Contains the sprites used in the generic picture match game.
        thumbIcon - Contains the thumb icon used in the word bingo game.
        logo - Contains all logo icons (splash screen, app home screen, user device)

    app.json, babel.config.js, package-lock.json, package.json - Configuration files 
