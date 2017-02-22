"use strict"
//import * as THREE from 'three.js'

		class CBase
		{	constructor(v)	{	this._	= v;}
			get_()			{	return this._;}
			set_(v)			{	this._	= v;}
		}
		
		class CScene extends CBase
		{	constructor()
			{	super(new THREE.Scene());

	        	this._.fog          	= new THREE.FogExp2( 0x9999ff, 0.00025 );

	        	return this;
			}		
		}
		
		class CContainer extends CBase
		{	constructor(name)
			{ 	super((name)? document.createElement(name):document.getElementById('container'));

				this._name				= (name)? name:'container';
          		document.body.appendChild( this._ );         	

          		return this;
			}
		}

		class CRenderer extends CBase
		{	constructor(width,height)
			{   super(new THREE.WebGLRenderer({ antialias: false,alpha: true }));

            	this._.setPixelRatio( window.devicePixelRatio || 1 );
            	this._.setSize( width,height);
        		this._.setClearColor( 0xffffff); 
            	this._.autoClearColor	= false;//true;//
            	this._.gammaInput   	= true;
            	this._.gammaOutput  	= true;

            	return this;
			}
			
			exit()
			{	this._.domElement.addEventListener('dblclick', null, false); //remove listener to render
    			this._.forceContextLoss();
    			this._.context			= null;
    			this._.domElement		= null;
    			this._					= null;  
			}
		}
		
		class CStat extends CBase
		{	constructor()
			{	super(new Stats());
	
				//var width 	= String(window.innerWidth) + "px";
  				var height	= String(window.innerHeight-50) + "px";
  
				this._.domElement.style.position	= 'absolute';
				this._.domElement.style.left 		= '5px';
				this._.domElement.style.top			= height;//'5px';
						
				return this;
			}
				
		}
		
		class CCamera extends CBase
		{	constructor(viewangle,ratio,near,far)
			{	super(new THREE.PerspectiveCamera(viewangle,ratio,near,far));

				return this;
			}
		}
		
		class CTexture extends CBase
		{	constructor()
			{	super(new THREE.TextureLoader());

				return this;
			}
		}
		
		class CThrottler extends CBase
		{	constructor(fps)
			{	super(new RafThrottler());
				this._.fps   	= fps;

				return this;
			}
		}		
		
		class CLight extends CBase
		{	constructor(scene)
			{	//this.light					= new THREE.DirectionalLight( 0xffffff);
				//this.light.position.set(1000,1000,1000).normalize();
				//this.scene.add(this.light);
            	/////////////////////////////////////////////////////////
            	// LIGHT
            	scene.add( new THREE.AmbientLight( 0xaaaaaa ) );

            	var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
				hemiLight.color.setHSL( 0.6, 1, 0.6 );
				hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
				hemiLight.position.set( 0, 500, 0 );
				scene.add( hemiLight );
				
				super(new THREE.DirectionalLight( 0xffffff, 1 ));
				this._.color.setHSL( 0.1, 1, 0.95 );
				this._.position.set( -1, 1.75, 1 );
				this._.position.multiplyScalar( 50 );
            	scene.add( this.light );
            	
            	return this;
			}            	
		}
		
		//////////////////////////////////////////////////////////////////////////
	    var texLoader_	= new CTexture();      
	    var texLoader   = texLoader_.get_();		
	    
	    //////////////////////////////////////////////////////////////////////////
		class CThreejs 
    	{   constructor(width=window.innerWidth,height=window.innerHeight,fps=30) 
        	{   this.requestId;
				this.controls;
				this.objects 				= [];

        		this.scene_					= new CScene();        	  	
        		this.scene					= this.scene_.get_();
        		
            	this.renderer_           	= new CRenderer(width,height);          	      
            	this.renderer           	= this.renderer_.get_();
            	
            	this.container_				= new CContainer();
            	this.container				= this.container_.get_();
			    this.container.appendChild( this.renderer.domElement );		
						
				this.cam_ 					= new CCamera( 62,width/height,1,1000 );						
				this.cam 					= this.cam_.get_();
				this.cam.position.z 		= 5;
				
				this.rafThrottler_	    	= new CThrottler(fps);
            	this.rafThrottler	    	= this.rafThrottler_.get_();
	               
				this.stats_              	= new CStat();
            	this.stats              	= this.stats_.get_();
				this.container.appendChild( this.stats.dom );           	        	
/*	        	
	        	this.onWindowResize 		= this.onWindowResize.bind(this);
	        	window.addEventListener( "resize", this.onWindowResize, false );

	        	//this.WindowResize 			= evt => this.onWindowResize(evt);
	        	//window.addEventListener( "resize", this.WindowResize, false );
	        	
*/	        		
	        	return this;
        	}
        	
        	createStdLight(isHelper=true)
        	{	this.light_          		= new CLight(this.scene);      
	        	this.light          		= this.light_.get_();
	        	
	        	if(isHelper)
	        	{	this.lighthelper_			= new CLightHelper(this.light);
	        		this.lighthelper			= this.lighthelper_.get_();
	        		this.scene.add(this.lighthelper);        		
	        	}	
        	}
        	
        	createHelper()
        	{	this.grid_					= new CGridHelper();
	        	this.grid					= this.grid_.get_();
	        	this.scene.add(this.grid);
	        	
	        	this.axis_					= new CAxisHelper();
	        	this.axis					= this.axis_.get_();
	        	this.scene.add(this.axis);
        	}
        	
			/////////////////////////////////////////////
        	createControl(mesh)
        	{	this.controls				= new THREE.PlayerControls( this.cam , mesh );
				this.controls.init();
        	}	
				        
        	update(delta)       	
        	{   this.stats.update();

   				this.objects.forEach((object) => {	object.update();});
			
				if ( this.controls )this.controls.update();

        	}
        	
        	render()            	{	this.renderer.render( this.scene, this.cam );}
        	resize(w,h)         	{   this.renderer.setSize(w,h);}
        
        	add(node)           	{   this.scene.add(node);}

			addMesh(mesh) 
			{	this.objects.push(mesh);
				this.scene.add(mesh.getMesh());
			}        	

        	
        	remove(node)        	{   this.scene.remove(node);}

        	setFPS(fps)         	{   this.rafThrottler.fps  = fps;}
        
			get camera()			{	return this.cam;}

			exit()
			{	window.cancelAnimationFrame(this.requestId);// Stop the animation
    			///////////////////////
				this.renderer_.exit();
          
    			///////////////////////
    			//this.projector = null;
    			this.scene		= null;
    			this.cam		= null;
    			this.controls	= null;
    			window.empty(this.container);
			}
			
			//////////////////////////
        	//onWindowResize(evt)	
        	onWindowResize()	
        	{	this.cam.aspect 	= window.innerWidth / window.innerHeight;
				this.cam.updateProjectionMatrix();
				this.renderer.setSize( window.innerWidth, window.innerHeight );
			}			
    	}
    	

    	