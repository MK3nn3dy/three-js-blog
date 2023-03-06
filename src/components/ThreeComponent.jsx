import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import SceneInit from '../lib/SceneInit';
import { GUI } from 'dat.gui';


const ThreeComponent = () => {


    // state (try to make part of redux state)
    let [ currentPost, setCurrentPost ] = useState(0);


    // when component renders, call SceneInit passing in HTML canvas
    useEffect(() => {

        let mainScene = new SceneInit('myThreeJsCanvas');
        // call initialize and animate for first time
        mainScene.initialize();
        mainScene.animate();

        // global array for 3D models
        let modelsArray = [];

        // load model
        const glftLoader = new GLTFLoader();
        
        glftLoader.load('./assets/city-street/city-baked.glb', (gltfScene) => {

        // push loaded scenes mesh to global array
        modelsArray[0] = gltfScene.scene;

        // add loaded model to scene
        mainScene.scene.add(gltfScene.scene);

        });


        // test sphere for second model
        const sphereShape = new THREE.SphereGeometry(200);
        const sphereMaterial = new THREE.MeshBasicMaterial({
            color: 0x555555
        });
        const sphereMesh = new THREE.Mesh(sphereShape, sphereMaterial);


        // test sphere for third model
        const sphereShape2 = new THREE.SphereGeometry(200);
        const sphereMaterial2 = new THREE.MeshBasicMaterial({
            color: 0x888888
        });
        const sphereMesh2 = new THREE.Mesh(sphereShape2, sphereMaterial2);

        // push test spheres to array of models
        modelsArray[1] = sphereMesh;
        modelsArray[2] = sphereMesh2;

        // debugging:
        console.log("The models array is: ", modelsArray); // corrent array of meshes

        // next and prev listeners
        let nextArrow = document.getElementById('moveRight');
        nextArrow.addEventListener('click', (e) => {

            // remove models
            modelsArray.forEach((model) => {
                mainScene.scene.remove(model);
            })

            if(currentPost === 2){
                // go to beginning
                setCurrentPost(currentPost = 0);
                mainScene.scene.add(modelsArray[currentPost])
            } else {
                // update current post and add to scene
                setCurrentPost(currentPost += 1);
                mainScene.scene.add(modelsArray[currentPost]) 
            }

        })

        let prevArrow = document.getElementById('moveLeft');
        prevArrow.addEventListener('click', (e) => {

            // remove models
            modelsArray.forEach((model) => {
                mainScene.scene.remove(model);
            })
            
            if(currentPost === 0){
                // go to end
                setCurrentPost(currentPost = 2);
                mainScene.scene.add(modelsArray[currentPost])
                
            } else {
                // update current post and add to scene
                setCurrentPost(currentPost -= 1);
                mainScene.scene.add(modelsArray[currentPost])
            }

        })
    
        // initialise dat.gui
        const gui = new GUI();

    }, []); // currentPost in dependency array to access updated state within useEffect
    
    return (
        
        <canvas id="myThreeJsCanvas" />
        
    )

}

export default ThreeComponent;