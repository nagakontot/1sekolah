"use strict"


/*
class Cube 
{	constructor(size) 
	{	this.geometry = new THREE.BoxGeometry(size.width, size.height, size.depth);
    	this.material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
	}
  
	update() 
	{	this.mesh.rotation.x += 0.1;
    	this.mesh.rotation.y += 0.1;
	}
  
	getMesh() 
	{	return this.mesh;
	}
}

class Application {
  constructor() {
    this.objects = [];
    this.createScene();
  }
  
  createScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    this.camera.position.z = 20;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    
    this.render();
  }
  
  render() {
    requestAnimationFrame(() => {
      this.render();
    });
    
    this.objects.forEach((object) => {
      object.update();
    });
    
    this.renderer.render(this.scene, this.camera);
  }
  
  add(mesh) {
    this.objects.push(mesh);
    this.scene.add(mesh.getMesh());
  }
}

let app = new Application();
app.add(new Cube({
  width: 10,
  height: 10,
  depth: 10
}));
*/
/////////////
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
	class CCube
	{	constructor(size) 
		{	this.geometry 	= new THREE.BoxGeometry(size.width, size.height, size.depth);
			this.material 	= new THREE.MeshBasicMaterial({color: 0x00ff00});
    	    this.mesh 		= new THREE.Mesh(this.geometry, this.material);
    	    
    	    this.rotx		= size.rotx;
    	    this.roty		= size.roty;
    	    this.rotz		= size.rotz;
		}
  
		update() 
		{	if(this.rotx)this.mesh.rotation.x += this.rotx;
			if(this.roty)this.mesh.rotation.y += this.roty;
			if(this.rotz)this.mesh.rotation.z += this.rotz;
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

////////////////////////////////////////////////////////
	class CGridHelper extends CBase
	{	constructor()
		{	super(new THREE.GridHelper ( 200 , 50 )); // size, step
    		//this.scene.add ( this.gridHelper );
    		return this;
		}
	}
		
	class CAxisHelper extends CBase
	{	constructor()
		{	super(new THREE.AxisHelper ( 200 , 50 ));
    		//this.scene.add ( this.axisHelper );    			
    		return this;
		}
	}
		
	class CLightHelper extends CBase
	{	constructor(light)
		{	super(new THREE.DirectionalLightHelper ( light , 20 ));
    		//this.scene.add ( this.lightHelper );
    		return this;
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
	    return this;
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