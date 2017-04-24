"use strict"


		//var videoTexture;
		function ChromaKeyMaterial(url, width, height, keyColor) 
		{	THREE.ShaderMaterial.call(this);
			this.video					= document.createElement('video');
			this.video.loop				= true;
			this.video.src				= url;
			this.video.load();
			this.video.play();

			var videoImage			= document.createElement('canvas');
			//if (window["webkitURL"]) document.body.appendChild(videoImage);
			if (window["URL"]) document.body.appendChild(videoImage);
			videoImage.width		= width;
			videoImage.height		= height;
	
			var keyColorObject		= new THREE.Color(keyColor);
			var videoImageContext	= videoImage.getContext('2d');
	
			// background color if no video present
			videoImageContext.fillStyle = '#' + keyColorObject.getHexString();
			videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

			//videoTexture		= new THREE.Texture(videoImage);
			var videoTexture		= new THREE.Texture(videoImage);
			videoTexture.minFilter	= THREE.LinearFilter;
			videoTexture.magFilter	= THREE.LinearFilter;

			this.update = function () 
			{	if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) 
				{	videoImageContext.drawImage(this.video, 0, 0);
					if (videoTexture)videoTexture.needsUpdate = true;
				}
			}

			this.setValues({	uniforms:		{	texture:	{type: "t",value: videoTexture},
													color:		{type: "c",value: keyColorObject}
												},
								vertexShader:	document.getElementById('vertexShader').textContent,
								fragmentShader: document.getElementById('fragmentShader').textContent,
								transparent:	true
			});
		}
		ChromaKeyMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
	class CSKyboxGradient
	{	constructor(size) 
		{	// prepare ShaderMaterial without textures
			var vertexShader	= document.getElementById('sky-vertex').textContent, 
			    fragmentShader  = document.getElementById('sky-fragment').textContent;
			    
			var uniforms = {	topColor:		{ type: "c", value: new THREE.Color(0x0055ff)}, 
								bottomColor:	{ type: "c", value: new THREE.Color(0xffffff)},
								offset: 		{ type: "f", value: 5}, 
								exponent:		{ type: "f", value: 0.6}
							}

			this.skyMaterial	= new THREE.ShaderMaterial({vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide, fog: false});
			
			// create Mesh with sphere geometry and add to the scene
			//this.skyboxMesh		= new THREE.Mesh( new THREE.SphereGeometry(250, 60, 40), this.skyMaterial);
			this.skyboxMesh		= new THREE.Mesh( new THREE.SphereGeometry(size.radius,size.widthSegments,size.heightSegments), this.skyMaterial);
			//this.skyboxMesh.position.copy( player.getPosition() );
		}
  
		//setPosition(position)
		//{	this.skyboxMesh.position.copy( position );
		//}
  
		setPosition(x,z)
		{	this.skyboxMesh.position.x=x;
			this.skyboxMesh.position.z=z;
		}

		update(pos) 
		{	//this.skyboxMesh.position.copy( player.getPosition() );
			this.skyboxMesh.position.copy( pos );
		}
  
		getMesh() 
		{	return this.skyboxMesh;
		}
	}
	
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
	class CSpritePoint
	{	constructor(scene,parameters)
		//constructor(scene,texfile)
		{	this.materials = [];
			//var textureLoader = new THREE.TextureLoader();
				
			//this.sprite1 = textureLoader.load( "textures/sprites/snowflake1.png" );//videoTexture;//
			//this.sprite2 = textureLoader.load( "textures/sprites/snowflake2.png" );//videoTexture;//
			//this.sprite3 = textureLoader.load( "textures/sprites/snowflake3.png" );//videoTexture;//
			//this.sprite4 = textureLoader.load( "textures/sprites/snowflake4.png" );//videoTexture;//
			//this.sprite5 = textureLoader.load( "textures/sprites/snowflake5.png" );//videoTexture;//
			//this.parameters =[	[ [1.0,  0.2,  0.5], this.sprite2, 0.8],//20 ],
			//					[ [0.95, 0.1,  0.5], this.sprite3, 0.5],//15 ],
			//					[ [0.90, 0.05, 0.5], this.sprite1, 0.3],//10 ],
			//					[ [0.85, 0,    0.5], this.sprite5, 0.2],//8  ],
			//					[ [0.80, 0,    0.5], this.sprite4, 0.1],//5  ]
			//				];
			
			/*
			this.sprite = [];
			var i=0;
			for (i=0; i<texfile.length; i++) 
			{	this.sprite[i] = textureLoader.load( texfile[i]);
			}
			i=0;
			this.parameters =[	[ [1.0,  0.2,  0.5], this.sprite[i++], 0.8],//20 ],
								[ [0.95, 0.1,  0.5], this.sprite[i++], 0.5],//15 ],
								[ [0.90, 0.05, 0.5], this.sprite[i++], 0.3],//10 ],
								[ [0.85, 0,    0.5], this.sprite[i++], 0.2],//8  ],
								[ [0.80, 0,    0.5], this.sprite[i++], 0.1],//5  ]
							];
			*/								
			
			/////////////////////////////////////////////////////////////////////
			
			var max_particles	= 1000;//10000;
			//var n = 1000, n2 = n / 2; // particles spread in the cube_material
			var n = 250, n2 = n / 2; // particles spread in the cube_material
			//////////////////////////////////////////////////////////////////////
			this.geometry = new THREE.Geometry();
			for (var i = 0; i < max_particles; i ++ ) 
			{	var vertex = new THREE.Vector3();
				vertex.x = Math.random() * n - n2;//Math.random() * 2000 - 1000;
				vertex.y = Math.random() * n - n2;//Math.random() * 2000 - 1000;
				vertex.z = Math.random() * n - n2;//Math.random() * 2000 - 1000;
				this.geometry.vertices.push( vertex );
			}
			var color,mysprite,size,particles;
			for (var i = 0; i < parameters.length; i ++ ) 
			{	color		= parameters[i][0];
				mysprite	= parameters[i][1];
				size		= parameters[i][2];
						
				//this.materials[i] = new THREE.PointsMaterial( { size: size, map: mysprite} );
				//this.materials[i] = new THREE.PointsMaterial( { size: size, map: mysprite, depthTest: false, transparent : true } );
				this.materials[i] = new THREE.PointsMaterial( { size: size, map: mysprite, blending: THREE.AdditiveBlending, transparent : true } );
				//this.materials[i] = new THREE.PointsMaterial( { size: size, map: mysprite, blending: THREE.AdditiveBlending, depthTest: false, transparent : true } );
				this.materials[i].color.setHSL( color[0], color[1], color[2] );
					
				particles = new THREE.Points( this.geometry, this.materials[i] );
				//particles = new THREE.Points( this.geometry, this.movieMaterial );
				
				particles.rotation.x = Math.random() * 6;
				particles.rotation.y = Math.random() * 6;
				particles.rotation.z = Math.random() * 6;
				scene.add( particles );
			}
		}
			
		update(time,scene,parameters)
		{	time=time*0.1;
			var object,length=scene.children.length;
			for (var i = 0; i < length; i ++ ) 
			{	object = scene.children[ i ];
				if ( object instanceof THREE.Points ) 
				{	object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );
				}
			}
			
			var color;
			length=this.materials.length;
			for (var i = 0; i < length; i ++ ) 
			{	color = parameters[i][0];
				//h = ( 360 * ( color[0] + time ) % 360 ) / 360;
				//materials[i].color.setHSL( h, color[1], color[2] );
				this.materials[i].color.setHSL(( 360 * ( color[0] + time ) % 360 ) / 360, color[1], color[2] );
			}
		}
	}		
	
	//////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////
	class CText
	{	
		//init( font ) 
		//{	this.myfont = font;
    	//	//console.log("inner value "+this.myfont);
		//}   
		//console.log("2nd time" +this.myfont);
		
		constructor(size) 
		{	this.mesh;
			this.myfont;
		
			var loader = new THREE.FontLoader();
			loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) 
			{
				this.myfont = font;
				
			var params = {	material: 0,
    						extrudeMaterial: 1,
    						bevelEnabled: false,
    						bevelThickness: 8,
    						bevelSize: 4,
    						font: this.myfont,
    						weight: "normal",
    						style: "normal",
    						height: 0,
    						size: 11,
    						curveSegments: 4
						};

var textGeo = new THREE.TextGeometry("3D text", params);
//console.log("3rd time "+this.myfont);

textGeo.computeBoundingBox();
//console.log("4th time "+this.myfont);

textGeo.computeVertexNormals();
//console.log("5th time "+this.myfont);
var material = new THREE.MeshFaceMaterial([
    new THREE.MeshPhongMaterial({color: 0xff22cc, shading: THREE.FlatShading}), // front
    new THREE.MeshPhongMaterial({color: 0xff22cc, shading: THREE.SmoothShading}) // side
]);
//console.log("6th time "+this.myfont);
this.mesh = new THREE.Mesh(textGeo, material);
//console.log("7th time "+this.myfont);
this.mesh.position.x = -textGeo.boundingBox.max.x / 2;
this.mesh.position.y = -5;
this.mesh.position.z = 30;
this.mesh.name = 'text';
//scene.add(this.mesh);
//console.log("8th time "+this.myfont);		

			}.bind(this));
			/////////////////////////////////////////////////////////////////////////////////////
			//var loader = new THREE.FontLoader();
			//loader.load( 'three.js-master/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {init( font );}.bind(this));
			//loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {this.myfont = font;}.bind(this));

			//this.myfont;



			////////////////////////////////////////////////////////////////////////////////////////
    	    this.rotx		= size.rotx;
    	    this.roty		= size.roty;
    	    this.rotz		= size.rotz;
		}
  
		update() 
		{	//if(this.rotx)this.mesh.rotation.x += this.rotx;
			//if(this.roty)this.mesh.rotation.y += this.roty;
			//if(this.rotz)this.mesh.rotation.z += this.rotz;
		}
  
		getMesh() 
		{	return this.mesh;
		}
	}

/////////////
	class CCube
	{	constructor(size) 
		{	this.geometry 	= new THREE.BoxGeometry(size.width, size.height, size.depth);
			//this.material 	= new THREE.MeshBasicMaterial({color: 0x00ff00});
			this.material   = new THREE.MeshPhongMaterial({specular: '#ffffff',color: '#00ff00',emissive: '#333333',shininess: 1 });
    	    this.mesh 		= new THREE.Mesh(this.geometry, this.material);
    	    
    	    this.rotx		= size.rotx;
    	    this.roty		= size.roty;
    	    this.rotz		= size.rotz;
		}
  
		update() 
		{	if(this.rotx)this.mesh.rotation.x += this.rotx;
			if(this.roty)this.mesh.rotation.y += this.roty;
			if(this.rotz)this.mesh.rotation.z += this.rotz;
		}
  
		getMesh() 
		{	return this.mesh;
		}
	}

////////////////////////
	class CPlane
	{	constructor(size,maxAnisotropy) 
		{	//////////////////////////////////////////////////
			//var maxAnisotropy = renderer.getMaxAnisotropy();
			
	        var floorTexture        = texLoader.load( 'images/dirt/ori/dirt_COLOR.png' );
            floorTexture.wrapS      = floorTexture.wrapT = THREE.RepeatWrapping; 
            floorTexture.repeat.set( 200,200 );
   			floorTexture.anisotropy = maxAnisotropy;

	        var floorTextureBump    = texLoader.load( 'images/dirt/ori/dirt_NRM.png' );
            //floorTextureBump.wrapS      = floorTexture.wrapT = THREE.RepeatWrapping; 
            //floorTextureBump.repeat.set( 100,100 );
   			//floorTextureBump.anisotropy = maxAnisotropy;

            var floorTextureOCC     = texLoader.load( 'images/dirt/dirt_OCC.jpg' );
            //floorTextureOCC.wrapS      = floorTexture.wrapT = THREE.RepeatWrapping; 
            //floorTextureOCC.repeat.set( 100,100 );
   			//floorTextureOCC.anisotropy = maxAnisotropy;
            
            //var floorTextureSPEC    = texLoader.load( 'images/dirt/dirt_SPEC.jpg' );
            //floorTextureSPEC.wrapS      = floorTexture.wrapT = THREE.RepeatWrapping; 
            //floorTextureSPEC.repeat.set( 100,100 );
   			//floorTextureSPEC.anisotropy = maxAnisotropy;

	        //var floorTextureDISP    = texLoader.load( 'images/dirt/ori/dirt_DISP.png' );
            //floorTextureDISP.wrapS      = floorTexture.wrapT = THREE.RepeatWrapping; 
            //floorTextureDISP.repeat.set( 100,100 );
   			//floorTextureDISP.anisotropy = maxAnisotropy;

	        var params = 
	        {   map:                floorTexture,
                bumpMap:        	floorTextureBump,
                aoMap:              floorTextureOCC,         
                //normalMap:			floorTextureBump,
                //specularMap:        floorTextureSPEC,
                //displacementMap:    floorTextureDISP,
                //displacementBias:   1,//0.618,
                //displacementScale:  1,//0.618,  
              
                //ambient:			0xffffff,	
                bumpScale:			1,
                //normalScale:        new THREE.Vector2( 1,1),
                shininess:          10,//35.0,
                //color:              0xdddddd,
				//specular:           0x101010,
				//emissive:			'#333333'
                //side:               THREE.BackSide
            };
            
            
            //this.material			= new THREE.MeshStandardMaterial( params );
            //this.material			= new THREE.MeshLambertMaterial( params );
            this.material			= new THREE.MeshPhongMaterial( params );
            //this.material			= new THREE.MeshPhongMaterial({specular: '#ffffff',color: '#aaaaaa',emissive: '#333333',shininess: 10 });
            
			//////////////////////////////////////////////////
			this.geometry 			= new THREE.PlaneBufferGeometry(size.width, size.height);
            
            //make 2nd uv for aomap to function
            var uvs = this.geometry.attributes.uv.array;
            this.geometry.addAttribute( 'uv2', new THREE.BufferAttribute( uvs, 2 ) );

    	    this.mesh 				= new THREE.Mesh(this.geometry, this.material);
    	    this.mesh.position.y 	= -1;//-2;//
            this.mesh.rotation.x 	= -Math.PI / 2;
    	    
    	    //this.rotx		= size.rotx;
    	    //this.roty		= size.roty;
    	    //this.rotz		= size.rotz;
		}
  
		update() 
		{	//if(this.rotx)this.mesh.rotation.x += this.rotx;
			//if(this.roty)this.mesh.rotation.y += this.roty;
			//if(this.rotz)this.mesh.rotation.z += this.rotz;
		}
  
		getMesh() 
		{	return this.mesh;
		}
	}
	
////////////////////////////////////////////////////////
	class CGridHelper extends CBase
	{	constructor()
		{	super(new THREE.GridHelper ( 200 , 50 )); // size, step
    		//this.scene.add ( this.gridHelper );
    		return this;
		}
	}
		
	class CAxisHelper extends CBase
	{	constructor()
		{	super(new THREE.AxisHelper ( 200 , 50 ));
    		//this.scene.add ( this.axisHelper );    			
    		return this;
		}
	}
		
	class CLightHelper extends CBase
	{	constructor(light)
		{	super(new THREE.DirectionalLightHelper ( light , 20 ));
    		//this.scene.add ( this.lightHelper );
    		return this;
		}
	}
		
class CGPUPicker extends CBase
{   constructor(renderer,scene,camera)
    {   super(new THREE.GPUPicker({renderer:renderer, debug: false}));
        
        this.mouse      			= new THREE.Vector2();
		this.raycaster  			= new THREE.Raycaster();
		
		/*		
        this._.setFilter(function (object) {return true;});
        this._.setScene(scene);
        this._.setCamera(camera);
        
        this.createMesh(scene);
        */
	    return this;
    }
/*
    createMesh(scene)
    {   var geometry = new THREE.CylinderGeometry( 0, 0.8, 5);
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, -2.5, 0 ) );
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -Math.PI / 2 ) );
		
		this.helper_ = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({color:0xFFD700}) );
        scene.add( this.helper_ );
    }

    init(controls)
    {   this.onMouseMove 	= this.onMouseMove.bind(this);
		//this.renderer.domElement.addEventListener( 'mousemove', this.onMouseMove );
		window.addEventListener( 'mousemove', this.onMouseMove );

        if(this.controls)
		{	this.updateGPUPicker= this.updateGPUPicker.bind(this);
			this.controls.addEventListener('end', this.updateGPUPicker);
		}
		else 
		{	console.log("this.controls not found!!!");
		}
    }
    
	updateGPUPicker()
	{	this._.needUpdate = true;
	}      
	
    onWindowResize()	
    {	this._.resizeTexture( window.innerWidth, window.innerHeight );
		this._.needUpdate = true;
	}
	
    onMouseMove( e ) 
    {   if(e.which != 0)return;
    	
    	this._.needUpdate = true;
    	
    	this.mouse.x	= e.clientX;
    	this.mouse.y	= e.clientY;
    	//console.log("this.mouse.x="+this.mouse.x+", this.mouse.y="+this.mouse.y);
        	
    	var raymouse	= new THREE.Vector2();
    	raymouse.x		= ( e.clientX / window.innerWidth ) * 2 - 1;
    	raymouse.y		= - ( e.clientY / window.innerHeight ) * 2 + 1;
        	
    	this.raycaster.setFromCamera( raymouse, this.camera );
        	
    	var intersect	= this._.pick(this.mouse, this.raycaster);
        	
		if (intersect) 
		{	this.helper_.position.set( 0, 0, 0 );
			if (intersect.face) 
			{	var normalMatrix	= new THREE.Matrix3().getNormalMatrix( intersect.object.matrixWorld );
    			var worldNormal 	= intersect.face.normal.clone().applyMatrix3( normalMatrix ).normalize();
				this.helper_.lookAt( worldNormal );
			}
			this.helper_.helper.position.copy( intersect.point );
		}        	
		else
		{	console.log("no intersection!!!!!!!!!!!!!!!!!!");
		}
    }	
*/     
    get helper()        {   return this.helper_;}
    set helper(v)       {   this.helper_=v;}    
   
}