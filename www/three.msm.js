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
var MSM;

this.MSM = MSM = {};

MSM.Game = (function() 
{ function Game(canvas, fps=30, width=800, height=600) 
  { //this.canvas     = canvas;
    this.canvas     = document.getElementsByTagName(canvas)[0];
    this.fps        = fps != null ? fps : 60;
    this.width      = width != null ? width : null;
    this.height     = height != null ? height : null;
    this.frameCount = 0;
    this.frameSpan  = 1000 / this.fps;
    this.renderer   = new THREE.WebGLRenderer({canvas: this.canvas});
    
    if(this.width  == null)this.width  = this.canvas.width;
    if(this.height == null)this.height = this.canvas.height;
    
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xFFFFFF, 1);
    this.renderer.autoClear = false;
    this.isRunning_ = false;
  }

  Game.prototype.start = function() 
  { var mainLoop;
    
    console.assert(!this.isRunning_);
    
    this.isRunning_ = true;
    var past = Date.now();
    requestAnimationFrame(mainLoop = (function(_this) 
    { return function() 
      { //var i, len, now, ref, result, sc;
        var i, len,ref, result, sc;
        
        if (!_this.isRunning_)return;
        
        requestAnimationFrame(mainLoop);
        
        var now = Date.now();
        
        if (now - past < _this.frameSpan)return;
        
        past = now;
        
        _this.frameCount++;
        result = _this.currentScene.update();
        _this.renderer.clear();
        
        for (i = 0, len = result.length; i < len; i++) 
        { sc = result[i];
          (ref = _this.renderer).render.apply(ref, sc);
        }
        return null;
      };
    })(this));
    
    return this;
  };

  Game.prototype.stop = function() 
  { this.isRunning_ = false;
    return this;
  };

  Game.prototype.isRunning = function() 
  { return this.isRunning_;
  };

  Game.prototype.setScene = function(sceneClassOrInstance) 
  { if (sceneClassOrInstance instanceof MSM.Scene)this.currentScene = sceneClassOrInstance;
    else                                          this.currentScene = new sceneClassOrInstance(this);
    
    return this;
  };

  return Game;

})();

MSM.Scene = (function() 
{ function Scene(game) 
  { this.game = game;
  }

  Scene.prototype.update = function() 
  { return [];
  };

  return Scene;

})();
