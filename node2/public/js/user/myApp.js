"use strict"

	///////////////////////////////////////////////////////////////////////
	/*
	(function(global) 
	{	var is_worker = !this.document;
    	var script_path = is_worker ? null : (function() 
    	{	// append random number and time to ID
        	var id = (Math.random()+''+(+new Date)).substring(2);
        	document.write('<script id="wts' + id + '"></script>');
        	return document.getElementById('wts' + id).previousSibling.src;
    	})();
    	
    	function msg_parent(e) 
    	{	// event handler for parent -> worker messages
    	}
    	
    	function msg_worker(e) 
    	{	// event handler for worker -> parent messages
    	}
    
    	function new_worker() 
    	{	var w = new Worker(script_path);
        	w.addEventListener('message', msg_worker, false);
        	return w;
    	}
    
    	if (is_worker)global.addEventListener('message', msg_parent, false);

    	// put the rest of your library here
    	// to spawn a worker, use new_worker()
	})(this);	
	*/
	///////////////////////////////////////////////////////////////////////
	//class creation via preposition
	const CCreator = CBase => class extends CBase
	{	constructor(canvas,fps,width,height)
		{	super(canvas,fps,width,height);
		}
		
		async create_ShaderSkybox(glscene)
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

			//////////////////////////////////
			//var promise = new Promise((resolve, reject) =>
			var promise = await new Promise((resolve, reject) =>
			{	window.setTimeout(()=>
				{	//var size	= {radius:250,widthSegments:60,heightSegments:40};
					var size	= {radius:900,widthSegments:60,heightSegments:40};
					var mysky	= new CSKyboxGradient(size);
			
					if(mysky)
					{	glscene.add(mysky.getMesh());
						resolve(mysky);
					}
					else
					{	reject("mysky is undefined!");
					}
				},0);
			});
			return promise;    			
		}
		
		async create_Minecraft(glscene)
		{	var promise = await new Promise((resolve, reject) =>
			{	window.setTimeout(()=>
				{	var anis = this.getMaxAnisotropy();
					var mymc = new CMinecraft(100,100,anis);
					glscene.add(mymc.getMesh());
        			
					resolve(mymc);
				},0);
			});
			return promise;           				
		}
		
		async create_particle1(glscene)
		{	var promise = await new Promise((resolve, reject) =>
			{	window.setTimeout(()=>
				{	var params1=	[	[ [1.0,  0.2,  0.5], window.gTexLoader.load("textures/sprites/snowflake1.png"), 0.8],
										[ [0.95, 0.1,  0.5], window.gTexLoader.load("textures/sprites/snowflake2.png"), 0.5],
										[ [0.90, 0.05, 0.5], window.gTexLoader.load("textures/sprites/snowflake3.png"), 0.3],
										[ [0.85, 0,    0.5], window.gTexLoader.load("textures/sprites/snowflake4.png"), 0.2],
										[ [0.80, 0,    0.5], window.gTexLoader.load("textures/sprites/snowflake5.png"), 0.1]
									];
        						
        			var mysp		= new CSpritePoint(glscene,params1);
        			
					resolve({params1:params1,mysp:mysp});
				},0);
			});
			return promise;           	
		}
		
		async create_house1(pivot,glscene)
		{	//var pos = {x:83,y:-3,z:66};
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
			
        	//var pos3	= {x:6,		y:6.6,		z:85};		
        	//var rot3	= {x:0,		y:Math.PI,z:0};		
        	//var scale3  = {x:0.02,	y:0.02,		z:0.02};		
        	//this.house1 = new CLoadModel_WWObj2(this.pivot,this.glscene,'house1','models/house1/','house1.mtl','house1.obj',pos3,rot3,scale3);

        	//var pos4	= {x:6,		y:-25,		z:85};		
        	//var rot4	= {x:0,		y:Math.PI,  z:0};		
        	//var scale4  = {x:0.02,	    y:0.02,		z:0.02};		
        	//this.cs_italy = new CLoadModel_WWObj2(this.pivot,this.glscene,'cs_italy','models/cs_italy/','cs_italy.obj.mtl','cs_italy.obj',pos4,rot4,scale4);
			///////////////////////////////////////
        	//var pos			= {x:6,			y:-1.59,		z:85};		
        	//var rot			= {x:0.000355,	y:Math.PI,  z:-0.004};
        	//var scale		= {x:12,		y:12,		z:12};		
        	//this.buidling	= new CLoadModel_WWObj2(pivot,glscene,'building4','models/building4/','building4.obj.mtl','building4.obj',pos,rot,scale);
        	//return new CLoadModel_WWObj2(pivot,glscene,'building4','models/building4/','building4.obj.mtl','building4.obj',pos,rot,scale);
        	//////////////////////////////////////////
			var promise = await new Promise((resolve, reject) =>
			{	window.setTimeout(()=>
				{	var pos			= {x:6,			y:-1.59,		z:85};		
        			var rot			= {x:0.000355,	y:Math.PI,  z:-0.004};
        			var scale		= {x:12,		y:12,		z:12};		
        			//this.buidling	= new CLoadModel_WWObj2(pivot,glscene,'building4','models/building4/','building4.obj.mtl','building4.obj',pos,rot,scale);
					resolve(new CLoadModel_WWObj2(pivot,glscene,'building4','models/building4/','building4.obj.mtl','building4.obj',pos,rot,scale));
				},0);
			});
			return promise;        	
		}
		
		async create_castle01(pivot,glscene)
		{	//var pos			= {x:0,			y:-1,		z:0};		
        	//var rot			= {x:0,			y:Math.PI,  z:0};
        	//var scale		= {x:0.0025,			y:0.0025,		z:0.0025};		
        	//this.castle01	= new CLoadModel_WWObj2(pivot,glscene,'castle01','models/castle01/','castle01.obj.mtl','castle01.obj',pos,rot,scale);
        	//return new CLoadModel_WWObj2(pivot,glscene,'castle01','models/castle01/','castle01.obj.mtl','castle01.obj',pos,rot,scale);
        	//////////////////////////////////////////
			var promise = await new Promise((resolve, reject) =>
			{	window.setTimeout(()=>
				{	var pos			= {x:0,			y:-1,		z:0};		
        			var rot			= {x:0,			y:Math.PI,  z:0};
        			var scale		= {x:0.0025,			y:0.0025,		z:0.0025};		
        			//this.castle01	= new CLoadModel_WWObj2(pivot,glscene,'castle01','models/castle01/','castle01.obj.mtl','castle01.obj',pos,rot,scale);
        			
					resolve(new CLoadModel_WWObj2(pivot,glscene,'castle01','models/castle01/','castle01.obj.mtl','castle01.obj',pos,rot,scale));
				},0);
			});
			return promise;           	
		}
		
		async create_building1(glscene)
		{	//var pos			= {x:39.75,		y:-24.05,		z:-24.325};		
        	//var rot			= {x:0,			y:0,		z:0};
        	//var scale		= {x:1,			y:1,		z:1};		
        	//this.building1	= new CLoadModel_WWObj2(this.pivot,this.glscene,'building1','models/building1/','building1.mtl','building1.obj',pos,rot,scale);
        	
        	//this.building1  = new CLoadModel_Obj(glscene,'models/building1/','building1.mtl','building1.obj',pos,scale);
        	//return new CLoadModel_Obj(glscene,'models/building1/','building1.mtl','building1.obj',pos,scale);
        	//////////////////////////////////////////
			var promise = await new Promise((resolve, reject) =>
			{	window.setTimeout(()=>
				{	var pos			= {x:39.75,		y:-24.05,		z:-24.325};		
        			var rot			= {x:0,			y:0,		z:0};
        			var scale		= {x:1,			y:1,		z:1};		
        			//this.building1	= new CLoadModel_WWObj2(this.pivot,this.glscene,'building1','models/building1/','building1.mtl','building1.obj',pos,rot,scale);
        			//this.building1  = new CLoadModel_Obj(glscene,'models/building1/','building1.mtl','building1.obj',pos,scale);
        			//return new CLoadModel_Obj(glscene,'models/building1/','building1.mtl','building1.obj',pos,scale);
        			
					resolve(new CLoadModel_Obj(glscene,'models/building1/','building1.mtl','building1.obj',pos,scale));
				},0);
			});
			return promise;           	
		}

		async create_building3(glscene)
		{	//var pos			= {x:0,			y:-1.99,	z:0};		
        	//var rot			= {x:0,			y:0,		z:0};
        	//var scale		= {x:1,			y:1,		z:1};		
        	//this.building3	= new CLoadModel_WWObj2(this.pivot,this.glscene,'building3','models/building3/','building3.mtl','building3.obj',pos,rot,scale);
        	//this.building3  = new CLoadModel_Obj(glscene,'models/building3/','building3.mtl','building3.obj',pos,scale);
        	//return new CLoadModel_Obj(glscene,'models/building3/','building3.mtl','building3.obj',pos,scale);
        	//////////////////////////////////////////
			var promise = await new Promise((resolve, reject) =>
			{	window.setTimeout(()=>
				{	var pos			= {x:0,			y:-1.99,	z:0};		
        			var rot			= {x:0,			y:0,		z:0};
        			var scale		= {x:1,			y:1,		z:1};		
        			//this.building3	= new CLoadModel_WWObj2(this.pivot,this.glscene,'building3','models/building3/','building3.mtl','building3.obj',pos,rot,scale);
        			//this.building3  = new CLoadModel_Obj(glscene,'models/building3/','building3.mtl','building3.obj',pos,scale);
        			//return new CLoadModel_Obj(glscene,'models/building3/','building3.mtl','building3.obj',pos,scale);
        			
					resolve(new CLoadModel_Obj(glscene,'models/building3/','building3.mtl','building3.obj',pos,scale));
				},0);
			});
			return promise;           	
		}
		
		create_pivot(scene)
		{	var pivot			= new THREE.Object3D();
			pivot.name 			= 'Pivot';
			scene.add( pivot );
			return pivot;
		}
		
		create_blocker()
		{	this.blocker = document.getElementById( 'blocker' );
			this.blocker.style.display = 'none';
			document.addEventListener( 'mousedown', ()=> { this.blocker.style.display = ''; });		//,     false );
			document.addEventListener( 'mouseup',   ()=> { this.blocker.style.display = 'none'; });	//, false );
		}
		
		async create_plane(name='ground_desert_mesh',x=1000,y=1000,floorTexture=null,floorTextureBump=null,floorTextureOCC=null)
		{	var promise = await new Promise((resolve, reject) =>
			{	window.setTimeout(()=>
				{	var anis = this.getMaxAnisotropy();
					//super.addMesh(new CPlane({width:1000,height:1000},anis));	
					//super.addMesh(new CPlane(name,{width:x,height:y},anis,floorTexture,floorTextureBump,floorTextureOCC));	
					var plane = new CPlane(name,{width:x,height:y},anis,floorTexture,floorTextureBump,floorTextureOCC);
					resolve(plane);
				},0);
			});
			return promise;
		}
		
		async create_css3Diframe_rchat(cssscene,url="https://rchat.1sekolah.xyz",x=600,y=120,z=600,ry=-Math.PI/2) 
		{	var promise = await new Promise((resolve, reject) =>
			{	window.setTimeout(()=>
				{	//var css3Diframe = new CElement(url,600,120,600, -Math.PI/2 );
					var css3Diframe = new CElement(url,x,y,z,ry);
	    			var cssgroup    = new THREE.Group();//new THREE.Object3D();//
					cssgroup.add( css3Diframe );
					cssscene.add( cssgroup );		
					resolve(css3Diframe);
				},0);
			});
			return promise;
		}

	    create_css3Diframe_rchat1()
	    {	//this.css3Diframe = new CElement("https://rchat.1sekolah.xyz",600,120,600, -Math.PI/2 );
	    	this.css3Diframe = new CElement("https://rchat.1sekolah.xyz/channel/lobby",600,100,10, -Math.PI/2 );
	    
			//this.glPlane2D	 = new CPlane2(600,120,  new THREE.Vector3(600,120,600),new THREE.Vector3(0,-Math.PI/2,0));
			this.glPlane2D	 = new CPlane2(600,120,  new THREE.Vector3(600,100,10),new THREE.Vector3(0,-Math.PI/2,0));
			this.glscene.add( this.glPlane2D );
			
	    	this.cssgroup    = new THREE.Group();//new THREE.Object3D();//
			this.cssgroup.add( this.css3Diframe );

			this.cssscene.add( this.cssgroup );
	    }

	    create_css3Diframe_rchat2(cssscene)
	    {	//this.css3Diframe = new CElement("https://rchat.1sekolah.xyz",600,120,600, -Math.PI/2 );
	    	//this.cssgroup    = new THREE.Group();//new THREE.Object3D();//
			//this.cssgroup.add( this.css3Diframe );
			//this.cssscene.add( this.cssgroup );
			
			var css3Diframe = new CElement("https://rchat.1sekolah.xyz",600,120,600, -Math.PI/2 );
	    	var cssgroup    = new THREE.Group();//new THREE.Object3D();//
			cssgroup.add( this.css3Diframe );
			cssscene.add( this.cssgroup );
			
			return css3Diframe;
	    }		
	}
	
	///////////////////////////////////////////////////////////////////////
	class CApp extends CCreator(MSMApp)
	{ 	constructor(canvas="canvas",fps=30,width=window.innerWidth,height=window.innerHeight) 
		{	super(canvas,fps,width,height);
			super.enableShadow();
			
	        this.value			= 1;
	        this.toggle_counter	= 0;
			this.scene_number	= 0;
			
			//this.clock = new THREE.Clock();
			//this.oldpos = new THREE.Vector3();
			//this.isInit =false;
			//this.clumpy = new Clumpy();
			//this.counter = 0;

			this.gscenes = [new CScene1(this),
							new CScene2(this),
							new CScene3(this),
							new CScene4(this),
							new CScene5(this),
							new CScene6(this),
							new CScene7(this),
							new CScene8(this),
							new CScene9(this),
							new CScene10(this),
							new CScene11(this),
							new CScene12(this),
							new CScene13(this),
							new CScene14(this)];

			this.init();
			
		}
		
		init()
		{	//+-//////////////////////////////////////////////////////////////-+
			//| create objs which will exist as singleton across many scenes   |
			//+-//////////////////////////////////////////////////////////////-+
			var anis = super.getMaxAnisotropy();

			this.floorTexture      		 = window.gTexLoader.load( 'images/dirt/dirt_COLOR.jpg' );
	        this.floorTexture.wrapS      = this.floorTexture.wrapT = THREE.RepeatWrapping; 
    	    this.floorTexture.repeat.set( 200,200 );
    		this.floorTexture.magFilter	= THREE.NearestFilter;
			this.floorTexture.minFilter	= THREE.LinearMipMapLinearFilter;
   			this.floorTexture.anisotropy = anis;//maxAnisotropy;
	        
	        this.floorTextureBump    	= window.gTexLoader.load( 'images/dirt/dirt_NRM.jpg' );
	        this.floorTextureOCC     	= window.gTexLoader.load( 'images/dirt/dirt_OCC.jpg' );

			this.doortex 				= window.gTexLoader.load( 'images/house/door004.jpg' );
			
			//setTimeout(this.create_GameModel.bind(this),0);
			this.create_blocker();
			this.create_GameModel();
			
			/////////////////////////////////////////////////////////////////////
			for(var i=0;i<this.gscenes.length;i++)
			{	this.gscenes[i].init();
			}

			//this.scene_number=0 //-> start with lobby!
			this.setScene(this.gscenes[this.scene_number]).start();
			
		}

 	    toggleScene(scene_number)
	    {   //anti-spammer for input
	    	if(this.toggle_counter>=5)
			{	this.toggle_counter=0;
			
				//if( JSON.stringify(scene_number) != JSON.stringify(this.scene_number) )
				if( scene_number!= this.scene_number && this.scene_number>=0 && this.scene_number<this.gscenes.length)
	    		{	////////////////////////////////////////////////////////////////
		    		//remove the actor on current scene
		    		this.setScene(this.getScene()).stop();
	    			this.getScene().remove( this.mygamemodel.player.moviemesh );

	    			this.scene_number=scene_number;
	    			//set new scene and add actor in it
		    		this.setScene(this.gscenes[scene_number]);
		    		this.getScene().add( this.mygamemodel.player.moviemesh );
	    			this.setScene(this.gscenes[scene_number]).start();
					////////////////////////////////////////////////////////////////
	    			
	    			//console.log("(JSON.stringify(rot) != JSON.stringify(window.rot))");
	    			fbRef.child( "Players/" + playerID + "/zone" ).update({	map:scene_number});	    	
	    			
	    		}				
				////////////////////////////////////////////////////////////////
			}	
	    }
	    
		update()
		{	super.update();
		
			if(this.toggle_counter++>10000)this.toggle_counter=5;
			if( this.kb.pressed("esc") )		this.toggleScene(0);
			
			//	 if( this.kb.pressed("0") )		this.toggleScene(0);
			//else if( this.kb.pressed("1") )	this.toggleScene(1);
			//else if( this.kb.pressed("2") )	this.toggleScene(2);
			//else if( this.kb.pressed("3") )	this.toggleScene(3);
				
			if(window.movieMaterial)
			{	for(var i=0,len=window.movieMaterial.length;i<len;i++)
				{	window.movieMaterial[i].update();
				}
				
				//var len = window.movieMaterial.length;
				//while(len--) 
				//{	window.movieMaterial[len].update();
				//}
			}
		}

		updateOtherPlayers(campos)
		{	Object.entries(window.otherPlayers).forEach(([key, value]) => 
			{	//if(value.zone!=this.scene_number)
				
				window.otherPlayers[key].lookAt(campos);
				//console.log("key="+key+", value.zone="+value.zone);
			});
		}
		
		exit()
		{	super.exit();
		
			if(window.movieMaterial)
			{	for(var i=0;i<window.movieMaterial.length;i++)
				{	window.movieMaterial[i].exit();
				}
			}
		}

		create_GameModel()
		{	this.create_videostuff();
		
			this.mygamemodel = new CGameModel(this);
			var xpos=50,ypos=0,zpos=50;
			this.mygamemodel.init(xpos,ypos,zpos);
		}
		
		//+-//////////////////////////////////////////////////////////////-+
	    create_videostuff()
	    {	var videos = [	'video/baby_1.webm',
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
	    }		
	}    	

//////////////////////////////////////////////////////////////////////////

window.setTimeout(()=>{window.myapp	= new CApp();},0);



