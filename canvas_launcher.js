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
    $("#lw-overlay").fadeOut(function() {
      $("#lw-overlay").remove();
    });
    $("#lw-floating-button").text("?");

    if (!buttoVisible()) {
      $("#lw-floating-button").fadeOut();
    }      

  }

  function showChat() {
    $("#lw-floating-button").text("X");
    var overlay = $("<div id='lw-overlay' style='display: none'>");
    var iframe = $("<iframe id='lw-overlay-iframe'>").attr("src", "https://" + window.learnWiseSetup.host + "/iframe/chat_frame.html");
    
    overlay.append(iframe);
    $("body").append(overlay);

    overlay.click(fadeOutOverlay);
    overlay.fadeIn();

    if (!buttoVisible()) {
      $("#lw-floating-button").fadeIn();
    }
  }

  function addFloatingButton() {
    var button = $("<div id='lw-floating-button' style='display: none'>").text("?");
    
    $("body").append(button);
    if (buttoVisible()) {
      button.fadeIn();
    }      
  }

  function registerListeners() {
    $("#lw-floating-button").click(showChat);

    if (!!window.learnWiseSetup.launchSelectors) {
      window.learnWiseSetup.launchSelectors.forEach(function(selector) {
        $(selector).click(function(event) {
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
      fadeOutOverlay()
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
