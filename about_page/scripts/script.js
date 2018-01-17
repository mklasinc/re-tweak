///////////////////////////////////////////////////
// data
///////////////////////////////////////////////////

// list of pages unaffected by retweak
var secure_pages_array = [

  "www.nytimes.com",
  "www.bbc.com",
  "www.theguardian.com",
  "www.economist.com",
  "www.thenational.ae",
  "www.washingtonpost.com"
];

// list of pages tackled by retweak
var unsecure_pages_array = [
  "www.cnn.com",
  "www.lemonde.fr",
  "www.foxnews.com",
  "www.newsweek.com",
  "www.france24.com",
  "www.breitbart.com"
];

// instruction mode copy
var instruction_paragraphs = [
  {
    has_list: false,
    text: "1. Open wi-fi settings on your device and connect to the \"C3-029-MBP-07\" wi-fi network"
  },
  {
    has_list: true,
    text: "2. Navigate to one of the following websites:"
  },
  {
    has_list: false,
    text: "3. Read the news"
  },
  {
    has_list: false,
    text: "3. Read the news"
  }
];

//faq mode copy
var faq_list = [
  {
    q: "What is Re-tweak?",
    text: "Re-tweak modifies content on unsecure news websites to show the extent to which unencrypted web, particularly the part of it pertaining to news dissemination, is subject to content modifications. By visibily tweaking online news content, the project aims to spur conversations about news integrity online and online security in general."
  },
  {
    q: "Why am I doing this?",
    text: "Online content access and exchange can be subject to nefarious interference. In 2017, hacking and manipulating online news is becoming an increasingly common way to engineer public opinion <a href=\"https://www.theguardian.com/politics/2017/nov/13/theresa-may-accuses-russia-of-interfering-in-elections-and-fake-news\">[1]</a><a href=\"https://www.nytimes.com/2017/09/07/us/politics/russia-facebook-twitter-election.html\">[2]</a>. </br></br>I wanted to add to the conversation about cyber attacks and fake news by making two points:</br></br> a) raise awareness about the ease with which online news content can be tweaked and the resulting implications for the way we approach news access and sharing online, and </br> b) that paying attention to security measures online pays off"
  },
  {
    q: "How does it work?",
    text: "I am performing a man-in-the-middle attack, which is a widespread form of online spoofing <a href=\"https://en.wikipedia.org/wiki/Man-in-the-middle_attack\">[1]</a>. </br></br> Man-in-the-middle attack is classified as a cyber attack and is illegal in most countries around the world. Re-tweak is used strictly for educational purposes and will only be used in exhibition settings. </br>If you are concerned about what the code does, all the scripts used in the project are open and accessible to anyone at <a href=\"https:www.github.com/mklasinc/re-tweak\">https:www.github.com/mklasinc/re-tweak\</a>"
  },
  {
    q: "How does it not work?",
    text: "Encrypted HTTP websites (i.e. HTTPS) effectively eliminate the possibility of content being tweaked by the Re-tweak script. The lesson learned here is that it pays dividends to be secure online. Use HTTPS and think twice before you connect to a free wifi hotspot during your next stopover"
  }

];

///////////////////////////////////////////////////
// code
///////////////////////////////////////////////////

// convenience variables
var $body_title = $("#body_title");
var $body_text = $("#body_text");
var $mode_button = $("#switch_mode_button");

// typewriter effect
function type_text(text_el,string){

    text_el.innerText = '_';
    var typewriter = new Typewriter(text_el, {
      loop: false,
      cursor: '',
      typingSpeed: 5
    });
    typewriter.typeString(string)
    .start();
}

//clear screen during mode switching
function clear_all(){
  $body_title.empty();
  $body_text.empty();
}

//set up instruction mode
function instruction_mode(){
  console.log("setting up instruction mode");

  // empty screen
  clear_all();

  // update button state
  button_stop(); // in the instruction mode, the mode-switch button moves around
  var faq_button_text = "[Read FAQ]";
  change_mode_button(faq_button_text);

  // update title
  var instruction_title = "[Instructions of use]";
  type_text($body_title[0],instruction_title);

  // fill body text
  for(var i = 0; i < instruction_paragraphs.length; i++){

    if(!instruction_paragraphs[i].has_list){
      var p = $("<p></p>");
       $body_text.prepend(p);
       type_text(p[0],instruction_paragraphs[i].text);
    }else{
      //we have a list
      var p = $("<p></p>");
      //paragraph title
      var website_list = $("<ul class=\"website_list\"></ul>");
      p.appendTo($body_text);
      type_text(p[0],instruction_paragraphs[i].text);
      //list
      website_list.appendTo(p);
      //unsecure websites title
      var unsecure_websites_title = $("<li class=\"list_title\"></li>");
      unsecure_websites_title.appendTo(website_list);
      type_text(unsecure_websites_title[0],"Unsecure websites");
      for(var i = 0; i < unsecure_pages_array.length; i++){
        var list_item = $("<li></li>");
        list_item.appendTo(website_list);
        type_text(list_item[0],unsecure_pages_array[i]);
      }
      //secure websites title
      var secure_websites_title = $("<li class=\"list_title\"></li>");
      secure_websites_title.appendTo(website_list);
      type_text(secure_websites_title[0],"Secure websites");
      for(var i = 0; i < secure_pages_array.length; i++){
        var list_item = $("<li></li>");
        list_item.appendTo(website_list);
        type_text(list_item[0],secure_pages_array[i]);
      }
    }
  };

  //console.log("for loop done!");
  setTimeout(function(){
    var p = $("<p></p>");
    $body_text.append(p);
    type_text(p[0],instruction_paragraphs[2].text);
  },500);

};

// change action button text
function change_mode_button(text){
  type_text($mode_button[0],text);
}

// interval variable, set to global scope so the button-move interval can be cleared in the faq mode
var g_button_move;

function button_move(){
  g_button_move = setInterval(function(){
    var random_x = Math.floor(Math.random()*10);
    var random_y =Math.floor(Math.random()*10);
    $mode_button.css('transform','translate('+ random_x + 'px,' + random_y +'px)');
  },500);
}

// stop button moving functionality
function button_stop(){
  clearInterval(g_button_move);
}

// set up faq mode
function faq_mode(){

  //empty body text
  clear_all();

  //update button
  var instructions_button_text = "[Try it out yourself!]";
  change_mode_button(instructions_button_text);
  button_move();

  //update title
  var faq_title = "[FAQ]";
  type_text($body_title[0],faq_title);

  //update body text
  for(var i = 0; i < faq_list.length; i++){
    var p = $("<p class=\"faq_question\">" + faq_list[i].q + "<span class=\"dropdown_icon\">[+]</span></br></br></p>");
    p.appendTo($body_text);
    p.prop("is_expanded",false);
    p.prop("index",i);
    //console.log(p.prop("is_expanded"));
    var dropdown_text = $("<span class=\"dropdown_content\"></span>");
    var dropdown_icon = $(".dropdown_icon");
    dropdown_text.appendTo(p);

    p.click(function(e){
      console.log(e.target);
      var target = e.target.className === "faq_question" ? e.target : e.target.parentNode;
      var target_index = $(target).prop("index");
      var target_text = faq_list[target_index].text;

      //console.log(target);
      if(!$(target).prop("is_expanded")){
        $(target).children(".dropdown_icon").text('[-]');
        $(target).prop("is_expanded",true);
        $(target).css("margin-bottom","50px");
        var target_child = $(target).children('.dropdown_content');
        target_child.show();
        target_child.html(target_text);
      }else{
        $(target).children(".dropdown_icon").text('[+]');
        $(target).prop("is_expanded",false);
        $(target).css("margin-bottom","20px");
        $(target).children('.dropdown_content').hide();
      }
    });

  }

}

// glitch the title
function title_glitch(){
  setInterval(function(){
    var $title = $("#main_t_two");
    var random_x = Math.floor(Math.random()*10);
    var random_y = Math.floor(Math.random()*10);
    $title.css('transform', 'translate('+ random_x + 'px)');
    setTimeout(function(){
      $title.css('transform', 'translate(0,0)');
    },100);
  },4000);

}

$(document).ready(function(){
  console.log("we are ready!");

  //the app has two modes: faq mode and the instruction mode
  // start with the instruction mode
  instruction_mode();
  var old_mode = instruction_mode;

  // handle mode-changing
  $("#switch_mode_button").click(function(){
    var new_mode = old_mode === instruction_mode ? faq_mode : instruction_mode;
    new_mode();
    old_mode = new_mode;
  });

});
