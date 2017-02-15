"use strict"

	class Player	
	{	constructor( playerID ) 
		{	this.playerID		= playerID;
			this.isMainPlayer	= false;
			this.scope			= this;
		}	
		
		init() 
		{	var cube_geometry = new THREE.BoxGeometry( 1, 1, 1 );
			var cube_material = new THREE.MeshBasicMaterial( {color: 0x7777ff, wireframe: false} );

			this.scope.mesh = new THREE.Mesh( cube_geometry, cube_material );
			myapp.add( this.scope.mesh );

			// Give player control of this mesh
			if ( this.scope.isMainPlayer )myapp.createControl(this.scope.mesh);	
			
		}

		setOrientation( position, rotation ) 
		{	if ( this.scope.mesh ) 
			{	this.scope.mesh.position.copy( position );
				this.scope.mesh.rotation.x = rotation.x;
				this.scope.mesh.rotation.y = rotation.y;
				this.scope.mesh.rotation.z = rotation.z;
			}
		}
		
	}