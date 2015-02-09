var http = require('http');

var requestUrl = 'http://metadata.helmet-kirjasto.fi/search/author.json?query=Campbell';
var pageContent = '<head><meta charset="utf-8"><title>Books</title></head><body><div class="content"><p>No books</p><div></body>';

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end(pageContent);
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

console.log('Get list of books...');
http.get(requestUrl, function(res) {
  var body = '';
  res.on('data', function(chunk) {
    body += chunk;
  });

  res.on('end', function() {
    console.log('Got books');

    var books = JSON.parse(body).records;
    var content = books.map(function(book){
      if(book.type === 'book') {
        return '<h2>'+book.title+'</h2><span>'+
          book.author+'</span><br><p class="publisher">'+
          book.publisher+' - ('+book.year+')</p>';
      }
    });
    pageContent = '<head><title>Books</title></head><body><div class="content">'+content+'<div></body>';
  });

}).on('error', function(e) {
  console.log("Error: ", e);
});
