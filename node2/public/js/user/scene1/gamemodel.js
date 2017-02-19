"use strict"

//////////////////////////////////////////////////////////////////////////
var playerID;
var otherPlayers = {};
var player;

//////////////////////////////////////////////////////////////////////////
	class CGameModel
	{	constructor(app)
		{	this.app	= app;
		}
		
		init() 
		{	////////////////////////////////////////////////////////////////	
			// Load game world
			firebase.auth().onAuthStateChanged(function( user ) 
			{	if ( user ) 
				{	// User is signed in
					console.log( "Player is signed in " );
					playerID = user.uid;

					fbRef.child( "Players/" + playerID + "/isOnline" ).once( "value" ).then( function( isOnline ) 
					{	var isOnlinetrue = ( isOnline.val() === null || isOnline.val() === false );
						if(isOnlinetrue)	this.loadPlayers();
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
		
		loadPlayers() 
		{	//this.loadEnvironment();				// load the environment
			this.initMainPlayer();				// load the player
			this.listenToOtherPlayers();

			window.onunload = function() 
			{	fbRef.child( "Players/" + playerID ).remove();
			}.bind(this);

			window.onbeforeunload = function() 
			{	fbRef.child( "Players/" + playerID ).remove();
			}.bind(this);
		}
		
		initMainPlayer() 
		{	fbRef.child( "Players/" + playerID ).set(
			{	isOnline:		true,
				orientation:	{	position: {x: 0, y:0, z:0},
									rotation: {x: 0, y:0, z:0}
								}
			});

			player = new Player( playerID );
			player.isMainPlayer = true;
			player.init();
		}

		listenToOtherPlayers() 
		{	// when a player is added, do something
			fbRef.child( "Players" ).on( "child_added", function( playerData ) 
			{	if ( playerData.val() ) 
				{	if ( playerID != playerData.key && !otherPlayers[playerData.key] ) 
					{	otherPlayers[playerData.key] = new Player( playerData.key );
						otherPlayers[playerData.key].init();
						fbRef.child( "Players/" + playerData.key ).on( "value", this.listenToPlayer );
					}
				}
			}.bind(this));

			// when a player is removed, do something
			fbRef.child( "Players" ).on( "child_removed", function( playerData ) 
			{	if ( playerData.val() ) 
				{	fbRef.child( "Players/" + playerData.key ).off( "value", this.listenToPlayer );
					myapp.remove( otherPlayers[playerData.key].mesh );
					delete otherPlayers[playerData.key];
				}
			}.bind(this));
		}

		listenToPlayer( playerData ) 
		{	if ( playerData.val() ) 
			{	otherPlayers[playerData.key].setOrientation( playerData.val().orientation.position, playerData.val().orientation.rotation );
			}
		}		

	}
