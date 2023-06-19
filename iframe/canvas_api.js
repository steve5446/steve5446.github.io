define(['jquery', 'iframe_communicator_client'], function ($, iframe_communicator_client) {

    function hideOverlay() {
        iframe_communicator_client.invoke("hideOverlay", {});
    }

    function getUser(responseHandler) {
        iframe_communicator_client.invoke("getUser", {}, responseHandler);
    }
    
    function restGet(url, responseHandler) {
        iframe_communicator_client.invoke("rest.get", { url: url }, responseHandler);
    }


    return {
        hideOverlay: hideOverlay,
        getUser: getUser,
        rest: {
            get: restGet
        }
    };
  
});
