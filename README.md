# re-tweak
#### Final project for [Politics of Code](https://github.com/periode/politics-of-code) class at NYU Abu Dhabi
Re-tweak modifies content on unsecure news websites to show the extent to which unencrypted web, particularly the part of it pertaining to news dissemination, is subject to content modifications. 
By visibily tweaking online news content, the project aims to spur conversations about news integrity online and online security in general.
   
### Why Re-tweak?
Online content access and exchange can be subject to nefarious interference. 
In 2017, hacking and manipulating online news is becoming an increasingly common way to engineer public opinion 
[1](https://www.nytimes.com/2017/09/07/us/politics/russia-facebook-twitter-election.html)
[2](https://www.theguardian.com/politics/2017/nov/13/theresa-may-accuses-russia-of-interfering-in-elections-and-fake-news). 
   
I wanted to add to the conversation about cyber attacks and fake news by making two points:   

**a)** raise awareness about the ease with which online news content can be tweaked and the resulting implications for the way we approach news access and sharing online, and    
**b)** that paying attention to security measures online pays off

### How does it work?

I am performing a man-in-the-middle attack, which is a widespread form of online spoofing 
[1](https://en.wikipedia.org/wiki/Man-in-the-middle_attack). 

Man-in-the-middle attack is classified as a cyber attack and is illegal in most countries around the world. 
Re-tweak is used strictly for educational purposes and will only be deployed in exhibition settings. 
If you are concerned about what the code does, all the scripts used in the project are open and accessible to anyone this repo.

### How does it not work?
Encrypted HTTP websites (i.e. HTTPS) effectively eliminate the possibility of content being tweaked by the Re-tweak script. 
The lesson learned here is that it pays dividends to be secure online. 
Use HTTPS and think twice before you connect to a free wifi hotspot during your next stopover
