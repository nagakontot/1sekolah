"use strict"

	///////////////////////////////////////////////////////////////////////
	class CmyApp extends CThreejs
	{ 	constructor(width=window.innerWidth,height=window.innerHeight,fps=30) 
		{	super(width,height,fps);
			this.clock = new THREE.Clock();
			
			this.oldpos = new THREE.Vector3();
			
			//this.isInit =false;
		}
  
		init() 
		{	//this.renderer_.enableShadow();
			this.renderer.setClearColor(this.scene.fog.color);
			super.enableShadow();
			
			super.createStdLight();
			//super.createHelper();
			
			//window.movieMaterial		= new ChromaKeyMaterial('video/baby4.webm', 320,218, 0xd400);
			//window.movieMaterial		= new ChromaKeyMaterial('video/monkey5.webm', 320,240, 0xd400);

			var filename = ['video/baby_1.webm',
							'video/monkey_1.webm',
							'video/robot_1.webm',//'video/TrainerCalem_160x120.webm',
							'video/billcat_1.webm'];//'video/panda_160x120.webm'];

			window.movieMaterial		= [];
			for(var i=0;i<filename.length;i++)
			{	window.movieMaterial[i]			= new ChromaKeyMaterial(filename[i],128,128,0xd400,i);
			
				window.movieMaterial[i].side	= THREE.DoubleSide;
				//window.movieMaterial[i].side	= THREE.FrontSide;
				//window.movieMaterial[i].side	= THREE.BackSide;
				//window.movieMaterial[i+4].side= THREE.BackSide;
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
			var anis = this.renderer.getMaxAnisotropy();
			
			this.createMinecraft(anis);
			
			//super.addMesh(new CMinecraft(200,200,anis));
			//super.addMesh(new CPlane({width:1000,height:1000},anis));
			//super.addMesh(new CCube({width:2,height:2,depth:2,rotx:0.1,roty:0.1,rotz:0}));
			//super.addMesh(new CText({width:20,height:20,depth:2,rotx:0.1,roty:0.1,rotz:0}));
			
			//this.createShaderSkybox();
		}

		createMinecraft(anis)
		{	this.mymc = new CMinecraft(200,200,anis);
			this.scene.add(this.mymc.getMesh());
		}

		createShaderSkybox()
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
		{	for(var i=0;i<movieMaterial.length;i++)
			{	window.movieMaterial[i].update();
			}
			
			this.mysp.update(time,this.scene,this.params1);
			this.mygame.updatePlayers();
			
			if(player)
			{	var pos = player.getPosition();
				var newh = this.mymc.getY( Math.round(pos.x),Math.round(pos.z))+1.07;
				//console.log("pos.x="+Math.round(pos.x)+" pos.y="+this.mymc.getY( Math.round(pos.x), Math.round(pos.y) )+" pos.z="+Math.round(pos.z));
				
				if(newh>this.controls.GroundHeight && this.controls.isOnGround())
				{	player.setPositionY(pos.y+1.25);
					this.controls.StartJump();
				}
				else 
				{	this.controls.GroundHeight = newh;
				}
				
				//this.controls.GroundHeight   = this.mymc.getY( Math.round(pos.x),Math.round(pos.z))+1.075;
				//this.controls.GroundOffset   = 0;	//not use
				
				//this.light_.followTarget(pos,this.scene.getObjectByName('player_moviemesh'));
				
				this.light_.followTarget(player.getPosition(),this.scene.getObjectByName('player_moviemesh'));
				
				//this.light_.followTarget(this.scene,player.getPosition(),'player_moviemesh');
				//var pos = player.getPosition();
				//this.light.position.set(pos.x,10,pos.z-10);
				//this.light.target	= this.scene.getObjectByName('player_moviemesh');
			}
		
		
			//this.mysky.update(player.getPosition());
			
			//this.skyBox.position.copy( player.getPosition() );
			//this.skyBox.position.x = player.getPosition().x;
			//this.skyBox.position.z = player.getPosition().z;

			super.update();
		}
		
		render() 
		{	var time = Date.now() * 0.00005;
			//var time = this.clock.getDelta();
		
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

//MainLoop.setUpdate(myapp.update).setDraw(myapp.render).start();