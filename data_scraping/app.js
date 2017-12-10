//Set up requirements
var express = require("express");
var logger = require('morgan');
var Request = require('request');
var fs = require('fs');
var parse = require('csv-parse');

var article_url_array;

// paths
var token_path = 'diffbot_token.txt';
var articles_url_array_path = 'public/articles.txt';
var articles_data_path = 'public/data/articles.json';
var DIFFBOT_TOKEN = fs.readFileSync(token_path,'utf-8').toString().trim();

// reads the list of article urls and call the scrape request function

function read_article_url_file(path){
	fs.readFile(path,'utf-8', (err, data) => {
	  if (err) throw err;
	  //console.log(data);
		article_url_array = data.toString().trim().replace('\n','').split(",");
		article_url_array.forEach(function(el){
			el.replace('\n','');
		});
		//console.log(article_url_array);
		send_scrape_requests(article_url_array);
	});
}

//

function write_to_database(new_obj){
	var obj_already_exists = false;
	fs.readFile(articles_data_path,'utf-8', (err, data) => {
		if (err) throw err;
		var current_data = JSON.parse(data);
		for(var i = 0; i < current_data.all_articles.length; i++){
			if(current_data.all_articles[i].url === new_obj.url){
				obj_already_exists = true;
			}
		}
		if(!obj_already_exists){
			console.log("adding new object:",new_obj.title);
			current_data.all_articles.push(new_obj);
		}else{
			console.log("object already exists!");
		}

		//console.log(current_data.all_articles);
		fs.writeFile(articles_data_path, JSON.stringify(current_data), (err) => {
			if (err) throw err;
			console.log('The new file has been saved!');
		});
	});
}

// send scraping requests

function send_scrape_requests(url_array){
	console.log("scrape url array!");
	//console.log(url_array);
		console.log("working!");
		url_array.forEach(function(el){
			console.log("my element is:",el);
			var article_data_obj = {};
			console.log("right before the request, diffbot token is", DIFFBOT_TOKEN);
			var requestURL = "https://api.diffbot.com/v3/article?token=" + DIFFBOT_TOKEN+ "&url=" + encodeURIComponent(el);
			//console.log(requestURL);
			Request(requestURL, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					//console.log(body);
					var the_data = JSON.parse(body);
					console.log("success, start grabbing data!");
					console.log(the_data);
					article_data_obj.url = the_data.objects[0].pageUrl.replace('\n','') || undefined;
					article_data_obj.author = the_data.objects[0].author || undefined;
					article_data_obj.title = the_data.objects[0].title || undefined;
					//article_data_obj.text = the_data.objects[0].text;
					article_data_obj.img = the_data.objects[0].images[0].url || undefined;
					// console.log(article_data_obj.url);
					console.log(article_data_obj);
					//write_to_database(article_data_obj);
				}
				else{
					console.log("something went wrong....");
				}
			});

		});


};

function scrape(){
	read_article_url_file(articles_url_array_path);
}

scrape();
