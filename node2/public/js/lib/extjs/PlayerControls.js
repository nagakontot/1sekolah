
THREE.PlayerControls = function ( camera, player, domElement ) 
{

	this.camera 		= camera;
	this.player 		= player;
	this.domElement 	= ( domElement !== undefined ) ? domElement : document;

	// API
	this.enabled		= true;

	this.center 		= new THREE.Vector3( player.position.x, player.position.y, player.position.z );
	this.lastPosition   = new THREE.Vector3();

	this.moveSpeed		= 0.2;
	this.turnSpeed		= 0.1;

	this.userZoom		= true;
	this.userZoomSpeed	= 1.0;

	this.userRotate 	= true;
	this.userRotateSpeed= 1.5;

	this.autoRotate 	= false;
	this.autoRotateSpeed= 0.1;
	this.YAutoRotation	= false;

	this.minPolarAngle	= 0.5;//0;
	this.maxPolarAngle	= Math.PI/2;//Math.PI;//

	this.minDistance	= 0;
	this.maxDistance	= Infinity;

	// internals
	var vectorWorldDirection = new THREE.Vector3(); //= camera.getWorldDirection();

	var scope			= this;

	var EPS 			= 0.000001;
	var PIXELS_PER_ROUND= 1800;

	var rotateStart 	= new THREE.Vector2();
	var rotateEnd		= new THREE.Vector2();
	var rotateDelta 	= new THREE.Vector2();

	var zoomStart		= new THREE.Vector2();
	var zoomEnd 		= new THREE.Vector2();
	var zoomDelta		= new THREE.Vector2();

	var phiDelta		= 0;
	var thetaDelta		= 0;
	var scale			= 1;

	var lastPosition	= new THREE.Vector3( player.position.x, player.position.y, player.position.z );
	var playerIsMoving	= false;

	var keyState		= {};
	var STATE			= { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2,JUMP:3 };
	var state			= STATE.NONE;

	// events

	var changeEvent 	= { type: 'change' };
	
/////////////////////////////////////////////////////////////
	this.rotateLeft  = function ( angle    ){ if(angle === undefined)	 angle	  = getAutoRotationAngle();	thetaDelta	-= angle;	 }
	this.rotateRight = function ( angle    ){ if(angle === undefined)	 angle	  = getAutoRotationAngle();	thetaDelta	+= angle;	 }
	this.rotateUp	 = function ( angle    ){ if(angle === undefined)	 angle	  = getAutoRotationAngle();	phiDelta	-= angle;	 }
	this.rotateDown  = function ( angle    ){ if(angle === undefined)	 angle	  = getAutoRotationAngle();	phiDelta	+= angle;	 }
	this.zoomIn 	 = function ( zoomScale){ if(zoomScale === undefined)zoomScale= getZoomScale();			scale		/= zoomScale;}
	this.zoomOut	 = function ( zoomScale){ if(zoomScale === undefined)zoomScale= getZoomScale();			scale		*= zoomScale;}

/////////////////////////////////////////////////////////////

	this.init = function() 
	{	//this.camera.position.x = this.player.position.x + 3;
		//this.camera.position.y = this.player.position.y;
		//this.camera.position.z = this.player.position.z + 3;

		//this.camera.position.x = this.player.position.x+2;
		//this.camera.position.y = this.player.position.y+2;
		//this.camera.position.z = this.player.position.z+2;

		this.camera.position.x = this.player.position.x;
		this.camera.position.y = this.player.position.y+2;
		this.camera.position.z = this.player.position.z;

		this.camera.lookAt( this.player.position );
	};

//////////////////////////////////////////////////////////////
	this.gravity		= -0.025;
	this.onGround		= true;
	this.velocityY		= 0.0;
	this.GroundHeight   = -0.35;
	this.GroundOffset   = 0;

	this.StartJump = function (h=0.3) 
	{	if(this.onGround)
    	{	this.velocityY = h;//0.3;//0.25;//-12.0;
        	this.onGround = false;
    	}
	}

	this.EndJump = function () 
	{	//if(velocityY < -6.0)velocityY = -6.0;
		if(this.velocityY > 0.15)this.velocityY = 0.15;
	}
	
	this.UpdateJump = function () 
	{	this.velocityY			+= this.gravity;
	    this.player.position.y  += this.velocityY;
    	//this.player.position.x += velocityX;
    	//this.player.position.z += velocityX;
    
       	//if(positionY > 175.0)
    	//{	positionY = 175.0;
       	//	elocityY = 0.0;
	    //	onGround = true;
    	//}
		
	    //if(this.player.position.y <  0)
    	//{	this.player.position.y = 0;
        //	this.velocityY = 0.0;
        //	this.onGround = true;
	    //}

	    if(this.player.position.y <  this.GroundHeight+this.GroundOffset)
    	{	this.player.position.y = this.GroundHeight+this.GroundOffset;
        	this.velocityY = 0.0;
        	this.onGround = true;
	    }

    	//if(positionX < 10 || positionX > 190)velocityX *= -1;
	}
	
	this.update = function() 
	{	this.checkKeyStates();
		this.center = this.player.position;

		var position= this.camera.position;
		var offset	= position.clone().sub( this.center );

		// angle from z-axis around y-axis
		var theta	= thetaDelta+ Math.atan2( offset.x, offset.z );

		// angle from y-axis
		var phi 	= phiDelta	+ Math.atan2( Math.sqrt( offset.x * offset.x + offset.z * offset.z ), offset.y );

		//theta += thetaDelta;
		//phi += phiDelta;

		// restrict phi to be between desired limits
		phi = Math.max( this.minPolarAngle, Math.min( this.maxPolarAngle, phi ) );

		// restrict phi to be between EPS and PI-EPS
		phi = Math.max( EPS, Math.min( Math.PI - EPS, phi ) );

		var radius = offset.length() * scale;

		radius = Math.max( this.minDistance, Math.min( this.maxDistance, radius ) );

		offset.x = radius * Math.sin( phi ) * Math.sin( theta );
		offset.y = radius * Math.cos( phi );
		offset.z = radius * Math.sin( phi ) * Math.cos( theta );

		if ( this.autoRotate ) 
		{	//this.camera.position.x += this.autoRotateSpeed * ( ( this.player.position.x + 8 * Math.sin( this.player.rotation.y ) ) - this.camera.position.x );
			//this.camera.position.y += this.autoRotateSpeed * ( ( this.player.position.y ) - this.camera.position.y + 3);
			//this.camera.position.z += this.autoRotateSpeed * ( ( this.player.position.z + 8 * Math.cos( this.player.rotation.y ) ) - this.camera.position.z );
			
			//this.camera.position.x += this.autoRotateSpeed * ( ( this.player.position.x + 4*Math.sin( this.player.rotation.y ) ) - this.camera.position.x );
			//this.camera.position.y += this.autoRotateSpeed * ( ( this.player.position.y - this.camera.position.y+1 ));
			//this.camera.position.z += this.autoRotateSpeed * ( ( this.player.position.z + 4*Math.cos( this.player.rotation.y ) ) - this.camera.position.z );			
			
			this.camera.position.x += this.autoRotateSpeed * ( ( this.player.position.x + 4*Math.sin( this.player.rotation.y ) ) - this.camera.position.x );
			this.camera.position.y += this.autoRotateSpeed * ( ( this.player.position.y - this.camera.position.y)+1.1);//+2.5
			this.camera.position.z += this.autoRotateSpeed * ( ( this.player.position.z + 4*Math.cos( this.player.rotation.y ) ) - this.camera.position.z );			
			
		} 
		else 
		{	position.copy( this.center ).add( offset );
		}

		this.camera.lookAt( this.center );

		thetaDelta	= 0;
		phiDelta	= 0;
		scale		= 1;

		//if ( state === STATE.NONE && playerIsMoving )					this.autoRotate = true;
		if ( state === STATE.NONE )										this.autoRotate = true;
		else															this.autoRotate = false;

		if(this.onGround)this.lastPosition = lastPosition;
		if ( lastPosition.distanceTo( this.player.position) > 0 )		lastPosition.copy( this.player.position );
		else if ( lastPosition.distanceTo( this.player.position) == 0 ) playerIsMoving	= false;
		
		this.UpdateJump();
		///////////////////////////////////////////////////////////
		
		//note: Math.trunc() will do proper truncation
		var pos = {x:Math.round(this.player.position.x),y:Math.round(this.player.position.y),z:Math.round(this.player.position.z)};
		var rot = {x:Math.round(this.player.rotation.x),y:Math.round(this.player.rotation.y),z:Math.round(this.player.rotation.z)};

		//var pos = {x:~~this.player.position.x,y:~~this.player.position.y,z:~~this.player.position.z};
		//var rot = {x:~~this.player.rotation.x,y:~~this.player.rotation.y,z:~~this.player.rotation.z};
		
		//var pos = {x:this.player.position.x|0,y:this.player.position.y|0,z:this.player.position.z|0};
		//var rot = {x:this.player.rotation.x|0,y:this.player.rotation.y|0,z:this.player.rotation.z|0};
	    	
	    if( JSON.stringify(pos) != JSON.stringify(window.pos) )	
	    {	//console.log("( JSON.stringify(pos) != JSON.stringify(window.pos))");
	    	fbRef.child( "Players/" + playerID + "/orientation" ).update(
	    	{	position:	{	x: pos.x,//~~this.player.position.x,
	    						y: pos.y,//~~this.player.position.y,
	    						z: pos.z //~~this.player.position.z
	    					}
	    	});
	    }
	    if( JSON.stringify(rot) != JSON.stringify(window.rot) )	
	    {	//console.log("(JSON.stringify(rot) != JSON.stringify(window.rot))");
	    	fbRef.child( "Players/" + playerID + "/orientation" ).update(
	    	{	rotation:	{	x: rot.x,//~~this.player.rotation.x,
	    						y: rot.y,//~~this.player.rotation.y,
	    						z: rot.z //~~this.player.rotation.z
	    					}
	    	});	    	
	    }
	    
	    //fbRef.child( "Players/" + playerID + "/orientation" ).update({
	    //	position: {
	    //		x: pos.x,//~~this.player.position.x,
	    //		y: pos.y,//~~this.player.position.y,
	    //		z: pos.z,//~~this.player.position.z
	    //	},
	    //	rotation: {
	    //		x: rot.x,//~~this.player.rotation.x,
	    //		y: rot.y,//~~this.player.rotation.y,
	    //		z: rot.z,//~~this.player.rotation.z
	    //	}
	    //});
		
		//window.pos = JSON.parse(JSON.stringify(pos));
		//window.rot = JSON.parse(JSON.stringify(rot));
		
		window.pos = Object.assign({}, pos); 
		window.rot = Object.assign({}, rot); 		
	};

	this.isOnGround = function() 
	{	return this.onGround;
	}
	
	//this.getLastPosition = function ()
	//{	return this.lastPosition
	//}
	//
	//this.setLastPosition = function (pos)
	//{	this.lastPosition = pos;
	//	playerIsMoving	= false;
	//	this.onGround   = true;
	//}
	
	this.checkKeyStates = function () 
	{	var turbomode = 1;
		if(keyState[16])
		{	turbomode =2;
		}
		
		if(keyState[32])
		{	//space bar is pressed, jump ?
			this.StartJump();
		}
		else 
		{	this.EndJump();
		}

	    if (keyState[38] || keyState[87]) 
	    {   // up arrow or 'w' - move forward
			playerIsMoving = true;	//I add ths!!!!!!!!!!!!
			/*
			var speed   = this.moveSpeed*turbomode;
			var movesin	= speed * Math.sin( this.player.rotation.y );
			var movecos	= speed * Math.cos( this.player.rotation.y );
			
	        this.player.position.x -= movesin;
	        this.player.position.z -= movecos;
			*/
	        //this.camera.position.x -= movesin;
	        //this.camera.position.z -= movecos;
	        //////////////////////
  	        this.player.position.x -= this.moveSpeed*turbomode * Math.sin( this.player.rotation.y );
	        this.player.position.z -= this.moveSpeed*turbomode * Math.cos( this.player.rotation.y );

	    }
	    else if (keyState[40] || keyState[83]) 
	    {   // down arrow or 's' - move backward
	        playerIsMoving = true;
			/*
			var speed   = this.moveSpeed*turbomode;
			var movesin	= speed * Math.sin( this.player.rotation.y );
			var movecos	= speed * Math.cos( this.player.rotation.y );

	        this.player.position.x += movesin;
	        this.player.position.z += movecos;
			*/
	        //this.camera.position.x += movesin;
	        //this.camera.position.z += movecos;
	        //////////////////////
  	        this.player.position.x += this.moveSpeed*turbomode * Math.sin( this.player.rotation.y );
	        this.player.position.z += this.moveSpeed*turbomode * Math.cos( this.player.rotation.y );
	        
	    }

	    if (keyState[37] || keyState[65]) 
	    {   // left arrow or 'a' - rotate left
	        playerIsMoving = true;
	        this.player.rotation.y += this.turnSpeed;

	        //vectorWorldDirection = this.camera.getWorldDirection();
    		//var theta = Math.atan2(vectorWorldDirection.x,vectorWorldDirection.z);
    		//this.player.rotation.y = Math.atan2(vectorWorldDirection.x,vectorWorldDirection.z);
	    }
	    else if (keyState[39] || keyState[68]) 
	    {   // right arrow or 'd' - rotate right
	        playerIsMoving = true;
	        this.player.rotation.y -= this.turnSpeed;
	    }
	    
	    if ( keyState[81] ) 
	    {   // 'q' - strafe left
	        playerIsMoving = true;
			var speed   = this.moveSpeed*turbomode;
			var movesin	= speed * Math.sin( this.player.rotation.y );
			var movecos	= speed * Math.cos( this.player.rotation.y );
			//var movesin	= this.moveSpeed * Math.sin( this.player.rotation.y );
			//var movecos	= this.moveSpeed * Math.cos( this.player.rotation.y );
			
	        this.player.position.x -= movecos;
	        this.player.position.z += movesin;

	        //this.camera.position.x -= movecos;
	        //this.camera.position.z += movesin;

	    }
	    else if ( keyState[69] ) 
	    {   // 'e' - strage right
	        playerIsMoving = true;
   			var speed   = this.moveSpeed*turbomode;
			var movesin	= speed * Math.sin( this.player.rotation.y );
			var movecos	= speed * Math.cos( this.player.rotation.y );

			//var movesin	= this.moveSpeed * Math.sin( this.player.rotation.y );
			//var movecos	= this.moveSpeed * Math.cos( this.player.rotation.y );

	        this.player.position.x += movecos;
	        this.player.position.z -= movesin;

	        //this.camera.position.x += movecos;
	        //this.camera.position.z -= movesin;

	    }

		/*
		//note: Math.trunc() will do proper truncation
		var pos = {x:Math.round(this.player.position.x),y:Math.round(this.player.position.y),z:Math.round(this.player.position.z)};
		var rot = {x:Math.round(this.player.rotation.x),y:Math.round(this.player.rotation.y),z:Math.round(this.player.rotation.z)};

		//var pos = {x:~~this.player.position.x,y:~~this.player.position.y,z:~~this.player.position.z};
		//var rot = {x:~~this.player.rotation.x,y:~~this.player.rotation.y,z:~~this.player.rotation.z};
		
		//var pos = {x:this.player.position.x|0,y:this.player.position.y|0,z:this.player.position.z|0};
		//var rot = {x:this.player.rotation.x|0,y:this.player.rotation.y|0,z:this.player.rotation.z|0};
	    	
	    if( JSON.stringify(pos) != JSON.stringify(window.pos) )	
	    {	//console.log("( JSON.stringify(pos) != JSON.stringify(window.pos))");
	    	fbRef.child( "Players/" + playerID + "/orientation" ).update(
	    	{	position:	{	x: pos.x,//~~this.player.position.x,
	    						y: pos.y,//~~this.player.position.y,
	    						z: pos.z,//~~this.player.position.z
	    					}
	    	});
	    }
	    if( JSON.stringify(rot) != JSON.stringify(window.rot) )	
	    {	//console.log("(JSON.stringify(rot) != JSON.stringify(window.rot))");
	    	fbRef.child( "Players/" + playerID + "/orientation" ).update(
	    	{	rotation:	{	x: rot.x,//~~this.player.rotation.x,
	    						y: rot.y,//~~this.player.rotation.y,
	    						z: rot.z,//~~this.player.rotation.z
	    					}
	    	});	    	
	    }
	    */
	    
	    //fbRef.child( "Players/" + playerID + "/orientation" ).update({
	    //	position: {
	    //		x: pos.x,//~~this.player.position.x,
	    //		y: pos.y,//~~this.player.position.y,
	    //		z: pos.z,//~~this.player.position.z
	    //	},
	    //	rotation: {
	    //		x: rot.x,//~~this.player.rotation.x,
	    //		y: rot.y,//~~this.player.rotation.y,
	    //		z: rot.z,//~~this.player.rotation.z
	    //	}
	    //});
		
		//window.pos = JSON.parse(JSON.stringify(pos));
		//window.rot = JSON.parse(JSON.stringify(rot));
		
		//window.pos = Object.assign({}, pos); 
		//window.rot = Object.assign({}, rot); 
   		

	};

	function getAutoRotationAngle() 
	{	return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
	}

	function getZoomScale() 
	{	return Math.pow( 0.95, scope.userZoomSpeed );
	}

	function onMouseDown( event ) 
	{	if ( scope.enabled === false )		return;
		if ( scope.userRotate === false )	return;

		event.preventDefault();

		if ( event.button === 0 ) 
		{	state = STATE.ROTATE;
			rotateStart.set( event.clientX, event.clientY );

		} 
		else if ( event.button === 1 ) 
		{	state = STATE.ZOOM;
			zoomStart.set( event.clientX, event.clientY );
		}

		document.addEventListener( 'mousemove', onMouseMove, false );
		document.addEventListener( 'mouseup',   onMouseUp,   false );

	}

	//I created this constant
	var MathPI_DIV_PIXELS_PER_ROUND = 2 * Math.PI / PIXELS_PER_ROUND * scope.userRotateSpeed;
	
	function onMouseMove( event ) 
	{	if ( scope.enabled === false ) return;

		event.preventDefault();

		if ( state === STATE.ROTATE ) 
		{	rotateEnd.set( event.clientX, event.clientY );
			rotateDelta.subVectors( rotateEnd, rotateStart );

			//scope.rotateLeft( 2 * Math.PI * rotateDelta.x / PIXELS_PER_ROUND * scope.userRotateSpeed );
			//scope.rotateUp	( 2 * Math.PI * rotateDelta.y / PIXELS_PER_ROUND * scope.userRotateSpeed );
			scope.rotateLeft( MathPI_DIV_PIXELS_PER_ROUND * rotateDelta.x );
			scope.rotateUp	( MathPI_DIV_PIXELS_PER_ROUND * rotateDelta.y );

			rotateStart.copy( rotateEnd );

		} 
		else if ( state === STATE.ZOOM ) 
		{	zoomEnd.set( event.clientX, event.clientY );
			zoomDelta.subVectors( zoomEnd, zoomStart );

			if ( zoomDelta.y > 0 )	scope.zoomIn();
			else					scope.zoomOut();

			zoomStart.copy( zoomEnd );
		}

	}

	function onMouseUp( event ) 
	{	if ( scope.enabled === false ) return;
		if ( scope.userRotate === false ) return;

		document.removeEventListener('mousemove', onMouseMove, false );
		document.removeEventListener('mouseup',   onMouseUp,   false );

		state = STATE.NONE;
	}

	function onMouseWheel( event ) 
	{	if ( scope.enabled === false ) return;
		if ( scope.userRotate === false ) return;

		var delta = 0;

		if ( event.wheelDelta ) 	delta = event.wheelDelta;	//WebKit / Opera / Explorer 9
		else if ( event.detail )	delta =-event.detail;	// Firefox

		if ( delta > 0 )			scope.zoomOut();
		else						scope.zoomIn();
	}

	function onKeyDown( event ) 
	{	event = event || window.event;
        keyState[event.keyCode || event.which] = true;
    }

    function onKeyUp( event ) 
    {   event = event || window.event;
        keyState[event.keyCode || event.which] = false;
    }

	//this.domElement.addEventListener('contextmenu', function( event ) { event.preventDefault(); }, false );
	this.domElement.addEventListener('mousedown',		onMouseDown,	false );
	this.domElement.addEventListener('mousewheel',		onMouseWheel,	false );
	this.domElement.addEventListener('DOMMouseScroll',	onMouseWheel,	false ); // firefox
	this.domElement.addEventListener('keydown', 		onKeyDown,		false );
	this.domElement.addEventListener('keyup',			onKeyUp,		false );

};

THREE.PlayerControls.prototype = Object.create( THREE.EventDispatcher.prototype );