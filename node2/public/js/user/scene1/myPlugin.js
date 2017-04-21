"use strict"

/////////////	
	class CText
	{	constructor(size) 
		{	shapes = THREE.FontUtils.generateShapes( "Hello world", {font: "helvetiker",weight: "bold",size: 10} );
		
			this.geometry 	= new THREE.ShapeGeometry( shapes );	//new THREE.BoxGeometry(size.width, size.height, size.depth);
			this.material   = new THREE.MeshBasicMaterial();		//new THREE.MeshPhongMaterial({specular: '#ffffff',color: '#00ff00',emissive: '#333333',shininess: 1 });
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

/////////////
	class CCube
	{	constructor(size) 
		{	this.geometry 	= new THREE.BoxGeometry(size.width, size.height, size.depth);
			//this.material 	= new THREE.MeshBasicMaterial({color: 0x00ff00});
			this.material   = new THREE.MeshPhongMaterial({specular: '#ffffff',color: '#00ff00',emissive: '#333333',shininess: 1 });
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

////////////////////////
	class CPlane
	{	constructor(size) 
		{	//////////////////////////////////////////////////
	        var floorTexture        = texLoader.load( 'images/dirt/dirt_COLOR.jpg' );
            floorTexture.wrapS      = floorTexture.wrapT = THREE.RepeatWrapping; 
            floorTexture.repeat.set( 100,100 );

	        var floorTextureBump    = texLoader.load( 'images/dirt/dirt_NRM.jpg' );
            var floorTextureOCC     = texLoader.load( 'images/dirt/dirt_OCC.jpg' );
            //var floorTextureSPEC    = texLoader.load( 'images/dirt/dirt_SPEC.jpg' );
	        //var floorTextureDISP    = texLoader.load( 'images/dirt/dirt_DISP.jpg' );

	        var params = 
	        {   map:                floorTexture,
                normalMap:          floorTextureBump,
                aoMap:              floorTextureOCC,         
                //specularMap:        floorTextureSPEC,
                //displacementMap:    floorTextureDISP,
                //displacementBias:   1,
                //displacementScale:  1,  
                
                //normalScale:        new THREE.Vector2( 0.618,0.618 ),
                //shininess:          1,//35.0,
                //color:              0xdddddd,
				//specular:           0x101010,
				//emissive:			'#333333'
                //side:               THREE.BackSide
            };
            
            var material			= new THREE.MeshLambertMaterial( params );
            //var material			= new THREE.MeshPhongMaterial( params );
            //var material			= new THREE.MeshPhongMaterial({specular: '#ffffff',color: '#aaaaaa',emissive: '#333333',shininess: 10 });
            
			//////////////////////////////////////////////////
			this.geometry 			= new THREE.PlaneBufferGeometry(size.width, size.height);
            
            //make 2nd uv for aomap to function
            var uvs = this.geometry.attributes.uv.array;
            this.geometry.addAttribute( 'uv2', new THREE.BufferAttribute( uvs, 2 ) );
			
			this.material 			= new THREE.MeshPhongMaterial( params );
			//this.material.color.setHSL( 0.095, 1, 0.618 );
			//this.material.color.setHSL( 0.392, 1, 0.618 );
			
    	    this.mesh 				= new THREE.Mesh(this.geometry, this.material);
    	    this.mesh.position.y 	= -1;
            this.mesh.rotation.x 	= -Math.PI / 2;
    	    
    	    //this.rotx		= size.rotx;
    	    //this.roty		= size.roty;
    	    //this.rotz		= size.rotz;
		}
  
		update() 
		{	//if(this.rotx)this.mesh.rotation.x += this.rotx;
			//if(this.roty)this.mesh.rotation.y += this.roty;
			//if(this.rotz)this.mesh.rotation.z += this.rotz;
		}
  
		getMesh() 
		{	return this.mesh;
		}
	}
	
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