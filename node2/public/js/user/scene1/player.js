"use strict"

	class Player	
	{	constructor( playerID ) 
		{	this.playerID		= playerID;
			this.isMainPlayer	= false;
			this.mesh;
		}	
		
		init() 
		{	if ( this.mesh ) return;
			var cube_geometry = new THREE.BoxGeometry( 1, 1, 1 );
			var cube_material = new THREE.MeshBasicMaterial( {color: 0x7777ff, wireframe: false} );

			this.mesh = new THREE.Mesh( cube_geometry, cube_material );
			myapp.add( this.mesh );
			//app.add( this.mesh );

			// Give player control of this mesh
			if ( this.isMainPlayer )myapp.createControl(this.mesh);	
			//if ( this.isMainPlayer )app.createControl(this.mesh);	
			
		}

		setOrientation( position, rotation ) 
		{	if ( this.mesh ) 
			{	this.mesh.position.copy( position );
				this.mesh.rotation.x = rotation.x;
				this.mesh.rotation.y = rotation.y;
				this.mesh.rotation.z = rotation.z;
			}
		}
		
	}
