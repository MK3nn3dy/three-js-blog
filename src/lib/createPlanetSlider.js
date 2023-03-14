import * as THREE from 'three';

const createPlanetSlider = (mainScene, model) => {

    console.log("The GLB of the solar system is: ", model);

    // create mixer on scene
    mainScene.mixer1 = new THREE.AnimationMixer(model.scene);
    // define animations
    const planetSpinAnimation = mainScene.mixer1.clipAction(model.animations[0]);
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
        mainScene.mixer1.update(0);
    });
    
    // Add the slider to the HTML document
    let sliderContainer = document.getElementById('slider-container');
    sliderContainer.appendChild(slider);

}

export default createPlanetSlider;