"use strict"

    class CScene9 extends MSMScene
    {	constructor(msmapp) 
        {   super(msmapp);
        }

		async init() 
		{	//super.init();
			//super.createStdLight();    			
			//////////////////////////////////////////////////////////////////////
			//this.msmapp.glrenderer.setClearColor(this.glscene.fog.color);
			//this.glrenderer.autoClear = false;
			//this.glrenderer.setClearColor(0x000000, 0.0);
  
			//////////////////////////////////////////////////////////////////////
			//var sphere_geometry = new THREE.SphereGeometry( 1 );
			//var sphere_material = new THREE.MeshNormalMaterial();
			//var sphere			= new THREE.Mesh( sphere_geometry, sphere_material );
			//this.app.add( sphere );
			//this.app.addMesh(new CCube({width:2,height:2,depth:2,rotx:0.1,roty:0.1,rotz:0}));
			/////////////////////////////////////////////////////////
			//var anis = this.glrenderer.getMaxAnisotropy();
			//var anis = this.msmapp.getMaxAnisotropy();
			
			//this.create_Minecraft(anis);
			
			//super.addMesh(new CMinecraft(200,200,anis));
			//super.addMesh(new CPlane({width:1000,height:1000},anis));
			//super.addMesh(new CCube({width:2,height:2,depth:2,rotx:0.1,roty:0.1,rotz:0}));
			//super.addMesh(new CText({width:20,height:20,depth:2,rotx:0.1,roty:0.1,rotz:0}));
			
			//this.create_ShaderSkybox();
			/////////////////////////////////////////////////////////
			//this.pivot			= new THREE.Object3D();
			//this.pivot.name 	= 'Pivot';
			//this.glscene.add( this.pivot );
			
			//////////////////////////////////////////////////////////

			this.pivot=this.msmapp.create_pivot(this.glscene);

			//setTimeout(this.create_pivot.bind(this),0);
			//setTimeout(this.create_blocker.bind(this),0);
			//setTimeout(this.create_plane.bind(this),0);
			//setTimeout(this.create_Minecraft.bind(this),0);
			//setTimeout(this.create_videostuff.bind(this),0);
			//setTimeout(this.create_css3Diframe_rchat.bind(this),0);
			//setTimeout(this.create_house1.bind(this),0);
			//setTimeout(this.create_building3.bind(this),0);
			//setTimeout(this.create_building1.bind(this),0);
			//setTimeout(this.create_particle1.bind(this),0);

			//////////////////////////////////////////////////////////////
			//this.msmapp.create_plane('ground_desert_mesh',1000,1000,this.msmapp.floorTexture,this.msmapp.floorTextureBump,this.msmapp.floorTextureOCC).then((done)=> {super.addMesh(done);});	
			//this.msmapp.create_Minecraft(this.glscene).then((done)=> {	this.mymc = done;});	
			//this.msmapp.create_css3Diframe_rchat(this.cssscene).then((done)=> {	this.css3Diframe = done;});

			//////////////////////////////////////////////////////////////
			//this.msmapp.create_house1(this.pivot,this.glscene).then((done)=> {	this.house1 = done;});			
			//this.msmapp.create_building3(this.glscene).then((done)=> {	this.building3 = done;});			
			//this.msmapp.create_building1(this.glscene).then((done)=> {	this.building1 = done;});			
			//setTimeout(this.create_doors.bind(this,this.msmapp.doortex),0);
			//this.msmapp.create_particle1(this.glscene).then((done)=> {	this.params1 = done.params1; this.mysp = done.mysp;});			

			//this.msmapp.create_ShaderSkybox(this.glscene)
			//	.then((done)=>	 {	this.mysky = done;})
			//	.catch((error)=> {	console.log(error);});

			//////////////////////////////////////////////////////////////////
    
			try 
			{	
				//var src	=   'https://groups.google.com/forum/embed/?place=forum/1sekolah&showsearch=true&showpopout=true&showtabs=false&parenturl=' + encodeURIComponent(window.location.href);
				//var src	=   "https://tympanus.net/Tutorials/MoleskineNotebook/";
				//var src	=	"https://www.yumpu.com/en/embed/view/HLYUZrOvxWSkmAqD";
				//var src	=	"https://s3.amazonaws.com/online.anyflip.com/qaoi/ltso/index.html";
				//var src	=	"https://canvas.1sekolah.xyz/";
				//var src	=	"//canvas.1sekolah.xyz/";
				//var src	=	"https://h5p.org/presentation";
				
				//var src1	=	"//rchat.1sekolah.xyz/";
				//var src2	=	"https://www.youtube.com/embed/bkk6cHrkcFE?enablejsapi=1&&modestbranding=1&&hd=1&rel=0&autohide=1&showinfo=0&&controls=0";
				//var src3	=   'https://groups.google.com/forum/embed/?place=forum/1sekolah&showsearch=true&showpopout=true&showtabs=false&parenturl=' + encodeURIComponent(window.location.href);
				//var src4	=	"https://www.twiddla.com/b75hq1";

				var src1	=	"//rchat.1sekolah.xyz/channel/matematik";
				var src2	=	"//rchat.1sekolah.xyz/channel/matematik";
				var src3	=   "//rchat.1sekolah.xyz/channel/matematik";
				var src4	=	"//rchat.1sekolah.xyz/channel/matematik";


				//let [plane,rchat,building1,particle1,skybox,doors]  = await Promise.all([this.msmapp.create_plane('ground_desert_mesh',1000,1000,this.msmapp.floorTexture,this.msmapp.floorTextureBump,this.msmapp.floorTextureOCC),
				let [plane,css3Diframe1,css3Diframe2,css3Diframe3,css3Diframe4,building3,particle1]	=  
					await Promise.all([	this.msmapp.create_plane('ground_desert_mesh',1000,1000,this.msmapp.floorTexture,this.msmapp.floorTextureBump,this.msmapp.floorTextureOCC),
    									//this.msmapp.create_css3Diframe_rchat(this.cssscene,"https://www.youtube.com/embed/bkk6cHrkcFE?enablejsapi=1&&modestbranding=1&&hd=1&rel=0&autohide=1&showinfo=0&&controls=0"),
    									//this.msmapp.create_css3Diframe_rchat(this.cssscene,"https://hangouts.google.com/call/4h3xishhavbsnpx5scnmjh4kky4"),
    									//this.msmapp.create_css3Diframe_rchat(this.cssscene,src),
    									this.msmapp.create_css3Diframe(this.cssscene,src1, 0,  130, 500,-Math.PI/2),//,800,300),
    									this.msmapp.create_css3Diframe(this.cssscene,src2, 0,  130,-500, 0        ),// 800,300),
    									this.msmapp.create_css3Diframe(this.cssscene,src3, 500,130, 0,  -Math.PI/4),//,800,300),
    									this.msmapp.create_css3Diframe(this.cssscene,src4,-500,130, 0,   Math.PI/4),//,800,300),
    												    							
    									this.msmapp.create_building3(this.pivot,this.glscene),
    									this.msmapp.create_particle1(this.glscene)	]);
			
				super.addMesh(plane);
				this.css3Diframe	= [css3Diframe1,css3Diframe2,css3Diframe3,css3Diframe4];
				this.building3		= building3;			
			
				this.params1		= particle1.params1; 
				this.mysp			= particle1.mysp;
			
				this.mysky			= null;//skybox;//
			} 
			catch (err) 
			{	console.log(err);
			}
			
            return this;
		}
		
		hideIframe()
		{	//alert("hideIframe() child, id="+this.id);
			//this.css3Diframe.hide();
			//this.css3Diframe.traverse( function ( object ) { object.visible = false; } );

			//var name = "#"+this.id;
	    	//$(name).attr('src','');
			//$(name).attr('style','zIndex: -1');
			
			for(var i=0;i<this.css3Diframe.range;i++)
			{	this.css3Diframe[i].div.style.opacity		= 0.0;
				this.css3Diframe[i].div.style.display		= "none";
				this.css3Diframe[i].div.style.zIndex		= -1;
	
				this.css3Diframe[i].iframe.src				= '';

				//this.css3Diframe[i].position.set(0,-1000,0);
				//this.css3Diframe[i].visible = false;
				//this.css3Diframe[i].translateY (-100000);
				//this.css3Diframe[i].scale.set(0.001,0.001,0.001);
			}
			
			//this.toggleVideo('hide');
			//this.pauseVideo();
		}
		
		showIframe()
		{	//alert("showIframe() child, id="+this.id);
			//this.css3Diframe.hide();
			//this.css3Diframe.traverse( function ( object ) { object.visible = true; } );

			//var name = "#"+this.id;
	    	//$(name).attr('src',this.url);
			//$(name).attr('style','zIndex: 0');

			for(var i=0;i<this.css3Diframe.range;i++)
			{	this.css3Diframe[i].div.style.opacity		= 1.0;
				this.css3Diframe[i].div.style.display		= "inline";
				this.css3Diframe[i].div.style.zIndex		= 0;

				this.css3Diframe[i].iframe.src				= this.css3Diframe[i].url;
				this.css3Diframe[i].iframe.style.width		= "100%";//this.w;//'1100px';//'1024px';//'800px';
				this.css3Diframe[i].iframe.style.height 	= "100%";//this.h;//'425px';//'768px';
			
				//this.css3Diframe[i].position.set(600,120,600);
				//this.css3Diframe[i].visible = true;
				//this.css3Diframe[i].translateZ (-100000);
				//this.css3Diframe[i].scale.set(1,1,1);
			}
			
			//this.playVideo();
			
		}

		playVideo() 
		{	var func = 'playVideo';
			var name = "#"+this.id;
			$(name)[0].contentWindow.postMessage('{"event":"command","func":"' + func + '","args":""}','*');
		}

		pauseVideo() 
		{	var func = 'pauseVideo';
			var name = "#"+this.id;
			$(name)[0].contentWindow.postMessage('{"event":"command","func":"' + func + '","args":""}','*');
		}

		/////////////////////////////////////////////////////////////////////////////////
		update(dt)
		{	super.update(dt);
			
			var time = Date.now() * 0.00001;
			//var time = dt;//*0.0001;//window.performance.now()*0.00001;//
			this.cam = this.msmapp.camera();
			
			//TWEEN.update(time);
			//TWEEN.update();
			/////////////////////////////////////////////////////////
			// handle mouseover interactions
			/*
			this.raycaster.setFromCamera(this.mouse, this.cam);
			var intersects = this.raycaster.intersectObjects(this.glscene.children);

			if (intersects.length > 0) 
			{	if (this.INTERSECTED != intersects[0].object) 
				{	//if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
					//if (this.INTERSECTED) this.INTERSECTED.material.color.setHex(this.INTERSECTED.currentHex);
				
    				this.INTERSECTED = intersects[0].object;
    				//this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
    				//this.INTERSECTED.material.emissive.setHex(0xff0000);
    				///////////////////////////////////////////////////////////////////////
    				//this.INTERSECTED.currentHex = this.INTERSECTED.material.color.getHex();
    				//this.INTERSECTED.material.color.setHex(0xff0000);
    			}
			} 
			else 
			{	//if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
				//if (this.INTERSECTED) this.INTERSECTED.material.color.setHex(this.INTERSECTED.currentHex);
    			this.INTERSECTED = null;
			}
			*/
			/////////////////////////////////////////////////////////
			
			//this.mysp.update(time,this.glscene,this.params1);
			//this.mygame.updatePlayers();
			
			var gamemodel=this.msmapp.mygamemodel;
			//this.msmapp.mygamemodel.updatePlayers();
			gamemodel.updatePlayers();
			
			
			//if(this.mymc)
			//{	
				//if(this.msmapp.mygamemodel.player)
				if(gamemodel.player)
				{	var pos  = gamemodel.player.getPosition();		// this.msmapp.mygamemodel.player.getPosition();
					if(this.mymc)
					{	//var pos  = gamemodel.player.getPosition();		// this.msmapp.mygamemodel.player.getPosition();
						var newh = this.mymc.getY( Math.round(pos.x),Math.round(pos.z))+1.07;
				
						//if(this.counter++>1)
						//{	this.counter = 0;
						//	console.log("pos.x="+Math.round(pos.x)+" pos.y="+this.mymc.getY( Math.round(pos.x), Math.round(pos.y) )+" pos.z="+Math.round(pos.z));
						//}	
				
						if(newh>this.msmapp.controls.GroundHeight && this.msmapp.controls.isOnGround())
						{	//this.msmapp.mygamemodel.player.setPositionY(pos.y+1.25);
							gamemodel.player.setPositionY(pos.y+1.25);
						
							this.msmapp.controls.StartJump();
						}
						else 
						{	this.msmapp.controls.GroundHeight = newh;
						}
					}
					//this.controls.GroundHeight   = this.mymc.getY( Math.round(pos.x),Math.round(pos.z))+1.075;
					//this.controls.GroundOffset   = 0;	//not use
				
					//this.light_.followTarget(pos,this.glscene.getObjectByName('player_moviemesh'));
				
					//this.light_.followTarget(this.msmapp.mygamemodel.player.getPosition(),this.glscene.getObjectByName('player_moviemesh'));
					this.light_.followTarget(gamemodel.player.getPosition(),this.glscene.getObjectByName('player_moviemesh'));
					
					
					//this.css3Diframe.followTarget(player.getPosition(),this.glscene.getObjectByName('player_moviemesh'));
					
					var campos = this.cam.getWorldPosition();
					//var campos = this.msmapp.mygamemodel.player.getPosition();
					//var campos = gamemodel.player.getPosition();
					
					
					//this.css3Diframe.lookAt (this.cam.getWorldPosition());
					//this.css3Diframe.rotation.setFromRotationMatrix( this.cam.matrix );

					//if(this.css3Diframe)
					//{	//this.css3Diframe.lookAt (player.getPosition());
						//this.css3Diframe.lookAt (this.cam.getWorldPosition());
						//this.css3Diframe.obj.lookAt (campos);

						//this.css3Diframe.obj.quaternion.copy( this.cam.quaternion );
						//this.css3Diframe.position.x = this.cam.position.x+800;
					//}
					
					//this.light_.followTarget(this.glscene,player.getPosition(),'player_moviemesh');
					//var pos = player.getPosition();
					//this.light.position.set(pos.x,10,pos.z-10);
					//this.light.target	= this.glscene.getObjectByName('player_moviemesh');

					//if(this.mysky)this.mysky.update(player.getPosition());
					//if(this.mysky)this.mysky.update(pos);
			
					//this.skyBox.position.copy( player.getPosition() );
					//this.skyBox.position.x = player.getPosition().x;
					//this.skyBox.position.z = player.getPosition().z;
				
					//if(this.mysp)this.mysp.update(time,this.glscene,this.params1,this.msmapp.mygamemodel.player.getPosition());	
					if(this.mysp)this.mysp.update(time,this.glscene,this.params1,gamemodel.player.getPosition());	

					//if(this.i++>1)
					//{	this.i=0;
						//for (var key in window.otherPlayers) 
						//{	if (window.otherPlayers.hasOwnProperty(key)) 
						//	{	window.otherPlayers[key].lookAt(this.cam.getWorldPosition());
						//	}
						//}
						//////////
						//using ES7
						//Object.entries(window.otherPlayers).forEach(([key, value]) => window.otherPlayers[key].lookAt(this.cam.getWorldPosition()));
						//Object.entries(window.otherPlayers).forEach(([key, value]) => window.otherPlayers[key].lookAt(campos));
						//////////
						//Object.entries(window.otherPlayers).forEach(([key, value]) => 
						//{	window.otherPlayers[key].lookAt(campos);
						//	//console.log("key="+key+", value.zone="+value.zone);
						//});
						this.msmapp.updateOtherPlayers(campos);
					//}	
				}					
			//}
	
        	return [[this.glscene, this.cam],[this.cssscene, this.cam]];		
		}
		
		
		//render() 
		//{	var time = Date.now() * 0.00001;
		//	//var time = this.clock.getDelta();
		//
		//	this.requestId  = window.requestAnimationFrame(() => 
		//	{	this.render();
		//	});
		//	
		//	this.update(time);
		//	super.render();
		//}
//|___________________________________________________________________________|
//|                                                                           |
		onDocumentMouseMove() 
		{
		}
//|___________________________________________________________________________|
//|                                                                           |
		onDocumentClick() 
		{	
		}
//|___________________________________________________________________________|
//|                                                                           |
		exit()
		{	super.exit();
			this.msmapp.exit();
		}
//|___________________________________________________________________________|
//|                                                                           |
	}	
    


