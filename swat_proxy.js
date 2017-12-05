var swat_proxy = require('swat-proxy');

// Add some JS to the end of the Google homepage.
swat_proxy.proxy('http://www.rtvslo.si', {
  selector: 'body',
  manipulation: swat_proxy.Manipulations.APPEND,
  content: '<script> console.log("Hello from swat-proxy!"); </script>'
});

// Start the proxy server.
swat_proxy.start();
