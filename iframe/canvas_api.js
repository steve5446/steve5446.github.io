define(['jquery', 'message_client'], function ($, message_client) {

    function hideOverlay() {
        message_client.invoke("hideOverlay", {});
    }

    function restGet(url, responseHandler) {
        message_client.invoke("rest.get", { url: url }, responseHandler);
    }

    function getLtiInformation() {
        message_client.invoke("getLtiInformation", {}, responseHandler);
    }


    return {
        hideOverlay: hideOverlay,
        getLtiInformation: getLtiInformation,
        rest: {
            get: restGet
        }
    };
  
});
