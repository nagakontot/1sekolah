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
			mygame.add( this.scope.mesh );

			if ( this.scope.isMainPlayer ) 
			{	// Give player control of this mesh
				//controls = new THREE.PlayerControls( camera , scope.mesh );
				//controls = new THREE.PlayerControls( mygame.camera , scope.mesh );
				//controls.init();
				mygame.createControl(this.scope.mesh);	
			}
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