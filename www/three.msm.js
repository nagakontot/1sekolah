/*
three.msm.js - Micro Scene Manager for Three.js
Version 0.1.0
(C) 2013 Shintaro Seki
MIT License
 */
 
 
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
    this.renderer   = new THREE.WebGLRenderer({canvas: this.canvas});
    
    if(this.width  == null)this.width  = this.canvas.width;
    if(this.height == null)this.height = this.canvas.height;
    
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xFFFFFF, 1);
    this.renderer.autoClear = false;
    this.isRunning_         = false;
    
    return this;
    //return Game;
  }

  getWidth()  { return this.width;  }
  getHeight() { return this.height; }
  getfps()    { return this.fps;    }

  start() 
  { //var mainLoop;
    
    console.assert(!this.isRunning_);
    
    this.isRunning_ = true;
    this.past       = Date.now();
    requestAnimationFrame(this.mainLoop = (function(_this) 
    { return function() 
      { //var i, len, now, ref, result, sc;
        if (!_this.isRunning_)  return;

        requestAnimationFrame(this.mainLoop);
        
        var now = Date.now();
        if (now - this.past < _this.frameSpan) return;
        this.past = now;
        
        _this.frameCount++;
        var result = _this.currentScene.update();
        _this.renderer.clear();
        
        //////////////////////////////////////////////
        //var i, len,ref, sc;
        //for (i = 0, len = result.length; i < len; i++) 
        //{ sc = result[i];
        //  (ref = _this.renderer).render.apply(ref, sc);
        //}
        //////////////////////////////////////////////
        var ref = _this.renderer;
        var len = result.length;
        for (var i = 0; i < len; i++) 
        { //sc = result[i];(ref = _this.renderer).render.apply(ref, sc);
          //(this.ref = _this.renderer).render.apply(this.ref,result[i]);
          ref.render.apply(ref,result[i]);
        }
        //////////////////////////////////////////////
        
        return null;
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
  //return Game;
}

////////////////////////////////////////////////////////////////////////////////
class MSMScene
{ constgructor(g) 
  { //this.game = g;
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
