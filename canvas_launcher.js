function buttoVisible() {
  return window.learnWiseSetup.showButton === undefined || window.learnWiseSetup.showButton;
}

function loadCSS(callback) {
  var fileref = document.createElement("link");
  fileref.setAttribute("type", "text/css");
  fileref.setAttribute("href", "https://" + window.learnWiseSetup.host + "/lw_canvas.css");
  fileref.setAttribute("rel", "stylesheet");
  fileref.onload = callback;
  document.getElementsByTagName("head")[0].appendChild(fileref);
}  

function fadeOutOverlay() {
  const button = document.getElementById("lw-floating-button");
  const image = document.getElementById("lw-floating-image");
  
  if (button && image) {
    button.classList.remove("close");
    button.classList.add("initial");
    image.src = 'https://learnwise.ai/wp-content/uploads/2023/06/LearnWise-Chat-Iocn.svg';
  }
  
  $("#lw-overlay").fadeOut(function() {
    $("#lw-overlay").remove();
  });
  
  if (!buttoVisible()) {
    $("#lw-floating-button").fadeOut();
  }
}

function toggleButtonState() {
  const button = document.getElementById("lw-floating-button");
  const image = document.getElementById("lw-floating-image");

  if (button && image) {
    if (button.classList.contains("initial")) {
      button.classList.remove("initial");
      button.classList.add("close");
      image.src = 'https://learnwise.ai/wp-content/uploads/2023/06/LearnWise-Chat-X.svg';
    } else {
      button.classList.remove("close");
      button.classList.add("initial");
      image.src = 'https://learnwise.ai/wp-content/uploads/2023/06/LearnWise-Chat-Iocn.svg';
    }
  }
}

function showChat() {
  toggleButtonState();
  
  var overlay = $("<div id='lw-overlay' style='display: none'>");
  var iframe = $("<iframe id='lw-overlay-iframe'>").attr("src", window.learnWiseSetup.chatSrc);
  
  overlay.append(iframe);
  $("body").append(overlay);

  overlay.click(fadeOutOverlay);
  overlay.fadeIn();

  if (!buttoVisible()) {
    $("#lw-floating-button").fadeIn();
  }
}

function addFloatingButton() {
  const button = document.createElement("button");
  const image = document.createElement("img");

  button.id = "lw-floating-button";
  image.id = "lw-floating-image";

  button.classList.add("initial");
  image.src = 'https://learnwise.ai/wp-content/uploads/2023/06/LearnWise-Chat-Iocn.svg';

  // Attach event using namespace
  $(button).on('click.lwChat', toggleButtonState);
  button.appendChild(image);
  document.body.appendChild(button);

  if (buttoVisible()) {
    button.style.display = "flex";
  } else {
    button.style.display = "none";
  }
}

function registerListeners() {
  if (!!window.learnWiseSetup.launchSelectors) {
    window.learnWiseSetup.launchSelectors.forEach(function(selector) {
      $(document).on('click', selector, function(event){
        event.preventDefault();
        showChat();          
        return false;
      });
    });
  }
}

loadCSS(function() {
  addFloatingButton();
  registerListeners();
});


var onMessageServerLoaded = function (messageServer) {
  messageServer.bind("hideOverlay", (request, response) => {
    fadeOutOverlay();
  });

  messageServer.bind("getLtiInformation", (request, response) => {
    if ($("#tool_form").length === 1) {
      response({
        "action": $("#tool_form").attr("action"),
        "toolId": $("#tool_form").data("toolId")
      });
    } else {
      response({});
    }
  });

  messageServer.bind("rest.get", (request, response) => {
    $.get(request.url, response);
  });
};  

$.getScript("https://" + window.learnWiseSetup.host + "/message_server.js");
