import * as THREE from 'three';
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import utils
import createPlanetSlider from './createPlanetSlider';
import createPerceptronControls from './createPerceptronControls';


// this is a utility function load models - takes in scene and returns array of models

const loadModels = (mainScene) => {

    let preloader = document.getElementById('preloader');

    // use default loading manager to disable preloader when all models loaded
    THREE.DefaultLoadingManager.onLoad = () => {
        setTimeout(() => {
            // preloader has 1s transition for opacity
            preloader.style.opacity = 0;
        }, 0);
        setTimeout(() => {
            // remove from DOM after 1s transition[]
            preloader.remove();
        }, 1500)
    }

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
    fbxloader.load('./assets/solar-system/new-solar-system.fbx', (model) => {

        // function to create a slider to control orbit animation
        createPlanetSlider(mainScene, model);
        
        // push to array of models
        model.rotateY(-30);
        modelsArray[1] = model;
    })


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

    // return array of models to ThreeComponent.jsx
    return modelsArray;

}

export default loadModels;