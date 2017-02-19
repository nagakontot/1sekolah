"use strict"

	///////////////////////////////////////////////////////////////////////
	class CmyApp extends CThreejs
	{ 	constructor(width=window.innerWidth,height=window.innerHeight,fps=30) 
		{	super(width,height,fps);
			
			this.mygame 		= new CGameModel(this);
		}
  
		init() 
		{	this.mygame.init();
			super.createHelper();

        	this.onWindowResize = this.onWindowResize.bind(this);
        	window.addEventListener( "resize", this.onWindowResize, false );
		}
  
		render() 
		{	this.requestId  = window.requestAnimationFrame(() => 
			{	this.render();
			});
   
    		this.update();
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

