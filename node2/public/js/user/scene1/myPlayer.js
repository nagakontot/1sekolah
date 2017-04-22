"use strict"

	class Player	
	{	constructor( playerID ) 
		{	this.playerID		= playerID;
			this.isMainPlayer	= false;
			this.mesh;
			this.meshgroup;
		}	
		
		init() 
		{	//if ( this.mesh ) return;
			if ( this.meshgroup ) return;
			
			var cube_geometry = new THREE.BoxGeometry( 0.8, 2, 0.3 );
			//var cube_material = new THREE.MeshBasicMaterial( {color: 0x7777ff, wireframe: false} );
			var cube_material  = new THREE.MeshPhongMaterial({specular: '#ffffff',color: '#aaaaaa',emissive: '#333333',shininess: 1 });

			this.mesh = new THREE.Mesh( cube_geometry, cube_material );
			
			///////////////////////////////////////////////////////////////////////////////////
			//this.movieMaterial		= new ChromaKeyMaterial('video/troll_dance3.webm', 320,240, 0xd400);
			//this.movieGeometry		= new THREE.PlaneGeometry(60, 105, 4, 4);

			this.movieMaterial		= new ChromaKeyMaterial('video/troll_dance3.webm', 320,240, 0xd400);
			//this.movieGeometry		= new THREE.PlaneGeometry(3,5, 4, 4);
			this.movieGeometry		= new THREE.PlaneGeometry(1.5,3, 4, 4);
			
			this.moviemesh = new THREE.Mesh(this.movieGeometry,this.movieMaterial);
			//this.moviemesh.position.set(0, 53, 0);
			
			
			///////////////////////////////////////////////////////////////////////////////////
			this.meshgroup = new THREE.Object3D();//create an empty container
			this.meshgroup.add( this.mesh );//add a mesh with geometry to it
			this.meshgroup.add( this.moviemesh );//add a mesh with geometry to it
			
			
			myapp.add( this.meshgroup );
			//myapp.add( this.mesh );
			
			//app.add( this.mesh );

			// Give player control of this mesh
			if ( this.isMainPlayer )myapp.createControl(this.meshgroup);	
			//if ( this.isMainPlayer )myapp.createControl(this.mesh);	
			//if ( this.isMainPlayer )app.createControl(this.mesh);	
			
		}

		setOrientation( position, rotation ) 
		{	//if ( this.mesh ) 
			//{	this.mesh.position.copy( position );
			//	this.mesh.rotation.x = rotation.x;
			//	this.mesh.rotation.y = rotation.y;
			//	this.mesh.rotation.z = rotation.z;
			//}
			if ( this.meshgroup ) 
			{	this.meshgroup.position.copy( position );
				this.meshgroup.rotation.x = rotation.x;
				this.meshgroup.rotation.y = rotation.y;
				this.meshgroup.rotation.z = rotation.z;
			}			
		}
		
		update()
		{	this.movieMaterial.update();
		}		
	}
