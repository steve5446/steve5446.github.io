//$(document).ready(function() {
/*  function init_event_listners() {    
    const handlers = {};
  
    window.addEventListener("message", (e) => {
        if (handlers[e.data.messageHandler] == undefined) return;
          var iframes = document.getElementsByTagName('IFRAME');
          for (var i = 0, iframe, win; i < iframes.length; i++) {
            iframe = iframes[i];
        
            // Cross-browser way to get iframe's window object
            win = iframe.contentWindow || iframe.contentDocument.defaultView;
  
            if (win === event.source) {
                e.data.iframe = iframe;
            }
          }
    
  
        handlers[e.data.messageHandler](e.data, (response) => {
            if (e.source && !(e.source instanceof MessagePort) && !(e.source instanceof ServiceWorker)) {
                e.source.postMessage({ messageId: e.data.messageId, response: response }, "*");
            }
        });
    }, false);
  
    return {
        bind: (handlerKey, handler) => {
            handlers[handlerKey] = handler;
        }
    };
  }
*/
  function loadCSS() {
        var fileref = document.createElement("link");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", "https://" + window.learnWiseSetup.host + "/button.css");
        fileref.setAttribute("rel", "stylesheet");
        document.getElementsByTagName("head")[0].appendChild(fileref);

  }  
  function addFloatingButton() {
    var button = $("<div>").addClass("floating-button").text("?");
    
    button.click(function() {
      var overlay = $("<div id='lw_overlay'>").addClass("overlay");
      var iframe = $("<iframe>").addClass("overlay-iframe").attr("src", "https://" + window.learnWiseSetup.host + "/iframe/chat_frame.html");
      
      overlay.append(iframe);
      $("body").append(overlay);

      overlay.click(function() {
        $("#lw_overlay").remove();
      });
    });
    
    $("body").append(button);
  }
  
  loadCSS();
  addFloatingButton();






  var onCommunicatorLoaded = function (iframeCommunicatorServer) {
    iframeCommunicatorServer.bind("hideOverlay", (request, response) => {
      $("#lw_overlay").remove();
    });
  
    iframeCommunicatorServer.bind("getUser", (request, response) => {
      response({name: "aaa"})
    });
  
    iframeCommunicatorServer.bind("rest.get", (request, response) => {
      $.get(request.url, response);
    });    
  };	
  



  $.getScript("https://" + window.learnWiseSetup.host + "/iframe_communicator_server.js");

 /* iframeCommunicatorServer = init_event_listners();

  iframeCommunicatorServer.bind("hideOverlay", (request, response) => {
    $("#lw_overlay").remove();
  });

  iframeCommunicatorServer.bind("getUser", (request, response) => {
    response({name: "aaa"})
  });

  iframeCommunicatorServer.bind("rest.get", (request, response) => {
    $.get(request.url, response);
  });
*/


//});