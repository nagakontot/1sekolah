"use strict"
/*
	class CGeom
	{	constructor(size) 
		{	this.geometry 	= new THREE.BoxGeometry(size.width, size.height, size.depth);
			this.material 	= new THREE.MeshBasicMaterial({color: 0x00ff00});
    	    this.mesh 		= new THREE.Mesh(this.geometry, this.material);
		}
  
		update() 
		{	this.mesh.rotation.x += 0.1;
			this.mesh.rotation.y += 0.1;
		}
  
		getMesh() 
		{	return this.mesh;
		}
	}
*/
	class Cube
	{	constructor(size) 
		{	this.geometry 	= new THREE.BoxGeometry(size.width, size.height, size.depth);
			this.material 	= new THREE.MeshBasicMaterial({color: 0x00ff00});
    	    this.mesh 		= new THREE.Mesh(this.geometry, this.material);
		}
  
		update() 
		{	this.mesh.rotation.x += 0.1;
			this.mesh.rotation.y += 0.1;
		}
  
		getMesh() 
		{	return this.mesh;
		}
	}
	
/*
function loadEnvironment() 
{	var sphere_geometry = new THREE.SphereGeometry( 1 );
	var sphere_material = new THREE.MeshNormalMaterial();
	var sphere			= new THREE.Mesh( sphere_geometry, sphere_material );

	//scene.add( sphere );
	mygame.add( sphere );
}
*/

//////////////////////////////////////////////////////////////////////////
	class Cmydb
	{	constructor()
		{
			
		}
		
		init(mygame) 
		{	// Setup
			//mygame		= new CThreejs();
			//mygame.createHelper();
		
			//mygame		= new CmyApp();
			//mygame.add(new Cube({width: 10,height: 10,depth: 10}));
		
			////////////////////////////////////////////////////////////////	
			// Load game world
			firebase.auth().onAuthStateChanged(function( user ) 
			{	if ( user ) 
				{	// User is signed in
					console.log( "Player is signed in " );
					playerID = user.uid;

					fbRef.child( "Players/" + playerID + "/isOnline" ).once( "value" ).then( function( isOnline ) 
					{	var isOnlinetrue = ( isOnline.val() === null || isOnline.val() === false );
						if(isOnlinetrue)loadGame(mygame);
						else						alert( "Hey, only one session at a time buddy!" );				
					});
				} 
				else 
				{	// User is signed out
					console.log( "Player is signed out " );
	
					firebase.auth().signInAnonymously().catch(function(error) 
					{	console.log( error.code + ": " + error.message );
					})
				}
			});
		}
	}


	
	///////////////////////////////////////////////////////////////////////
	class CmyApp extends CThreejs
	{ 	constructor(width=window.innerWidth,height=window.innerHeight,fps=30) 
		{	super(width,height,fps);
			this.mydb = new Cmydb();
		}
  
		init() 
		{	this.createHelper();
			this.mydb.init(this);
		
			/*
			this.scene 		= new THREE.Scene();
			this.camera 	= new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
			this.camera.position.z = 20;

			this.renderer 	= new THREE.WebGLRenderer();
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(this.renderer.domElement);
			*/
    
			//this.render();
		}
  
		render() 
		{	this.requestId  = window.requestAnimationFrame(() => 
			{	this.render();
			});
   
			/*
			this.objects.forEach((object) => 
			{	object.update();
			});
			
			if ( controls )controls.update();
			*/
    
    		this.update();
    		
			//this.renderer.render(this.scene, this.camera);
			this.renderer.render(this.scene, this.cam);
		}

	}    	

//////////////////////////////////////////////////////////////////////////

			
var mygame = new CmyApp();
//mygame.add(new Cube({width: 10,height: 10,depth: 10}));

mygame.init();
mygame.render();

