import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';


const tweenCamera = ( mainScene, targetPosition, duration ) => {

    // disable controls whilst tweening
    mainScene.controls.enabled = false;

    // first tween to move camera position
    let position = new THREE.Vector3().copy( mainScene.camera.position );

    let tween = new TWEEN.Tween( position )
        .to( targetPosition, duration )
        .easing( TWEEN.Easing.Back.InOut )
        .onUpdate( function () {
            mainScene.camera.position.copy( position );
        } )
        .onComplete( function () {
            // set final position to target position and enable controls when tween complete
            mainScene.camera.position.copy( targetPosition );
            mainScene.controls.enabled = true;
        } )
        .start();

    // second tween to move camera target
    let target = mainScene.controls.target;
    let newTarget = targetPosition.lookAt; 
    // the lookAt property on targetPosition is a vector3 declared in "createPerceptronControls" where this function is called

    let targetTween = new TWEEN.Tween( target )
        .to( newTarget, duration )
        .easing( TWEEN.Easing.Back.InOut )
        .onUpdate( function () {
            mainScene.camera.lookAt(target)
        })
        .onComplete( function () {
            mainScene.camera.lookAt(newTarget)
        })
        .start();
}

export default tweenCamera;