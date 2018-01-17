'use strict';

// proxy port
var port = 8080;

// dependencies
var Proxy = require('http-mitm-proxy');
var proxy = Proxy();
var cheerio = require('cheerio');
var fs = require('fs');

// convenience variables
var script_open_tag = '<script>';
var script_close_tag = '</script>';

// load vendor js scripts and put them between html script tags
var ityped = fs.readFileSync('script_module/lib/typewriter.js','utf8');
var typewriter_script = script_open_tag.concat(ityped,script_close_tag);
var lodash_lib = fs.readFileSync('script_module/lib/lodash.core.js','utf8');
var lodash_script = script_open_tag.concat(lodash_lib,script_close_tag);
var html2canvas_lib = fs.readFileSync('script_module/lib/html2canvas.js','utf8');
var html2canvas_script = script_open_tag.concat(html2canvas_lib,script_close_tag);
var glitch_js_lib = fs.readFileSync('script_module/lib/glitch.js','utf8');
var glitch_js_script = script_open_tag.concat(glitch_js_lib,script_close_tag);
var jquery2 = fs.readFileSync('script_module/lib/jquery.2.1.1.min.js','utf8');
var jquery2_script = script_open_tag.concat(jquery2,script_close_tag);
var jquery_load = fs.readFileSync('script_module/lib/jquery_loader.js','utf8');
var jquery_load_script = script_open_tag.concat(jquery_load,script_close_tag);
var new_titles = fs.readFileSync('script_module/lib/new_titles.js','utf8');
var new_titles_script = script_open_tag.concat(new_titles,script_close_tag);

// load main js script
var main_script_body = fs.readFileSync('script_module/main.js','utf8');
var main_js_script = script_open_tag.concat(main_script_body,script_close_tag);

// if you want to inject scraped articles data, uncomment these lines and use it later in the code injecting function
// var scraped_articles_data = fs.readFileSync('script_module/data/articles.js','utf-8');
// var scraped_articles_script = script_open_tag.concat(scraped_articles_data,script_close_tag);

// pattern that matches intercepted http requests for targeted news websites (http only)
var conditional_pattern = /lemonde|delfi|foxnews|newsweek|cnn|spiegel|france24|businessinsider|latimes|time|breitbart/g;

// convenience function to insert js code at the end of the html body
function insert_js_code(html_body,splice_index,javascript_code){
  return html_body.slice(0, splice_index - 2) + javascript_code + html_body.slice(splice_index - 2);
};

// modified example code provided by the node http-mitm-proxy script_module
// github repo: https://github.com/joeferner/node-http-mitm-proxy
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

    var request_headers = ctx.clientToProxyRequest.headers.host;
    // match http request headers for target words
    var pattern_match = request_headers.toString().match(conditional_pattern);
    var body = Buffer.concat(chunks);
      if(ctx.serverToProxyResponse.headers['content-type'] && ctx.serverToProxyResponse.headers['content-type'].indexOf('text/html') === 0) {

        //convert body to string
        body = body.toString();
        var n_index = body.lastIndexOf("body");

        // inject js code
        if(n_index > 0 && pattern_match){
           console.log("injecting js to this address: ", request_headers);
           body = insert_js_code(body,n_index,new_titles_script); // new titles
           body = insert_js_code(body,n_index,jquery_load_script);
           body = insert_js_code(body,n_index,typewriter_script); // inject typewriter effect library
           body = insert_js_code(body,n_index,html2canvas_script); //inject html2canvas library, required by glitch.js library
           body = insert_js_code(body,n_index,glitch_js_script); //inject glitch.js
           body = insert_js_code(body,n_index,main_js_script); // inject main script
        }

      }
      ctx.proxyToClientResponse.write(body);

    return callback();
  });
  callback();

});


proxy.listen({ port: port });
