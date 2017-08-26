"use strict"

////////////////////////////////////////////////////
const http      = require("http");
const hostname  = "172.18.0.2";
const port      = 3500;  

const server    = http.createServer((request, response) => 
{   const fs    = require("fs");
    
    switch(request.url)
    {   case '/':   
        case '/index.html':     fs.readFile("index.html", (error, html)   => { if(error)throw error; response.end(html);  });break;
        case '/test.js':        fs.readFile("test.js",    (error, js)     => { if(error)throw error; response.end(js);  });break;
        default:                response.end('idk what to send u, sowie');break;
    }
});

server.listen(port,hostname,()=>{console.log("server started on port:"+port)});


////////////////////////////////////////////////////
/*
const http      = require("http");
const fs        = require("fs");

const hostname  = "172.18.0.2";// "127.0.0.1";//
const port      = 3500;

const server    = http.createServer((request, response) => 
{   const req_url = request.url;

    switch(req_url)
    {   case '/':   
        case '/index.html':     fs.readFile("index.html", (error, html)   => { if(error)throw error; response.end(html);  });break;
        case '/test.js':        fs.readFile("test.js",    (error, js)     => { if(error)throw error; response.end(js);  });break;
        default:                response.end('idk what to send u, sowie');break;
    }
*/    
    /*
    if(req_url === '/' || req_url === '/index.html') 
    {   fs.readFile("index.html", (error, html) => 
        {   //response.end(html);
        
            response.statusCode = 200;
            response.setHeader("Content-Type", "text/html");
            response.write(html);
            response.end();
        });
    } 
    else if(req_url === '/test.js') 
    {   fs.readFile("./test.js", (error, js) => 
        {   if(error)throw error;
            response.end(js);
        });
    } 
    else 
    {   response.end('idk what to send u, sowie');
    }
    */
    
    /*
    fs.readFile("index.html", (error, html) => 
    {   //console.log("2"); 
        if(error)throw error;
        //response.end(html);
        
        console.log("3");
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/html");
        response.write(html);
        response.end();
    });   
    */
/*
});

server.listen(port,hostname,()=>{console.log("server started on port:"+port)});
*/

/*
////////////////////////////////////////////////////
const http = require('http');

//const hostname = '127.0.0.1';
const hostname = '172.18.0.2';

const port = 3500;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/

/*
///////////////////////////////////////////
var http    = require('http');
var fs      = require('fs');
var path    = require("path");

///////////////////////////////////////////
var port    = 3500;

fs.readFile(__dirname + 'index.html', function (err, html) 
{   if (err) throw err; 
           
    http.createServer(function(request, response) 
    {   response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(port, '127.0.0.1',()=>{console.log("server started on port:"+port)});
});

*/