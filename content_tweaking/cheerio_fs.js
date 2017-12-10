var fs = require('fs'),
    request = require('request'),
    cheerio = require('cheerio'),
    pageURL = 'https://www.nytimes.com/',
    rita = require('rita');



// function rita_analysis(){
//   var rs = rita.RiString("The elephant took a bite!");
//   console.log(rs.features());
// }
//
// rita_analysis();


var $;


// right now its only lemonde
function le_monde_parsing(url,text){
    var regex = /\d$/;
    var newlines = /\r?\n|\r/g;
    var new_text;
    var last_num_index
    text = text.trim();
    text = text.replace(newlines," ");
    if(text.match(/\d$/)){
      last_num_index = text.match(/\d$/).index;
      if((text.length - last_num_index) < 4){
        new_text = text.slice(0,last_num_index -2);
        // console.log("new text is:",new_text);
        // console.log(new_text);
      };
      // console.log("last num index is", last_num_index);
      // console.log("text length is:", text.length);
      // console.log("--------------------");
    }else{
      new_text = text;
    }


    return new_text;
    // console.log("old text is:",text);
    // console.log('the trimmed text is:',new_text.trim());
    //console.log("--------------------");
}

function count_words(text){
  var trimmed_text = le_monde_parsing(pageURL,text);
  //console.log(trimmed_text);
  var word_array = trimmed_text.split(" ");
  return {text: trimmed_text,length: word_array.length}
};

function get_titles_text(title_array){
  for(var i = 0; i < title_array.length; i++ ){
      var title_text = title_array.eq(i).text();
      var text_obj = count_words(title_text);
      //console.log(words_in_title);
      if(text_obj.length > 5){
         // console.log(text_obj.text);
         // console.log("-----------------------");
      }
  }
}

function scrapePage () {
    //make an HTTP request for the page to be scraped
    request(pageURL, function(error, response, responseHtml){
        $ = cheerio.load(responseHtml);
        //console.log($.html());
        var titles_array = $('h1');
        var images_array = $('img');
        var article_array = $('article');
        //console.log(images_array[0].closest('h1'));
        //console.log(images_array[0].attribs.src);
        console.log(article_array.length);

        // titles_array.each(function(i,el) {
        article_array.each(function(i,el) {
          var title = $(this);
          //console.log(title.length);
          if(i < 3){
            console.log("whats the closest article");
            var my_text = $('article > h2 > a')[i].children[0].data;
            var my_image = $('article > h2 > a')[i].attribs.href;
            console.log(my_image);
            //console.log($('article > h1 > a')[i].text());
            //console.log(title.children()[0].text());
            //console.log($(title.attr('id')).find('h1').children() );
            console.log("---------------------");
          }


        // images_array.each(function(i,el) {
        //   var img = $(this);
        //   if(i === 0){
        //     console.log(img);
        //   }

        // var text = link.src;
        // var href = link.attr("href");
        //
        // console.log(text + " -> " + href);
        });

        //get_titles_text(titles_array);
        //console.log(titles_array[0].parent);
        //get_title_images(titles_array);
        //console.log(titles_array.length);


        //console.log($('h1'));

    }) ;
}

// function test(){
//   var $ = cheerio.load('<ul id="fruits"><li class="apple">Apple</li><li class="orange">Orange</li><li class="pear">Pear</li></ul>');
//   console.log($('.orange').closest('li').text());
//   $('li').each(function(i,el){
//     console.log($(this).closest('li').text());
//   });
// }

//test();
//scrape the page
scrapePage();
