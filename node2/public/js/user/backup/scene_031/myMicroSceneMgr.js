"use strict"
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

//.___________________________________________________________________________.
//|###########################################################################|
//|                                                                           |
class MSMScene                                                              //|
//|___________________________________________________________________________|
//|###########################################################################|
//|                                                                           |
{ constructor(g,width,height) 
  { this.msmapp         = g;      
    this.width          = width;
    this.height         = height;
  
		this.controls;
		this.objects 				= [];
		
		//////////////////////////////////////////////////////
    this.raycaster        = new THREE.Raycaster();
    this.mouse            = new THREE.Vector2();
    this.mouseClick       = new THREE.Vector2();
    this.INTERSECTED;

		//////////////////////////////////////////////////////
		
    this.glscene_		    = new CGLScene();        	  	
   	this.glscene		    = this.glscene_._;
        		
 		this.cssscene_		  = new CCSSScene();        	  	
 		this.cssscene		    = this.cssscene_._;  
 		
		this.cam_ 			    = new CCamera( 62,this.width/this.height,0.1,1000 );						
		this.cam 			      = this.cam_._;
		this.cam.position.z = 5;
				
		this.createStdLight();    	
		
		window.addEventListener( "resize", this.onWindowResize.bind(this), false );
		window.dispatchEvent( new Event("resize") );
		
  	window.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
    window.addEventListener('click', this.onDocumentClick.bind(this), false);
		
  }
//|___________________________________________________________________________|
//|                                                                           |
  init(isHelper=false)
  {	
  }
//|___________________________________________________________________________|
//|                                                                           |
  add(node)           	
  { this.glscene.add(node);
  }
//|___________________________________________________________________________|
//|                                                                           |
	addMesh(mesh) 
	{	this.objects.push(mesh);
		this.glscene.add(mesh.getMesh());
	}
//|___________________________________________________________________________|
//|                                                                           |
  createStdLight(isHelper=false)
  {	this.light_          		= new CLight(this.glscene);      
		this.light          		= this.light_._;

	  if(isHelper)
	  {	this.lighthelper_			= new CLightHelper(this.light);
	   	this.lighthelper			= this.lighthelper_._;
	    this.glscene.add(this.lighthelper);        		
	  }	
	    
	  if(this.msmapp.isShadow)
	  {  	this.light_.enableShadow();
	  }
  }
//|___________________________________________________________________________|
//|                                                                           |
  createHelper()
  {	this.grid_					= new CGridHelper();
	  this.grid					  = this.grid_._;
	  this.glscene.add(this.grid);
	        	
	  this.axis_					= new CAxisHelper();
	  this.axis					  = this.axis_._;
	  this.glscene.add(this.axis);
  }
//|___________________________________________________________________________|
//|                                                                           |
	createControl(mesh)
  {	if(this.controls)return;
    this.controls				= new THREE.PlayerControls( this.cam , mesh );
		this.controls.init();
  }	
//|___________________________________________________________________________|
//|                                                                           |
  remove(node)        	
  { this.glscene.remove(node);
  }
//|___________________________________________________________________________|
//|                                                                           |
	camera()			
	{	return this.cam;
	}
//|___________________________________________________________________________|
//|                                                                           |
	exit()
	{	//this.projector  = null;
    this.glscene		  = null;
    this.cssscene		  = null;
    this.cam		      = null;
    this.controls	    = null;
	}
//|___________________________________________________________________________|
//|                                                                           |
	update() 
  { this.msmapp.update();
  
		this.objects.forEach((object) => {	object.update();});
			
		if ( this.controls )this.controls.update();
		
		//if(this.isShadow)
		//{	//if(this.light_)this.light_.update(this.glrenderer);
		//}
		
    return [];
  }
//|___________________________________________________________________________|
//|                                                                           |
  onWindowResize()	
  {	this.width        = window.innerWidth;
    this.height       = window.innerHeight;
    this.cam.aspect 	= this.width / this.height;
		this.cam.updateProjectionMatrix();

		this.msmapp.onWindowResize(this.width, this.height);
	}
//|___________________________________________________________________________|
//|                                                                           |
  onDocumentMouseMove() 
  { event.preventDefault();
    this.mouse.x = (event.clientX / window.innerWidth)  * 2 - 1;
    this.mouse.y =-(event.clientY / window.innerHeight) * 2 + 1;
  }
//|___________________________________________________________________________|
//|                                                                           |
  onDocumentClick() 
  { event.preventDefault();
    this.mouseClick.x = (event.clientX / window.innerWidth)  * 2 - 1;
    this.mouseClick.y =-(event.clientY / window.innerHeight) * 2 + 1;

    // figure out which objects in the scene were clicked
    this.raycaster.setFromCamera(this.mouseClick, this.cam);
    var intersects  = this.raycaster.intersectObjects(this.glscene.children);
    var degToRad    = Math.PI / 180;

    // make clicked things open/close with a tweened animation
    intersects.forEach(clickedObject => 
    { const name = clickedObject.object.name;
      //if(clickedObject.object.name!='ground_desert_mesh' && clickedObject.object.name!='player_moviemesh')
      //console.log(name);
      if(name!='ground_desert_mesh')
      { if(name!='player_moviemesh')
        { // is door open or closed already?
          //var targetAngle = clickedObject.object.rotation.y === -100 * degToRad ? 0 : -100 * degToRad;
          var targetAngle = clickedObject.object.rotation.y === -85 * degToRad ? 0 : -85 * degToRad;
          new TWEEN.Tween(clickedObject.object.rotation).easing(TWEEN.Easing.Circular.Out)
                                                        .to({ y: targetAngle}, 500)
                                                        .start();
        }                                                        
      }                                                        
    });
  }

  
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

//.___________________________________________________________________________.
//|###########################################################################|
//|                                                                           |
class MSMApp                                                                //|
//|___________________________________________________________________________|
//|###########################################################################|
//|                                                                           |
{ constructor(canvas, fps=30, width=window.innerWidth,height=window.innerHeight) 
  { //this.canvas         = document.getElementsByTagName(canvas)[0];
    this.fps              = fps   != null ? fps   : 60;
    this.width            = width != null ? width : null;
    this.height           = height!= null ? height: null;
    this.frameCount       = 0;
    this.frameSpan        = 1000 / this.fps;
    this.isRunning_       = false;
    
  	this.requestId        = null;
		this.isShadow         = false;    
    
		this.kb               = new THREEx.KeyboardState();
		
    //////////////////////////////////////////////////////////
   	this.glrenderer_      = new CGLRenderer(width,height);          	      
    this.glrenderer       = this.glrenderer_._;
            	
   	this.cssrenderer_     = new CCSSRenderer(width,height);          	      
    this.cssrenderer      = this.cssrenderer_._;

    this.container_				= new CContainer();
    this.container				= this.container_._;

    //this setup will make css3d clickable inside webgl        
		this.container.appendChild( this.cssrenderer.domElement );		
		this.cssrenderer.domElement.appendChild( this.glrenderer.domElement );	
		
    //////////////////////////////////////////////////////////
    this.renderer         = [this.glrenderer,this.cssrenderer];

		this.stats_           = new CStat();
  	this.stats            = this.stats_._;
  	this.container.appendChild( this.stats.dom );
  	
  	//////////////////////////////////////////////////////////
  	
  }
//|___________________________________________________________________________|
//|                                                                           |
  appendChild(domElement)
  { this.container.appendChild(domElement);
  }
//|___________________________________________________________________________|
//|                                                                           |
  getMaxAnisotropy()
  { return this.glrenderer.getMaxAnisotropy();
  }
//|___________________________________________________________________________|
//|                                                                           |
  start() 
  { //console.assert(!this.isRunning_); //use only in development mode
    
    this.isRunning_ = true;
    this.past       = Date.now();
    
    requestAnimationFrame(this.mainLoop = (function(_this) 
    { return function() 
      { if (!_this.isRunning_)  return;

        //this.requestId=requestAnimationFrame(this.mainLoop);
        requestAnimationFrame(this.mainLoop);
        
        var now = Date.now();
        if (now - this.past < _this.frameSpan) return;
        this.past = now;
        
        _this.frameCount++;
        var result = _this.currentScene.update();
        _this.renderer[0].clear();
        
        //////////////////////////////////////////////
        //var i, len,ref, sc;
        //for (i = 0, len = result.length; i < len; i++) 
        //{ sc = result[i];
        //  (ref = _this.renderer).render.apply(ref, sc);
        //}
        
        //////////////////////////////////////////////
        //in most cases only need 2 interations in for loop!
        //So, this ref is not needed.
        
        //var ref = _this.renderer;
        //var len = result.length;
        //for (var i = 0; i < len; i++) 
        
        for (var i = 0; i < result.length; i++) 
        { //sc = result[i];(ref = _this.renderer).render.apply(ref, sc);
          //(this.ref = _this.renderer).render.apply(this.ref,result[i]);
          //ref.render.apply(ref,result[i]);
          //ref[i].render.apply(ref[i],result[i]);
          
          _this.renderer[i].render.apply(_this.renderer[i],result[i]);
        }
        
        //_this.renderer[0].render.apply(_this.renderer[0],result[0]);
        //_this.renderer[1].render.apply(_this.renderer[1],result[1]);

        //////////////////////////////////////////////
        return null;  //why ?
        
      }.bind(this);
    }.bind(this))(this));
    
    return this;
  }
//|___________________________________________________________________________|
//|                                                                           |
  stop() 
  { this.isRunning_ = false;
    return this;
  }
//|___________________________________________________________________________|
//|                                                                           |
	exit()
	{	this.kb.destroy();

	  //window.cancelAnimationFrame(this.requestId);// Stop the animation
		this.glrenderer_.exit();
    window.empty(this.container);
	}  
//|___________________________________________________________________________|
//|                                                                           |
  isRunning() 
  { return this.isRunning_;
  }
//|___________________________________________________________________________|
//|                                                                           |
  setScene(sceneClassOrInstance) 
  { if (sceneClassOrInstance instanceof MSMScene) this.currentScene = sceneClassOrInstance;
    else                                          this.currentScene = new sceneClassOrInstance(this);
    
    return this;
  }
//|___________________________________________________________________________|
//|                                                                           |
  getScene()
  { return this.currentScene;
  }
//|___________________________________________________________________________|
//|                                                                           |
  enableShadow(isShadow=true,SHADOW_MAP_WIDTH=512,SHADOW_MAP_HEIGHT=512)
  {	this.isShadow = isShadow;
  	if(this.isShadow)this.glrenderer_.enableShadow(SHADOW_MAP_WIDTH,SHADOW_MAP_HEIGHT);
  }  
//|___________________________________________________________________________|
//|                                                                           |
  onWindowResize(w,h)         	
  { this.width    = w;
    this.height   = h;
    this.glrenderer.setSize(w,h);
  	this.cssrenderer.setSize(w,h);
  }  
//|___________________________________________________________________________|
//|                                                                           |
  update()
  { this.stats.update();
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
