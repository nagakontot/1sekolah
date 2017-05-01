"use strict"

	//var movieMaterial		= new ChromaKeyMaterial('video/baby4.webm', 320,218, 0xd400);
	
	class Player	
	{	constructor( playerID,avatar,username) 
		{	this.playerID		= playerID;
			this.isMainPlayer	= false;
			//this.mesh;
			this.meshgroup;
			this.avatar			= ~~avatar;
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
			this.movieGeometry			= new THREE.PlaneGeometry(1.6,1.2);//, 10, 10);
			//this.movieGeometry.applyMatrix( new THREE.Matrix4().makeRotationY( Math.PI ) );
			//this.movieGeometry.scale.x	= -1;
			/////////////////////////////////////////
			//this.movieGeometry 		= new THREE.BoxGeometry(1.6,1.2,1);
			//this.movieGeometry 		= new THREE.BoxGeometry(1.6,1.2,0.001);
			//this.movieGeometry.faceVertexUvs[0][7] = [new THREE.Vector2(0, 0), new THREE.Vector2(0, 1), new THREE.Vector2(1, 1)]
			//this.movieGeometry.faceVertexUvs[0][7] = [new THREE.Vector2(0, 0), new THREE.Vector2(0, 1), new THREE.Vector2(1, 1)]

			///////////////////////////////////////////
			this.material = Physijs.createMaterial( window.movieMaterial[this.avatar],0.618,0.382);
			///////////////////////////////////////////
			this.moviemesh		= new Physijs.PlaneMesh(this.movieGeometry,this.material);
			//this.moviemesh		= new Physijs.PlaneMesh(this.movieGeometry,window.movieMaterial[this.avatar]);
			//this.moviemesh		= new THREE.Mesh(this.movieGeometry,window.movieMaterial[this.avatar]);
			this.moviemesh.position.y = -0.5;
			this.moviemesh.position.z =  0.01;
			//this.moviemesh.scale.x= -1;

			//this.moviemesh = new THREE.Mesh(this.movieGeometry,movieMaterial);
			//this.moviemesh = new THREE.Mesh(this.movieGeometry,this.movieMaterial);
			//this.moviemesh.position.set(0, 53, 0);
			var keyColorObject		= new THREE.Color(0xd400);
			var uniforms		= { texture:  { value: videoTexture[this.avatar] },color:	{type: "c",value: keyColorObject} };
			//var uniforms		= { texture:  { value: videoTexture[this.avatar] } };
			var vertexShader	= document.getElementById( 'vertexShaderDepth' ).textContent;
			var fragmentShader  = document.getElementById( 'fragmentShaderDepth' ).textContent;
			
			//shader for shadow
			this.moviemesh.customDepthMaterial = new THREE.ShaderMaterial( 
			{	uniforms:		uniforms,
				vertexShader:	vertexShader,
				fragmentShader: fragmentShader,
				//side:			THREE.DoubleSide
				//side:			THREE.FrontSide
				//side:			THREE.BackSide
			} );

			this.moviemesh.castShadow	 = true;			
			this.moviemesh.receiveShadow = true;//false;//
			
			///////////////////////////////////////////////////////////////////////////////////
/*			
			//merge 2 planes so that front and back have correct anim
			//http://stackoverflow.com/questions/30245990/how-to-merge-two-geometries-or-meshes-using-three-js-r71
			//this.movieGeometry2 		= this.movieGeometry.clone();
			this.movieGeometry2			= new THREE.PlaneGeometry(1.6,1.2, 4, 4);
			//this.movieGeometry2			= new THREE.PlaneGeometry(3.2,2.4, 4, 4);
			//this.movieGeometry2.applyMatrix( new THREE.Matrix4().makeRotationY( Math.PI ) );
		

			//THREE.GeometryUtils.merge( this.movieGeometry,this.movieGeometry2, 1 );
			//this.movieGeometry.merge( this.movieGeometry2, matrix, materialIndexOffset )
			//this.movieGeometry.merge( movieGeometry2,movieGeometry2.matrix );

			this.moviemesh2= new THREE.Mesh(this.movieGeometry2,window.movieMaterial[this.avatar+4]);
			this.moviemesh2.position.y = -0.5;
			this.moviemesh2.position.z = -0.01;
			//this.moviemesh2.scale.x= -1;
			
			var uniforms2		= { texture:  { value: videoTexture[this.avatar+4] },color:	{type: "c",value: keyColorObject} };
			
			//shader for shadow
			this.moviemesh2.customDepthMaterial = new THREE.ShaderMaterial( 
			{	uniforms:		uniforms2,
				vertexShader:	vertexShader,
				fragmentShader: fragmentShader,
				//side:			THREE.DoubleSide
				//side:			THREE.FrontSide
				//side:			THREE.BackSide
			} );

			this.moviemesh2.castShadow	 = true;			
			this.moviemesh2.receiveShadow = false;//true;
*/			
			///////////////////////////////////////////////////////////////////////////////////
			
			this.label = createLabel(this.username);
			this.label.scale.set(1,0.25,1);
    		this.label.position.set(0,0.25, 0);

			//this.label.castShadow		= true;			
			//this.label.receiveShadow	= false;
			///////////////////////////////////////////////////////////////////////////////////
			this.meshgroup = new THREE.Object3D();//create an empty container
			
			//this.meshgroup.add( this.mesh );//add a mesh with geometry to it
			this.meshgroup.add( this.moviemesh );//add a mesh with geometry to it
			//this.meshgroup.add( this.moviemesh2 );//add a mesh with geometry to it
			this.meshgroup.add( this.label );//add a mesh with geometry to it
			//this.meshgroup.add( createLabel(this.username));

			//if(this.meshgroup)centerObject3D(this.meshgroup);
			
			//this.meshgroup.castShadow		= true;			
			//this.meshgroup.receiveShadow	= true;//false;


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
