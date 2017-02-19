//=============================================================================
// Fullscreen.js
//=============================================================================
 
/*:
 * @plugindesc Starts the game in fullscreen
 * @author Christian Schicho
 *
 * @help
 */
 
;(function() {
  function extend(obj, name, func) {
    var orig = obj.prototype[name]
    obj.prototype[name] = function() {
      orig.call(this)
      func.call(this)
    }
  }
 
  extend(Scene_Boot, 'start', function() {
		Graphics._switchFullScreen();
  })
  
  
 var _Scene_Base_create = Scene_Base.prototype.create;

	Scene_Base.prototype.create = function() 
	{
		
		_Scene_Base_create.call(this);
		/*
		Graphics.width 		= 1240;//1280;
		Graphics.height 	= 768;//720;	
		Graphics.boxWidth 	= 1240;//1280;	
		Graphics.boxHeight  = 768;//720;
		*/
		/*
		var w = window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName('body')[0],
			x = w.innerWidth || e.clientWidth || g.clientWidth,
			y = w.innerHeight|| e.clientHeight|| g.clientHeight;
			
			//alert(x + ' × ' + y);		
			
			Graphics.width 		= x;//1240;//1280;
			Graphics.height 	= y;//768;//720;	
			Graphics.boxWidth 	= x;//1240;//1280;	
			Graphics.boxHeight  = y;//768;//720;
		*/			
		var xoff = window.innerWidth*0.2;
		var yoff = window.innerHeight*0.2;
		Graphics.width 		= window.innerWidth-xoff;
		Graphics.height 	= window.innerHeight-yoff;
		Graphics.boxWidth 	= window.innerWidth-xoff;	
		Graphics.boxHeight  = window.innerHeight-yoff;
		
			
	};
 
})()