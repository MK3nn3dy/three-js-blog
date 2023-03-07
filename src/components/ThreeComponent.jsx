import { useEffect, useState } from 'react';
import SceneInit from '../lib/SceneInit';
import { GUI } from 'dat.gui';
import loadModels from '../utils/loadModels';


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

            // remove models
            modelsArray.forEach((model) => {
                mainScene.scene.remove(model);
            })

            if(currentPost === 2){
                // go to beginning
                // enale controls
                setCurrentPost(currentPost = 0);
                mainScene.scene.add(modelsArray[currentPost])
                mainScene.controls.enabled = true;
            } else {
                // update current post and add to scene
                // disable orbitControls if we're on model at index 1 (scroll animation)
                setCurrentPost(currentPost += 1);
                mainScene.scene.add(modelsArray[currentPost])
                if(currentPost === 1){
                    mainScene.controls.reset();
                    mainScene.controls.enabled = false;
                    // call imported function for scroll animations
                } else {
                    mainScene.controls.enabled = true;
                }
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
                // enale controls
                setCurrentPost(currentPost = 2);
                mainScene.scene.add(modelsArray[currentPost])
                mainScene.controls.enabled = true;
            } else {
                // update current post and add to scene
                // disable orbitControls if we're on model at index 1 (scroll animation)
                setCurrentPost(currentPost -= 1);
                mainScene.scene.add(modelsArray[currentPost])
                if(currentPost === 1){
                    mainScene.controls.reset();
                    mainScene.controls.enabled = false;
                    // call imported function for scroll animations
                } else {
                    mainScene.controls.enabled = true;
                }
            }
        })
    
        // initialise dat.gu[i
        const gui = new GUI();

    }, []); // currentPost in dependency array to access updated state within useEffect
    
    return (
        
        <canvas id="myThreeJsCanvas" />
        
    )

}

export default ThreeComponent;