// imports
import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import SceneInit from './lib/SceneInit';
import { GUI } from 'dat.gui';
// component imports
import Navbar from './components/Navbar';
import ModelDescription from './components/ModelDescription';

function App() {
  // when component renders, call SceneInit passing in HTML canvas
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    // call initialize and animate for first time
    test.initialize();
    test.animate();

    // declare scope variable for loaded model so it can be used outside of .load callback
    let loadedModel;

    const glftLoader = new GLTFLoader();
    
    glftLoader.load('./assets/city-scaled/city-scaled.glb', (gltfScene) => {
      // set the loaded model to the global variable
      loadedModel = gltfScene;
      gltfScene.scene.rotation.y = -45;
      // add loaded model to scene
      test.scene.add(gltfScene.scene);
    });

    // initialise dat.gui
    const gui = new GUI();


    // Playing around with making the model follow the mouse - Mat Kennedy
    /* window.addEventListener('mousemove', (event) => {
      loadedModel.scene.rotation.x = event.pageY/800;
      loadedModel.scene.rotation.y = event.pageX/800;
    }) */

  }, []);

  return (
    <div>
      <Navbar />
      <canvas id="myThreeJsCanvas" />
      <ModelDescription />
    </div>
  );
}

export default App;
