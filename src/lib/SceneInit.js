// imports
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

// class to initialise scene
export default class SceneInit {
  constructor(canvasId) {
    // minimum needed
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    // camera parameters
    this.fov = 70;
    this.nearPlane = 1;
    this.farPlane = 2000;
    this.canvasId = canvasId;

    // additional components.
    this.clock = undefined;
    this.stats = undefined;
    this.controls = undefined;

    // lighting
    this.ambientLight = undefined;
    this.directionalLight = undefined;
  }

  // initialise method
  initialize() {

    // create scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      1,
      3000
    );


    // camera position (specific to my scene, change here if needed) - Mat Kennedy
    // track out
    this.camera.position.z = 600;
    // raise
    this.camera.position.y = 400;

    

    // grab HTML canvas passed in to instantiation
    const canvas = document.getElementById(this.canvasId);
    

    // renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      // smooth edges
      antialias: true,
    });
    // set renderer background color
    this.renderer.setClearColor(0x111111, 0); // transparent (second arg), background is css
    // set renderer to client size as well as camera
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // append the renderer dom element to the html body
    document.body.appendChild(this.renderer.domElement);


    // create clock
    this.clock = new THREE.Clock();
    // create orbit controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 500;
    this.controls.maxDistance = 1500;
    // create status UI
    this.stats = Stats();
    // append stats UI
    document.body.appendChild(this.stats.dom);

    // if window resizes
    window.addEventListener('resize', () => this.onWindowResize(), false);
  
  }

  // animate method, called for first time in App.jsx
  // called recursively as requestAnimationFrame will only run this once on next paint
  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.stats.update();
    // this.controls.update();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  // when window resizes, update camera aspect, projection matrix, and renderer size
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
