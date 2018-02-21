
			//var us = require('underscore');
			
			//var client = require('browserify-client').connect('https://browserify.1sekolah.xyz');
			//var qs = require('qs');
			//var client = require('browserify-client');//.connect('http://localhost:4000');
			//client.require('underscore', function(err, _) 
			//{	// _ is set to the latest version of underscore
 			//});
 			
			/////////////////////////////////////////////////////
			/////////////////////////////////////////////////////
			//window.location.href = 'https://www.1sekolah.xyz/main.html';
			//var messagesPanel, first = true, ws, id;
			var messagesPanel, ws, id;
			var first				= [];
			var typedMessage		= [];
			var messages			= [];
			window.ChatCurrentIndex = 0;
			window.ChatRows 		= 9;
			window.ChatCols 		= 20;//4;
			
			const mysession	= new CSession();
			//mysession.set("username",mysession.get("username"));
			//id = mysession.get("username");
						
			function main() 
			{	//var us = require('underscore');
				
				//var artists = ['Pharrel Williams', 'Led Zeppelin', 'Rolling Stones'];
				//_.each(artists, function(artist, index, artists) 
				//{	console.log('artist: ' + artist);
				//});
				
				///////////////////////////////////////
				//var vonkeydown_ = function onkeydown_(e,typedMessage)
				//function onkeydown_(e,typedMessage)
				function onkeydown_(e,index)
				{	window.ChatCurrentIndex = index;
					if (e.keyCode === 13 && !e.shiftKey) 
					{	if (typedMessage[index].value.length) 
						{	if (typedMessage[index].value === "can i has new color?") 
							{	id = Math.floor(Math.random() * 1000000);
								localStorage.id = id;
							}
						
							typedMessage[index].value = typedMessage[index].value.substring(0, 512);
							addMessage(id, typedMessage[index].value, false);
							ws.send(id + " " + typedMessage[index].value);
						}
						typedMessage[index].value = "";
						return false;
					}
					return true;
				}

				//var vonclick_ = function onclick_(typedMessage,first)
				//function onclick_(typedMessage,first)
				function onclick_(index)
				{	window.ChatCurrentIndex = index;
					//alert("window.ChatCurrentIndex="+window.ChatCurrentIndex);
					if (first[index])
					{	typedMessage[index].value = "";
						first[index] = false;
					}
				}
				
				////////////////////////////////////////////////////////////////////////////////
				////////////////////////////////////////////////////////////////////////////////
				messagesPanel	= document.getElementById("messagesPanel");
			
				//var rows=9,cols=4;
				var rows = window.ChatRows;
				var cols = window.ChatCols;

				var i,j,typedid,typedid2;//,tm,fst;
				for(i=0;i<rows;i++)
				{	typedid 								= "typedMessage"+String(i)+"-";
					
					for(j=0;j<cols;j++)
					{	typedid2 							= typedid+String(j);

						index=getIndex(i,j,cols);
						//console.log("typedid2="+typedid2+", index="+index);

						typedMessage[index]					= getArray(typedMessage,index);
						first[index]						= getArray(first,index);
						
						typedMessage[index]					= document.getElementById(typedid2);
						first[index]						= true;
						
						typedMessage[index].myParam 		= index;
						typedMessage[index].onkeydown		= (e)=>{ return onkeydown_(e,e.currentTarget.myParam);}
						typedMessage[index].onclick 		= (e)=>{ onclick_(e.currentTarget.myParam);}
					}
				}
			
				//const mysession	= new CSession();
				//mysession.set("username",mysession.get("username"));
				//id = mysession.get("username");
				if (localStorage.id) 
				{	id = localStorage.id;
				} 
				else 
				{	id = Math.floor(Math.random() * 1000000);
					localStorage.id = id;
				}
	
				//ws = new WebSocket("ws://" + window.location.hostname + ":" + window.location.port);
				ws = new WebSocket("wss://socket.1sekolah.xyz");
				
				ws.onmessage = function(e) 
				{	if (e.data.charAt(0) == 'S') 
					{	var info = e.data.split(" ");
						statusBar.textContent = 'General demo chat built with µWebSockets. ' + info[1] + ' user(s) online, ' + info[2] + ' kb of user space memory.';
						for(i=0;i<rows;i++)
						{	for(j=0;j<cols;j++)
							{	typedMessage[getIndex(i,j,cols)].disabled = false;
							}
						}
					} 
					else 
					{	var splitPos = e.data.indexOf(" ");
						if (splitPos != -1) 
						{	var incomingId = e.data.substr(0, splitPos);

							if (typedMessage[window.ChatCurrentIndex].disabled || incomingId != id)
							{	addMessage(incomingId, e.data.substr(splitPos), incomingId != id);
							}
						}
					}
				};
	
				ws.onclose = function() 
				{	statusBar.textContent = 'Connection lost';
					for(i=0;i<rows;i++)
					{	for(j=0;j<cols;j++)
						{	typedMessage[getIndex(i,j,cols)].disabled = true;
						}
					}
				};
			}

			function addMessage(id, message, left) 
			{	var flexBox = document.createElement('div');
				flexBox.style = 'display: flex; ' + (left ? '' : 'justify-content: flex-end');
				var messageBox = document.createElement('p');
				//messageBox.style = "background-color: hsl(" + (id / 16 * 360) + ", 100%, 50%); overflow: hidden; text-overflow: ellipsis;";
				messageBox.style = "background-color: hsl(" + (id / 8 * 360) + ", 100%, 50%); overflow: hidden; text-overflow: ellipsis;";
				messageBox.textContent = message;
				flexBox.appendChild(messageBox);
				
				if (messages.length == 50) 
				{	messagesPanel.removeChild(messages.shift());
				}
				
				messages.push(flexBox);
				setTimeout(function() 
				{	messageBox.className = "show";
				}, 10);
	
				var wereBottomScrolled = true;//messagesPanel.scrollTop == messagesPanel.scrollHeight;
				messagesPanel.appendChild(flexBox);
				if (wereBottomScrolled) 
				{	messagesPanel.scrollTop = messagesPanel.scrollHeight;
				}
			}
			
			/////////////////////////////////////////////////////
			/////////////////////////////////////////////////////
			var client = iframeRPC.createClient('https://www.1sekolah.xyz');
			//client('getPrice', 1234, function (err, price) 
			//{	alert('price:' + price);
			//});
			/////////////////////////////////////////////////////////
			//client('sum', [1,2,3,4], function (err, total) 
			//{	alert('total:' + total);
			//});			
			/////////////////////////////////////////////////////
			/////////////////////////////////////////////////////
