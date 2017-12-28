"use strict"

var path    = require("path");

//////////////////////////////////////////////////////////////////////
var redbird = require('redbird')
({  port:   3000,
    ssl:    {   port:   3443,
                key:    path.join(__dirname + './../../key/key.pem'),
                cert:   path.join(__dirname + './../../key/cert.pem'),
                ca:     path.join(__dirname + './../../key/ca-crt.pem'),
                http2:  true
            }
});

//var docker = require('redbird').docker;
//docker(redbird).register("rchat.1sekolah.xyz", 'rocket.chat:latest');

//////////////////////////////////////////////////////////////////////
// need to open port in putty, map docker:80 to localip:3000,
//                             map docker:443 to localip:3443,
// find localip: docker network inspect mynet
//               OR
//               docker inspect mycloud9 | grep IPAddress
//
// eg: if localip is 172.18.0.2, then:
// iptables -t nat -A  DOCKER -p tcp --dport 80 -j DNAT --to-destination 172.18.0.2:3000
// iptables -t nat -A  DOCKER -p tcp --dport 443 -j DNAT --to-destination 172.18.0.2:3443
//////////////////////////////////////////////////////////////////////
//redbird.register("1sekolah.xyz",                  "http://172.18.0.2:3001",   {ssl: true});
//redbird.register("www.1sekolah.xyz",              "http://172.18.0.2:3001",   {ssl: true});

redbird.register("www.1sekolah.xyz",                "http://172.18.0.3:6000",   {ssl: true});
//redbird.register("www.1sekolah.xyz",                "http://172.18.0.3:8080",   {ssl: true});
redbird.register("ide.1sekolah.xyz",                "http://172.18.0.3:8181",   {ssl: true});

//redbird.register("test1.1sekolah.xyz",            "http://172.18.0.2:3500",   {ssl: true});
redbird.register("test1.1sekolah.xyz",              "http://172.18.0.3:8080",   {ssl: true});

//redbird.register("socket.1sekolah.xyz",           "http://172.18.0.2:3500",   {ssl: true});    //using ws
//redbird.register("socket.1sekolah.xyz",           "http://172.18.0.2:3600",   {ssl: true});      //using uws
redbird.register("socket.1sekolah.xyz",             "http://172.18.0.3:6000",   {ssl: true});      //using uws

redbird.register("droppy.1sekolah.xyz",             "http://172.18.0.2:8989",   {ssl: true});

//redbird.register("browser.1sekolah.xyz",             "http://172.18.0.4:6080",   {ssl: true});      
//redbird.register("cdn.1sekolah.xyz",               "http://172.18.0.4:9000",   {ssl: true});      

//redbird.register("cors.1sekolah.xyz",               "http://172.18.0.4:8080",   {ssl: true});    

//redbird.register("x11.1sekolah.xyz",              "http://172.18.0.3:10000",  {ssl: true});   ////Then visit https://x11.1sekolah.xyz/index.html?encoding=png&password=Keplaotak_1234

//redbird.register("wine.1sekolah.xyz",            "http://172.18.0.4:8080",   {ssl: true});
//redbird.register("vpn.1sekolah.xyz",              "http://172.18.0.4:5555",   {ssl: true});


//redbird.register("test1.1sekolah.xyz",            "http://172.18.0.2:8080",   {ssl: true});
//redbird.register("socket.1sekolah.xyz",           "http://172.18.0.5:6020",   {ssl: true});

//redbird.register("rchat.1sekolah.xyz",              "http://172.18.0.5:3000",   {ssl: true});

//redbird.register("test2.1sekolah.xyz",            "http://172.18.0.5:80",  {ssl: true});

//redbird.register("ide.1sekolah.xyz",              "http://172.18.0.4:8181",   {ssl: true});


//redbird.register("drupal.1sekolah.xyz",           "http://172.18.0.6:80",  {ssl: true});

//redbird.register("x11.1sekolah.xyz",              "http://172.18.0.4:20000",  {ssl: true});   ////Then visit https://x11.1sekolah.xyz/index.html?encoding=png&password=keplaotak
//redbird.register("wine.1sekolah.xyz",             "http://172.18.0.8:8080",  {ssl: true});   ////Then visit https://x11.1sekolah.xyz/index.html?encoding=png&password=keplaotak
                                         
//redbird.register("canvas.1sekolah.xyz",           "http://172.18.0.6:3000",  {ssl: true});
//redbird.register("moodle.1sekolah.xyz",           "http://172.18.0.4:80",  {ssl: true});
//redbird.register("moodle.1sekolah.xyz",           "https://172.18.0.4:443",  {ssl: true});

//redbird.register("wp.1sekolah.xyz",               "https://172.18.0.5:80",  {ssl: true});



//////////////////////////////////////////////////////////////////////
//redbird.register("test1.1sekolah.xyz",           "http://172.18.0.5:80",    {ssl: true});
//redbird.register("test2.1sekolah.xyz",           "http://172.18.0.6:3000",  {ssl: true});

//////////////////////////////////////////////////////////////////////
//redbird.register("nodebb.1sekolah.xyz",           "http://172.18.0.6:4567",  {ssl: true});
//redbird.register("express.1sekolah.xyz",          "http://172.18.0.6:8081",  {ssl: true});
//redbird.register("mongoclient.1sekolah.xyz",        "http://172.18.0.6:3000",  {ssl: true});

//////////////////////////////////////////////////////////////////////
/*
redbird.register("mail.1sekolah.xyz",           "http://172.18.0.5:25",  {ssl: true});
redbird.register("webmail.1sekolah.xyz",        "http://172.18.0.5:80",  {ssl: true});

redbird.register("webmail.1sekolah.xyz:110/mail",    "http://172.18.0.5:110",  {ssl: true});

redbird.register("webmail.1sekolah.xyz:143/mail",    "http://172.18.0.5:143",  {ssl: true});

redbird.register("webmail.1sekolah.xyz:587/mail",    "http://172.18.0.5:587",  {ssl: true});
redbird.register("webmail.1sekolah.xyz:993/mail",    "http://172.18.0.5:993",  {ssl: true});
redbird.register("webmail.1sekolah.xyz:995/mail",    "http://172.18.0.5:995",  {ssl: true});
*/
//////////////////////////////////////////////////////////////////////
//redbird.register("myBB.1sekolah.xyz",           "http://172.18.0.4:80",  {ssl: true});

//redbird.register("wp.1sekolah.xyz",             "http://172.18.0.10:80",  {ssl: true});
//


//////////////////////////////////////////////////////////////////////
//redbird.register("cuberite.1sekolah.xyz",       "http://172.18.0.8:25565", {ssl: true});
//redbird.register("cuberite_admin.1sekolah.xyz", "http://172.18.0.5:8080",  {ssl: true});

//redbird.register("minetest.1sekolah.xyz",       "http://172.18.0.7:30000", {ssl: true});
//redbird.register("mcclassic.1sekolah.xyz",      "http://172.18.0.8:25565", {ssl: true});
//redbird.register("mcclassic_admin.1sekolah.xyz","http://172.18.0.8:25575", {ssl: true});

//redbird.register("mcweb.1sekolah.xyz",          "http://172.18.0.2:8080", {ssl: true});
//////////////////////////////////////////////////////////////////////
//redbird.register("manic.1sekolah.xyz",          "http://172.18.0.2:8080", {ssl: true});

//redbird.register("mcclient.1sekolah.xyz",       "http://172.18.0.2:25565", {ssl: true});

//redbird.register("mcclient.1sekolah.xyz",     "http://172.18.0.2:80", {ssl: true});
//redbird.register("mcadmin.1sekolah.xyz",  "http://172.18.0.6:8080", {ssl: true});

//redbird.register("mc.1sekolah.xyz",       "http://172.18.0.5:25565", {ssl: true});
//redbird.register("mcrcon.1sekolah.xyz",   "http://172.18.0.5:25575", {ssl: true});
//redbird.register("mcweb.1sekolah.xyz",    "http://172.18.0.5:8123", {ssl: true});


/*
//////////////////////////////////////////////////////////////////////

var express         = require('express'); 
var favicon         = require('serve-favicon');
var path            = require("path");
var compression     = require('compression');
var helmet          = require('helmet');
var forceSSL        = require('express-force-ssl');
var fs              = require('fs');
var http            = require('http');  
var https           = require('https');

var apiProxy        = require('http-proxy').createProxyServer({target: 'ws://172.18.0.4:3000',ws: true});

var app             = express();

var tgt             = [ 'http://172.18.0.2:3001',  //login
                        'http://172.18.0.4:3000',  //rchat
                        //'http://172.18.0.2:10000'  //ide
                        //'http://localhost:3002',  //s1
                        //'http://localhost:3003',  //s2
                        //'http://localhost:3004',  //s3
                        //'http://localhost:3005'   //lobby
                      ];

    http.globalAgent.maxSockets     = Infinity;  
    https.globalAgent.maxSockets    = Infinity; 

    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(compression());
    app.use(helmet());
    app.use(forceSSL);
    app.use(express.static(__dirname + '/public'));
    
    app.set('forceSSLOptions', {enable301Redirects:true,trustXFPHeader:false,httpsPort:443,sslRequiredMessage:'SSL Required.'});

    app.all("/",                function(req, res) {apiProxy.web(req, res, {target: tgt[0]});});
    //app.all("/s1",            function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});
    //app.all("/s2",            function(req, res) {apiProxy.web(req, res, {target: tgt[2]});});
    //app.all("/s3",            function(req, res) {apiProxy.web(req, res, {target: tgt[3]});});
    //app.all("/lobby",         function(req, res) {apiProxy.web(req, res, {target: tgt[4]});});
    
    //login stuff
    //app.all("/login*",        function(req, res) {apiProxy.web(req, res, {target: tgt[0]});});    
    app.all("/user*",           function(req, res) {apiProxy.web(req, res, {target: tgt[0]});});    

    
    //rocketchat stuff
    //app.all("/rchat*",          function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    
    app.all("/login*",          function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/home*",           function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/account*",        function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/changeavatar*",   function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/admin*",          function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/channel*",        function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/history*",        function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/livechat*",       function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/pakages*",        function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/_oauth*",         function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/terms-of-service*",function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/privacy-policy*", function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/room*",           function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/fxos*",           function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/register*",       function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    app.all("/sockjs*",         function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    
    //cloud9 stuff
    //app.all("/ide*",            function(req, res) {apiProxy.web(req, res, {target: tgt[2]});});    

    //app.all("/*",function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    //app.all("/*",function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    //app.all("/*",function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    
    //app.all("/*",function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});    

    //app.all("/rchat*",              function(req, res) {apiProxy.web(req, res, {hostnameOnly: true,target: tgt[1]});});    //<--error!!
    //app.all("/rchat*",                function(req, res) {apiProxy.web(req, res, {target: tgt[1],router: {'/rchat': '172.18.0.4:3000'}});});  
    
    //app.all("*",                function(req, res) {apiProxy.web(req, res, {target: tgt[1],router: {'/rchat': '172.18.0.4:3000'}});});  

    //app.all("*",                function(req, res) {apiProxy.web(req, res, {target: tgt[1]});});  
    
    app.all('*',                function(req, res) {res.redirect("/");});
    

//|///////////////////////////////////////|
//|     create servers                    |
//|///////////////////////////////////////|
var ssl_options =   {   key:    fs.readFileSync(path.join(__dirname + '/key/key.pem')),
                        cert:   fs.readFileSync(path.join(__dirname + '/key/cert.pem')),
                        ca:     fs.readFileSync(path.join(__dirname + '/key/ca-crt.pem'))
                    };

var wsproxyServer = http.createServer(app);
wsproxyServer.on('upgrade', function (req, socket, head) 
{   apiProxy.ws(req, socket, head);
});
wsproxyServer.listen(3000);

var wssproxyServer = https.createServer(ssl_options,app);
wssproxyServer.on('upgrade', function (req, socket, head) 
{   apiProxy.ws(req, socket, head);
});
wssproxyServer.listen(3443);


//http.createServer(app).listen(3000);
//https.createServer(ssl_options,app).listen(3443);
*/