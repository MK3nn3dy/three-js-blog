import * as THREE from 'three';
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// utility function load models - takes in scene and returns array of models

const loadModels = (mainScene) => {

    // initialise array for 3D models
    let modelsArray = [];

    // load models
    // model 1 (GLTF)
    const glftLoader = new GLTFLoader();
    glftLoader.load('./assets/city-street/city-baked.glb', (gltfScene) => {
        // push to array of models
        modelsArray[0] = gltfScene.scene;
        // add first model
        mainScene.scene.add(gltfScene.scene);
    });


    // model 2 (FBX, allows C4D animation takes)
    const fbxloader = new FBXLoader();
    fbxloader.load('./assets/solar-system/solarsystem.fbx', (model) => {
        // create mixer on scene
        mainScene.mixer = new THREE.AnimationMixer(model);
        // define animations
        // const planetSpinAnimation = mainScene.mixer.clipAction(model.animations[1]);
        // console log to see animations for debugging. Remember index 0 of this array is "Main" in Cinema 4D which has no animation.
        // "Takes" (Different animations) start at index 1 here
        console.log(model);
        // planetSpinAnimation.play();
        // push to array of models
        modelsArray[1] = model;
    })


    // test sphere for third model
    const sphereShape2 = new THREE.SphereGeometry(200);
    const sphereMaterial2 = new THREE.MeshBasicMaterial({
        color: 0x888888
    });
    const sphereMesh2 = new THREE.Mesh(sphereShape2, sphereMaterial2);
    // push to array of models
    modelsArray[2] = sphereMesh2;[]

    return modelsArray;

}

export default loadModels;