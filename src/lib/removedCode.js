// ------------------------------------------------//
// Removed code that may be needed for reference:  //
// ------------------------------------------------//

// these are the lines of code needed to add three js lights if not baking lights

// ambient light which is for the whole scene
this.ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
this.ambientLight.position.set(0, 90, 0);
// add to scene
this.scene.add(this.ambientLight);

// directional light 1 - front right 
this.directionalLight = new THREE.DirectionalLight(0x4488aa, 0.4);
// position
this.directionalLight.position.set(380, 300, 30);
// shadows
this.directionalLight.castShadow = true;
// lights shadow map size
this.directionalLight.shadow.mapSize.width = 512;
this.directionalLight.shadow.mapSize.height = 512;
this.directionalLight.shadow.camera.near = 0.5;
this.directionalLight.shadow.camera.far = 1000;
// size of shadow camera (reach of the light)
this.directionalLight.shadow.camera.top = 300;
this.directionalLight.shadow.camera.right = 300;
this.directionalLight.shadow.camera.bottom = -300;
this.directionalLight.shadow.camera.left = -300;
// add to scene
this.scene.add(this.directionalLight);



// helpers 
// ambient light helper

// directional light helper
const directionalLight1Helper = new THREE.DirectionalLightHelper(this.directionalLight, 5);
this.scene.add(directionalLight1Helper);
// directional light shadow camera helper
const directionalLightShadowHelper = new THREE.CameraHelper(this.directionalLight.shadow.camera);
this.scene.add(directionalLightShadowHelper);



// Code for city texture to be manually applied to material.map of the mesh:

// loader for backed city texture .TIF
const cityTexture = new THREE.TextureLoader();

// set models material map to the baked .TIF image
gltfScene.scene.children[0].material.map = cityTexture.load('./assets/city-scaled/city-texture.tif');



// Playing around with making the model follow the mouse - Mat Kennedy
window.addEventListener('mousemove', (event) => {
    loadedModel.scene.rotation.x = event.pageY/800;
    loadedModel.scene.rotation.y = event.pageX/800;
  })