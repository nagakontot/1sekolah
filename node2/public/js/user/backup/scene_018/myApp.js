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
			
			//+-//////////////////////////////////////////////////////////////-+
			//| create objs which will exist as singleton across many scenes   |
			//+-//////////////////////////////////////////////////////////////-+
			
			setTimeout(this.create_GameModel.bind(this),0);
			setTimeout(this.create_videostuff.bind(this),0);
		}

 	    toggle(scene_number)
	    {   //this.value=(this.value==1)?2:1;
	    	if(this.toggle_counter>=5)
			{	this.toggle_counter=0;
	    		this.setScene(this.getScene()).stop();
	    		scene_number--;	//array start with 0-index
	    		this.setScene(gscenes[scene_number]).start();
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
		{	this.mygamemodel = new CGameModel(this);
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

var s1		= new CScene1(myapp);
var s2		= new CScene2(myapp);
var s3		= new CScene3(myapp);
var s4		= new CScene4(myapp);

var gscenes = [s1,s2,s3,s4];

s1.init();
s2.init();
s3.init();
s4.init();

myapp.setScene(s1).start();


