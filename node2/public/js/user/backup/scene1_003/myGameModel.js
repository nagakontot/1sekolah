"use strict"

//////////////////////////////////////////////////////////////////////////
var playerID;
var player;

var otherPlayers = {};

//////////////////////////////////////////////////////////////////////////
	class CGameModel
	{	constructor(app)
		{	this.app	= app;
		}
		
		init(xpos=50,ypos=0,zpos=50) 
		{	////////////////////////////////////////////////////////////////	
			// Load game world
			firebase.auth().onAuthStateChanged(function( user ) 
			{	if ( user ) 
				{	// User is signed in
					console.log( "Player is signed in " );
					playerID = user.uid;

					fbRef.child( "Players/" + playerID + "/isOnline" ).once( "value" ).then( function( isOnline ) 
					{	var isOnlinetrue = ( isOnline.val() === null || isOnline.val() === false );
						if(isOnlinetrue)	this.loadPlayers(xpos,ypos,zpos);
						else				console.log( "Hey, only one session at a time buddy!" );				
					}.bind(this));
				} 
				else 
				{	// User is signed out
					console.log( "Player is signed out " );
	
					firebase.auth().signInAnonymously().catch(function(error) 
					{	console.log( error.code + ": " + error.message );
					})
				}
			}.bind(this));
		}
		//////////////////////////////////
		//////////////////////////////////
		
		loadPlayers(xpos,ypos,zpos) 
		{	//this.loadEnvironment();				// load the environment
			this.initMainPlayer(xpos,ypos,zpos);				// load the player
			this.listenToOtherPlayers();
			/*
			if(getCookie("username")=== null)
			{	delay(  function()
                    	{	this.initMainPlayer();				// load the player
							this.listenToOtherPlayers();
                    	}.bind(this), 
                    	1000 ); // end delay
			}
			*/
			
			window.onunload = function() 
			{	fbRef.child( "Players/" + playerID ).remove();
			}.bind(this);

			window.onbeforeunload = function() 
			{	fbRef.child( "Players/" + playerID ).remove();
			}.bind(this);
		}
	
		initMainPlayer(xpos,ypos,zpos) 
		{	//while(getCookie("username")=== null) 
			//{	for(var i=0;i<10000;i++){}
			//	console.log("getCookie('username')="+getCookie("username"));
			//}
			
			fbRef.child( "Players/" + playerID ).set(
			{	isOnline:		true,
				orientation:	{	position: {x: xpos, y:ypos, z:zpos},
									rotation: {x: 0, y:0, z:0}
								},
				avatar:			getCookie("avatar"),
				username:		getCookie("username")
				
			});

			player = new Player( playerID,getCookie("avatar"),getCookie("username"));
			player.isMainPlayer = true;
			player.init(xpos,ypos,zpos);
		}

		updatePlayers()
		{	if(player)player.update();
		}
		
		listenToOtherPlayers(xpos,ypos,zpos) 
		{	// when a player is added, do something
			fbRef.child( "Players" ).on( "child_added", function( playerData ) 
			{	if ( playerData.val() ) 
				{	if ( playerID != playerData.key && !otherPlayers[playerData.key] ) 
					{	otherPlayers[playerData.key] = new Player( playerData.key,playerData.val().avatar,playerData.val().username );
						otherPlayers[playerData.key].init(xpos,ypos,zpos);
						fbRef.child( "Players/" + playerData.key ).on( "value", this.listenToPlayer );
					}
				}
			}.bind(this));

			// when a player is removed, do something
			fbRef.child( "Players" ).on( "child_removed", function( playerData ) 
			{	if ( playerData.val() ) 
				{	fbRef.child( "Players/" + playerData.key ).off( "value", this.listenToPlayer );
					//myapp.remove( otherPlayers[playerData.key].mesh );
					myapp.getScene().remove( otherPlayers[playerData.key].meshgroup );
					delete otherPlayers[playerData.key];
				}
			}.bind(this));
		}

		listenToPlayer( playerData ) 
		{	if ( playerData.val() ) 
			{	otherPlayers[playerData.key].setOrientation( playerData.val().orientation.position, playerData.val().orientation.rotation );
				//otherPlayers[playerData.key].update();
			}
		}		
	}