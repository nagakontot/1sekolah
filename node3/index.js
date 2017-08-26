"use strict"

////////////////////////////////////////////////////

const fs            = require('fs');

const websocket   = require('uws');
//const http        = websocket.http;       //<-- this is experimental!!!

//const websocket     = require('ws');
const http          = require('http');

//const url         = require('url');
//const path        = require('path');

////////////////////////////////////////////////////////////////
// http stuff
////////////////////////////////////////////////////////////////
const hostname      = "172.18.0.2";
const port          = 3500;  


const httpserver    = http.createServer((req, res)=>
{   req.on('error', (err) => { console.error(err);res.statusCode = 400;res.end();});
    res.on('error', (err) => { console.error(err);});

    switch(req.url)
    {   case '/':       fs.readFile(__dirname+"/index.html","binary", (error, data)   => 
                        {   if(!error)
                            {   //readfile succeed!
                                res.end(data);
                            }  
                            else 
                            {   //readfile failed!
                                res.writeHead(404);
                                res.end(JSON.stringify(error));
                                //return;
                            }    
                        });
                        break;
        //case '/echo':   if(req.method === 'GET')req.pipe(res);break;
        default:        res.statusCode = 404; res.end('<html><body><h2>idk what to send u, sowie</h2></body></html>');break;
    }
});

httpserver.listen(port,hostname,()=>{console.log("httpserver started on port:"+port)});

///////////////////////////////////////////////////////////////////
// uwebsocket stuff
///////////////////////////////////////////////////////////////////
//https://github.com/uNetworking/uWebSockets/issues/379
//pass uws's own HTTP server to itself and have it run just like normally
//const wss = new websocket.Server({server: httpserver});

//const wss = new websocket.Server({  server:             httpserver,
//                                    clientTracking:     true,
//                                    perMessageDeflate:  false,
//                                    maxPayload:         Infinity
//                                });

//const wss = new websocket.Server({  server:             httpserver,
//                                    clientTracking:     true,
//                                    perMessageDeflate:  false
//                                });

const wss = new websocket.Server({  perMessageDeflate:  false,
                                    clientTracking:     true,
                                    port:               3600});

wss.on('connection', (ws,req,binary)=> 
{   //|-----------------------------------------|
    ws.on('error', (error) => 
    {   console.error('ERROR', error);
        //process.exit(1);
    });
  
    //|-----------------------------------------|
    //const ip = websocket.getAddress();
    //const ip = req.connection.remoteAddress;
    //const ip = req.headers['x-forwarded-for'];
    //console.log('server: ip='+ip);

    //|-----------------------------------------|
    ws.isAlive = true;
    ws.on('pong', ()=>
    {   console.log('server: this socket is alive');
        this.isAlive = true;
    });
  
    //|-----------------------------------------|
    //ws.on('message', (sock, msg, bin) => 
    //{
    ws.on('message', (msg)=> 
    {   //console.log('server:  received msg = ' + msg + ', ip = ' + ip);
        
        //setTimeout(()=> 
        //{   wss.clients.forEach((client)=> 
        //    {   if (client !== ws && client.readyState === websocket.OPEN) 
        //        {   client.send(msg);
        //            //client.send(gmsg);
        //        }
        //    });
        //}, 250)
        ////////////////////////////////////////////////
        // send only to sender
        //ws.send(msg, { binary: true });
        //ws.send(msg);
        //wss.broadcast(msg);
        //wss.broadcast(sock, msg, bin)
        //wss.broadcast(JSON.stringify({type: "broadcast", payload: msg}));
        //wss.broadcast({type: "broadcast", payload: msg});
        
        ////////////////////////////////////////////////
        //Broadcast to everyone else except the sender.
        //wss.clients.forEach((client)=> 
        //{   if (client !== ws && client.readyState === websocket.OPEN) 
        //    {   client.send(msg);
        //    }
        //});
        
        ////////////////////////////////////////////////
        //broadcast to ALL
        wss.clients.forEach((client)=> 
        {   if (client.readyState === websocket.OPEN) 
            {   client.send(msg);
            }
        });
        
        ///////////////////////////////////////////////////

    });
});

/*
// Broadcast to all.
wss.broadcast = function (data) 
{   wss.clients.forEach(function each(client) 
    {   console.log('IT IS GETTING INSIDE CLIENTS');
        console.log(client);

        // The data is coming in correctly
        console.log(data);
        client.send(data);
    });
};

// Broadcast to all.
wss.broadcast = function (data) 
{   wss.clients.forEach((client)=> 
    {   if (client !== ws && client.readyState === WebSocket.OPEN) 
        {   client.send(data);
        }
    });
};
*/
/*
setInterval(()=>
{   //if(wss.clients.length > 0)
    {   wss.broadcast(gmsg);//outputs undefined!
    }
},500);
*/

/*
//force termination after some period of time in ms;
const lifeinms = 1*60*60*1000;  //2 hours
const interval = setInterval(()=> 
{   wss.clients.forEach((ws)=> 
    {   if (ws.isAlive === false) 
        {   console.log('server: terminate a socket');
            return ws.terminate();
        }

        ws.isAlive = false;
        ws.ping('', false, true);
    });
}, lifeinms);
*/

// Broadcast to all.
//wss.broadcast = function (data) 
//{   wss.clients.forEach((client)=> 
//    {   if (client.readyState === WebSocket.OPEN) 
//        {   client.send(data);
//        }
//    });
//};


/////////////////////////////////////////////////////////////////////
/*
function onMessage(message) 
{   console.log('uws test ---->>> received: ' + message);
}
wss.on('connection', (ws,req)=> 
{   ws.on('message', onMessage);

    //const ip = req.connection.remoteAddress;
    //const ip = req.headers['x-forwarded-for'];
    //ws.send('uws test ---->>> ip=' + ip);
    ws.send('uws test ---->>> ip=');
});
*/
/////////////////////////////////////////////////////////////////////
/* 
wss.on('connection', (ws,req)=> 
{   ws.on('message', (message)=> 
    {   console.log('received: %s', message);
    });
    const ip = req.connection.remoteAddress;
    ws.send('something'+ip);
});
*/
//wss.on('connection', function connection(ws, req) {
//  const ip = req.connection.remoteAddress;
//});
//////////////////////////////////////////////////////






//////////////////////////////////////////////////////////////////////////////////////////
/*
////////////////////////////////////////////////////
//const http      = require('http');
const http      = require('uws').http;
const fs        = require('fs');
//const url       = require('url');
//const path      = require('path');

////////////////////////////////////////////////////
const hostname  = "172.18.0.2";
const port      = 3500;  

http.createServer(reqHandler).listen(port,hostname,()=>{console.log("server started on port:"+port)});

//u can remove the ip argument from listen. 
//otherwise it will bind only to this ip address. 
//and you wont be able to connect if it runs on a server.

////////////////////////////////////////////////////
//var mime        = { '.js'   : 'text/javascript; charset=UTF-8',
//                    '.txt'  : 'text/plain; charset=UTF-8',
//                    '.html' : 'text/html; charset=UTF-8',
//                    '.png'  : 'image/png',
//                    '.gif'  : 'image/gif',
//                    '.jpg'  : 'image/jpeg',
//                    '.json' : 'application/json'
//                  };

////////////////////////////////////////////////////////////////////////
function reqHandler(req, res)
{   req.on('error', (err) => { console.error(err);res.statusCode = 400;res.end();});
    res.on('error', (err) => { console.error(err);});

    switch(req.url)
    {   case '/':       //fs.readFile(__dirname+"/index.html",(error, data)   => 
                        fs.readFile(__dirname+"/index.html","binary", (error, data)   => 
                        {   if(!error){res.end(data);return;}  
                            
                            //readfile fail
                            res.writeHead(404);
                            res.end(JSON.stringify(error));
                            return;
                        });
                        break;
        case '/echo':   if(req.method === 'GET')req.pipe(res);break;
        default:        res.statusCode = 404; res.end('<html><body><h2>idk what to send u, sowie</h2></body></html>');break;
    }
*/    
    /*
    const { headers, method, url } = req;
    let body = [];
  
    req
    .on('error',    (err)=> 
    {   console.error(err);
    })
    .on('data',     (chunk)=> 
    {   body.push(chunk);
    })
    .on('end',      ()=> 
    {   body = Buffer.concat(body).toString();
        // At this point, we have the headers, method, url and body, and can now
        // do whatever we need to in order to respond to this request.
        
        
        // BEGINNING OF NEW STUFF
        res.on('error', (err) => {console.error(err);});
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ headers, method, url, body }));
        // END OF NEW STUFF        
        /////////////////////////////////
    });
    */
    
//}


/*
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
*/

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