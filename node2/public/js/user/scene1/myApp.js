"use strict"

	///////////////////////////////////////////////////////////////////////
	class CmyApp extends CThreejs
	{ 	constructor(width=window.innerWidth,height=window.innerHeight,fps=30) 
		{	super(width,height,fps);
			
			this.mygame 		= new CGameModel(this);
		}
  
		init() 
		{	this.mygame.init();
			this.loadEnvironment();
			
			super.createHelper();

        	this.onWindowResize = this.onWindowResize.bind(this);
        	window.addEventListener( "resize", this.onWindowResize, false );
		}
  
		loadEnvironment() 
		{	//var sphere_geometry = new THREE.SphereGeometry( 1 );
			//var sphere_material = new THREE.MeshNormalMaterial();
			//var sphere			= new THREE.Mesh( sphere_geometry, sphere_material );
			//this.app.add( sphere );
			//this.app.addMesh(new CCube({width:2,height:2,depth:2,rotx:0.1,roty:0.1,rotz:0}));
			super.addMesh(new CCube({width:2,height:2,depth:2,rotx:0.1,roty:0.1,rotz:0}));
		}
		
		render() 
		{	this.requestId  = window.requestAnimationFrame(() => 
			{	this.render();
			});
   
    		super.update();
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

