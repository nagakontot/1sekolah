"use strict"
/*
	class CGeom
	{	constructor(size) 
		{	this.geometry 	= new THREE.BoxGeometry(size.width, size.height, size.depth);
			this.material 	= new THREE.MeshBasicMaterial({color: 0x00ff00});
    	    this.mesh 		= new THREE.Mesh(this.geometry, this.material);
		}
  
		update() 
		{	this.mesh.rotation.x += 0.1;
			this.mesh.rotation.y += 0.1;
		}
  
		getMesh() 
		{	return this.mesh;
		}
	}
*/
	class Cube
	{	constructor(size) 
		{	this.geometry 	= new THREE.BoxGeometry(size.width, size.height, size.depth);
			this.material 	= new THREE.MeshBasicMaterial({color: 0x00ff00});
    	    this.mesh 		= new THREE.Mesh(this.geometry, this.material);
		}
  
		update() 
		{	this.mesh.rotation.x += 0.1;
			this.mesh.rotation.y += 0.1;
		}
  
		getMesh() 
		{	return this.mesh;
		}
	}
	
/*
function loadEnvironment() 
{	var sphere_geometry = new THREE.SphereGeometry( 1 );
	var sphere_material = new THREE.MeshNormalMaterial();
	var sphere			= new THREE.Mesh( sphere_geometry, sphere_material );

	//scene.add( sphere );
	myapp.add( sphere );
}
*/


	///////////////////////////////////////////////////////////////////////
	class CmyApp extends CThreejs
	{ 	constructor(width=window.innerWidth,height=window.innerHeight,fps=30) 
		{	super(width,height,fps);
			
			this.mygame 		= new CGameModel(this);
		}
  
		init() 
		{	this.mygame.init();
			this.createHelper();
			
        	this.onWindowResize = this.onWindowResize.bind(this);
        	window.addEventListener( "resize", this.onWindowResize, false );
		}
  
		render() 
		{	this.requestId  = window.requestAnimationFrame(() => 
			{	this.render();
			});
   
			/*
			this.objects.forEach((object) => 
			{	object.update();
			});
			
			*/
    
    		//this.gpuPicker.needUpdate = true;
    		
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
//myapp.add(new Cube({width: 10,height: 10,depth: 10}));

myapp.init();
myapp.render();

