Memory Assistant
========================================
App developed by Aidan Hackett for Final Year Project.
    
    Project title: Apps for memory training in older users.

The app contains two versions of two memory tests/games, essentially creating four games.
        
        Game A - Paired Associate Learning Test (Picture Match)
        Game B -  Free Recall & Recognition of Words Test (Word Bingo)     
    
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
    assets
        hawaiiSprites - Contains the sprites used in the generic picture match game.
        thumbIcon - Contains the thumb icon used in the word bingo game.
        logo - Contains all logo icons (splash screen, app home screen, user device)

    app.json, babel.config.js, package-lock.json, package.json - Configuration files 

To-do (Urgent 5, Trivial 1)
======
~~5/5) Add custom testing~~
~~5/5) Fix non-appearance bug~~ 
~~5/5) Fix up custom testing~~ 
~~4/5) Add iOS permissions~~
~~1/5) Change layout of PAL~~
~~2/5) Change layout of PALCustom~~ 
~~1/5) Fish zooming incorrectly~~
~~3/5) PAL comments~~
~~5/5) Fix FR test~~
~~5/5) Fix Going back Bug on Android~~
~~3/5) Prevent early pressing in FR~~
~~3/5) Ready to go > error~~ 
~~1/5) Add more PAL sprites & FR Words~~

    4/5) Randomise Promptbox validation
    4/5) Clean up FR Layout
    4/5) Speed up custom picture selection

    3/5) Add media queries
    3/5) Provide feedback on PAL (Sound alerts, text alerts) (Exchange pop-up alerts for a less intrusive method)    
    
    1/5) Add more FR Words
    1/5) "Find this" pointing to prompt img 


    

