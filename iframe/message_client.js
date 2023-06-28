define(['jquery'], function ($) {
    var responseHandlers = {};
  
    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
            var r = (Math.random() * 16) | 0,
                v = char == 'x' ? r : (r & 0x3) | 0x8;
  
            return v.toString(16);
        });
    }
  
    function invoke(handler, objOrCallback, callback) {
        if (typeof objOrCallback === 'function') {
            post({ messageHandler: handler }, objOrCallback);
        } else {
            var obj = objOrCallback || {};
            obj.messageHandler = handler;
            post(obj, callback);
        }
    }
  
    function post(obj, callback) {
        obj.messageId = uuidv4();
  
        if (callback) {
            responseHandlers[obj.messageId] = callback;
        }

        console.log('the objects being passed to parent', obj)
        window.parent.postMessage(obj, '*');
    }
  
    $(window).on('message', function (e) {
        responseHandlers[e.originalEvent.data.messageId](e.originalEvent.data.response);
       // delete responseHandlers[e.originalEvent.data.messageId];
    });
  
    return { invoke };
  });
  
