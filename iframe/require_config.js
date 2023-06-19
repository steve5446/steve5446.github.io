requirejs.onError = function (err) {
    console.log(err.requireType);
    console.log('modules: ' + err.requireModules);
    throw err;
  };
  
  require.config({
   // urlArgs: "_=" + new Date().getTime(),
    baseUrl: './',
    paths: {
      'jquery': 'https://code.jquery.com/jquery-3.6.0.min',
      'iframe_communicator_client': 'iframe_communicator_client',
      'canvas_api': 'canvas_api'
    }
  });
  