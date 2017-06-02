"use strict"

    class CScene1 extends MSMScene
    {	constructor(msmapp) 
        {   super(msmapp,msmapp.width,msmapp.height);
        }

		init() 
		{	//super.init();
			//super.createStdLight();    			
			//////////////////////////////////////////////////////////////////////
			//this.msmapp.glrenderer.setClearColor(this.glscene.fog.color);
			//this.glrenderer.autoClear = false;
			//this.glrenderer.setClearColor(0x000000, 0.0);
  
			//super.enableShadow();
			//var isShadow=true;
			//super.createStdLight(isShadow);
			//super.createStdLight(this.msmapp.isShadow);
			//super.createStdLight(true);

			//super.createHelper();
			
			this.loadEnvironment();
			
            return this;

		}
  
		loadEnvironment() 
		{	//var sphere_geometry = new THREE.SphereGeometry( 1 );
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
			
			//this.createShaderSkybox();
			/////////////////////////////////////////////////////////
			this.pivot			= new THREE.Object3D();
			this.pivot.name 	= 'Pivot';
			this.glscene.add( this.pivot );
			
			//////////////////////////////////////////////////////////

			//setTimeout(this.create_pivot.bind(this),0);
			setTimeout(this.create_blocker.bind(this),0);
			setTimeout(this.create_plane.bind(this),0);
			//setTimeout(this.create_Minecraft.bind(this),0);

			//setTimeout(this.create_videostuff.bind(this),0);
			setTimeout(this.create_css3Diframe_rchat.bind(this),0);
			setTimeout(this.create_house1.bind(this),0);
			setTimeout(this.create_particle1.bind(this),0);
			setTimeout(this.create_doors.bind(this),0);
		}

	    create_css3Diframe_rchat()
	    {	this.css3Diframe = new CElement("https://rchat.1sekolah.xyz",600,120,600, -Math.PI/2 );
	    	this.cssgroup    = new THREE.Group();//new THREE.Object3D();//
			this.cssgroup.add( this.css3Diframe );
			this.cssscene.add( this.cssgroup );
	    }

		create_pivot()
		{	this.pivot			= new THREE.Object3D();
			this.pivot.name 	= 'Pivot';
			this.glscene.add( this.pivot );
		}
		
		create_plane()
		{	var anis = this.msmapp.getMaxAnisotropy();
			super.addMesh(new CPlane({width:1000,height:1000},anis));	
		}

		create_blocker()
		{	this.blocker = document.getElementById( 'blocker' );
			this.blocker.style.display = 'none';
			document.addEventListener( 'mousedown', function () { this.blocker.style.display = ''; }.bind(this));//,     false );
			document.addEventListener( 'mouseup',   function () { this.blocker.style.display = 'none'; }.bind(this));//, false );
		}
		
		create_house1()
		{	//var pos = {x:83,y:-3,z:66};
        	//this.mymodel_1  = new CLoadModel_Obj(this.glscene,'models/male02/','male02_dds.mtl','male02.obj',pos);
        	//this.kiosk  = new CLoadModel_Obj(this.glscene,'models/kiosk/','Kiosk1.obj.mtl','Kiosk1.obj',pos);
        	//this.kiosk  = new CLoadModel_Obj(this.glscene,'models/newstand/','NewsStand.obj.mtl','NewsStand.obj',pos);
        	
        	//good!
        	//var pos1	= {x:83,y:-3.5,z:66};
        	//var scale1  = {x:2,y:2,z:2};
        	//this.kiosk  = new CLoadModel_Obj(this.glscene,'models/newstand/','NewsStand.obj.mtl','NewsStand.obj',pos1,scale1);
        	//this.kiosk  = new CLoadModel_Obj2(this.pivot,this.glscene,'models/newstand/','NewsStand.obj.mtl','NewsStand.obj',pos1,scale1);

        	//var pos1	= {x:109,y:-2.15,z:62};
        	//var scale1  = {x:0.05,y:0.05,z:0.05};
        	//this.house = new CLoadModel_Obj(this.glscene,'models/house_02/','House_02.obj.mtl','House_02.obj',pos1,scale1);
        	
        	//var pos1	= {x:109,y:-3,z:62};
        	//var scale1  = {x:1,y:1,z:1};
        	//this.StreetScene = new CLoadModel_Obj(this.glscene,'models/StreetScene/','StreetScene.obj.mtl','StreetScene.obj',pos1,scale1);

        	//var pos1	= {x:109,y:-5,z:62};
        	//var scale1  = {x:0.1,y:0.1,z:0.1};
        	//this.TheCity = new CLoadModel_Obj(this.glscene,'models/TheCity/','TheCity.obj.mtl','TheCity.obj',pos1,scale1);

        	//var pos1	= {x:109,y:0,z:62};
        	//var scale1  = {x:1,y:1,z:1};
        	//this.cs_italy = new CLoadModel_Obj(this.glscene,'models/cs_italy/','cs_italy.obj.mtl','cs_italy.obj',pos1,scale1);

        	//var pos1	= {x:109,y:0,z:62};
        	//var scale1  = {x:1,y:1,z:1};
        	//this.kiosk2	= new CLoadModel_Obj(this.glscene,'models/kiosk2/','CoffeeKiosk.obj.mtl','CoffeeKiosk.obj',pos1,scale1);

        	//this.label   = createLabel(this.glscene,"bodoooooo", 40) ;
        	//this.glscene.add(createLabel(this.glscene,"bodoooooo", 40));

			////////////////////////////////////////////////////////////////////

        	//var pos2		= {x:50,y:-1.5,z:50};		//new THREE.Vector3(50,-2,50);	//
        	//var scale2  	= {x:2,y:2,z:2};		//new THREE.Vector3(2,2,2);		//
        	//this.newstand   = new CLoadModel_WWObj2(this.pivot,this.glscene,'newstand','models/newstand/','NewsStand.obj.mtl','NewsStand.obj',pos2,scale2);
			
        	//var pos3	= {x:6,		y:6.6,		z:85};		
        	//var rot3	= {x:0,		y:Math.PI,z:0};		
        	//var scale3  = {x:0.02,	y:0.02,		z:0.02};		
        	//this.house1 = new CLoadModel_WWObj2(this.pivot,this.glscene,'house1','models/house1/','house1.mtl','house1.obj',pos3,rot3,scale3);

        	//var pos4	= {x:6,		y:-25,		z:85};		
        	//var rot4	= {x:0,		y:Math.PI,  z:0};		
        	//var scale4  = {x:0.02,	    y:0.02,		z:0.02};		
        	//this.cs_italy = new CLoadModel_WWObj2(this.pivot,this.glscene,'cs_italy','models/cs_italy/','cs_italy.obj.mtl','cs_italy.obj',pos4,rot4,scale4);
			///////////////////////////////////////
        	var pos			= {x:6,			y:-1.59,		z:85};		
        	var rot			= {x:0.000355,	y:Math.PI,  z:-0.004};
        	var scale		= {x:12,		y:12,		z:12};		
        	this.buidling	= new CLoadModel_WWObj2(this.pivot,this.glscene,'building4','models/building4/','building4.obj.mtl','building4.obj',pos,rot,scale);
			
		}
		
		create_particle1()
		{	this.params1=	[	[ [1.0,  0.2,  0.5], texLoader.load("textures/sprites/snowflake1.png"), 0.8],
								[ [0.95, 0.1,  0.5], texLoader.load("textures/sprites/snowflake2.png"), 0.5],
								[ [0.90, 0.05, 0.5], texLoader.load("textures/sprites/snowflake3.png"), 0.3],
								[ [0.85, 0,    0.5], texLoader.load("textures/sprites/snowflake4.png"), 0.2],
								[ [0.80, 0,    0.5], texLoader.load("textures/sprites/snowflake5.png"), 0.1]
							];
        						
        	this.mysp		= new CSpritePoint(this.glscene,this.params1);
		}
		
		create_Minecraft()
		{	var anis = this.msmapp.getMaxAnisotropy();
			this.mymc = new CMinecraft(100,100,anis);
			this.glscene.add(this.mymc.getMesh());
		}

		createShaderSkybox()
		{	/*
			// prepare ShaderMaterial without textures
			var vertexShader	= document.getElementById('sky-vertex').textContent, 
			    fragmentShader  = document.getElementById('sky-fragment').textContent;
			    
			var uniforms = {	topColor:		{ type: "c", value: new THREE.Color(0x0055ff)}, 
								bottomColor:	{ type: "c", value: new THREE.Color(0xffffff)},
								offset: 		{ type: "f", value: 5}, 
								exponent:		{ type: "f", value: 0.6}
							}
			this.skyMaterial	= new THREE.ShaderMaterial({vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide, fog: false});
			
			// create Mesh with sphere geometry and add to the scene
			this.skyBox 		= new THREE.Mesh( new THREE.SphereGeometry(250, 60, 40), this.skyMaterial);
			this.skyBox.position.copy( player.getPosition() );
			this.glscene.add(this.skyBox);
			*/

			var size = {radius:250,widthSegments:60,heightSegments:40};
			this.mysky = new CSKyboxGradient(size);
			
			this.glscene.add(this.mysky.getMesh());
		}
		
		create_doors()
		{	this.doors = [];
			//var door		= {width: 100,height: 100,depth: 10}
			var door		= {width: 2.5,height: 4,depth: 0.15}
    		// use geometry for a door mesh many times
			var geometry	= new THREE.CubeGeometry(door.width, door.height, door.depth);
			// this offsets the pivot point so doors don't rotate around their center
			geometry.applyMatrix(new THREE.Matrix4().makeTranslation(door.width / 2, 0, 0));

			// make doors!
			//for (let i = 0; i < 30; i++) 
			for (let i = 0; i < 10; i++) 
			{	let material		= new THREE.MeshLambertMaterial({color: 0xffffff * Math.random()});
    			let mesh			= new THREE.Mesh(geometry, material);
    			mesh.castShadow		= true;			
				mesh.receiveShadow	= false;//true;//
				
    			this.glscene.add(mesh);
    			this.doors.push(mesh);

    			// arrange in a grid
    			mesh.position.x = 2.00 + (i % 10) * (door.width + door.depth);
    			mesh.position.y = 2.00 + Math.floor(i / 10) * -(door.height + door.depth);
    			
    			mesh.name = "door"+ i;
			}
		}
		/////////////////////////////////////////////////////////////////////////////////
		update()
		{	super.update();
			
			var time = Date.now() * 0.00001;
			
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
				{	if(this.mymc)
					{	var pos  = gamemodel.player.getPosition();		// this.msmapp.mygamemodel.player.getPosition();
						var newh = this.mymc.getY( Math.round(pos.x),Math.round(pos.z))+1.07;
				
						//if(this.counter++>1)
						//{	this.counter = 0;
						//	console.log("pos.x="+Math.round(pos.x)+" pos.y="+this.mymc.getY( Math.round(pos.x), Math.round(pos.y) )+" pos.z="+Math.round(pos.z));
						//}	
				
						if(newh>this.controls.GroundHeight && this.controls.isOnGround())
						{	//this.msmapp.mygamemodel.player.setPositionY(pos.y+1.25);
							gamemodel.player.setPositionY(pos.y+1.25);
						
							this.controls.StartJump();
						}
						else 
						{	this.controls.GroundHeight = newh;
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

					if(this.css3Diframe)
					{	//this.css3Diframe.lookAt (player.getPosition());
						//this.css3Diframe.lookAt (this.cam.getWorldPosition());
						this.css3Diframe.lookAt (campos);
					
						//this.css3Diframe.quaternion.copy( this.cam.quaternion );
						this.css3Diframe.position.x = this.cam.position.x+800;
					}
					
					//this.light_.followTarget(this.glscene,player.getPosition(),'player_moviemesh');
					//var pos = player.getPosition();
					//this.light.position.set(pos.x,10,pos.z-10);
					//this.light.target	= this.glscene.getObjectByName('player_moviemesh');

					//if(this.mysky)this.mysky.update(player.getPosition());
			
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
		
		exit()
		{	super.exit();
			this.msmapp.exit();
		}
    }	
    


