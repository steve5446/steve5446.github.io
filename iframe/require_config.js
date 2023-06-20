requirejs.onError = function (err) {
    console.log(err.requireType);
    console.log('modules: ' + err.requireModules);
    throw err;
  };
  
  require.config({
    baseUrl: './',
    paths: {
      'jquery': 'https://code.jquery.com/jquery-3.6.0.min',
      'message_client': 'message_client',
      'canvas_api': 'canvas_api'
    }
  });
  