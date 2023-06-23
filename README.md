The repo consist of two parts,

The code that should be injected into canvas.
   This code is located at the root in the repo.

The code that should go into the iframe.
   This code is located in the sub folder named iframe.



The code that should be injected into canvas.
  This code is doing the following:
    1. Loading the css that should be used for the launch button.
    2. Adding the launch button to the page
    3. Creating an overlay whith an iframe when the button is clicked.
    4. Register a couple of communication points that the code in the iframe can use to retrive information from the lms
       (for instance issue canvas specific api request on behalf of the user logged in to Canvas)


The code that should go into the iframe:
  This code is doing the following:
    1. Setting up require and load "canvas_api"
    2. Use "canvas_api" to fetch information about the user logged in to Canvas.




....to test it in your own env:

Add the following lines to the theme in Canvas(or open Canvas and paste the code into the console):

```
window.learnWiseSetup = {
    showButton: true,
    host: 'steve5446.github.io',
    launchSelectors: ["a[href*=learnwise"],
    chatSrc: "https://steve5446.github.io/iframe/chat_frame.html"
};

$.getScript('https://' + window.learnWiseSetup.host + '/canvas_launcher.js');
```
