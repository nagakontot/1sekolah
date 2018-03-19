    class CScene1 extends MSMScene
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
			{	var src1	=   'https://groups.google.com/forum/embed/?place=forum/1sekolah'
								+ '&showsearch=true&showpopout=true&showtabs=false'
								+ '&parenturl=' + encodeURIComponent(window.location.href);
								
				var src2	=	"https://rchat.1sekolah.xyz/channel/general";//"https://rchat.1sekolah.xyz/channel/general?layout=embedded";//"https://whiteboardfox.com/20535-2828-1171";
 				var src3	=   "https://calendar.google.com/calendar/embed?src=my1sekolah%40gmail.com&ctz=Asia%2FKuala_Lumpur";
				var src4	=	"https://droppy.1sekolah.xyz";				//"//rchat.1sekolah.xyz/channel/general";


				//let [plane,rchat,building1,particle1,skybox,doors]  = await Promise.all([this.msmapp.create_plane('ground_desert_mesh',1000,1000,this.msmapp.floorTexture,this.msmapp.floorTextureBump,this.msmapp.floorTextureOCC),
				let [plane,css3Diframe1,css3Diframe2,css3Diframe3,css3Diframe4,building1,particle1,doors]	=  
					await Promise.all([	this.msmapp.create_plane('ground_desert_mesh',1000,1000,this.msmapp.floorTexture,this.msmapp.floorTextureBump,this.msmapp.floorTextureOCC),
    									//this.msmapp.create_css3Diframe_rchat(this.cssscene,"https://www.youtube.com/embed/bkk6cHrkcFE?enablejsapi=1&&modestbranding=1&&hd=1&rel=0&autohide=1&showinfo=0&&controls=0"),
    									//this.msmapp.create_css3Diframe_rchat(this.cssscene,"https://hangouts.google.com/call/4h3xishhavbsnpx5scnmjh4kky4"),
    									//this.msmapp.create_css3Diframe_rchat(this.cssscene,src),
    									this.msmapp.create_css3Diframe(this.cssscene,src1, 0,  210, 800,-Math.PI/2),//,800,300),
    									//this.msmapp.create_css3Diframe(this.cssscene,src1, 0,  130, 500,-Math.PI/2),//,800,300),
    									this.msmapp.create_css3Diframe(this.cssscene,src2, 0,  210,-800, 0        ),// 800,300),
    									this.msmapp.create_css3Diframe(this.cssscene,src3, 800,210, 0,  -Math.PI/4),//,800,300),
    									this.msmapp.create_css3Diframe(this.cssscene,src4,-800,210, 0,   Math.PI/4),//,800,300),
    												    							
    									this.msmapp.create_building1(this.pivot,this.glscene),
    									this.msmapp.create_particle1(this.glscene),
    									//this.msmapp.create_ShaderSkybox(this.glscene),
    									this.create_door_async()	]);
			
				super.addMesh(plane);
				this.css3Diframe	= [css3Diframe1,css3Diframe2,css3Diframe3,css3Diframe4];
				this.building1		= building1;			
			
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
		{	for(var i=0;i<this.css3Diframe.range;i++)
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
		{	for(var i=0;i<this.css3Diframe.range;i++)
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

  		async create_door_async()
		{	var promise = await new Promise((resolve, reject) =>
			{	//window.setTimeout(this.create_doors.bind(this,this.msmapp.doortex),0);
				window.setTimeout(()=>
				{	this.create_doors(this.msmapp.doortex);
					resolve("done");
				},0);
			});
			return promise;    			
		}
		
		create_doors(doortex)
		{	this.doors		= [];
		
			this.door_name1	= ["LOBI",  "MATH",    "SAINS",     "BIOLOGI",  "KIMIA",    "FIZIK",   "BM"];
			this.door_name2	= ["BI",    "ADDMATH", "NETWORK",   "HELP",	    "ROBOTIK",	"WEBSITE", "MISC"];
			
			//////////////////////////////////////////////
			var door		= {width: 3,height: 5,depth: 0.15};
    		// use geometry for a door mesh many times
			var geometry	= new THREE.CubeGeometry(door.width, door.height, door.depth);
			// this offsets the pivot point so doors don't rotate around their center
			geometry.applyMatrix(new THREE.Matrix4().makeTranslation(door.width / 2, 0, 0));

			///////////////////////////////////////////////
			//var doortex 	= window.gTexLoader.load( 'images/house/door004.jpg' );
            //floorTexture.wrapS      = floorTexture.wrapT = THREE.RepeatWrapping; 
            //floorTexture.repeat.set( 200,200 );
			var params = 
	        {   map:                doortex,
                bumpMap:        	doortex,
                //aoMap:              floorTextureOCC,         
                //normalMap:			floorTextureBump,
                //specularMap:        floorTextureSPEC,
                //displacementMap:    floorTextureDISP,
                //displacementBias:   1,//0.618,
                //displacementScale:  1,//0.618,  
              
                //ambient:			0xffffff,	
                bumpScale:			1,
                //normalScale:        new THREE.Vector2( 1,1),
                shininess:          5,//35.0,
                //color:              0xdddddd,
				//specular:           0x101010,
				//emissive:			'#333333'
                //side:               THREE.BackSide
            };
            
            
            //this.material			= new THREE.MeshStandardMaterial( params );
            //this.material			= new THREE.MeshLambertMaterial( params );
            var material			= new THREE.MeshPhongMaterial( params );            
			///////////////////////////////////////////////
			// make doors!
			//for (let i = 0; i < 30; i++) 
			var len = 7;
			for (let i = 0; i < len; i++) 
			{	//let material		= new THREE.MeshLambertMaterial({color: 0xffffff * Math.random()});
    			let mesh			= new THREE.Mesh(geometry, material);
    			mesh.castShadow		= true;			
				mesh.receiveShadow	= true;//false;//
				
    			this.glscene.add(mesh);
    			this.doors.push(mesh);

    			// arrange in a grid
    			//mesh.position.x = 10.00 + (i % len) * (door.width + door.depth);
    			//mesh.position.y = 0 + Math.floor(i / len) * -(door.height + door.depth);
    			////////////////
    			//mesh.position.x = -22.35+(i % len) * (door.width + door.depth + 4);
    			mesh.position.x = -22.5+(i % len) * (door.width + door.depth + 3.85);
    			mesh.position.y = 1.55 + Math.floor(i / len) * -(door.height + door.depth);
    			mesh.position.z = -2.85;
    			
    			mesh.name = "door_A"+ i;
    			
				//////////////////////////////
				var label = createLabel(this.door_name1[i],"yellow","blue",20,128,32,true);
				//label.scale.set(1,0.25,1);
				//label.scale.set(4,2,4);
				label.scale.set(4,1,0);
    			//label.position.set(1.25,1.75,2.4);
    			label.position.set(1.25,1.25,2);
    			
    			//////////////////////////////    			
    			mesh.add( label );
			}
			///////////////////////////////////////////////////
			for (let i = 0; i < len; i++) 
			{	//let material		= new THREE.MeshLambertMaterial({color: 0xffffff * Math.random()});
    			let mesh			= new THREE.Mesh(geometry, material);
    			mesh.castShadow		= true;			
				mesh.receiveShadow	= true;//false;//
				
    			this.glscene.add(mesh);
    			this.doors.push(mesh);

    			// arrange in a grid
    			//mesh.position.x = 10.00 + (i % len) * (door.width + door.depth);
    			//mesh.position.y = 0 + Math.floor(i / len) * -(door.height + door.depth);
    			////////////////
    			//mesh.position.x = -22.35+(i % len) * (door.width + door.depth + 4);
    			mesh.position.x = -22.5+(i % len) * (door.width + door.depth + 3.85);
    			mesh.position.y = 1.55 + Math.floor(i / len) * -(door.height + door.depth);
    			mesh.position.z = -15.85;
    			
    			mesh.name = "door_B"+ i;
    			
				//////////////////////////////
				var label = createLabel(this.door_name2[i],"yellow","blue",20,128,32,true);
				//label.scale.set(1,0.25,1);
				//label.scale.set(4,2,4);
				label.scale.set(4,1,0);
    			//label.position.set(1.25,1.75,-2.4);
    			label.position.set(1.25,1.25,-2);
    			
    			//////////////////////////////    			
    			mesh.add( label );    			
			}
			
		}
		/////////////////////////////////////////////////////////////////////////////////
		update(dt)
		{	super.update(dt);
			
			var time = Date.now() * 0.00001;
			//var time = dt;//*0.0001;//window.performance.now()*0.00001;//
			this.cam = this.msmapp.camera();
			
			//TWEEN.update(time);
			TWEEN.update();
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
		{	//super.onDocumentClick();
  
		    var degToRad    = Math.PI / 180;

			try
			{	// make clicked things open/close with a tweened animation
		    	//throw is the only way to stop foreach loop!!!
    			this.msmapp.intersects.forEach(clickedObject => 
    			{	const name = clickedObject.object.name;

    				var isFirstContact=false;
    				if(name=="door_A0"||name=="door_A1"||name=="door_A2"||name=="door_A3"||name=="door_A4"||name=="door_A5"||name=="door_A6"||
        			name=="door_B0"||name=="door_B1"||name=="door_B2"||name=="door_B3"||name=="door_B4"||name=="door_B5"||name=="door_B6")    
    				{   if(isFirstContact===false)  
        				{	isFirstContact=true;
            				var targetAngle = (clickedObject.object.rotation.y === -80 * degToRad) ? 0 : -80 * degToRad;
            				this.mytween = new TWEEN.Tween(clickedObject.object.rotation).easing(TWEEN.Easing.Circular.Out)
                                                                        				 .to({ y: targetAngle}, 500)
                                                                        				 .start();
            				this.door_name = name;
            				console.log("door="+name);

            				this.mytween.onComplete(() => 
            				{	console.log('door='+this.door_name+' is done!! ');
            					if(clickedObject.object.rotation.y === -80 * degToRad)
            					{	this.mytween = new TWEEN.Tween(clickedObject.object.rotation).easing(TWEEN.Easing.Circular.Out)
                                                                            					 .to({ y: 0}, 500)
                                                                            					 .start();
									switch(this.door_name)
									{	case "door_A0":		this.msmapp.toggleScene(0);break;
										case "door_A1":		this.msmapp.toggleScene(1);break;
										case "door_A2":		this.msmapp.toggleScene(2);break;
										case "door_A3":		this.msmapp.toggleScene(3);break;
										case "door_A4":		this.msmapp.toggleScene(4);break;
										case "door_A5":		this.msmapp.toggleScene(5);break;
										case "door_A6":		this.msmapp.toggleScene(6);break;

										case "door_B0":		this.msmapp.toggleScene(7+0);break;
										case "door_B1":		this.msmapp.toggleScene(7+1);break;
										case "door_B2":		this.msmapp.toggleScene(7+2);break;
										case "door_B3":		this.msmapp.toggleScene(7+3);break;
										case "door_B4":		this.msmapp.toggleScene(7+4);break;
										case "door_B5":		this.msmapp.toggleScene(7+5);break;
										case "door_B6":		this.msmapp.toggleScene(7+6);break;
									}
    	        				}
        	    			});
          
        					throw 100;	//throw is the only way to stop foreach loop!!!
            				//return;
	        			}  
    				}            
    			});
			}    
			catch (e) 
			{	//if (e !== 100) throw e;
			}
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
    


