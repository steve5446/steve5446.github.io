function init() {    
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
  
  onCommunicatorLoaded(init());
  