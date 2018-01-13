"use strict"

//////////////////////////////////////////////////////////////////////////////////
//	nice codes:
//////////////////////////////////////////////////////////////////////////////////
//http://stackoverflow.com/questions/11325548/creating-a-plane-adding-a-texture-on-both-sides-and-rotating-the-object-on-its
//make 2 material for one plane

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//http://ezcourse.nctu.me/2016/11/13/three-js-z-buffer/

//var myglobal_ctx;
function createLabel(message,color="white",bgcolor="black",fontSize=9,W=64,H=16,isFrame=false) 
{   var canvas = document.createElement('canvas');    //////////////////////////////
                                                      // Create a canvas element. //
                                                      //////////////////////////////
    // 【Remove the two lines of code.】
    // canvas.id = "box";
    // document.body.appendChild(canvas);
    canvas.width	= W;//64;//320;//300;
    canvas.height	= H;//16;//32;//240;//300;
    //Svar canvasSize	= W;//64;//300;
    var myglobal_ctx=canvas.getContext("2d");                      // get 2D drawing context.

	if(bgcolor)
	{	myglobal_ctx.fillStyle		= bgcolor;//"#ffffff";//"#ffff00";                  ////////////////////////////////////
		myglobal_ctx.fillRect(0,0,W,H);
	}
	
	myglobal_ctx.font = "Bold "+  fontSize+"px Verdana";	//good
	//myglobal_ctx.font = "Bold "+fontSize+"px Tahoma";	//good
    //myglobal_ctx.font = "Bold "+fontSize+"px Bookman"; 
	myglobal_ctx.textBaseline	= "middle";//"top";//
    //myglobal_ctx.textAlign		= "center";                   // write some words on the canvas.//
    myglobal_ctx.fillStyle		= color;//"#ffffff";//"#ffff00";                  ////////////////////////////////////
    //myglobal_ctx.fillText(message, canvasSize/2, canvasSize/2);
    //myglobal_ctx.fillText(message, canvas.width/2, canvas.width/2);
    
    //var textString = "Hello look at me!!!",
    var textWidth = myglobal_ctx.measureText(message).width;
	myglobal_ctx.fillText(message, (canvas.width/2) - (textWidth/2),canvas.height/2);
	//myglobal_ctx.fillText(message, (canvas.width/2) - (textWidth / 2), 100);

    // draw a frame for the text. //
    // Method 1 : myglobal_ctx.strokeRect();
    /*
    if(isFrame)
    {	var messageW = myglobal_ctx.measureText(message).width;
    	var blank = fontSize/3;
	    myglobal_ctx.strokeStyle = "#62bcfa";
    	myglobal_ctx.lineWidth=2;
    	myglobal_ctx.strokeRect(canvasSize/2-messageW/2-blank,
        						canvasSize/2-fontSize,
    							messageW+blank*2,
    							fontSize+blank);
    }
    */
    // Method 2 : myglobal_ctx.stroke();
    /*
	if(isFrame)
    {	var messageW = myglobal_ctx.measureText(message).width;
    	var blank = fontSize/3;
    	myglobal_ctx.strokeStyle = "#62bcfa";
    	myglobal_ctx.lineWidth=2;
    	myglobal_ctx.beginPath();
    	myglobal_ctx.moveTo(canvasSize/2-messageW/2-blank, canvasSize/2-fontSize);
    	myglobal_ctx.lineTo(canvasSize/2+messageW/2+blank, canvasSize/2-fontSize);
    	myglobal_ctx.lineTo(canvasSize/2+messageW/2+blank, canvasSize/2+blank);
    	myglobal_ctx.lineTo(canvasSize/2-messageW/2-blank, canvasSize/2+blank);
    	myglobal_ctx.closePath();
    	myglobal_ctx.stroke();
    }
    */
    ///// put this label into the 3D scene. /////
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var spriteMtl	= new THREE.SpriteMaterial({map: texture});
    var sprite		= new THREE.Sprite(spriteMtl);
    
    //sprite.scale.set(5, 5, 1);
    //sprite.scale.set(2,2,1);
    //sprite.position.set(0,1.5, 0);

    //sprite.scale.set(1,0.25,1);
    //sprite.position.set(0,1.25, 0);
    //scene.add(sprite);
	return sprite;
}

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
		window.videoTexture=[];
		function ChromaKeyMaterial(url, width, height, keyColor,texindex) 
		{	THREE.ShaderMaterial.call(this);
			this.video					= document.createElement('video');
			
			//this.video.crossOrigin 	    = '';
			//this.video.setAttribute('crossOrigin', 'anonymous');
			
			this.video.loop				= true;
			this.video.src				= url;
			this.video.load();
			this.video.play();

			var videoImage			= document.createElement('canvas');

			//videoImage.setAttribute("display", "none");
			videoImage.style.cssText = 'margin:0;padding:0;display:none;';

			if (window["URL"]) document.body.appendChild(videoImage);
			
			videoImage.width		= width;
			videoImage.height		= height;
	
			var keyColorObject		= new THREE.Color(keyColor);
			var videoImageContext	= videoImage.getContext('2d');
			
			// background color if no video present
			videoImageContext.fillStyle = '#' + keyColorObject.getHexString();
			videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

			videoTexture[texindex]	= new THREE.Texture(videoImage);

			//var videoTexture		= new THREE.Texture(videoImage);
			videoTexture[texindex].minFilter	= THREE.LinearMipMapLinearFilter;//THREE.LinearFilter;
			videoTexture[texindex].magFilter	= THREE.LinearFilter;

			//videoTexture[texindex].wrapS = THREE.RepeatWrapping;
			//videoTexture[texindex].repeat.x = - 1;
			//////////////////////////////////////////////////////////////////
			//navigator.mediaDevices.getUserMedia({video:true}, function(stream)
			//{	this.video.src = URL.createObjectURL(stream);
			//	this.video.play();
			//	setInterval(this.update,10);
			//}, function(error){
			//	console.log('error', error);
			//});			
			///////////////////////////////////////////////////////////////////

			this.update = function () 
			{	if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) 
				{	videoImageContext.drawImage(this.video, 0, 0);
					if (videoTexture[texindex])videoTexture[texindex].needsUpdate = true;
				}
			}

			this.setValues({	uniforms:		{	texture:	{type: "t",value: videoTexture[texindex]},
													color:		{type: "c",value: keyColorObject}
												},
								vertexShader:	document.getElementById('vertexShader').textContent,
								fragmentShader: document.getElementById('fragmentShader').textContent,
								transparent:	true,
								side:			THREE.DoubleSide
			});
			
			this.exit = function()
			{	videoImage.parentNode.removeChild(videoImage);
				this.video.pause();
				this.video.src =""; // empty source
				this.video.load();
			}
		}
		ChromaKeyMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
		class CElement
		{	constructor( src, w, h, x, y, z, ry ) 
			{	this.url = src;

				////////////////////
				/*
				this.w = ''+(window.innerWidth *0.8).toFixed(0)+'px';	//'1250px';//'1100px';
				this.h = ''+(window.innerHeight*0.5).toFixed(0)+'px';	//'450px';//'425px';

				this.div 							= document.createElement( 'div' );
				this.div.style.width 				= this.w;//'1100px';//'1024px';//'800px';
				this.div.style.height				= this.h;//'425px';//'768px';
				this.div.style.backgroundColor		= '#5af';//rgba(150, 200, 250);//'#000';
				//this.div.style.opacity			= 0.5;

				this.iframe	= document.createElement( 'iframe' );
				const load = ()=> 
				{	this.iframe.removeEventListener('did-finish-load', load);
					//webview.src = "webview.html";

					//this.iframe						= document.createElement( 'iframe' );
					this.iframe							= document.createElement( 'webview' );
					this.iframe.style.width				= "100%";//this.w;//'1100px';//'1024px';//'800px';
					this.iframe.style.height 			= "400px";//"100%";//this.h;//'425px';//'768px';
					this.iframe.style.border 			= "0px";
					this.iframe.style.frameborder		= "0" ;
					this.iframe.style.allowfullscreen	= "true";
					this.iframe.style.allowtransparency	= "true";
					this.iframe.style.seamless			= "seamless";
					this.iframe.style.sandbox			= "allow-scripts";

					//this.iframe.src					= [ 'https://www.youtube.com/embed/', id, '?rel=0' ].join( '' );
					this.iframe.src						= src;
				};
				this.iframe.addEventListener('did-finish-load', load)
				*/
				////////////////////
				//this.w = ''+(window.innerWidth *0.8).toFixed(0)+'px';	//'1250px';//'1100px';
				//this.h = ''+(window.innerHeight*0.5).toFixed(0)+'px';	//'450px';//'425px';
				this.w = ''+(w).toFixed(0)+'px';	//'1250px';//'1100px';
				this.h = ''+(h).toFixed(0)+'px';	//'450px';//'425px';

				this.div 							= document.createElement( 'div' );
				this.div.style.width 				= this.w;//'1100px';//'1024px';//'800px';
				this.div.style.height				= this.h;//'425px';//'768px';
				this.div.style.backgroundColor		= '#5af';//rgba(150, 200, 250);//'#000';
				this.div.style.opacity				= 1;//0.8;

				this.iframe							= document.createElement( 'iframe' );
				this.iframe.style.width				= "100%";//this.w;//'1100px';//'1024px';//'800px';
				this.iframe.style.height 			= "100%";//this.h;//'425px';//'768px';
				this.iframe.style.border 			= "0px";
				this.iframe.style.frameborder		= "0" ;
				
				//this.iframe.style.allowfullscreen	= "allowfullscreen";//"true";
				//this.iframe.style.allowtransparency	= "true";
				//this.iframe.style.seamless			= "seamless";
				//this.iframe.style.backgroundColor	= "transparent";
				//this.iframe.style.sandbox			= "allow-scripts";
				//this.iframe.style.target			= "_top";
				
				//this.iframe.src					= [ 'https://www.youtube.com/embed/', id, '?rel=0' ].join( '' );
				this.iframe.src						= src;//+"?enablejsapi=1&&modestbranding=1&&hd=1&rel=0&autohide=1&showinfo=0&&controls=0";
				
				//this.iframe.setAttribute('id', id);
				this.iframe.setAttribute('allowFullScreen', 	'true');
				this.iframe.setAttribute('allowtransparency',	'true');
				//this.iframe.setAttribute('backgroundColor', 	'transparent');
				//this.iframe.setAttribute('seamless', 			'seamless');
				
            	this.div.appendChild( this.iframe );	
            	//setTimeout(this.setIframeSrc("cssiframe",id).bind(this), 5);

				this.obj = new THREE.CSS3DObject( this.div );
				//this.obj.position.set( x, y, z );
				this.obj.rotation.y = ry;
				
				//return object;
				return this;
			}
		}
		

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
	class CLoadModel_WWObj2
	{	constructor(pivot,scene,dirname,path,filename_mtl,filename_obj,pos,rot,scale)
		{	this.pos            = pos;
			this.rot            = rot;
			this.scale			= scale;
			this.pivot			= pivot;
			this.scene			= scene;
			this.streamMeshes	= true;
		
			this.Validator		= THREE.OBJLoader2.prototype._getValidator();
		
			this.wwObjLoader2	= new THREE.OBJLoader2.WWOBJLoader2();
			this.wwObjLoader2.setCrossOrigin( 'anonymous' );

			this.wwObjLoader2.registerCallbackProgress( this.reportProgress.bind(this) );
			this.wwObjLoader2.registerCallbackCompletedLoading( this.completedLoading.bind(this) );
			this.wwObjLoader2.registerCallbackMaterialsLoaded( this.materialsLoaded.bind(this) );
			this.wwObjLoader2.registerCallbackMeshLoaded( this.meshLoaded.bind(this) );
		
			// Check for the various File API support.
			this.fileApiAvailable = true;
			if ( window.File && window.FileReader && window.FileList && window.Blob ) 
			{	console.log( 'File API is supported! Enabling all features.' );
			} 
			else 
			{	this.fileApiAvailable = false;
				console.warn( 'File API is not supported! Disabling file loading.' );
			}
		
			var prepData = new THREE.OBJLoader2.WWOBJLoader2.PrepDataFile(
				dirname,				//'newstand',				//'male02',
				path,					//'models/newstand/',		//'resource/obj/male02/',		//'../../resource/obj/male02/',
				filename_obj,			//'NewsStand.obj',		//'male02.obj',
				path,					//'models/newstand/',		//'resource/obj/male02/',		//'../../resource/obj/male02/',
				filename_mtl			//'NewsStand.obj.mtl'		//'male02.mtl'
			);		
			
			this.loadFiles( prepData );        	
		}

		///////////////////////////////////////////
		reportProgress( content ) 
		{	console.log( 'Progress: ' + content );
		}
		
		materialsLoaded( materials ) 
		{	//var count = this.Validator.isValid( materials ) ? materials.length : 0;
			//console.log( 'Loaded #' + count + ' materials.' );
		}
		
		meshLoaded( name, bufferGeometry, material ) 
		{	console.log( 'Loaded mesh: ' + name + ' Material name: ' + material.name );

			bufferGeometry.rotateX (this.rot.x);
			bufferGeometry.rotateY (this.rot.y);
			bufferGeometry.rotateZ (this.rot.z);
			
			bufferGeometry.scale ( this.scale.x,this.scale.y,this.scale.z );
			bufferGeometry.translate (this.pos.x,this.pos.y,this.pos.z);
		
		}
		
		completedLoading() 
		{	console.log( 'Loading complete!' );
		};		
		
		///////////////////////////////////////////
		loadFiles( prepData ) 
		{	prepData.setSceneGraphBaseNode( this.pivot );
			prepData.setStreamMeshes( this.streamMeshes );
			this.wwObjLoader2.prepareRun( prepData );
			this.wwObjLoader2.run();
		}

		_handleFileSelect( event, pathTexture ) 
		{	var fileObj = null;
			var fileMtl = null;
			var files = event.target.files;

			for ( var i = 0, file; file = files[ i ]; i++) 
			{	if ( file.name.indexOf( '\.obj' ) > 0 && fileObj === null ) 
				{	fileObj = file;
				}

				if ( file.name.indexOf( '\.mtl' ) > 0 && fileMtl === null ) 
				{	fileMtl = file;
				}
			}

			//if ( ! Validator.isValid( fileObj ) ) 
			//{	alert( 'Unable to load OBJ file from given files.' );
			//}

			var fileReader = new FileReader();
			fileReader.onload = function( fileDataObj ) 
			{	var uint8Array = new Uint8Array( fileDataObj.target.result );
				if ( fileMtl === null ) 
				{	this.loadFilesUser({	name:				'userObj',
											objAsArrayBuffer:	uint8Array,
											pathTexture:		pathTexture,
											mtlAsString:		null});
				} 
				else 
				{	fileReader.onload = function( fileDataMtl ) 
					{	this.loadFilesUser({name:				'userObj',
											objAsArrayBuffer:	uint8Array,
											pathTexture:		pathTexture,
											mtlAsString:		fileDataMtl.target.result});
					}
					fileReader.readAsText( fileMtl );
				}
			}
			fileReader.readAsArrayBuffer( fileObj );
		}

		loadFilesUser( objDef ) 
		{	var prepData = new THREE.OBJLoader2.WWOBJLoader2.PrepDataArrayBuffer(objDef.name, objDef.objAsArrayBuffer, objDef.pathTexture, objDef.mtlAsString);
			prepData.setSceneGraphBaseNode( this.pivot );
			prepData.setStreamMeshes( this.streamMeshes );
			this.wwObjLoader2.prepareRun( prepData );
			this.wwObjLoader2.run();
		}		
		
		traverseScene( object3d ) 
		{	if ( object3d.material instanceof THREE.MultiMaterial ) 
			{	var materials = object3d.material.materials;
				for ( var name in materials ) 
				{	if ( materials.hasOwnProperty( name ) )	this.traversalFunction( materials[ name ] );
				}
			} 
			else if ( object3d.material ) 
			{	this.traversalFunction( object3d.material );
			}
		}

		clearAllAssests() 
		{	var scope = this;
			var remover = function ( object3d ) 
			{	if ( object3d === scope.pivot )return;
			
				console.log( 'Removing: ' + object3d.name );
				scope.scene.remove( object3d );

				if ( object3d.hasOwnProperty( 'geometry' ) ) object3d.geometry.dispose();
			
				if ( object3d.hasOwnProperty( 'material' ) ) 
				{	var mat = object3d.material;
					if ( mat.hasOwnProperty( 'materials' ) ) 
					{	var materials = mat.materials;
						for ( var name in materials ) 
						{	if ( materials.hasOwnProperty( name ) ) materials[ name ].dispose();
						}
					}
				}
			
				if ( object3d.hasOwnProperty( 'texture' ) ) object3d.texture.dispose();
			};

			scope.scene.remove( scope.pivot );
			scope.pivot.traverse( remover );
			//scope.createPivot();
		}
	
	}
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
	class CLoadModel_Obj2
	{	constructor(pivot,scene,path,filename_mtl,filename_obj,pos,scale,isShadow=true)
		{	//THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
			var mtlLoader = new THREE.MTLLoader();
			mtlLoader.setPath(path);//( 'obj/male02/' );
			mtlLoader.setCrossOrigin( 'anonymous' );
			
			//mtlLoader.load( 'male02_dds.mtl', function( materials ) {
			mtlLoader.load( filename_mtl, function( materials ) 
			{	
				materials.preload();
				var objLoader = new THREE.OBJLoader2();
				objLoader.setSceneGraphBaseNode( pivot );
				objLoader.setMaterials( materials.materials );
				objLoader.setPath(path);//( 'obj/male02/' );
				objLoader.setDebug( false, false );
			
				//window.setTimeout( function() 
				//{	
				//objLoader.load( 'male02.obj', function ( object ) {
				objLoader.load( filename_obj, 
								function ( object ) 
								{	//object.position.y = - 95;
									object.position.x = pos.x;
									object.position.y = pos.y;
									object.position.z = pos.z;
									
									object.scale.x = scale.x;
									object.scale.y = scale.y;
									object.scale.z = scale.z;

									if(isShadow)
									{	object.traverse( function ( child ) 
										{	if ( child instanceof THREE.Mesh ) 
											{	child.castShadow	= true;
        										child.receiveShadow = true;
    										}
										} );
									}
									
									scene.add( object );
								}.bind(this), 
								this.onProgress, 
								this.onError );
				//}.bind(this),100);								
			}.bind(this));
			//////////////////////
		}
		
		onSuccess( object3d ) 
		{	console.log( 'Loading complete. Meshes were attached to: ' + object3d.name );
		};
			
		onProgress( xhr ) 
		{	if ( xhr.lengthComputable ) 
			{	var percentComplete = xhr.loaded / xhr.total * 100;
				console.log( Math.round(percentComplete, 2) + '% downloaded' );
			}
		}
		
		onError( xhr ) 
		{ 
		}
	}
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
	class CLoadModel_Obj
	{	constructor(scene,path,filename_mtl,filename_obj,pos,scale,isShadow=true)
		{	THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
			var mtlLoader = new THREE.MTLLoader();
			mtlLoader.setPath(path);//( 'obj/male02/' );
			mtlLoader.setCrossOrigin( 'anonymous' );
			
			//mtlLoader.load( 'male02_dds.mtl', function( materials ) {
			mtlLoader.load( filename_mtl, function( materials ) 
			{	materials.preload();
				var objLoader = new THREE.OBJLoader();
				objLoader.setMaterials( materials );
				objLoader.setPath(path);//( 'obj/male02/' );
				objLoader.setCrossOrigin( 'anonymous' );
			
				//window.setTimeout( function() 
				//{	
				//objLoader.load( 'male02.obj', function ( object ) {
				objLoader.load( filename_obj, 
								function ( object ) 
								{	//object.position.y = - 95;
									object.position.x = pos.x;
									object.position.y = pos.y;
									object.position.z = pos.z;
									
									object.scale.x = scale.x;
									object.scale.y = scale.y;
									object.scale.z = scale.z;
									
									if(isShadow)
									{	object.traverse( function ( child ) 
										{	if ( child instanceof THREE.Mesh ) 
											{	child.castShadow	= true;
        										child.receiveShadow = true;
    										}
										} );
									}										
									
									scene.add( object );
								}.bind(this), 
								this.onProgress, 
								this.onError );
				//}.bind(this),100);								
								
			}.bind(this));
			//////////////////////
			 
			 
		}
		
		onProgress( xhr ) 
		{	if ( xhr.lengthComputable ) 
			{	var percentComplete = xhr.loaded / xhr.total * 100;
				console.log( Math.round(percentComplete, 2) + '% downloaded' );
			}
		}
		
		onError( xhr ) 
		{ 
		}
	}

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
			var color,mysprite,size;
			this.particles;
			for (var i = 0; i < parameters.length; i ++ ) 
			{	color		= parameters[i][0];
				mysprite	= parameters[i][1];
				size		= parameters[i][2];
						
				//this.materials[i] = new THREE.PointsMaterial( { size: size, map: mysprite} );
				//this.materials[i] = new THREE.PointsMaterial( { size: size, map: mysprite, depthTest: false, transparent : true } );
				this.materials[i] = new THREE.PointsMaterial( { size: size, map: mysprite, blending: THREE.AdditiveBlending, transparent : true } );
				//this.materials[i] = new THREE.PointsMaterial( { size: size, map: mysprite, blending: THREE.AdditiveBlending, depthTest: false, transparent : true } );
				this.materials[i].color.setHSL( color[0], color[1], color[2] );
					
				this.particles = new THREE.Points( this.geometry, this.materials[i] );
				//particles = new THREE.Points( this.geometry, this.movieMaterial );
				
				this.particles.rotation.x = Math.random() * 6;
				this.particles.rotation.y = Math.random() * 6;
				this.particles.rotation.z = Math.random() * 6;
				scene.add( this.particles );
			}
		}
			
		update(time,scene,parameters,pos)
		{	time+=time*0.05;
			//time+=time*0.1;
			//this.time += time*1;
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
			
			this.particles.position.copy( pos );
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
			loader.setCrossOrigin( 'anonymous' );
			
			loader.load( 'https://raw.githubusercontent.com/nagakontot/1sekolah/master/mywebsocket/mymain/public/fonts/helvetiker_regular.typeface.json', function ( font ) 
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
				var material = new THREE.MeshFaceMaterial([	new THREE.MeshPhongMaterial({color: 0xff22cc, shading: THREE.FlatShading}), // front
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
  
		update(dt) 
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
    	    this.mesh.castShadow	= true;
			this.mesh.receiveShadow = false;//true;
				
    	    this.rotx		= size.rotx;
    	    this.roty		= size.roty;
    	    this.rotz		= size.rotz;
		}
  
		update(dt) 
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
	{	constructor(name,size,maxAnisotropy,floorTexture,floorTextureBump,floorTextureOCC) 
		{	//////////////////////////////////////////////////
			//var maxAnisotropy = renderer.getMaxAnisotropy();
			
/*			
			var floorTexture		= window.gfloorTexture;
			var floorTextureBump	= window.gfloorTextureBump;
			var floorTextureOCC		= window.gfloorTextureOCC;
			
			if(floorTexturefn&&!window.gfloorTexture)
	        {	floorTexture      		= window.gTexLoader.load( floorTexturefn );
	            floorTexture.wrapS      = floorTexture.wrapT = THREE.RepeatWrapping; 
    	        floorTexture.repeat.set( 200,200 );
    			floorTexture.magFilter	= THREE.NearestFilter;
				floorTexture.minFilter	= THREE.LinearMipMapLinearFilter;
   				floorTexture.anisotropy = maxAnisotropy;
	        }
	        
	        if(floorTextureBumpfn&& !floorTextureBump)
	        {	floorTextureBump    = window.gTexLoader.load( floorTextureBumpfn );
            	//floorTextureBump.wrapS      = floorTexture.wrapT = THREE.RepeatWrapping; 
            	//floorTextureBump.repeat.set( 100,100 );
   				//floorTextureBump.anisotropy = maxAnisotropy;
	        }
	        
	        if(floorTextureOCCfn && !floorTextureOCC)
            {	floorTextureOCC     = window.gTexLoader.load( floorTextureOCCfn );
	            //floorTextureOCC.wrapS      = floorTexture.wrapT = THREE.RepeatWrapping; 
    	        //floorTextureOCC.repeat.set( 100,100 );
   				//floorTextureOCC.anisotropy = maxAnisotropy;
            }
            
            //var floorTextureSPEC    = window.gTexLoader.load( 'images/dirt/dirt_SPEC.jpg' );
            //floorTextureSPEC.wrapS      = floorTexture.wrapT = THREE.RepeatWrapping; 
            //floorTextureSPEC.repeat.set( 100,100 );
   			//floorTextureSPEC.anisotropy = maxAnisotropy;

	        //var floorTextureDISP    = window.gTexLoader.load( 'images/dirt/ori/dirt_DISP.png' );
            //floorTextureDISP.wrapS      = floorTexture.wrapT = THREE.RepeatWrapping; 
            //floorTextureDISP.repeat.set( 100,100 );
   			//floorTextureDISP.anisotropy = maxAnisotropy;
*/
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
                shininess:          2,//10,//35.0,
                //color:              0xdddddd,
				//specular:           0x101010,
				//emissive:			'#333333'
                //side:               THREE.BackSide
                //opacity:			0.382 
            };
            
            
            //this.material			= new THREE.MeshStandardMaterial( params );
            //this.material			= new THREE.MeshLambertMaterial( params );
            this.material			= new THREE.MeshPhongMaterial( params );
            //this.material			= new THREE.MeshPhongMaterial({specular: '#ffffff',color: '#aaaaaa',emissive: '#333333',shininess: 10 });

            /////////////////////////////////////////////////
			//this.material			= Physijs.createMaterial(	new THREE.MeshPhongMaterial( params ),
			//													0.618, // high friction
			//													0.382 // low restitution
			//												);            
            
			//////////////////////////////////////////////////
			//this.geometry 			= new THREE.BoxGeometry(size.width, size.height,-1);
			this.geometry 			= new THREE.PlaneBufferGeometry(size.width, size.height);
			//this.geometry 			= new THREE.PlaneGeometry(size.width, size.height);	//this work for physijs
            
            //make 2nd uv for aomap to function
            if(floorTextureOCC)
            {	var uvs = this.geometry.attributes.uv.array;
            	this.geometry.addAttribute( 'uv2', new THREE.BufferAttribute( uvs, 2 ) );
            }
            
			//////////////////////////////////////////////////
			//this.mesh				= new Physijs.ConvexMesh(this.geometry,this.material);
			//this.mesh				= new Physijs.BoxMesh(this.geometry,this.material);
			//this.mesh				= new Physijs.PlaneMesh(this.geometry,this.material);
    	    this.mesh 				= new THREE.Mesh(this.geometry, this.material);
    	    this.mesh.position.y 	= -1;//-2;//
            this.mesh.rotation.x 	= -Math.PI / 2;
            
            this.mesh.castShadow	= false;
            this.mesh.receiveShadow = true;
    	    //this.rotx		= size.rotx;
    	    //this.roty		= size.roty;
    	    //this.rotz		= size.rotz;
    	    ////////////////////////////////////////////////////
    	    this.mesh.name			= name;//'ground_desert_mesh';			
		}
  
		update(dt) 
		{	//if(this.rotx)this.mesh.rotation.x += this.rotx;
			//if(this.roty)this.mesh.rotation.y += this.roty;
			//if(this.rotz)this.mesh.rotation.z += this.rotz;
		}
  
		getMesh() 
		{	return this.mesh;
		}
	}
	
	class CPlane2 
	{	constructor(w, h, position, rotation)
    	{	var material	= new THREE.MeshBasicMaterial({color: 0x000000,opacity: 0.0,side: THREE.DoubleSide});
    		var geometry	= new THREE.PlaneGeometry(w, h);
    		this.mesh		= new THREE.Mesh(geometry, material);
    		
    		this.mesh.position.x = position.x;
    		this.mesh.position.y = position.y;
    		this.mesh.position.z = position.z;
    		this.mesh.rotation.x = rotation.x;
    		this.mesh.rotation.y = rotation.y;
    		this.mesh.rotation.z = rotation.z;
    		return this.mesh;
    	}    		
		update(dt) 
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
    		//return this;
		}
	}
		
	class CAxisHelper extends CBase
	{	constructor()
		{	super(new THREE.AxisHelper ( 200 , 50 ));
    		//this.scene.add ( this.axisHelper );    			
    		//return this;
		}
	}
		
	class CLightHelper extends CBase
	{	constructor(light)
		{	super(new THREE.DirectionalLightHelper ( light , 20 ));
    		//this.scene.add ( this.lightHelper );
    		//return this;
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
	    //return this;
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


///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

class CMinecraft
{	constructor(worldWidth = 200, worldDepth = 200,maxAnisotropy)
	{	this.worldWidth		= worldWidth;
		this.worldDepth 	= worldDepth;
		
		this.sz				= 1;
		this.szhalf			= this.sz/2;

/*	
				   //1   2   3   4   5   6   7   8   9   0   1   2   3   4   5   6   7   8   9   0   1   2   3   4   5   6   7   8   9   0   1   2   3   4   5   6   7   8   9   0
		this.mynoise = 
					[1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//1
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//2
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//3
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//4
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//5
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//6
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//7
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//8
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//9
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//0
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//1
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,5  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//2
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,10 ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//3
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,15 ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//4
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,20 ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//5
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,25 ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//6
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//7
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//8
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//9
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//0
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//1
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//2
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//3
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//4
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//5
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//6
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//7
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//8
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//9
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//0
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//1
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//2
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//3
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//4
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//5
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//6
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//7
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//8
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,	//9
					 1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  	//0
					];
*/
		this.data = this.generateHeight( worldWidth, worldDepth );

		//var clock = new THREE.Clock();
		this.init(maxAnisotropy);
					
	}			

	init(maxAnisotropy) 
	{	var worldHalfWidth = this.worldWidth / 2;
		var worldHalfDepth = this.worldDepth / 2;

		// sides
		this.light	= new THREE.Color( 0xffffff );
		this.shadow	= new THREE.Color( 0x505050 );
		this.matrix	= new THREE.Matrix4();
		
		this.pxGeometry = new THREE.PlaneGeometry( this.sz, this.sz );
		this.pxGeometry.faces[ 0 ].vertexColors = [ this.light, this.shadow, this.light ];
		this.pxGeometry.faces[ 1 ].vertexColors = [ this.shadow, this.shadow, this.light ];
		this.pxGeometry.faceVertexUvs[ 0 ][ 0 ][ 0 ].y = 0.5;
		this.pxGeometry.faceVertexUvs[ 0 ][ 0 ][ 2 ].y = 0.5;
		this.pxGeometry.faceVertexUvs[ 0 ][ 1 ][ 2 ].y = 0.5;
		this.pxGeometry.rotateY( Math.PI / 2 );
		this.pxGeometry.translate( this.szhalf, 0, 0 );
		
		this.nxGeometry = new THREE.PlaneGeometry( this.sz, this.sz );
		this.nxGeometry.faces[ 0 ].vertexColors = [ this.light, this.shadow, this.light ];
		this.nxGeometry.faces[ 1 ].vertexColors = [ this.shadow, this.shadow, this.light ];
		this.nxGeometry.faceVertexUvs[ 0 ][ 0 ][ 0 ].y = 0.5;
		this.nxGeometry.faceVertexUvs[ 0 ][ 0 ][ 2 ].y = 0.5;
		this.nxGeometry.faceVertexUvs[ 0 ][ 1 ][ 2 ].y = 0.5;
		this.nxGeometry.rotateY( - Math.PI / 2 );
		this.nxGeometry.translate( - this.szhalf, 0, 0 );
		
		this.pyGeometry = new THREE.PlaneGeometry( this.sz, this.sz );
		this.pyGeometry.faces[ 0 ].vertexColors = [ this.light, this.light, this.light ];
		this.pyGeometry.faces[ 1 ].vertexColors = [ this.light, this.light, this.light ];
		this.pyGeometry.faceVertexUvs[ 0 ][ 0 ][ 1 ].y = 0.5;
		this.pyGeometry.faceVertexUvs[ 0 ][ 1 ][ 0 ].y = 0.5;
		this.pyGeometry.faceVertexUvs[ 0 ][ 1 ][ 1 ].y = 0.5;
		this.pyGeometry.rotateX( - Math.PI / 2 );
		this.pyGeometry.translate( 0, this.szhalf, 0 );
		
		this.py2Geometry = new THREE.PlaneGeometry( this.sz, this.sz );
		this.py2Geometry.faces[ 0 ].vertexColors = [ this.light, this.light, this.light ];
		this.py2Geometry.faces[ 1 ].vertexColors = [ this.light, this.light, this.light ];
		this.py2Geometry.faceVertexUvs[ 0 ][ 0 ][ 1 ].y = 0.5;
		this.py2Geometry.faceVertexUvs[ 0 ][ 1 ][ 0 ].y = 0.5;
		this.py2Geometry.faceVertexUvs[ 0 ][ 1 ][ 1 ].y = 0.5;
		this.py2Geometry.rotateX( - Math.PI / 2 );
		this.py2Geometry.rotateY( Math.PI / 2 );
		this.py2Geometry.translate( 0, this.szhalf, 0 );
		
		this.pzGeometry = new THREE.PlaneGeometry( this.sz, this.sz );
		this.pzGeometry.faces[ 0 ].vertexColors = [ this.light, this.shadow, this.light ];
		this.pzGeometry.faces[ 1 ].vertexColors = [ this.shadow, this.shadow, this.light ];
		this.pzGeometry.faceVertexUvs[ 0 ][ 0 ][ 0 ].y = 0.5;
		this.pzGeometry.faceVertexUvs[ 0 ][ 0 ][ 2 ].y = 0.5;
		this.pzGeometry.faceVertexUvs[ 0 ][ 1 ][ 2 ].y = 0.5;
		this.pzGeometry.translate( 0, 0, this.szhalf );
		
		this.nzGeometry = new THREE.PlaneGeometry( this.sz, this.sz );
		this.nzGeometry.faces[ 0 ].vertexColors = [ this.light, this.shadow, this.light ];
		this.nzGeometry.faces[ 1 ].vertexColors = [ this.shadow, this.shadow, this.light ];
		this.nzGeometry.faceVertexUvs[ 0 ][ 0 ][ 0 ].y = 0.5;
		this.nzGeometry.faceVertexUvs[ 0 ][ 0 ][ 2 ].y = 0.5;
		this.nzGeometry.faceVertexUvs[ 0 ][ 1 ][ 2 ].y = 0.5;
		this.nzGeometry.rotateY( Math.PI );
		this.nzGeometry.translate( 0, 0, - this.szhalf );
		
		//
		this.geometry = new THREE.Geometry();
		//var dummy = new THREE.Mesh();
		
		for ( var z = 0; z < this.worldDepth; z ++ ) 
		//new async.ForLoop(0,this.worldDepth, function (z) 
		{	for ( var x = 0; x < this.worldWidth; x ++ ) 
			//new async.ForLoop(0,this.worldWidth, function (x) 
			{	var h = this.getY( x, z );
				this.matrix.makeTranslation(x * this.sz - worldHalfWidth * this.sz,h * this.sz,z * this.sz - worldHalfDepth * this.sz);
				
				var px	 = this.getY( x + 1, z );
				var nx	 = this.getY( x - 1, z );
				var pz	 = this.getY( x, z + 1 );
				var nz	 = this.getY( x, z - 1 );
				var pxpz = this.getY( x + 1, z + 1 );
				var nxpz = this.getY( x - 1, z + 1 );
				var pxnz = this.getY( x + 1, z - 1 );
				var nxnz = this.getY( x - 1, z - 1 );
				var a	 = nx > h || nz > h || nxnz > h ? 0 : 1;
				var b	 = nx > h || pz > h || nxpz > h ? 0 : 1;
				var c	 = px > h || pz > h || pxpz > h ? 0 : 1;
				var d	 = px > h || nz > h || pxnz > h ? 0 : 1;
				
				if ( a + c > b + d ) 
				{	var colors = this.py2Geometry.faces[ 0 ].vertexColors;
					colors[ 0 ] = b === 0 ? this.shadow : this.light;
					colors[ 1 ] = c === 0 ? this.shadow : this.light;
					colors[ 2 ] = a === 0 ? this.shadow : this.light;
					
					var colors = this.py2Geometry.faces[ 1 ].vertexColors;
					colors[ 0 ] = c === 0 ? this.shadow : this.light;
					colors[ 1 ] = d === 0 ? this.shadow : this.light;
					colors[ 2 ] = a === 0 ? this.shadow : this.light;
					this.geometry.merge( this.py2Geometry, this.matrix );
				} 
				else 
				{	var colors = this.pyGeometry.faces[ 0 ].vertexColors;
					colors[ 0 ] = a === 0 ? this.shadow : this.light;
					colors[ 1 ] = b === 0 ? this.shadow : this.light;
					colors[ 2 ] = d === 0 ? this.shadow : this.light;
					
					var colors = this.pyGeometry.faces[ 1 ].vertexColors;
					colors[ 0 ] = b === 0 ? this.shadow : this.light;
					colors[ 1 ] = c === 0 ? this.shadow : this.light;
					colors[ 2 ] = d === 0 ? this.shadow : this.light;
					this.geometry.merge( this.pyGeometry, this.matrix );
				}
				
				if ( ( px != h && px != h + 1 ) || x == 0 ) 
				{	var colors = this.pxGeometry.faces[ 0 ].vertexColors;
					colors[ 0 ] = pxpz > px && x > 0 ? this.shadow : this.light;
					colors[ 2 ] = pxnz > px && x > 0 ? this.shadow : this.light;
					var colors = this.pxGeometry.faces[ 1 ].vertexColors;
					colors[ 2 ] = pxnz > px && x > 0 ? this.shadow : this.light;
					this.geometry.merge( this.pxGeometry, this.matrix );
				}
				
				if ( ( nx != h && nx != h + 1 ) || x == this.worldWidth - 1 ) 
				{	var colors = this.nxGeometry.faces[ 0 ].vertexColors;
					colors[ 0 ] = nxnz > nx && x < this.worldWidth - 1 ? this.shadow : this.light;
					colors[ 2 ] = nxpz > nx && x < this.worldWidth - 1 ? this.shadow : this.light;
					var colors = this.nxGeometry.faces[ 1 ].vertexColors;
					colors[ 2 ] = nxpz > nx && x < this.worldWidth - 1 ? this.shadow : this.light;
					this.geometry.merge( this.nxGeometry, this.matrix );
				}
				
				if ( ( pz != h && pz != h + 1 ) || z == this.worldDepth - 1 ) 
				{	var colors = this.pzGeometry.faces[ 0 ].vertexColors;
					colors[ 0 ] = nxpz > pz && z < this.worldDepth - 1 ? this.shadow : this.light;
					colors[ 2 ] = pxpz > pz && z < this.worldDepth - 1 ? this.shadow : this.light;
					var colors = this.pzGeometry.faces[ 1 ].vertexColors;
					colors[ 2 ] = pxpz > pz && z < this.worldDepth - 1 ? this.shadow : this.light;
					this.geometry.merge( this.pzGeometry, this.matrix );
				}
				
				if ( ( nz != h && nz != h + 1 ) || z == 0 ) 
				{	var colors = this.nzGeometry.faces[ 0 ].vertexColors;
					colors[ 0 ] = pxnz > nz && z > 0 ? this.shadow : this.light;
					colors[ 2 ] = nxnz > nz && z > 0 ? this.shadow : this.light;
				
					var colors = this.nzGeometry.faces[ 1 ].vertexColors;
					colors[ 2 ] = nxnz > nz && z > 0 ? this.shadow : this.light;
					this.geometry.merge( this.nzGeometry, this.matrix );
				}
			}	
			//}.bind(this))
		//}.bind(this));
		}
		////////////////////////////////////////////////////////////////////////////////////////
		this.texture			= new THREE.TextureLoader().load( 'textures/minecraft/atlas.png' );
		this.texture.magFilter	= THREE.LinearFilter;//THREE.NearestFilter;
		this.texture.minFilter	= THREE.LinearMipMapLinearFilter;

		////////////////////////////////////////////////////////////////////////
		//var params = 
        //{   map:                this.texture,
        //    bumpMap:        	this.texture,
        //    bumpScale:			1,
        //    shininess:          1,//35.0,
        //    vertexColors:	    THREE.VertexColors
        //};
        //    
        //this.material			= new THREE.MeshStandardMaterial( params );
        //this.material			= new THREE.MeshLambertMaterial( params );
        //this.material			= new THREE.MeshPhongMaterial( params );		
		//this.mesh = new THREE.Mesh( this.geometry, this.material);
		////////////////////////////////////////////////////////////////////////		
		
		//this.mesh = new THREE.Mesh( this.geometry, new THREE.MeshPhongMaterial( { map: this.texture, vertexColors: THREE.VertexColors } ) );
		this.mesh = new THREE.Mesh( this.geometry, new THREE.MeshLambertMaterial( { map: this.texture, vertexColors: THREE.VertexColors } ) );
		this.mesh.name = 'myminecraft';
		this.mesh.castShadow	= false;
        this.mesh.receiveShadow = true;
        
        this.mesh.position.set(worldHalfWidth*this.sz,0, worldHalfDepth*this.sz);
		//scene.add( this.mesh );
		////////////////////////////////////////////////////////////////////////////////////////
		/*
	        var floorTexture        = window.gTexLoader.load( 'images/dirt/ori/dirt_COLOR.png' );
            floorTexture.wrapS      = floorTexture.wrapT = THREE.RepeatWrapping; 
            //floorTexture.repeat.set( 200,200 );
			
			floorTexture.magFilter	= THREE.NearestFilter;
			floorTexture.minFilter	= THREE.LinearMipMapLinearFilter;
   			floorTexture.anisotropy = maxAnisotropy;
	        var floorTextureBump    = window.gTexLoader.load( 'images/dirt/ori/dirt_NRM.png' );
            //floorTextureBump.wrapS      = floorTexture.wrapT = THREE.RepeatWrapping; 
            //floorTextureBump.repeat.set( 100,100 );
   			//floorTextureBump.anisotropy = maxAnisotropy;
            //var floorTextureOCC     = window.gTexLoader.load( 'images/dirt/dirt_OCC.jpg' );
            //floorTextureOCC.wrapS      = floorTexture.wrapT = THREE.RepeatWrapping; 
            //floorTextureOCC.repeat.set( 100,100 );
   			//floorTextureOCC.anisotropy = maxAnisotropy;
            
            //var floorTextureSPEC    = window.gTexLoader.load( 'images/dirt/dirt_SPEC.jpg' );
            //floorTextureSPEC.wrapS      = floorTexture.wrapT = THREE.RepeatWrapping; 
            //floorTextureSPEC.repeat.set( 100,100 );
   			//floorTextureSPEC.anisotropy = maxAnisotropy;
	        //var floorTextureDISP    = window.gTexLoader.load( 'images/dirt/ori/dirt_DISP.png' );
            //floorTextureDISP.wrapS      = floorTexture.wrapT = THREE.RepeatWrapping; 
            //floorTextureDISP.repeat.set( 100,100 );
   			//floorTextureDISP.anisotropy = maxAnisotropy;
	        var params = 
	        {   map:                floorTexture,
                bumpMap:        	floorTextureBump,
                //aoMap:              floorTextureOCC,         
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
            /////////////////////////////////////////////////
			//this.material			= Physijs.createMaterial(	new THREE.MeshPhongMaterial( params ),
			//													0.618, // high friction
			//													0.382 // low restitution
			//												);            
            
			//////////////////////////////////////////////////
			//this.geometry 			= new THREE.BoxGeometry(size.width, size.height,-1);
			//this.geometry 			= new THREE.PlaneBufferGeometry(size.width, size.height);
			//this.geometry 			= new THREE.PlaneGeometry(size.width, size.height);	//this work for physijs
            
            //make 2nd uv for aomap to function
            //var uvs = this.geometry.attributes.uv.array;
            //this.geometry.addAttribute( 'uv2', new THREE.BufferAttribute( uvs, 2 ) );
			//////////////////////////////////////////////////
			//this.mesh				= new Physijs.ConvexMesh(this.geometry,this.material);
			//this.mesh				= new Physijs.BoxMesh(this.geometry,this.material);
			//this.mesh				= new Physijs.PlaneMesh(this.geometry,this.material);
    	    this.mesh 				= new THREE.Mesh(this.geometry, this.material);
			
			this.mesh.name			= 'myminecraft';
    	    */
		/////////////////////////////////////////////////////////////////////////		
		
		/*
		var ambientLight = new THREE.AmbientLight( 0xcccccc );
		scene.add( ambientLight );
		var directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
		directionalLight.position.set( 1, 1, 0.5 ).normalize();
		scene.add( directionalLight );
		renderer = new THREE.WebGLRenderer();
		renderer.setClearColor( 0xffffff );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		container.innerHTML = "";
		container.appendChild( renderer.domElement );
		stats = new Stats();
		container.appendChild( stats.dom );
		*/
		//
		//window.addEventListener( 'resize', onWindowResize, false );
	}
	

	//loadTexture( path, callback ) 
	//{	var image = new Image();
	//	image.onload = function () { callback(); };
	//	image.src = path;
	//	return image;
	//}
	
	generateHeight( width, height ) 
	{	var data	= [], 
			perlin	= new ImprovedNoise(),
			size	= width * height, 
			quality = 2, 
			//z		= 1;//Math.random() * this.sz;
			z		= this.sz;
			
		for ( var j = 0; j < 4; j ++ ) 
		{	if ( j == 0 ) 
			{	for ( var i = 0; i < size; i ++ ) data[ i ] = 0;
			}
			for ( var i = 0; i < size; i ++ ) 
			{	var x = i % width, y = ( i / width ) | 0;
				//data[ i ] += perlin.noise( x / quality, y / quality, z ) * quality;
				data[ i ] += perlin.noise( x /quality/9, y/quality/9, z ) * quality;
			}
			quality *= 3;//4;//
		}
		return data;
	}
	
	getY( x, z ) 
	{	//return ( this.data[ x + z * this.worldWidth ] * 0.2 ) | 0;
		return ( this.data[ x + z * this.worldWidth ] * 0.2 ) | 0;
	}	

	update(dt) 
	{
	}
  
	getMesh() 
	{	return this.mesh;
	}
}

