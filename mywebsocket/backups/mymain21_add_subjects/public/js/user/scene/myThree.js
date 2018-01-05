"use strict"
//import * as THREE from 'three.js'

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
window.gTexLoader   		= new THREE.TextureLoader();
//window.gTexLoader.setCrossOrigin('');
window.gTexLoader.setCrossOrigin( 'anonymous' );

//Physijs.scripts.worker		= '../../../js/lib/extjs/physijs_worker.js';
//Physijs.scripts.ammo		= '../../../js/lib/extjs/ammo.js';
	
/*	    
class CThreejs 
{   constructor(width=window.innerWidth,height=window.innerHeight,fps=30) 
  	{	this.screenW				= width;
  		this.screenH				= height;
  		this.requestId;
		this.controls;
		this.objects 				= [];
		this.isShadow               = false;
   		this.glscene_				= new CGLScene();        	  	
   		this.glscene				= this.glscene_.get_();
        		
       	this.glrenderer_           	= new CGLRenderer(width,height);          	      
        this.glrenderer           	= this.glrenderer_.get_();
            	
   		this.cssscene_				= new CCSSScene();        	  	
   		this.cssscene				= this.cssscene_.get_();
       	this.cssrenderer_           = new CCSSRenderer(width,height);          	      
        this.cssrenderer           	= this.cssrenderer_.get_();
        this.container_				= new CContainer();
        this.container				= this.container_.get_();
        
		//this.container.appendChild( this.glrenderer.domElement );		
		//this.container.appendChild( this.cssrenderer.domElement );		
		this.container.appendChild( this.cssrenderer.domElement );		
		this.cssrenderer.domElement.appendChild( this.glrenderer.domElement );		
		
		//this.cam_ 					= new CCamera( 62,width/height,1,1000 );						
		this.cam_ 					= new CCamera( 62,width/height,1,5000 );						
		this.cam 					= this.cam_.get_();
		this.cam.position.z 		= 5;
				
		this.rafThrottler_	    	= new CThrottler(fps);
        this.rafThrottler	    	= this.rafThrottler_.get_();
	               
		this.stats_              	= new CStat();
        this.stats              	= this.stats_.get_();
		this.container.appendChild( this.stats.dom );           	        	
		//this.onWindowResize 		= this.onWindowResize.bind(this);
	    //window.addEventListener( "resize", this.onWindowResize, false );
	    //this.WindowResize 			= evt => this.onWindowResize(evt);
	    //window.addEventListener( "resize", this.WindowResize, false );
	        	
       	return this;
    }
    
    enableShadow(isShadow=true,SHADOW_MAP_WIDTH=512,SHADOW_MAP_HEIGHT=512)
    {	this.isShadow = isShadow;
    	if(this.isShadow)this.glrenderer_.enableShadow(SHADOW_MAP_WIDTH,SHADOW_MAP_HEIGHT);
    }
    
    createStdLight(isHelper=false)
    {	this.light_          		= new CLight(this.glscene);      
		this.light          		= this.light_.get_();
	        	
	    if(isHelper)
	    {	this.lighthelper_			= new CLightHelper(this.light);
	    	this.lighthelper			= this.lighthelper_.get_();
	        this.glscene.add(this.lighthelper);        		
	    }	
	    
	    if(this.isShadow)
	    {  	this.light_.enableShadow();
	    }
    }
        	
    createHelper()
    {	this.grid_					= new CGridHelper();
	    this.grid					= this.grid_.get_();
	    this.glscene.add(this.grid);
	        	
	    this.axis_					= new CAxisHelper();
	    this.axis					= this.axis_.get_();
	    this.glscene.add(this.axis);
    }
        	
	createControl(mesh)
    {	this.controls				= new THREE.PlayerControls( this.cam , mesh );
		this.controls.init();
    }	
				        
    update(delta)       	
    {   this.stats.update();
		this.objects.forEach((object) => {	object.update();});
			
		if ( this.controls )this.controls.update();
		
		//if(this.isShadow)
		//{	//if(this.light_)this.light_.update(this.glrenderer);
		//}
    }
        	
    render()            	
    {	this.glrenderer.clear();
    	this.glrenderer.render (this.glscene,  this.cam );
    	this.cssrenderer.render(this.cssscene, this.cam);
    }
    
    resize(w,h)         	
    {   this.glrenderer.setSize(w,h);
    	this.cssrenderer.setSize(w,h);
    }
        
    add(node)           	
    {   this.glscene.add(node);
    }
	addMesh(mesh) 
	{	this.objects.push(mesh);
		this.glscene.add(mesh.getMesh());
	}        	
    remove(node)        	
    {   this.glscene.remove(node);
    }
    
    setFPS(fps)         	
    {   this.rafThrottler.fps  = fps;
    }
        
	get camera()			
	{	return this.cam;
	}
	exit()
	{	window.cancelAnimationFrame(this.requestId);// Stop the animation
		this.glrenderer_.exit();
		
 		//this.projector = null;
    	this.glscene		= null;
    	this.cam		= null;
    	this.controls	= null;
    	window.empty(this.container);
	}
			
    //onWindowResize(evt)	
    onWindowResize()	
    {	this.cam.aspect 	= window.innerWidth / window.innerHeight;
		this.cam.updateProjectionMatrix();
		//this.glrenderer.setSize( window.innerWidth, window.innerHeight );
		this.resize(window.innerWidth, window.innerHeight);   	
	}			
}
*/    	
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
		class CBase
		{	constructor(v)	{	this.base = v;		}
			get _()			{	return this.base;	}
			set _(v)		{	this.base = v;  	}
		}
		
		class CContainer extends CBase
		{	constructor(name)
			{ 	super((name)? document.createElement(name):document.getElementById('container'));
				
				this._name				= (name)? name:'container';
				
				//if (!('transferControlToOffscreen' in this._))throw new Error('webgl in worker unsupported');
				//else console.log('huray webgl in worker supported!!!');
				//this.offscreen = this._.transferControlToOffscreen();
				
          		document.body.appendChild( this._ );         	

          		//return this;
			}
		}
		
		class CCSSScene extends CBase
		{	constructor()
			{	super(new THREE.Scene());
	        	//return this;
			}		
		}

		class CGLScene extends CBase
		{	constructor()
			{	super(new THREE.Scene());
				//super(new Physijs.Scene({ reportsize: 50, fixedTimeStep: 1 / 30 }));
				//super(new Physijs.Scene());

	        	
	        	//this._.fog          	= new THREE.FogExp2( 0x000000, 0.0008 );;//new THREE.FogExp2( 0x9999ff, 0.00025 );
				//this._.fog				= new THREE.Fog( 0x59472b, 1000,3000);	        	
				//this._.fog				= new THREE.Fog( 0xffffff, 0.015, 300 );
				
				//this._.fog				= new THREE.Fog( 0xffffff, 125, 250 );
				//this._.fog				= new THREE.Fog( 0xaaccff,2000,5000);
	        	
	        	//this._.fog          	= new THREE.FogExp2( 0xffffff, 0.01 );//new THREE.FogExp2( 0x9999ff, 0.00025 );
	        	
	        	//this._.setGravity(new THREE.Vector3( 0, -10, 0 ));
	        	//this._.setGravity(new THREE.Vector3( 0, -0.02,0 ));
			    
			    //this._.addEventListener('update',
				//						function() 
				//						{	//applyForce();
				//							this._.simulate( undefined, 1 );
				//							//physics_stats.update();
				//						}.bind(this));
														
	        	//return this;
			}		
		}
		
		class CCSSRenderer extends CBase
		{	constructor(width,height)
			{   super(new THREE.CSS3DRenderer());
				//super(new THREE.CSS3DRenderer({ antialias: false,alpha: true }));
			

    			this._.setSize( width,height);
    			//this._.blending = THREE.AdditiveBlending;

            	this._.domElement.style.position		= 'absolute';
    			this._.domElement.style.zIndex			= -1;//1;//
    			this._.domElement.style.top 			= 0;
            	//return this;
			}
		}
		
		class CGLRenderer extends CBase
		{	constructor(width,height)
			{   super(new THREE.WebGLRenderer({ antialias: false,alpha: true }));

            	this._.setPixelRatio( window.devicePixelRatio || 1 );
            	this._.setSize( width,height);
        		//this._.setClearColor( 0xffffff); 
        		//this._.setClearColor( 0x000000, 0 ); // the default
            	this._.autoClearColor	= false;//true;//
            	this._.gammaInput   	= true;
            	this._.gammaOutput  	= true;
            	
            	this._.domElement.style.position		= 'absolute';
    			this._.domElement.style.zIndex			= 1;//-1;//
    			this._.domElement.style.top 			= 0;
    			this._.domElement.style.pointerEvents	= 'none';
    			
            	//return this;
			}
			
			exit()
			{	this._.domElement.addEventListener('dblclick', null, false); //remove listener to render
    			this._.forceContextLoss();
    			this._.context			= null;
    			this._.domElement		= null;
    			this._					= null;  
			}
			
			//enableShadow(SHADOW_MAP_WIDTH=1024,SHADOW_MAP_HEIGHT=1024)
			enableShadow(SHADOW_MAP_WIDTH=512,SHADOW_MAP_HEIGHT=512)
			{	this.SHADOW_MAP_WIDTH	= SHADOW_MAP_WIDTH;
				this.SHADOW_MAP_HEIGHT	= SHADOW_MAP_HEIGHT;

				this._.shadowMap.enabled = true;
				this._.shadowMap.type	 = THREE.BasicShadowMap;
				//this._.shadowMap.type	 = THREE.PCFShadowMap;	

            	//http://stackoverflow.com/questions/20463247/three-js-doublesided-material-doesnt-cast-shadow-on-both-sides-of-planar-parame
            	//this._.shadowMapCullFace = THREE.CullFaceBack;	//make plane cast both side!!!!
            	//this._.shadowMapCullFace = THREE.CullFaceNone;
            	//this._.physicallyBasedShading = true;
            	
            	//this._.setFaceCulling(THREE.CullFaceNone);
    			//this._.shadowMapCullFace = THREE.CullFaceNone;
    			//this._.shadowMapCullFrontFaces = THREE.CullFaceNone;//false;
			}
		}
		
		class CStat extends CBase
		{	constructor()
			{	super(new Stats());
	
				//var width 	= String(window.innerWidth) + "px";
  				//var height	= String(window.innerHeight-50) + "px";
  				//var height		= '0px';
  
				this._.domElement.style.position	= 'absolute';
				this._.domElement.style.left 		= '1px';	//'5px';
				this._.domElement.style.top			= '1px';	//height;	//'5px';
						
				//return this;
			}
		}
		
		class CCamera extends CBase
		{	constructor(viewangle,ratio,near,far)
			{	super(new THREE.PerspectiveCamera(viewangle,ratio,near,far));

				//return this;
			}
		}
		
		class CThrottler extends CBase
		{	constructor(fps)
			{	super(new RafThrottler());
				this._.fps   	= fps;

				//return this;
			}
		}		
		
		class CLight extends CBase
		{	constructor(scene)
			{	//////////////////////////////////////////////////
				super(new THREE.DirectionalLight( 0xffffff, 1 ));
				this._.name = 'DirLight';
				this._.position.set( 0, 10, -10 );
				scene.add( this._ );
				
				//scene.add( new THREE.AmbientLight( 0xaaaaaa ) );
				//scene.add( new THREE.AmbientLight( 0xffffff) );
				//scene.add( new THREE.AmbientLight( 0xffffff, 0.3 ) );
				scene.add( new THREE.AmbientLight( 0xffffff, 0.1 ) );

				//var hemisphereLight = new THREE.HemisphereLight(0xffffff,0xff0000,1);
				var hemisphereLight = new THREE.HemisphereLight(0xffffff,0x11aaff,1);
				hemisphereLight.position.set(1, 1, 1).normalize();
				scene.add(hemisphereLight);

            	//super(new THREE.DirectionalLight( 0xffffff, 1 ));
            	//this._.position.set( 0, 1500, 1000 );
				//this._.target.position.set( 0, 0, 0 );

				//this._.position.set( 250, 500, 0 ).normalize();//( -1, 1.75, 1 );
				//this._.position.multiplyScalar( 50 );
				//this._.name = "dirlight";
				
				//////////////////////////////////////////////////
            	
            	scene.add( new THREE.CameraHelper( this._.shadow.camera ) );
        	
            	//return this;
			}            	
			
			enableShadow(SHADOW_MAP_WIDTH=512,SHADOW_MAP_HEIGHT=512)
			{	this._.castShadow = true;
				//this._.shadow.camera.near	=  8;//1
				//this._.shadow.camera.far	=  12;//10;
				this._.shadow.camera.near	=  1
				this._.shadow.camera.far	=  20;//10;
				this._.shadow.camera.right	=  15;
				this._.shadow.camera.left	= -15;
				this._.shadow.camera.top	=  15;
				this._.shadow.camera.bottom = -15;
				this._.shadow.mapSize.width =  SHADOW_MAP_WIDTH;
				this._.shadow.mapSize.height=  SHADOW_MAP_HEIGHT;
				
				this._.shadow.bias			=  -0.01;//-0.0001;		

				//scene.add( new THREE.CameraHelper( this._.shadow.camera ) );
				//this.createHUD(SHADOW_MAP_WIDTH,SHADOW_MAP_HEIGHT); 
			}
			
			/*
			createHUD(SHADOW_MAP_WIDTH=1024,SHADOW_MAP_HEIGHT=1024) 
			{	this.dirLightShadowMapViewer = new THREE.ShadowMapViewer( this._ );
				this.dirLightShadowMapViewer.position.x = 10;
				this.dirLightShadowMapViewer.position.y = 10;
				this.dirLightShadowMapViewer.size.width = 256;
				this.dirLightShadowMapViewer.size.height = 256;
				this.dirLightShadowMapViewer.update(); //Required when setting position or size directly
			}			
			*/
			
			followTarget(pos,target)
			{	this._.position.set(pos.x,pos.y+10,pos.z-10);
				this._.target	= target;
			}
			
			update(renderer)
			{	//if(this.lightShadowMapViewer)this.lightShadowMapViewer.render( renderer );
				//if(this.dirLightShadowMapViewer&&renderer)this.dirLightShadowMapViewer.render( renderer );
			}
		}
		
