import { useEffect, useState } from 'react';
import SceneInit from '../lib/SceneInit';
import { GUI } from 'dat.gui';
import loadModels from '../utils/loadModels';
import { useSelector } from 'react-redux';

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
            if(currentPost === modelsArray.length -1){
                setCurrentPost(currentPost = 0);
            } else {
                setCurrentPost(currentPost += 1);
            }
            // remove models
            modelsArray.forEach((model) => {
                mainScene.scene.remove(model);
            })
            mainScene.scene.add(modelsArray[currentPost])
        })

        let prevArrow = document.getElementById('moveLeft');
        prevArrow.addEventListener('click', (e) => {
            // if reach 0 go to .length - 1
            if(currentPost === 0){
                setCurrentPost(currentPost = modelsArray.length -1);
            } else {
                setCurrentPost(currentPost -= 1);
            }
            // remove models
            modelsArray.forEach((model) => {
                mainScene.scene.remove(model);
            })
            mainScene.scene.add(modelsArray[currentPost]);
        })
    
        // initialise dat.gui if needed
        // const gui = new GUI();

    }, []); // currentPost in dependency array to access updated state within useEffect
    
    return (
        
        <canvas id="myThreeJsCanvas" />
        
    )

}

export default ThreeComponent;