module.exports = {
  scroll: function(){
      // scroll counter
      var global_counter = 0;
      var all_img;
      var all_titles;

      // list of gifs
      var glitch_gif_array = [
        "https://data.whicdn.com/images/119841484/original.gif", // i can't
        "https://78.media.tumblr.com/f62ebe998ac1e8ff6249f37b9b541d02/tumblr_n3qpcdb2ef1rvnh7zo1_r2_500.gif",// red eye
        "https://i.pinimg.com/originals/5d/ed/93/5ded9311a413cd38163fe73f70656958.gif", //million likes
        "https://i0.wp.com/killscreen.com/wp-content/uploads/2015/02/faceless.gif?resize=880%2C495&ssl=1", //face
        "https://i0.wp.com/killscreen.com/wp-content/uploads/2015/02/faceless.gif?resize=880%2C495&ssl=1", //million likes
        "https://i0.wp.com/media3.giphy.com/media/3oEjHSxRXpXTlzC15C/giphy.gif?zoom=2", //laughing face
        "http://csh.bz/stage/gif/dourllywannaexit.gif", //do you really want to exit
        "http://25.media.tumblr.com/e7c583f324e8977349beb59a32b16389/tumblr_ml65ocNR6g1qey76no1_500.gif", //a lot of text
        "https://i.imgur.com/lu2mN0B.gif", //clockwork orange
        "https://i.pinimg.com/originals/1d/84/1f/1d841f158847cf813c90e38a162dbb79.gif" // play
      ];
      //capture scroll events

      setTimeout(function(){
        console.log("NOW!");
        all_img =  document.getElementsByTagName("img");
        all_titles = document.querySelectorAll("h1,h2,h3");
        lodash_test_function();
      },1000);

      function doSetTimeout(el,original_src) {
        console.log("timeout called!");
        setTimeout(function() { el.src = original_src; }, 3000);
      }

      function log_to_console(){
        console.log("debouncing!");
      }

      function random_glitch(){
        console.log("random glitch called!");
        var glitch_happens = Math.random() > 0.1;
        if(glitch_happens){
          console.log("glitch happens!");
          var num_of_glitch_img = Math.round(Math.random(10));
          var num_of_glitch_titles = Math.round(Math.random(10));

          for(var i = 0; i < all_img.length;i++){
            var random_index = Math.round(Math.random(all_img.length));
            all_img[i].src= "https://i.imgur.com/lu2mN0B.gif";
          }

          for(var i = 0; i < num_of_glitch_titles;i++){
            var random_index = Math.round(Math.random(all_titles.length));
            if(random_index % 0){
              all_titles[random_index].innerText="dgf01310r89t435ri-e1r42wt24";
            }else{
              all_titles[random_index].style.background = "black";
            }
          }

        }
      }

      var global_is_scrolling;

      function lodash_test_function(){
        // window.addEventListener('scroll', function(e) {
        //   //console.log("scrolling!");
        //   random_glitch();
        // });
        //window.onscroll = _.debounce(log_to_console, 300);
        // Clear our timeout throughout the scroll

        // Listen for scroll events
        window.addEventListener('scroll', function ( event ) {
            // Clear our timeout throughout the scroll
            console.log("we are scrolling!");
            window.clearTimeout( global_is_scrolling );
            // Set a timeout to run after scrolling ends
            global_is_scrolling = setTimeout(function() {
                // Run the callback
                console.log( 'Scrolling has stopped.' );
            }, 500);
        }, false);
      }

      function test_function(){
        var x=document.querySelectorAll("h1,h2,h3");   // Find the elements
        for(var i = 0; i < x.length; i++){
        x[i].innerText="dgf01310r89t435ri-e1r42wt24";    // Change the content
        }

        var y=document.getElementsByTagName("img");
        console.log(y);  // Find the elements
        for(var i = 0; i < y.length; i++){
        var original_src = y[i].src;
        if(i < 10){console.log(original_src)};
        y[i].src = "https://data.whicdn.com/images/119841484/original.gif";
        doSetTimeout(y[i],original_src);
         // Change the content
        }
      };


  },

  get_function_body(function_string){
    var begin_trim = function_string.indexOf("{") + 1;
    var end_trim = function_string.lastIndexOf("}");
    return function_string.substring(begin_trim,end_trim).trim();
  }
}
