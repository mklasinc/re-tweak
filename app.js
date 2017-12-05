var Proxy = require('http-mitm-proxy');
var proxy = Proxy();
var inject_js = false;

proxy.onError(function(ctx, err) {
  console.error('proxy error:', err);
});

proxy.onRequest(function(ctx, callback) {
  console.log(ctx.clientToProxyRequest.headers.host);
  var pattern = '/rtvslo/g';
  var match= ctx.clientToProxyRequest.headers.host.match(pattern);
  console.log("we have a match!");
  if (ctx.clientToProxyRequest.headers.host == 'www.rtvslo.si'){
    inject_js = true;
    //&& ctx.clientToProxyRequest.url.indexOf('/search') == 0) {
    ctx.use(Proxy.gunzip);
    console.log('hello there!');
    ctx.onResponseData(function(ctx, chunk, callback) {
      console.log('replacing!');
      chunk = new Buffer(chunk.toString().replace(/<div.*?<\/div>/g, '<h3>Vote for Nick!</h3>'));
      return callback(null, chunk);
    });
  }
  return callback();
});

proxy.listen({port: 8081});

'use strict';

var port = 8081;

var Proxy = require('../');
var proxy = Proxy();

proxy.onError(function(ctx, err, errorKind) {
  // ctx may be null
  var url = (ctx && ctx.clientToProxyRequest) ? ctx.clientToProxyRequest.url : '';
  console.error(errorKind + ' on ' + url + ':', err);
});

proxy.use(Proxy.gunzip);

proxy.onRequest(function(ctx, callback) {
  var chunks = [];
  ctx.onResponseData(function(ctx, chunk, callback) {
    chunks.push(chunk);
    return callback(null, null); // don't write chunks to client response
  });
  ctx.onResponseEnd(function(ctx, callback) {
    var body = Buffer.concat(chunks);
    if(ctx.serverToProxyResponse.headers['content-type'] && ctx.serverToProxyResponse.headers['content-type'].indexOf('text/html') === 0) {
      body = body.toString().replace(/Lucky/g, 'Sexy');
    }
    ctx.proxyToClientResponse.write(body);
    return callback();
  });
  callback();
});



proxy.listen({ port: port });
console.log('listening on ' + port);
