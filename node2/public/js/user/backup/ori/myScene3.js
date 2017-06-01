       class CScene3 extends MSMScene
        {	constructor(msmapp) 
            {   super(msmapp,msmapp.width,msmapp.height);
			    
                //this.game   = g;
                //this.scene  = new THREE.Scene;                          
                //this.camera = new THREE.PerspectiveCamera(62, this.game.width/ this.game.height, 1, 1000);
                //this.camera.position.set(0, 0, 5);
                    
                //var light   = new THREE.DirectionalLight(0xFFFFFF);
                //light.position.set(1, 1, 1);
                //this.scene.add(light);
                    
                this.obj    = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ambient: 0xFFFFFF}));
                this.glscene.add(this.obj);
            }

            init()
            {
            }
            
	        update() 
            {   super.update();
                this.obj.rotation.y += THREE.Math.degToRad(360 / (this.msmapp.fps));
                
                var campos = this.cam.getWorldPosition();
                this.msmapp.updateOtherPlayers(campos);
                
                return [[this.glscene, this.cam],[this.cssscene, this.cam]];
            };

        }
            
        class CScene4 extends MSMScene
        {	constructor(msmapp) 
            {   super(msmapp,msmapp.width,msmapp.height);

                //this.game   = g;
                //this.scene  = new THREE.Scene;
                //this.camera = new THREE.PerspectiveCamera(62, this.game.width/ this.game.height, 1, 1000);
                //this.camera.position.set(0, 0, 5);
                    
                //var light   = new THREE.DirectionalLight(0xFFFFFF);
                //light.position.set(1, 1, 1);
                //this.scene.add(light);
                    
                this.obj    = new THREE.Mesh(new THREE.CubeGeometry(2,2,2), new THREE.MeshStandardMaterial({ambient: 0x0000FF}));
                this.glscene.add(this.obj);
            }

            init()
            {
            }

	        update() 
            {   super.update();
                this.obj.rotation.y += THREE.Math.degToRad(360 / (this.msmapp.fps));

                var campos = this.cam.getWorldPosition();
                this.msmapp.updateOtherPlayers(campos);

                return [[this.glscene, this.cam],[this.cssscene, this.cam]];
            };

            //return Scene;
        }