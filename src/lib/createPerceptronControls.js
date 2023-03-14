import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
// util
import tweenCamera from './tweenCamera';
// descriptions
import perceptronDescriptions from './perceptronDescriptions';


const createPerceptronControls = (mainScene, perceptronModel) => {

    // TWEEN camera arrays (indexes match button name and value indexes for use in loops)

    // lookAt targets
    const wideCamTarget = new THREE.Vector3(200, 0, 0);
    const inputCamTarget = new THREE.Vector3(0, 0, 0);
    const hiddenCamTarget = new THREE.Vector3(200, 100, 0);
    const wbCamTarget = new THREE.Vector3(100, 200, 0);
    const activationCamTarget = new THREE.Vector3(150, 250, 0);
    const outputCamTarget = new THREE.Vector3(450, 75, 0);

    // camera positions
    const wideCamPos = { z: 600, y: 250, x: 200, lookAt: wideCamTarget };
    const inputCamPos = { z: 400, y: 75, x: -200, lookAt: inputCamTarget };
    const hiddenCamPos = { z: 300, y: 140, x: 200, lookAt: hiddenCamTarget };
    const wbCamPos = { z: 80, y: 200, x: 100, lookAt: wbCamTarget };
    const activationCamPos = { z: 100, y: 250, x: 150, lookAt: activationCamTarget};
    const outputCamPos = { z: 350, y: 75, x: 450, lookAt: outputCamTarget };

    // camera positions array
    let camPositions = [
        wideCamPos,
        inputCamPos,
        hiddenCamPos,
        wbCamPos,
        activationCamPos,
        outputCamPos
    ]

    // Button arrays (indexes match camera position arrays for use in loops)
    let buttonNames = ["description", "input layer", "hidden layers", "weights & biases", "activation function", "output layers"]
    let buttonValues = ["wide", "input", "hidden", "wb", "activation", "output"];

    // loops to create buttons and listeners
    let buttonsPanel = document.getElementById('pButtonsPanel');

    for(let i = 0; i < buttonNames.length; i++){
        let option = document.createElement('option');
        option.classList.add('perceptron-view-button');
        option.innerHTML = buttonNames[i];
        option.value = buttonValues[i];
        buttonsPanel.appendChild(option);
    }

    // LISTENER FOR SELECT

    let description = document.querySelector('.model-description');

    let viewSelect = document.getElementById('pButtonsPanel');
    viewSelect.addEventListener('change', (e) => {
        // switch or if statement to check for value, then start correct tween
        if(e.target.value == "wide"){
            tweenCamera(mainScene, wideCamPos, 2000);
            description.innerHTML = perceptronDescriptions[0];
        } else if (e.target.value == "input"){
            tweenCamera(mainScene, inputCamPos, 2000);
            description.innerHTML = perceptronDescriptions[1];
        } else if (e.target.value == "hidden"){
            tweenCamera(mainScene, hiddenCamPos, 2000);
            description.innerHTML = perceptronDescriptions[2];
        } else if (e.target.value == "wb"){
            tweenCamera(mainScene, wbCamPos, 2000);
            description.innerHTML = perceptronDescriptions[3];
        } else if (e.target.value == "activation"){
            tweenCamera(mainScene, activationCamPos, 2000);
            description.innerHTML = perceptronDescriptions[4];
        } else if (e.target.value == "output"){
            tweenCamera(mainScene, outputCamPos, 2000);
            description.innerHTML = perceptronDescriptions[5];
        } 
    })


}

export default createPerceptronControls;