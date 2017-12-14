(function() {
  if(!window.jQuery && !window.$)
    {
      console.log("there is no jquery, inject it to the head!!!");
       var script = document.createElement('script');
       script.type = "text/javascript";
       //script.text = jquery_code;
       script.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js";
       document.getElementsByTagName('body')[0].appendChild(script);
    }else{
      console.log("there IS jquery!!!");
    }
})();
