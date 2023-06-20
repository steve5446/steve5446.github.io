  function loadCSS() {
        var fileref = document.createElement("link");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", "https://" + window.learnWiseSetup.host + "/lw_canvas.css");
        fileref.setAttribute("rel", "stylesheet");
        document.getElementsByTagName("head")[0].appendChild(fileref);

  }  
  function addFloatingButton() {
    var button = $("<div id='lw-floating-button' style='display: none'>").text("?");
    
    button.click(function() {
      var overlay = $("<div id='lw_overlay' style='display: none'>");
      var iframe = $("<iframe id='lw-overlay-iframe'>").attr("src", "https://" + window.learnWiseSetup.host + "/iframe/chat_frame.html");
      
      overlay.append(iframe);
      $("body").append(overlay);

      overlay.click(function() {
        $("#lw_overlay").remove();
      });
      overlay.fadeIn();
    });
    
    $("body").append(button);
    button.fadeIn();
  }
  
  loadCSS();
  addFloatingButton();


  var onMessageServerLoaded = function (messageServer) {
    messageServer.bind("hideOverlay", (request, response) => {
      $("#lw_overlay").remove();
    });
  
    messageServer.bind("rest.get", (request, response) => {
      $.get(request.url, response);
    });    
  };	
  

  $.getScript("https://" + window.learnWiseSetup.host + "/message_server.js");
