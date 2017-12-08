'use strict';

var port = 8081;

var Proxy = require('http-mitm-proxy');
var proxy = Proxy();
var cheerio = require('cheerio');
var fs = require('fs');
//var script_obj = require("./script_module/scroll.js");
var script_open_tag = '<script>';
var script_close_tag = '</script>';

//var foreach_async_script = script_open_tag.concat(fs.readFileSync('script_module/foreach_async.js','utf8'),script_close_tag);
var ityped = fs.readFileSync('script_module/typewriter.js','utf8');
var typewriter_script = script_open_tag.concat(ityped,script_close_tag);
var lodash_lib = fs.readFileSync('script_module/lodash.core.js','utf8');
var lodash_script = script_open_tag.concat(lodash_lib,script_close_tag);
var html2canvas_lib = fs.readFileSync('script_module/html2canvas.js','utf8');
var html2canvas_script = script_open_tag.concat(html2canvas_lib,script_close_tag);
var glitch_js_lib = fs.readFileSync('script_module/glitch.js','utf8');
var glitch_js_script = script_open_tag.concat(glitch_js_lib,script_close_tag);
var jquery2 = fs.readFileSync('script_module/jquery.2.1.1.min.js','utf8');
var jquery2_script = script_open_tag.concat(jquery2,script_close_tag);

var pattern = 'monde';

//var my_script_var = script_obj.scroll.toString();
var main_script_body = fs.readFileSync('script_module/main.js','utf8');
var main_js_script = script_open_tag.concat(main_script_body,script_close_tag);

function insert_js_code(html_body,splice_index,javascript_code){
  return html_body.slice(0, splice_index - 2) + javascript_code + html_body.slice(splice_index - 2);
};

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
    //console.log(request_headers);
    var pattern_match = request_headers.toString().includes(pattern);
    //console.log("we have a match!");
    //if(){
      var body = Buffer.concat(chunks);
      var new_body;
      if(ctx.serverToProxyResponse.headers['content-type'] && ctx.serverToProxyResponse.headers['content-type'].indexOf('text/html') === 0) {
        //body = body.toString().replace(/Lucky/g, 'Sexy');
        body = body.toString();

        var $ = cheerio.load(body);
        //var main_js_script = '<script> alert("Hey there Alia!");</script>';
        //var main_js_script = '<script>'+ script_obj.get_function_body(my_script_var) +'</script>';
        //var html2canvas = '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js"></script>';



        //$('body').append(jquery2_script);
        //$('body').append(glitch_js_script);
        //$('body').append(html2canvas_script);
        //$('body').append(html2canvas);
        //$('body').append(main_js_script);
        //var new_body = $.html().toString();
        //console.log(body);
        var n_index = body.lastIndexOf("body");
        //console.log(n_index);
        if(n_index > 0 && pattern_match){
           console.log("injecting js to this address: ", request_headers);
           //body = insert_js_code(body,n_index,foreach_async_script); // inject typewriter effect library
           body = insert_js_code(body,n_index,typewriter_script); // inject typewriter effect library
           body = insert_js_code(body,n_index,html2canvas_script); //inject html2canvas library, required by glitch.js library
           body = insert_js_code(body,n_index,glitch_js_script); //inject glitch.js
           body = insert_js_code(body,n_index,main_js_script); // inject main script
          //console.log(new_body);
        }
        //res.send($.html());
        //console.log($);
        //new_body = new Buffer(new_body.toString());

      }
      ctx.proxyToClientResponse.write(body);


    //}

    return callback();
  });
  callback();

});



proxy.listen({ port: port });
console.log('listening on port ' + port, 'targeting',pattern);
