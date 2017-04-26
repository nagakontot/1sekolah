"use strict"

	//var movieMaterial		= new ChromaKeyMaterial('video/baby4.webm', 320,218, 0xd400);
	
	class Player	
	{	constructor( playerID,avatar,username) 
		{	this.playerID		= playerID;
			this.isMainPlayer	= false;
			this.mesh;
			this.meshgroup;
			this.avatar			= avatar;
			this.username		= username;
		}	
		 
		init() 
		{	//if ( this.mesh ) return;
			if ( this.meshgroup ) return;
			
			//var cube_geometry = new THREE.BoxGeometry( 0.2, 2, 0.1 );
			//var cube_material  = new THREE.MeshPhongMaterial({specular: '#ffffff',color: '#aaaaaa',emissive: '#333333',shininess: 1 });

			//this.mesh = new THREE.Mesh( cube_geometry, cube_material );
			//this.mesh.castShadow		= true;			
			//this.mesh.receiveShadow		= false;
			
			
			///////////////////////////////////////////////////////////////////////////////////
			//this.movieMaterial		= new ChromaKeyMaterial('video/troll_dance3.webm', 320,240, 0xd400);
			//this.movieGeometry		= new THREE.PlaneGeometry(60, 105, 4, 4);

			//this.movieMaterial		= new ChromaKeyMaterial('video/baby4.webm', 320,218, 0xd400);
			//this.movieGeometry		= new THREE.PlaneGeometry(3.2,2.18, 4, 4);
			this.movieGeometry		= new THREE.PlaneGeometry(3.2,2.4, 4, 4);
			
			this.moviemesh = new THREE.Mesh(this.movieGeometry,window.movieMaterial[this.avatar]);
			//this.moviemesh = new THREE.Mesh(this.movieGeometry,movieMaterial);
			//this.moviemesh = new THREE.Mesh(this.movieGeometry,this.movieMaterial);
			//this.moviemesh.position.set(0, 53, 0);
			var keyColorObject		= new THREE.Color(0xd400);
			var uniforms		= { texture:  { value: videoTexture[this.avatar] },color:	{type: "c",value: keyColorObject} };
			//var uniforms		= { texture:  { value: videoTexture[this.avatar] } };
			var vertexShader	= document.getElementById( 'vertexShaderDepth' ).textContent;
			var fragmentShader  = document.getElementById( 'fragmentShaderDepth' ).textContent;
			
			this.moviemesh.customDepthMaterial = new THREE.ShaderMaterial( 
			{	uniforms:		uniforms,
				vertexShader:	vertexShader,
				fragmentShader: fragmentShader,
				side:			THREE.DoubleSide
			} );

			this.moviemesh.castShadow	 = true;			
			this.moviemesh.receiveShadow = false;
			
			///////////////////////////////////////////////////////////////////////////////////
			
			this.label = createLabel(this.username);
			//this.label.castShadow		= true;			
			//this.label.receiveShadow	= false;
			///////////////////////////////////////////////////////////////////////////////////
			this.meshgroup = new THREE.Object3D();//create an empty container
			
			//this.meshgroup.add( this.mesh );//add a mesh with geometry to it
			this.meshgroup.add( this.moviemesh );//add a mesh with geometry to it
			this.meshgroup.add( this.label );//add a mesh with geometry to it
			//this.meshgroup.add( createLabel(this.username));

			//this.meshgroup.castShadow		= true;			
			//this.meshgroup.receiveShadow	= false;


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
		
		getPosition()
		{	return this.meshgroup.position;
		}
		
		setPosition(position)
		{	this.meshgroup.position.copy( position );
		}

		update()
		{	//this.movieMaterial.update();
			//movieMaterial.update();
		}		
	}
