// this script includes the code that will take care of tweaking website content

var $;
if(window.jQuery && !window.$){
  window.$ = window.jQuery;
  $ = window.jQuery;
}
//global variables
var global_counter = 0;
var all_img;
var all_titles;
var all_links;
var all_sources;
var g_sources_exist = false;
var all_paragraphs;
var global_is_scrolling;
var g_kill = false;



// check if an element is visible
function check_visibility(el){
  var window_obj = grab_window_attributes();
  var el_obj = grab_element_attributes(el);
  var offset_bottom = 100; // offset the bottom visibility check (i.e. the bottom edge of the element has to be smaller than the offset to satisfy the invisibility condition)
  var offset_top = 100; // offset the top visibility check
   // console.log("element top is: ",el_obj.top," and window bottom is",window_obj.bottom);
   // console.log("element bottom is: ",el_obj.bottom," and window top is",window_obj.top);
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


// set img data attributes
function set_img_data(first_time){

  var query_for_visibility = true;
  // set default image source attributes to all images
  for(var i = 0; i < all_img.length; i++){

    // only do this when data attributes are set for the first time
    if(first_time === true){
      //get default image source
      var default_src = all_img[i].src;
      //set a data attribute to each image with default image source
      all_img[i].setAttribute("default_src",default_src);
      //default visibility of every image is false, change that with the for loop after
      all_img[i].setAttribute("visibility",false);
      all_img[i].setAttribute("el_type","img");
      //dom_find_closest(all_img[i]);
    }

    // only do it until we keep having visible elements
    if(query_for_visibility){
      var el_is_visible = check_visibility(all_img[i]);
      if(el_is_visible){
        all_img[i].setAttribute("visibility",true); // set visibility attribute to true
      }else{
        // query_for_visibility = false;
      }
    }

  };

}

// set text data attributes

function set_text_data(first_time){
  // set default title text attributes to all titles
  for(var i = 0; i < all_titles.length; i++){
    //get default image source
    var default_text = all_titles[i].innerText;
    //set a data attribute to each image with default image source
    all_titles[i].setAttribute("default_text",default_text);
    all_titles[i].setAttribute("default_background",all_titles[i].style.background);
    all_titles[i].setAttribute("default_color",all_titles[i].style.color);
    all_titles[i].setAttribute("default_text_length",default_text.length);
    all_titles[i].setAttribute("is_animated",false);
    all_titles[i].setAttribute("el_type","h");
    all_titles[i].setAttribute("visibility",false);
  };

}

// setup function, adds data attributes to all img,h1,h2,h3 elements on the page
function init_set_data_attributes(){

  console.log("Setting up data attributes!");
  //store all images into an array
  all_img =  document.getElementsByTagName("img");
  //store all title text into an array
  all_titles = document.querySelectorAll("h1,h2,h3");
  all_list_items = document.querySelectorAll("li");
  all_paragraphs = document.querySelectorAll("p");
  all_sources = document.querySelectorAll("source");
  if(all_sources.length > 1){
    console.log("we have sources!!!!!");
    g_sources_exist = true;
  }
  //set initial data attributes for all images
  set_img_data(true);
  //set initial data attributes for all text
  set_text_data(true);

}

// revert back to default img source
// in the future change this to a new image

function revert_img_src(el,original_src) {
  console.log("timeout called!");
  setTimeout(function() { el.src = original_src; }, 3000);
}

function index_randomize(length){
  var i = Math.floor(Math.random()*length);
  return i
}
//start the typewriter effect

function test_typewriter_effect(text_el,index){

  var random_index = index_randomize(g_new_titles.length);
  var new_string = g_new_titles[random_index];
  console.log("the length of the string is:", new_string.length);
  var steps = 30;
  var speed = new_string.length/steps;
  var animation_time = steps*speed + 5000;
  var is_animated = text_el.getAttribute("is_animated").includes("false") ? false : true;
  console.log(is_animated);

  if(!is_animated){
    text_el.setAttribute("is_animated","true");
    text_el.innerText = '';
    var typewriter = new Typewriter(text_el, {
      loop: false,
      cursor: '',
      typingSpeed: speed
    });
    typewriter.typeString(new_string)
    .start();
    setTimeout(function(){
      console.log("text is ANIMATED!");
      text_el.setAttribute("is_animated","false");
    },animation_time);


  }else{
    console.log("nooooppe!");
  }

}

// this tweaks text

// function glitch_tweak_text(num){
//   for(var i = 0; i < num;i++){
//     var random_index = Math.round(Math.random()*all_titles.length);
//     var el = all_titles[random_index]
//     blackout_text(el);
//   }
// };

// function that deals with image tweaking

function glitch_tweak_img(el){
  console.log("yupi!");
    var random_gif_index = Math.round(Math.random()*glitch_gif_array.length);
    //all_img[i].src= "https://i.imgur.com/lu2mN0B.gif";
      el.src = glitch_gif_array[random_gif_index];

    //console.log("the source of image with index",random_image_index,"is",glitch_gif_array[random_gif_index]);
};

function jquery_exists(){
  if(!window.jQuery && !window.$){
    return false;
  }else{
    return true
  }
}

function img_find_closest(el){
  if(jquery_exists){
    var $el = $(el);
    var article = $el.closest('article');
    var $closest_t = $(article).find('h1,h2,h3').eq(0);
    console.log($closest_t[0]);
    return $closest_t[0] || false
  }else{
    return false;
  }

}

function text_change(text_el,index){
  text_el.style.color = "black";
  text_el.style.background = "black";
  setTimeout(function(){
    text_el.style.color = text_el.getAttribute("default_color");
    text_el.style.background = text_el.getAttribute("default_background");
    test_typewriter_effect(text_el,index);
  },100);

};

function img_change(el){
    //console.log(el);
    console.log("calleed!!!!!!");
    var scraped_img_index = index_randomize(g_new_images.length);
    console.log(el.src);
    el.src = g_new_images[scraped_img_index];
    //el.setAttribute(src = articles_data_obj.all_articles[scraped_img_index].img;
}

// global content change function - calls image and text changes separately

function content_change(num_img,num_titles){

  // images + text
  for(var i = 0; i < num_img;i++){
    var el_index = index_randomize(all_img.length);
    img_change(all_img[el_index]);
    var closest_title = img_find_closest(all_img[el_index]);
    //console.log("closest_title is",closest_title);
    if(closest_title){
      text_change(closest_title,el_index);
    }else{
      var title_index = index_randomize(all_titles.length);
      text_change(all_titles[title_index],title_index);
    }

  }

  // text only
  for(var i = 0; i < num_titles;i++){
    var el_index = index_randomize(all_titles.length);
    text_change(all_titles[el_index],el_index);
  }

}


// main glitch function

function random_glitch(){
  console.log("random glitch called!");
  var glitch_happens = Math.random() > 0.4;
  if(glitch_happens){
    console.log("glitch happens!");
    var num_of_img = Math.round(Math.random()*10);
    console.log("glitching", num_of_img, "images");

    // if(Math.random() > 0.7){
    //   glitch_tweak_img(2);
    // };
    //img_content_change(num_of_img);

    var num_of_titles = Math.round(Math.random()*10);
    console.log("glitching", num_of_titles, "titles");
    content_change(num_of_img,num_of_titles);
    //glitch_tweak_text(num_of_text_titles);
  }
};

// check visibility in after scroll stops

function source_change(el){
    console.log(el);
    var scraped_img_index = index_randomize(g_new_images.length);
    el.srcset = g_new_images[scraped_img_index];
    //el.setAttribute(src = articles_data_obj.all_articles[scraped_img_index].img;
}

function check_new_visibility(){
  console.log("new visibility checked!");
  //img
  var visible_img_array = [];
  for(var i = 0; i < all_img.length; i++){
    all_img[i].setAttribute("visibility",false);
    var el_is_visible = check_visibility(all_img[i]);
    console.log("image ",i,"is visible",el_is_visible);
    if(el_is_visible){
      all_img[i].setAttribute("visibility",true);
      visible_img_array.push(all_img[i]); // set visibility attribute to true
    }
  };
  //titles
  var visible_title_array = [];
  for(var i = 0; i < all_titles.length; i++){
    all_titles[i].setAttribute("visibility",false);
    var el_is_visible = check_visibility(all_titles[i]);
    if(el_is_visible){
      all_titles[i].setAttribute("visibility",true);
      visible_title_array.push(all_titles[i]); // set visibility attribute to true
    }
  };

// all sources
  var visible_sources_array = [];
  if(g_sources_exist){
    for(var i = 0; i < all_sources.length; i++){
      all_sources[i].setAttribute("visibility",false);
      var el_is_visible = check_visibility(all_sources[i]);
      if(el_is_visible){
        all_sources[i].setAttribute("visibility",true);
        visible_sources_array.push(all_sources[i]); // set visibility attribute to true
      }
    };
    for(var i = 0; i < visible_sources_array.length;i++){
      if(Math.random() > 0.5){
        source_change(visible_sources_array[i]);
      }
    };
  }
  //all images
  for(var i = 0; i < visible_img_array.length;i++){
    if(Math.random() > 0.5){
      img_change(visible_img_array[i]);
    }else if(Math.random() > 0.95){
      glitch_tweak_img(visible_img_array[i]);
    }
  };
  // //all text
  for(var i = 0; i < visible_title_array.length;i++){
    if(Math.random() > 0.7){
      text_change(visible_title_array[i]);
    }
  }

}

function change_first_title(){
  img_change(all_img[0]);
  var closest_title = img_find_closest(all_img[0]);
  //console.log("closest_title is",closest_title);
  if(closest_title){
    text_change(closest_title,0);
  }else{
    text_change(all_titles[0],0);
  }
}

function page_blackout(){
  var new_div = document.createElement("div");
  new_div.style.background = "black";
  new_div.style.zIndex = "10000";
  new_div.style.position = "fixed";
  new_div.style.top = "0";
  new_div.style.width = "100vw";
  new_div.style.height = "100vh";
  document.getElementsByTagName('body')[0].appendChild(new_div);

  setTimeout(function(){
    new_div.style.width = "0";
    new_div.style.height = "0";
  },20);

}

function kill(){
  console.log("KIIIIILLLLLLL!");
  //titles
  for(var i = 0; i < all_titles.length; i++){
    var typewriter = new Typewriter(all_titles[i], {
      loop: false,
      cursor: ''
    });
    typewriter.typeString("why is this happening")
    .start();
  }
  for(var i = 0; i < all_list_items.length; i++){
    all_list_items[i].innerText = "Click on any image to find out more";
  }
  for(var i = 0; i < all_paragraphs.length; i++){
    all_paragraphs[i].innerText = "Click on any image to find out more";
  }
  //images
}

// Listen for scroll events

function scroll_handler(){
  console.log("start listening so scroll events");
  window.addEventListener('scroll', function ( event ) {
      // Clear our timeout throughout the scroll
      window.clearTimeout( global_is_scrolling );
      console.log("scrolling!");
      //random_glitch();
      global_is_scrolling = setTimeout(function() {
          // Run the callback
          if(!kill){
            //random_glitch();
            //check_new_visibility();
          }
          check_new_visibility();
          console.log( 'Scrolling has stopped.' );
          //console.log(check_visibility(all_img[0]));
      }, 1000);
  }, false);

}

//window.onload = function(){
  setTimeout(function(){
    //check_jquery();
    console.log("START SETTING UP NOW!");
    scroll_handler();
    init_set_data_attributes();
    change_first_title();
    if(window.location.pathname.length > 30){

      console.log("you are reading an article!");
      setTimeout(function(){
        for(var i = 0; i < all_links.length; i++){
          all_links[i].href = "http://politicsofcode.biz:8006/retweak";
        };
        kill();
        g_kill = true;
      },15000);

    }
    //change_
  },1000);

  var all_links = document.getElementsByTagName('a');
  setTimeout(function(){

    console.log("oveeeeeeeeeeeer");
    console.log("----------------------------------");
    for(var i = 0; i < all_links.length; i++){
      all_links[i].href = "http://politicsofcode.biz:8006/retweak";
    };
    kill();
    g_kill = true;
  },70000);

//};
// SETUP
