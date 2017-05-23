/*
three.msm.js - Micro Scene Manager for Three.js
Version 0.1.0
(C) 2013 Shintaro Seki
MIT License
 */
 
/* 
function extend(child, parent) 
{   for (var key in parent) 
    {   if (hasProp.call(parent, key)) child[key] = parent[key]; 
    } 
            
    function ctor() 
    {   this.constructor = child; 
    } 
            
    ctor.prototype  = parent.prototype; 
    child.prototype = new ctor(); 
    child.__super__ = parent.prototype; 
    
    return child; 
};
        
var hasProp = {}.hasOwnProperty;
*/

        
/////////////////////////////////////////////////////////
//var MSM;
//this.MSM = MSM = {};

class MSMGame
{ constructor(canvas, fps=30, width=800, height=600) 
  { this.canvas     = document.getElementsByTagName(canvas)[0];
    this.fps        = fps   != null ? fps   : 60;
    this.width      = width != null ? width : null;
    this.height     = height!= null ? height: null;
    this.frameCount = 0;
    this.frameSpan  = 1000 / this.fps;
    this.renderer_gl= new THREE.WebGLRenderer({canvas: this.canvas});
    
    this.renderer_gl.setSize(this.width, this.height);
    this.renderer_gl.setClearColor(0xFFFFFF, 1);
    this.renderer_gl.autoClear = false;
    this.isRunning_         = false;
    
    //////////////////////////////////////////////////////////
    this.renderer = this.renderer_gl;//[this.renderer_gl,];
    
    return this;
  }

  getWidth()  { return this.width;  }
  getHeight() { return this.height; }
  getfps()    { return this.fps;    }

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
        //var result = _this.currentScene.update();
        _this.renderer.clear();
        
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
        
        /*
        for (var i = 0; i < len; i++) 
        { //sc = result[i];(ref = _this.renderer).render.apply(ref, sc);
          //(this.ref = _this.renderer).render.apply(this.ref,result[i]);
          //ref.render.apply(ref,result[i]);
          //ref[i].render.apply(ref[i],result[i]);
        
        }
        */
        
        //_this.renderer.render.apply(_this.renderer,result[0]);
        _this.renderer.render.apply(_this.renderer,_this.currentScene.update()[0]);
        
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
    //this.game = null;//g;
    //return this;//Scene;
    //return new.target;
  }
/*
  getWidth()
  { return this.game.getWidth();
  }
  
  getHeight()
  { return this.game.getHeight();
  }
  
  getfps()    
  { return this.game.getfps();
  }  
*/
  update() 
  { return [];
  };

}
