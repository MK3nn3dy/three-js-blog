import { useEffect, useState } from 'react';
import SceneInit from '../lib/SceneInit';
import { GUI } from 'dat.gui';
import loadModels from '../lib/loadModels';
import { current } from '@reduxjs/toolkit';

const ThreeComponent = () => {

    // state (try to make part of redux state)
    let [ currentPost, setCurrentPost ] = useState(0);
    
    // when component renders, call SceneInit passing in HTML canvas
    useEffect(() => {

        // create scene
        let mainScene = new SceneInit('myThreeJsCanvas');
        mainScene.initialize();
        mainScene.animate();

        // load models to scene, returning array of model refs
        let modelsArray = loadModels(mainScene);

        // get next and prev arrows from DOM
        let nextArrow = document.getElementById('moveRight');
        nextArrow.addEventListener('click', (e) => {
            // if reach .length -1, go to 0
            if(currentPost === 2){
                setCurrentPost(currentPost = 0);
            } else {
                setCurrentPost(currentPost += 1);
            }
            // remove models
            modelsArray.forEach((model) => {
                mainScene.scene.remove(model);
            })
            mainScene.scene.add(modelsArray[currentPost])
            // reset controls
            mainScene.controls.reset();
            if(currentPost == 2){
                mainScene.controls.enablePan = false;
                mainScene.controls.minDistance = 80;
            } else {
                mainScene.controls.enablePan = true;
                mainScene.controls.minDistance = 350;
            }
        })

        let prevArrow = document.getElementById('moveLeft');
        prevArrow.addEventListener('click', (e) => {
            // if reach 0 go to .length - 1
            if(currentPost === 0){
                setCurrentPost(currentPost = 2);
            } else {
                setCurrentPost(currentPost -= 1);
            }
            // remove models
            modelsArray.forEach((model) => {
                mainScene.scene.remove(model);
            })
            mainScene.scene.add(modelsArray[currentPost]);
            // reset controls
            mainScene.controls.reset();
            if(currentPost == 2){
                mainScene.controls.enablePan = false;
                mainScene.controls.minDistance = 80;
            } else {
                mainScene.controls.enablePan = true;
                mainScene.controls.minDistance = 350;
            }
        })
    
        // initialise dat.gui if needed
        // const gui = new GUI();

    }, []);
    
    return (
        
        <canvas id="myThreeJsCanvas" />
        
    )

}

export default ThreeComponent;