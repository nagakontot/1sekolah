"use strict"

//////////////////////////////////////////////////////////////////////////
//var playerID;
var player;
var otherPlayers = {};

//////////////////////////////////////////////////////////////////////////
	class CGameModel
	{	//constructor(app)
		constructor()
		{	//this.app		= app;
			this.playerID	= null;
			
			this.avatar		=+getCookie("avatar");
			this.username   = getCookie("username");
		}
		
		init(xpos=50,ypos=0,zpos=50) 
		{	if(this.playerID!=null)return;
			////////////////////////////////////////////////////////////////	
			// Load game world
			firebase.auth().onAuthStateChanged(function( user ) 
			{	if ( user ) 
				{	// User is signed in
					console.log( "CGameModel.init(): Player is signed in " );
					this.playerID = user.uid;
					//console.log( "CGameModel.init(): this.playerID = "+this.playerID);

					fbRef.child( "Players/" + this.playerID + "/isOnline" ).once( "value" ).then( function( isOnline ) 
					{	var isOnlinetrue = ( isOnline.val() === null || isOnline.val() === false );
						if(isOnlinetrue)	this.loadPlayers(xpos,ypos,zpos);
						else				console.log( "Hey, only one session at a time buddy!" );				
					}.bind(this));
				} 
				else 
				{	// User is signed out
					console.log( "CGameModel.init(): Player is signed out " );
					firebase.auth().signInAnonymously().catch(function(error) 
					{	console.log( error.code + ": " + error.message );
					})
				}
			}.bind(this));
		}
		//////////////////////////////////
		//////////////////////////////////
		
		loadPlayers(xpos,ypos,zpos) 
		{	console.log( "CGameModel.loadPlayers(): this.playerID = "+ this.playerID);

			this.initMainPlayer(xpos,ypos,zpos);				// load the player
			this.listenToOtherPlayers();

			window.onunload = function() 
			{	fbRef.child( "Players/" + this.playerID ).remove();
			}.bind(this);

			window.onbeforeunload = function() 
			{	fbRef.child( "Players/" + this.playerID ).remove();
			}.bind(this);
		}
	
		initMainPlayer(xpos,ypos,zpos) 
		{	console.log( "CGameModel.initMainPlayer(): this.playerID = "+ this.playerID);
			console.log( "CGameModel.initMainPlayer(): this.username = "+ this.username);
		
			if(this.playerID===null	|| this.playerID===undefined) return;
			if(this.username===null	|| this.username===undefined) return;
			
			fbRef.child( "Players/" + this.playerID ).set(
			{	isOnline:		true,
				orientation:	{	position: {x: xpos, y:ypos, z:zpos},
									rotation: {x: 0, y:0, z:0}
								},
				avatar:			this.avatar,
				username:		this.username
			});

			player = new Player( this.playerID,this.avatar,this.username);
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
				{	console.log( "CGameModel.listenToOtherPlayers(): this.playerID = "+ this.playerID);
					console.log( "CGameModel.listenToOtherPlayers(): playerData.val().username = "+ playerData.val().username);
					//if(playerData.val().username === undefined)return;
					//if(playerData.key			   === undefined)return;
					//if ( this.playerID != playerData.key && !otherPlayers[playerData.key] ) 
					if ( this.playerID != playerData.key && !otherPlayers[playerData.key] && playerData.val().username != undefined && playerData.key != undefined)
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