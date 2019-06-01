var express = require('express');
var router = express.Router();
const request = require('request');
const cheerio=require('cheerio');
const got = require('got');
const Post = require('../models/post');

/* GET users listing. */
router.get('/', function (req, res, next) {
  var url=req.query['url'];
  metaData(url).then((data)=>res.send(data));
});
function metaData(url){
  return new Promise((resolve,reject)=>{
    var targetUrl = url;
  console.log(targetUrl);
  (async () => {
    try {

      const {
        body: html,
        url
      } = await got(targetUrl)
      const item=scrapData(html,targetUrl);
      console.log(item);
      resolve(item);
    } catch (error) {
      console.log(error);
      resolve({}); 
    }
  })();
  })
}
function scrapData(body,link) {
  resObj = {},
    //set a reference to the document that came back
    $ = cheerio.load(body),
    //create a reference to the meta elements
    $title = $('head title').text(),
    $desc = $('meta[name="description"]').attr('content'),
    $kwd = $('meta[name="keywords"]').attr('content'),
    $ogTitle = $('meta[property="og:title"]').attr('content'),
    $ogImage = $('meta[property="og:image"]').attr('content'),
    $ogkeywords = $('meta[property="og:keywords"]').attr('content'),
    $images = $('img');

  if ($title) {
    resObj.title = $title;
  }

  if ($desc) {
    resObj.description = $desc;
  }

  if ($kwd) {
    resObj.keywords = $kwd;
  }

  if ($ogImage && $ogImage.length) {
    resObj.ogImage = $ogImage;
  }

  if ($ogTitle && $ogTitle.length) {
    resObj.ogTitle = $ogTitle;
  }

  if ($ogkeywords && $ogkeywords.length) {
    resObj.ogkeywords = $ogkeywords;
  }

  if ($images && $images.length) {
    resObj.images = [];

    for (var i = 0; i < $images.length; i++) {
      resObj.images.push($($images[i]).attr('src'));
    }
  }
  return new Post($title,$desc,$ogImage!=null?$ogImage:$images.length>1?$images[0]:'',link);

}
module.exports = router;
