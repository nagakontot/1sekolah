/*
three.msm.js - Micro Scene Manager for Three.js
Version 0.1.0
(C) 2013 Shintaro Seki
MIT License
 */

'use strict';

class MSMGame
{ constructor(canvas, fps=30, width=800, height=600) 
  { //this.canvas     = document.getElementsByTagName(canvas)[0];
    this.fps        = fps   != null ? fps   : 60;
    this.width      = width != null ? width : null;
    this.height     = height!= null ? height: null;
    this.frameCount = 0;
    this.frameSpan  = 1000 / this.fps;
    
    /*
    this.renderer_gl= new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer_gl.setSize(this.width, this.height);
    this.renderer_gl.setClearColor(0xFFFFFF, 1);
    this.renderer_gl.autoClear = false;
    */
    
    this.isRunning_       = false;
    //////////////////////////////////////////////////////////
   	this.glrenderer_      = new CGLRenderer(width,height);          	      
    this.glrenderer       = this.glrenderer_.get_();
            	
   	this.cssrenderer_     = new CCSSRenderer(width,height);          	      
    this.cssrenderer      = this.cssrenderer_.get_();    

    this.container_				= new CContainer();
    this.container				= this.container_.get_();
        
		//this.container.appendChild( this.glrenderer.domElement );
		//this.container.appendChild( this.cssrenderer.domElement );

		this.container.appendChild( this.cssrenderer.domElement );		
		this.cssrenderer.domElement.appendChild( this.glrenderer.domElement );	
		
    //////////////////////////////////////////////////////////
    this.renderer         = [this.glrenderer,this.cssrenderer];
    
    return this;
  }

  start() 
  { console.assert(!this.isRunning_);
    
    this.isRunning_ = true;
    this.past       = Date.now();
    
    requestAnimationFrame(this.mainLoop = (function(_this) 
    { return function() 
      { if (!_this.isRunning_)  return;

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
        //var ref = _this.renderer;
        //var len = result.length;
        //console.log("result.length="+result.length);
        
        //for (var i = 0; i < len; i++) 
        for (var i = 0; i < result.length; i++) 
        { //sc = result[i];(ref = _this.renderer).render.apply(ref, sc);
          //(this.ref = _this.renderer).render.apply(this.ref,result[i]);
          //ref.render.apply(ref,result[i]);
          //ref[i].render.apply(ref[i],result[i]);
          
          _this.renderer[i].render.apply(_this.renderer[i],result[i]);
        }

        //_this.renderer.render.apply(_this.renderer,result[0]);
        //_this.renderer.render.apply(_this.renderer,_this.currentScene.update()[0]);
        
        //////////////////////////////////////////////
        //return null;
        
      }.bind(this);
    }.bind(this))(this));
    
    return this;
  }

  stop() 
  { this.isRunning_ = false;
    return this;
  }

  isRunning() 
  { return this.isRunning_;
  }

  setScene(sceneClassOrInstance) 
  { if (sceneClassOrInstance instanceof MSMScene) this.currentScene = sceneClassOrInstance;
    else                                          this.currentScene = new sceneClassOrInstance(this);
    
    return this;
  }
  
}

////////////////////////////////////////////////////////////////////////////////
class MSMScene
{ constgructor(g) 
  { this.game = g;
  }

  update() 
  { return [];
  };

}
