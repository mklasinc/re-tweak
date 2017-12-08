// this script includes the code that will take care of tweaking website content

//global variables
var global_counter = 0;
var all_img;
var all_titles;
var global_is_scrolling;

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

// check if an element is visible
function check_visibility(el){
  var window_obj = grab_window_attributes();
  var el_obj = grab_element_attributes(el);
  var offset_bottom = 30; // offset the bottom visibility check (i.e. the bottom edge of the element has to be smaller than the offset to satisfy the invisibility condition)
  var offset_top = 30; // offset the top visibility check
  console.log("element top is: ",el_obj.top," and window bottom is",window_obj.bottom);
  console.log("element bottom is: ",el_obj.bottom," and window top is",window_obj.top);

  var is_visible = (el_obj.top >= window_obj.bottom - offset_top || el_obj.bottom <= offset_bottom) ? false : true;
  return is_visible;
}

// setup function - capture all images and titles in an array and set attributes containing default src images/ title text

function grab_element_attributes(target_el){
  //bounding client rect
  var el_dim = {};
  el_dim.top = target_el.getBoundingClientRect().y;
  el_dim.bottom = el_dim.top+ target_el.getBoundingClientRect().height;
  return el_dim;

}

function grab_window_attributes(){
  var window_dim = {};
  window_dim.top = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  window_dim.bottom = window_dim.top + window.innerHeight;
  return window_dim;
}


function set_data_attributes(){
  console.log("Setting up data attributes!");
  console.log("-----------------------------");
  var init_visibility = true;
  //store all images into an array
  all_img =  document.getElementsByTagName("img");
  //store all title text into an array
  all_titles = document.querySelectorAll("h1,h2,h3");

  // set default image source attributes to all images
  for(var i = 0; i < all_img.length; i++){
    //get default image source
    var default_src = all_img[i].src;
    //set a data attribute to each image with default image source
    all_img[i].setAttribute("default_src",default_src);
    var window_attributes = grab_window_attributes();
    if(init_visibility){
      var el_is_visible = check_visibility(all_img[i]);
      console.log("is element visible?",el_is_visible);
      if(el_is_visible){
        console.log(all_img[i]);
      }
      if(i >= 5){
        init_visibility = false;
      }
    }
    //console.log("the initial window dimensions are: ",my_window_dim);
    //all_img[i].setAttribute("is_visible",default_src);
  };

  // set default title text attributes to all titles
  for(var i = 0; i < all_titles.length; i++){
    //get default image source
    var default_text = all_titles[i].innerText;
    //set a data attribute to each image with default image source
    all_titles[i].setAttribute("default_text",default_text);
    all_titles[i].setAttribute("default_background",all_titles[i].style.background);
    all_titles[i].setAttribute("default_color",all_titles[i].style.color);
  };

}

setTimeout(function(){
  console.log("NOW!");
  set_data_attributes();

  scroll_handler();
},1000);

function doSetTimeout(el,original_src) {
  console.log("timeout called!");
  setTimeout(function() { el.src = original_src; }, 3000);
}

// function that deals with text tweaking

function unblack_text(text_el){
  //console.log(text_el);
  text_el.style.color = text_el.getAttribute("default_color");
  text_el.style.background = text_el.getAttribute("default_background");
  test_typewriter_effect(text_el);

}

function blackout_text(text_el){
  text_el.style.color = "black";
  text_el.style.background = "black";
  setTimeout(function(){
    unblack_text(text_el);
  },100);
}

function tweak_text(num){
  for(var i = 0; i < num;i++){
    var random_index = Math.round(Math.random()*all_titles.length);
    // if(random_index % 0){
    //   all_titles[random_index].innerText="dgf01310r89t435ri-e1r42wt24";
    // }else{
    //   all_titles[random_index].style.background = "black";
    // }
    var el = all_titles[random_index]
    blackout_text(el);
  }
};

// function that deals with image tweaking

function tweak_img(num){
  for(var i = 0; i < num;i++){
    var random_image_index = Math.round(Math.random()*all_img.length);
    var random_gif_index = Math.round(Math.random()*glitch_gif_array.length);
    //all_img[i].src= "https://i.imgur.com/lu2mN0B.gif";
    all_img[random_image_index].src = glitch_gif_array[random_gif_index];
    //console.log("the source of image with index",random_image_index,"is",glitch_gif_array[random_gif_index]);
  }
};

// main glitch function

function random_glitch(){
  console.log("random glitch called!");
  var glitch_happens = Math.random() > 0.4;
  if(glitch_happens){
    console.log("glitch happens!");
    var num_of_img = Math.round(Math.random()*10);
    console.log("glitching", num_of_img, "images");
    tweak_img(num_of_img);
    var num_of_text_titles = Math.round(Math.random()*10);
    console.log("glitching", num_of_text_titles, "titles");
    tweak_text(num_of_text_titles);
  }
};

//test if the typewriter effect is working

function test_typewriter_effect(text_el){
  //var lemonde_h1_title = document.querySelector("h1:first-of-type").innerText;
  //console.log(lemonde_h1_title);
  //var lemonde_h1_title = document.querySelector("h1:first-of-type");

  var typewriter = new Typewriter(text_el, {
  loop: false,
  cursor: ''
  //,typingSpeed: 5
  });

  typewriter.typeString('Hello World!')
  .start();

}



function scroll_handler(){

  // Listen for scroll events
  window.addEventListener('scroll', function ( event ) {
      // Clear our timeout throughout the scroll
      //console.log("we are scrolling!");
      window.clearTimeout( global_is_scrolling );
      random_glitch();


      //console.log("window top is",window_dim.top,"and window bottom is",window_dim.bottom);



      global_is_scrolling = setTimeout(function() {
          // Run the callback
          console.log( 'Scrolling has stopped.' );
          check_visibility(first_img);
      }, 1000);
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
