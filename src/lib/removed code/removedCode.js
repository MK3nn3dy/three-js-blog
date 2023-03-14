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



// MY OLD CODE FOR MOVING CAMERA:

  // create tween from original camera position
  const fromOriginalTween = new TWEEN.Tween(originalCamPos);

  // define a move to wide position over 2 secs
  fromOriginalTween.to(wideCamPos, 2000);

  // on update 
  fromOriginalTween.onUpdate(function(object){
      // change camera co-ords to updated object co-ords
      mainScene.camera.position.z = object.z;
      mainScene.camera.position.x = object.x;
      mainScene.camera.position.y = object.y;
  })


  // old code to import second model as FBX - changed to GLB for performance
  // this required some changes to createPlanetSlider, mainly changing model to model.scene, and accessing the 0th animation instead of the 1st

  // model 2 (FBX, allows C4D animation takes)
  const fbxloader = new FBXLoader();
  fbxloader.load('./assets/solar-system/new-solar-system.fbx', (model) => {

      // function to create a slider to control orbit animation
      createPlanetSlider(mainScene, model);
      
      // push to array of models
      model.rotateY(-30);
      modelsArray[1] = model;
  })

  // old code for importing perceptron as fbx, changed to glb for performance
  // importing third model as fbx - no changes needed in createPerceptronConrols 
  // as tweenCamera is called with the whole scene, just like an FBX, so no change to mainScene.scene here.
    
  let fbxloader2 = new FBXLoader();
  // perceptron
  fbxloader2.load('./assets/perceptron/perceptron.fbx', (perceptronModel) => {

      // create mixer on scene
      mainScene.mixer2 = new THREE.AnimationMixer(perceptronModel);
      // define animations
      const fullForwardPass = mainScene.mixer2.clipAction(perceptronModel.animations[0]);
      fullForwardPass.play();

      // function to load animation and create controls for it
      createPerceptronControls(mainScene, perceptronModel);

      // push to array of models
      modelsArray[2] = perceptronModel;
  }) 