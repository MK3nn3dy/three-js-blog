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
        console.log(gltfScene.scene);
        // add first model
        mainScene.scene.add(gltfScene.scene);
    });


    // model 2 (FBX, allows C4D animation takes)
    const fbxloader = new FBXLoader();
    fbxloader.load('./assets/solar-system/solarsystem-extended.fbx', (model) => {

        // create mixer on scene
        mainScene.mixer = new THREE.AnimationMixer(model);
        // define animations
        const planetSpinAnimation = mainScene.mixer.clipAction(model.animations[1]);
        planetSpinAnimation.play();
        // Create a slider element
        const slider = document.createElement('input');
        slider.setAttribute("id", "planet-slider");
        slider.type = 'range';
        slider.min = 0;
        slider.max = 8; // length of animation in seconds
        slider.step = 0.26; // length of animation divided by frames per second (8/30) for smooth stepping
        slider.value = 0;
        
        // Attach an event listener to the slider
        slider.addEventListener('input', () => {
            // Set the current time of the animation
            planetSpinAnimation.time = slider.value;
        
            // Update the animation mixer
            mainScene.mixer.update(0);
        });
        
        // Add the slider to the HTML document
        let sliderContainer = document.getElementById('slider-container');
        sliderContainer.appendChild(slider);
        // push to array of models
        model.rotateY(-30);
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