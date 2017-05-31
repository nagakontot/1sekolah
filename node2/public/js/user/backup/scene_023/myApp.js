"use strict"

	///////////////////////////////////////////////////////////////////////
	class CApp extends MSMApp
	{ 	constructor(canvas="canvas",fps=30,width=window.innerWidth,height=window.innerHeight) 
		{	super(canvas,fps,width,height);
			super.enableShadow();
			
	        this.value=1;
	        this.toggle_counter=0;

			
			//this.clock = new THREE.Clock();
			//this.oldpos = new THREE.Vector3();
			//this.isInit =false;
			//this.clumpy = new Clumpy();
			//this.counter = 0;

			var s1		= new CScene1(this);
			var s2		= new CScene2(this);
			var s3		= new CScene3(this);
			var s4		= new CScene4(this);
			this.gscenes = [s1,s2,s3,s4];
			
			this.init();
			
		}
		
		init()
		{	//+-//////////////////////////////////////////////////////////////-+
			//| create objs which will exist as singleton across many scenes   |
			//+-//////////////////////////////////////////////////////////////-+
			//setTimeout(this.create_GameModel.bind(this),0);
			this.create_GameModel();
			
			/////////////////////////////////////////////////////////////////////
			for(var i=0;i<this.gscenes.length;i++)
			{	this.gscenes[i].init();
			}

			this.setScene(this.gscenes[0]).start();
			
		}

 	    toggle(scene_number)
	    {   //this.value=(this.value==1)?2:1;
	    	if(this.toggle_counter>=5)
			{	this.toggle_counter=0;
	    		this.setScene(this.getScene()).stop();
	    		
	    		////////////////////////////////////////////////////////////////
	    		//remove the actor on current scene
	    		this.getScene().remove( this.mygamemodel.player.moviemesh );
	    		
	    		//scene_number-1, 1 is offset bcause array start index 0, input is exact value
	    		//set new scene and add actor in it
	    		this.setScene(this.gscenes[scene_number-1]);
	    		this.getScene().add( this.mygamemodel.player.moviemesh );
	    		this.setScene(this.gscenes[scene_number-1]).start();

			}	
	    }
	    
		update()
		{	super.update();
		
			if(this.toggle_counter++>10000)this.toggle_counter=5;
				 if( this.kb.pressed("1") )	this.toggle(1);
			else if( this.kb.pressed("2") )	this.toggle(2);
			else if( this.kb.pressed("3") )	this.toggle(3);
			else if( this.kb.pressed("4") )	this.toggle(4);
				
			if(window.movieMaterial)
			{	//for(var i=0,len=window.movieMaterial.length;i<len;i++)
				//{	window.movieMaterial[i].update();
				//}
				
				var len = window.movieMaterial.length;
				while(len--) 
				{	window.movieMaterial[len].update();
				}
			}
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
var myapp	= new CApp();



