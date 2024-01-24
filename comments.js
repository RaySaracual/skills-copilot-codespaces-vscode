// Create web server with node.js

var http = require('http');
var fs = require('fs');
var url = require('url');
var template = require('./lib/template.js');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query; // query string
    var pathname = url.parse(_url, true).pathname; // path
    var title = queryData.id;

    if(pathname === '/'){
        if(queryData.id === undefined){
            fs.readdir('./data', function(error, filelist){
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = template.list(filelist);
                var html = template.html(title, list,
                    `<h2>${title}</h2>${description}`,
                    `<a href="/create">create</a>`
                );
                response.writeHead(200);
                response.end(html);
            });
        } else {
            fs.readdir('./data', function(error, filelist){
                fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
                    var title = queryData.id;
                    var list = template.list(filelist);
                    var html = template.html(title, list,
                        `<h2>${title}</h2>${description}`,
                        `<a href="/create">create</a>
                         <a href="/update?id=${title}">update</a>
                         <form action="delete_process" method="post">
                            <input type="hidden" name="id" value="${title}">
                            <input type="submit" value="delete">
                         </form>`
                    );
                    response.writeHead(200);
                    response.end(html);
                });
            });
        }
    } else if(pathname === '/create'){
        fs.readdir('./data', function(error, filelist){
            var title = 'WEB - create';
            var list = template.list(filelist);
            var html = template.html(title, list, `
                <form action="/create_process" method="post">
                    <p><input type="text" name="title" placeholder="title"></p>
                    <p><textarea name="description" placeholder="description"></textarea></p>
                    <p><input type="submit"></p>
                </form>
            `, '');
            response.writeHead(200);
            response.end(html);
        });
    } else if(pathname === '/create_process'){
        var body = '';
        request.on('data', function(data){ // post 방식으로 전송된 데이터가 많을 경우를 대비해
            body = body + data;
        });
                request.on('data', function(data){ // post 방식으로 전송된 데이터가 많을 경우를 대비해
                    body = body + data;
                });
        } 
        });
