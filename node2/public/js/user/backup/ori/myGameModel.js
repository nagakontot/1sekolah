"use strict"

//////////////////////////////////////////////////////////////////////////
var playerID;
//var player;
window.otherPlayers = {};

//////////////////////////////////////////////////////////////////////////
	class CGameModel
	{	constructor(app)
		{	this.app			= app;
			this.player;
			//this.otherPlayers	= [];//{};
			
			//this.avatar		=+getCookie("avatar");
			//this.username		= getCookie("username");
			
			this.mysession		= new CSession();
			this.avatar			=+this.mysession.get("avatar");
			this.username		= this.mysession.get("username");
		}
		
		init(xpos=50,ypos=0,zpos=50) 
		{	////////////////////////////////////////////////////////////////	
			// Load game world
			//firebase.auth().onAuthStateChanged(function( user ) 
			firebase.auth().onAuthStateChanged(( user ) =>
			{	////////////////////////////////////////////////////////////////
				////////////////////////////////////////////////////////////////
				if ( user ) 
				{	// User is signed in
					console.log( "Player is signed in " );
					playerID = user.uid;

					//fbRef.child( "Players/" + playerID + "/isOnline" ).once( "value" ).then( function( isOnline ) 
					fbRef.child( "Players/" + playerID + "/isOnline" ).once( "value" ).then( (isOnline) =>
					{	var isOnlinetrue = ( isOnline.val() === null || isOnline.val() === false );
						if(isOnlinetrue)	this.loadPlayers(xpos,ypos,zpos);
						else				console.log( "Hey, only one session at a time buddy!" );				
					});
					//}.bind(this));
				} 
				else 
				{	// User is signed out
					console.log( "Player is signed out " );
	
					//firebase.auth().signInAnonymously().catch(function(error) 
					firebase.auth().signInAnonymously().catch((error) =>{ console.log( error.code + ": " + error.message );})
				}
			});
			//}.bind(this));
		}
		//////////////////////////////////
		//////////////////////////////////
		
		loadPlayers(xpos,ypos,zpos) 
		{	//this.loadEnvironment();				// load the environment
			this.initMainPlayer(xpos,ypos,zpos);				// load the player
			this.listenToOtherPlayers();

			window.onunload 		= () =>{ fbRef.child( "Players/" + playerID ).remove();};
			window.onbeforeunload	= () =>{ fbRef.child( "Players/" + playerID ).remove();};

			//window.onunload = function() 
			//{	fbRef.child( "Players/" + playerID ).remove();
			//}.bind(this);

			//window.onbeforeunload = function() 
			//{	fbRef.child( "Players/" + playerID ).remove();
			//}.bind(this);
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
				avatar:			this.avatar,
				username:		this.username,
				zone:			{	map:		0}
			});

			this.player = new Player( playerID,this.avatar,this.username);
			this.player.isMainPlayer = true;
			this.player.init(xpos,ypos,zpos);
			
			//myapp.getScene().add( this.moviemesh );
			//this.app.getScene().add( this.player.moviemesh );
			//if ( this.isMainPlayer )myapp.getScene().createControl(this.moviemesh);	

		}

		updatePlayers()
		{	if(this.player)this.player.update();
		}
		
		listenToOtherPlayers(xpos,ypos,zpos) 
		{	// when a player is added, do something
			//fbRef.child( "Players" ).on( "child_added", function( playerData ) 
			fbRef.child( "Players" ).on( "child_added", ( playerData ) =>
			{	if ( playerData.val() ) 
				{	if ( playerID != playerData.key && !window.otherPlayers[playerData.key] ) 
					{	window.otherPlayers[playerData.key] = new Player( playerData.key,playerData.val().avatar,playerData.val().username );
						window.otherPlayers[playerData.key].init(xpos,ypos,zpos);
						fbRef.child( "Players/" + playerData.key ).on( "value", this.listenToPlayer );
					}
				}
			});
			//}.bind(this));

			// when a player is removed, do something
			//fbRef.child( "Players" ).on( "child_removed", function( playerData ) 
			fbRef.child( "Players" ).on( "child_removed", ( playerData ) =>
			{	if ( playerData.val() ) 
				{	fbRef.child( "Players/" + playerData.key ).off( "value", this.listenToPlayer );
					//myapp.remove( window.otherPlayers[playerData.key].mesh );
					//myapp.getScene().remove( window.otherPlayers[playerData.key].meshgroup );
					myapp.getScene().remove( window.otherPlayers[playerData.key].moviemesh );
					delete window.otherPlayers[playerData.key];
				}
			});
			//}.bind(this));
		}

		listenToPlayer( playerData ) 
		{	if ( playerData.val() ) 
			{	window.otherPlayers[playerData.key].setOrientation	( playerData.val().orientation.position, playerData.val().orientation.rotation );
				window.otherPlayers[playerData.key].setZone			( playerData.val().zone.map );
				//window.otherPlayers[playerData.key].update();
			}
		}		
	}