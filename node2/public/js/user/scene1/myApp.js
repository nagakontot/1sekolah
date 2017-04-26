"use strict"

	///////////////////////////////////////////////////////////////////////
	class CmyApp extends CThreejs
	{ 	constructor(width=window.innerWidth,height=window.innerHeight,fps=30) 
		{	super(width,height,fps);
		}
  
		init() 
		{	//this.renderer_.enableShadow();
			this.renderer.setClearColor(this.scene.fog.color);
			super.enableShadow();
			
			super.createStdLight();
			//super.createHelper();
			
			//window.movieMaterial		= new ChromaKeyMaterial('video/baby4.webm', 320,218, 0xd400);
			//window.movieMaterial		= new ChromaKeyMaterial('video/monkey5.webm', 320,240, 0xd400);

			window.movieMaterial		= [];
			window.movieMaterial[0]		= new ChromaKeyMaterial('video/baby4.webm', 		320,218, 0xd400,0);
			window.movieMaterial[1]		= new ChromaKeyMaterial('video/monkey5.webm',		320,240, 0xd400,1);
			window.movieMaterial[2]		= new ChromaKeyMaterial('video/TrainerCalem3.webm', 320,240, 0xd400,2);
			window.movieMaterial[3]		= new ChromaKeyMaterial('video/panda1.webm',		320,240, 0xd400,3);

			
			for(var i=0;i<4;i++)
			{	//window.movieMaterial[0].side   = THREE.DoubleSide;
				//window.movieMaterial[1].side   = THREE.DoubleSide;
				//window.movieMaterial[2].side   = THREE.DoubleSide;
				//window.movieMaterial[3].side   = THREE.DoubleSide;
				window.movieMaterial[i].side		= THREE.DoubleSide;
				//window.movieMaterial[i].transparent = true;
				//window.movieMaterial[i].alphaTest	= 0.5;
				//window.movieMaterial[i].alphaTest	= 0xd400;
				//window.movieMaterial[i].alphaTest	= new THREE.Color(0xd400);
			}
			
			this.mygame = new CGameModel(this);
			this.mygame.init();
			this.loadEnvironment();
			
        	this.onWindowResize = this.onWindowResize.bind(this);
        	window.addEventListener( "resize", this.onWindowResize, false );
        	///////////////////////////////////////
			/*        	
        	var spritefn =  [	"textures/sprites/snowflake1.png",
        						"textures/sprites/snowflake2.png",
        						"textures/sprites/snowflake3.png",
        						"textures/sprites/snowflake4.png",
        						"textures/sprites/snowflake5.png"
        					];
        	this.mysp	= new CSpritePoint(this.scene,spritefn);
        	*/
			
			this.params1=	[	[ [1.0,  0.2,  0.5], texLoader.load("textures/sprites/snowflake1.png"), 0.8],
								[ [0.95, 0.1,  0.5], texLoader.load("textures/sprites/snowflake2.png"), 0.5],
								[ [0.90, 0.05, 0.5], texLoader.load("textures/sprites/snowflake3.png"), 0.3],
								[ [0.85, 0,    0.5], texLoader.load("textures/sprites/snowflake4.png"), 0.2],
								[ [0.80, 0,    0.5], texLoader.load("textures/sprites/snowflake5.png"), 0.1]
							];
        						
        	this.mysp	= new CSpritePoint(this.scene,this.params1);
        	
        	//this.label   = createLabel(this.scene,"bodoooooo", 40) ;
        	//this.scene.add(createLabel(this.scene,"bodoooooo", 40));
		}
  
		loadEnvironment() 
		{	//var sphere_geometry = new THREE.SphereGeometry( 1 );
			//var sphere_material = new THREE.MeshNormalMaterial();
			//var sphere			= new THREE.Mesh( sphere_geometry, sphere_material );
			//this.app.add( sphere );
			//this.app.addMesh(new CCube({width:2,height:2,depth:2,rotx:0.1,roty:0.1,rotz:0}));
			/////////////////////////////////////////////////////////
		
			super.addMesh(new CCube({width:2,height:2,depth:2,rotx:0.1,roty:0.1,rotz:0}));
			super.addMesh(new CPlane({width:1000,height:1000},this.renderer.getMaxAnisotropy()));
			//super.addMesh(new CText({width:20,height:20,depth:2,rotx:0.1,roty:0.1,rotz:0}));
			
			this.drawShaderSkybox();
		}


		drawShaderSkybox()
		{	/*
			// prepare ShaderMaterial without textures
			var vertexShader	= document.getElementById('sky-vertex').textContent, 
			    fragmentShader  = document.getElementById('sky-fragment').textContent;
			    
			var uniforms = {	topColor:		{ type: "c", value: new THREE.Color(0x0055ff)}, 
								bottomColor:	{ type: "c", value: new THREE.Color(0xffffff)},
								offset: 		{ type: "f", value: 5}, 
								exponent:		{ type: "f", value: 0.6}
							}

			this.skyMaterial	= new THREE.ShaderMaterial({vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide, fog: false});
			
			// create Mesh with sphere geometry and add to the scene
			this.skyBox 		= new THREE.Mesh( new THREE.SphereGeometry(250, 60, 40), this.skyMaterial);
			this.skyBox.position.copy( player.getPosition() );
			this.scene.add(this.skyBox);
			*/

			var size = {radius:250,widthSegments:60,heightSegments:40};
			this.mysky = new CSKyboxGradient(size);
			
			this.scene.add(this.mysky.getMesh());
			
			 
		}
		
		update(time)
		{	window.movieMaterial[0].update();
			window.movieMaterial[1].update();
			window.movieMaterial[2].update();
			window.movieMaterial[3].update();
		
			this.mysp.update(time,this.scene,this.params1);
			this.mygame.updatePlayers();
			
			if(player)this.mysky.setPosition(player.getPosition().x,player.getPosition().z);
		
		
			//this.mysky.update(player.getPosition());
			
			//this.skyBox.position.copy( player.getPosition() );
			//this.skyBox.position.x = player.getPosition().x;
			//this.skyBox.position.z = player.getPosition().z;
			super.update();
		}
		
		render() 
		{	var time = Date.now() * 0.00005;
		
			this.requestId  = window.requestAnimationFrame(() => 
			{	this.render();
			});
			
			this.update(time);
			super.render();
		}
		
		/////////////////////////////////////////////
		
		/////////////////////////////////////////////
        onWindowResize()	
        {	super.onWindowResize();
		}		


	}    	

//////////////////////////////////////////////////////////////////////////

			
var myapp = new CmyApp();
myapp.init();
myapp.render();

