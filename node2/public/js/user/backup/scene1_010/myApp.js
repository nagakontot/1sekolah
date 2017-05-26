"use strict"

    class CScene1 extends MSMScene
    {	constructor(msmapp) 
        {   super(msmapp,msmapp.width,msmapp.height);
            this.i;	//use as counter to save some iteration
            return this;
        }

		init() 
		{	//super.init();
			//super.createStdLight();    			
			//////////////////////////////////////////////////////////////////////
			//this.glrenderer.setClearColor(this.glscene.fog.color);
			//this.glrenderer.autoClear = false;
			//this.glrenderer.setClearColor(0x000000, 0.0);
  
			//super.enableShadow();
			//var isShadow=true;
			//super.createStdLight(isShadow);
			
			//super.createStdLight(this.msmapp.isShadow);
			
			//super.createStdLight(true);

			//super.createHelper();
			
			///////////////////////////////////////////////////////////////////////
			
			var videos = [	'video/baby_1.webm',
							'video/monkey_1.webm',
							'video/robot_1.webm',
							'video/billcat_1.webm'];

			window.movieMaterial		= [];

			for(var i=0;i<videos.length;i++)
			{	window.movieMaterial[i]			= new ChromaKeyMaterial(videos[i],128,128,0xd400,i);
			
				window.movieMaterial[i].side	= THREE.DoubleSide;
				//window.movieMaterial[i].side	= THREE.FrontSide;
				//window.movieMaterial[i].side	= THREE.BackSide;
				//window.movieMaterial[i+4].side= THREE.BackSide;
			}
			
			///////////////////////////////////////////////////////////////////////
			/*
			Architect.proxy(videos, function(data) 
			{	//console.log(data)
				// => ['foo.png', 'bar.png', 'twiz.png', 'foozle.png', 'barzle.png', 'twizle.png']
				var i=0;
				data.forEach(function(vid) 
				{	//img = document.createElement('img')
    				//img.src = vid
    				//document.body.appendChild(img)
					window.movieMaterial[i]			= new ChromaKeyMaterial(vid,128,128,0xd400,i);
					window.movieMaterial[i].side	= THREE.DoubleSide;  
					i++;
				})
			});			
			*/
			///////////////////////////////////////////////////////////////////////
			/*
			var jobName		= 'appendVideos';
			var videosCount = 0;
			window.movieMaterial		= [];
			videos.forEach(function(vid) 
			{	Architect.proxyOn(jobName,vid,function(data) 
				{	videosCount++;
    				//img 		= document.createElement('img')
    				//img.src	= data
    				//document.body.appendChild(img)
    	
					window.movieMaterial[videosCount]			= new ChromaKeyMaterial(data,128,128,0xd400,videosCount);
					window.movieMaterial[videosCount].side		= THREE.DoubleSide;
					//window.movieMaterial[videosCount].side	= THREE.FrontSide;
					//window.movieMaterial[videosCount].side	= THREE.BackSide;
					//window.movieMaterial[videosCount+4].side	= THREE.BackSide;    	
    				if(videosCount == videos.length)Architect.endJob(jobName);
				});
			});
			*/
			//////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////
			/*
			this.mygame = new CGameModel(this);
			var xpos=50,ypos=0,zpos=50;
			this.mygame.init(xpos,ypos,zpos);
			*/
			this.loadEnvironment();
			
			//////////////////////////////////////////////////////////////////////
			/*
			var images = ['foo.png']
			Architect.proxy(images, function(data) 
			{	//console.log(data)
				// => ['foo.png', 'bar.png', 'twiz.png', 'foozle.png', 'barzle.png', 'twizle.png']
				data.forEach(function(image) 
				{	//img = document.createElement('img')
    				//img.src = image
    				//document.body.appendChild(img)
    				this.loadEnvironment();
				}.bind(this));
			}.bind(this));
			*/
			//////////////////////////////////////////////////////////////////////
			//Architect.proxy(function() 
			//{	this.loadEnvironment();
			//}.bind(this));
			//////////////////////////////////////////////////////////////////////
			
        	//this.onWindowResize = this.onWindowResize.bind(this);
        	//window.addEventListener( "resize", this.onWindowResize, false );

        	//window.addEventListener( "resize", this.onWindowResize.bind(this), false );
        	//window.addEventListener( "resize", super.onWindowResize.bind(this), false );
        	
        	///////////////////////////////////////
			/*
			this.params1=	[	[ [1.0,  0.2,  0.5], texLoader.load("textures/sprites/snowflake1.png"), 0.8],
								[ [0.95, 0.1,  0.5], texLoader.load("textures/sprites/snowflake2.png"), 0.5],
								[ [0.90, 0.05, 0.5], texLoader.load("textures/sprites/snowflake3.png"), 0.3],
								[ [0.85, 0,    0.5], texLoader.load("textures/sprites/snowflake4.png"), 0.2],
								[ [0.80, 0,    0.5], texLoader.load("textures/sprites/snowflake5.png"), 0.1]
							];
        						
        	this.mysp		= new CSpritePoint(this.glscene,this.params1);
        	*/
        	
        	//var pos = {x:83,y:-3,z:66};
        	//this.mymodel_1  = new CLoadModel_Obj(this.glscene,'models/male02/','male02_dds.mtl','male02.obj',pos);
        	//this.kiosk  = new CLoadModel_Obj(this.glscene,'models/kiosk/','Kiosk1.obj.mtl','Kiosk1.obj',pos);
        	//this.kiosk  = new CLoadModel_Obj(this.glscene,'models/newstand/','NewsStand.obj.mtl','NewsStand.obj',pos);
        	
        	//good!
        	//var pos1	= {x:83,y:-3.5,z:66};
        	//var scale1  = {x:2,y:2,z:2};
        	//this.kiosk  = new CLoadModel_Obj(this.glscene,'models/newstand/','NewsStand.obj.mtl','NewsStand.obj',pos1,scale1);
        	//this.kiosk  = new CLoadModel_Obj2(this.pivot,this.glscene,'models/newstand/','NewsStand.obj.mtl','NewsStand.obj',pos1,scale1);

        	//var pos1	= {x:109,y:-2.15,z:62};
        	//var scale1  = {x:0.05,y:0.05,z:0.05};
        	//this.house = new CLoadModel_Obj(this.glscene,'models/house_02/','House_02.obj.mtl','House_02.obj',pos1,scale1);
        	
        	//var pos1	= {x:109,y:-3,z:62};
        	//var scale1  = {x:1,y:1,z:1};
        	//this.StreetScene = new CLoadModel_Obj(this.glscene,'models/StreetScene/','StreetScene.obj.mtl','StreetScene.obj',pos1,scale1);

        	//var pos1	= {x:109,y:-5,z:62};
        	//var scale1  = {x:0.1,y:0.1,z:0.1};
        	//this.TheCity = new CLoadModel_Obj(this.glscene,'models/TheCity/','TheCity.obj.mtl','TheCity.obj',pos1,scale1);

        	//var pos1	= {x:109,y:0,z:62};
        	//var scale1  = {x:1,y:1,z:1};
        	//this.cs_italy = new CLoadModel_Obj(this.glscene,'models/cs_italy/','cs_italy.obj.mtl','cs_italy.obj',pos1,scale1);

        	//var pos1	= {x:109,y:0,z:62};
        	//var scale1  = {x:1,y:1,z:1};
        	//this.kiosk2	= new CLoadModel_Obj(this.glscene,'models/kiosk2/','CoffeeKiosk.obj.mtl','CoffeeKiosk.obj',pos1,scale1);

        	//this.label   = createLabel(this.glscene,"bodoooooo", 40) ;
        	//this.glscene.add(createLabel(this.glscene,"bodoooooo", 40));

			////////////////////////////////////////////////////////////////////

        	//var pos2		= {x:50,y:-1.5,z:50};		//new THREE.Vector3(50,-2,50);	//
        	//var scale2  	= {x:2,y:2,z:2};		//new THREE.Vector3(2,2,2);		//
        	//this.newstand   = new CLoadModel_WWObj2(this.pivot,this.glscene,'newstand','models/newstand/','NewsStand.obj.mtl','NewsStand.obj',pos2,scale2);
			
        	var pos3	= {x:6,		y:6.6,		z:85};		
        	var rot3	= {x:0,		y:Math.PI,z:0};		
        	var scale3  = {x:0.02,	y:0.02,		z:0.02};		
        	this.house1 = new CLoadModel_WWObj2(this.pivot,this.glscene,'house1','models/house1/','house1.mtl','house1.obj',pos3,rot3,scale3);

        	//var pos4	= {x:6,		y:-25,		z:85};		
        	//var rot4	= {x:0,		y:Math.PI,  z:0};		
        	//var scale4  = {x:0.02,	    y:0.02,		z:0.02};		
        	//this.cs_italy = new CLoadModel_WWObj2(this.pivot,this.glscene,'cs_italy','models/cs_italy/','cs_italy.obj.mtl','cs_italy.obj',pos4,rot4,scale4);

			////////////////////////////////////////////////////////////////////
            return this;

		}
  
		loadEnvironment() 
		{	//var sphere_geometry = new THREE.SphereGeometry( 1 );
			//var sphere_material = new THREE.MeshNormalMaterial();
			//var sphere			= new THREE.Mesh( sphere_geometry, sphere_material );
			//this.app.add( sphere );
			//this.app.addMesh(new CCube({width:2,height:2,depth:2,rotx:0.1,roty:0.1,rotz:0}));
			/////////////////////////////////////////////////////////
			//var anis = this.glrenderer.getMaxAnisotropy();
			var anis = this.msmapp.getMaxAnisotropy();
			
			//this.createMinecraft(anis);
			
			//super.addMesh(new CMinecraft(200,200,anis));
			super.addMesh(new CPlane({width:1000,height:1000},anis));
			//super.addMesh(new CCube({width:2,height:2,depth:2,rotx:0.1,roty:0.1,rotz:0}));
			//super.addMesh(new CText({width:20,height:20,depth:2,rotx:0.1,roty:0.1,rotz:0}));
			
			//this.createShaderSkybox();
			/////////////////////////////////////////////////////////
			this.pivot			= new THREE.Object3D();
			this.pivot.name 	= 'Pivot';
			this.glscene.add( this.pivot );
			
			//////////////////////////////////////////////////////////
			setTimeout(this.create_css3Diframe_rchat.bind(this),0);
			//////////////////////////////////////////////////////////
			/*
			this.cssgroup = new THREE.Group();//new THREE.Object3D();//
			//this.cssgroup.add( new CElement("https://rchat.1sekolah.xyz",1000,250,400, -Math.PI/2 ) );
			
			this.css3Diframe = new CElement("https://rchat.1sekolah.xyz",600,110,600, -Math.PI/2 );
			this.cssgroup.add( this.css3Diframe );

			//this.cssgroup.add( new CElement( 'njCDZWTI-xg', 0, 0, 240, 0 ) );
			//this.cssgroup.add( new CElement( 'HDh4uK9PvJU', 240, 0, 0, Math.PI / 2 ) );
			//this.cssgroup.add( new CElement( 'OX9I1KyNa8M', 0, 0, - 240, Math.PI ) );
			//this.cssgroup.add( new CElement( 'nhORZ6Ep_jE', - 240, 0, 0, - Math.PI / 2 ) );			
			this.cssscene.add( this.cssgroup );
			*/
			//////////////////////////////////////////////////////////
			this.blocker = document.getElementById( 'blocker' );
			this.blocker.style.display = 'none';
			document.addEventListener( 'mousedown', function () { this.blocker.style.display = ''; }.bind(this));//,     false );
			document.addEventListener( 'mouseup',   function () { this.blocker.style.display = 'none'; }.bind(this));//, false );
			
		}

	    create_css3Diframe_rchat()
	    {	this.cssgroup    = new THREE.Group();//new THREE.Object3D();//
	    	this.css3Diframe = new CElement("https://rchat.1sekolah.xyz",600,110,600, -Math.PI/2 );
			this.cssgroup.add( this.css3Diframe );
			this.cssscene.add( this.cssgroup );
	    }
	    
		createMinecraft(anis)
		{	this.mymc = new CMinecraft(100,100,anis);
			this.glscene.add(this.mymc.getMesh());
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
			this.glscene.add(this.skyBox);
			*/

			var size = {radius:250,widthSegments:60,heightSegments:40};
			this.mysky = new CSKyboxGradient(size);
			
			this.glscene.add(this.mysky.getMesh());
		}
		
		update()
		{	super.update();
			
			//for(var i=0,len=window.movieMaterial.length;i<len;i++)
			//{	window.movieMaterial[i].update();
			//}

			var len = window.movieMaterial.length;
			while(len--) 
			{	window.movieMaterial[len].update();
			}
			
			//this.mysp.update(time,this.glscene,this.params1);
			//this.mygame.updatePlayers();
			this.msmapp.mygamemodel.updatePlayers();
			
			//if(this.mymc)
			//{	
				if(this.msmapp.mygamemodel.player)
				{	/*
					var pos  = player.getPosition();
					var newh = this.mymc.getY( Math.round(pos.x),Math.round(pos.z))+1.07;
				
					if(this.counter++>1)
					{	this.counter = 0;
						console.log("pos.x="+Math.round(pos.x)+" pos.y="+this.mymc.getY( Math.round(pos.x), Math.round(pos.y) )+" pos.z="+Math.round(pos.z));
					}	
				
					if(newh>this.controls.GroundHeight && this.controls.isOnGround())
					{	player.setPositionY(pos.y+1.25);
						this.controls.StartJump();
					}
					else 
					{	this.controls.GroundHeight = newh;
					}
					*/
					//this.controls.GroundHeight   = this.mymc.getY( Math.round(pos.x),Math.round(pos.z))+1.075;
					//this.controls.GroundOffset   = 0;	//not use
				
					//this.light_.followTarget(pos,this.glscene.getObjectByName('player_moviemesh'));
				
					this.light_.followTarget(this.msmapp.mygamemodel.player.getPosition(),this.glscene.getObjectByName('player_moviemesh'));
					
					//this.css3Diframe.followTarget(player.getPosition(),this.glscene.getObjectByName('player_moviemesh'));
					
					var campos = this.cam.getWorldPosition();
					//this.css3Diframe.lookAt (this.cam.getWorldPosition());
					//this.css3Diframe.rotation.setFromRotationMatrix( this.cam.matrix );
					
					//this.css3Diframe.lookAt (player.getPosition());
					//this.css3Diframe.lookAt (this.cam.getWorldPosition());
					this.css3Diframe.lookAt (campos);
					
					
					//this.css3Diframe.quaternion.copy( this.cam.quaternion );
					this.css3Diframe.position.x = this.cam.position.x+800;
					
					//this.light_.followTarget(this.glscene,player.getPosition(),'player_moviemesh');
					//var pos = player.getPosition();
					//this.light.position.set(pos.x,10,pos.z-10);
					//this.light.target	= this.glscene.getObjectByName('player_moviemesh');

					//if(this.mysky)this.mysky.update(player.getPosition());
			
					//this.skyBox.position.copy( player.getPosition() );
					//this.skyBox.position.x = player.getPosition().x;
					//this.skyBox.position.z = player.getPosition().z;
				
					//this.mysp.update(time,this.glscene,this.params1,pos);	

					//if(this.i++>1)
					//{	this.i=0;
						//for (var key in window.otherPlayers) 
						//{	if (window.otherPlayers.hasOwnProperty(key)) 
						//	{	window.otherPlayers[key].lookAt(this.cam.getWorldPosition());
						//	}
						//}
						//////////
						//using ES7
						//Object.entries(window.otherPlayers).forEach(([key, value]) => window.otherPlayers[key].lookAt(this.cam.getWorldPosition()));
						Object.entries(window.otherPlayers).forEach(([key, value]) => window.otherPlayers[key].lookAt(campos));
						//////////
					//}	
				}					
			//}
		
			//this.obj.rotation.y += THREE.Math.degToRad(360 / (this.game.fps));
        	return [[this.glscene, this.cam],[this.cssscene, this.cam]];		
		}
		
		
		//render() 
		//{	var time = Date.now() * 0.00001;
		//	//var time = this.clock.getDelta();
		//
		//	this.requestId  = window.requestAnimationFrame(() => 
		//	{	this.render();
		//	});
		//	
		//	this.update(time);
		//	super.render();
		//}
		
		exit()
		{	for(var i=0;i<window.movieMaterial.length;i++)
			{	window.movieMaterial[i].exit();
			}
			super.exit();
		}
    }	
    
	///////////////////////////////////////////////////////////////////////
	class CApp extends MSMApp
	{ 	constructor(canvas="canvas",fps=30,width=window.innerWidth,height=window.innerHeight) 
		{	super(canvas,fps,width,height);
			super.enableShadow();
			
			//this.clock = new THREE.Clock();
			//this.oldpos = new THREE.Vector3();
			//this.isInit =false;
			//this.clumpy = new Clumpy();
			//this.counter = 0;
			
			//+//////////////////////////////////////////////////////////////+
			//| create objs which will exist as singleton across many scenes |
			//+//////////////////////////////////////////////////////////////+
			this.mygamemodel = new CGameModel(this);
			var xpos=50,ypos=0,zpos=50;
			this.mygamemodel.init(xpos,ypos,zpos);

			//+//////////////////////////////////////////////////////////////+
			
		}
	}    	

//////////////////////////////////////////////////////////////////////////

var myapp	= new CApp();
var s1		= new CScene1(myapp);

myapp.setScene(s1.init()).start();

