import * as THREE from 'three'

export default (scene, camera) => {

    const lightOut = new THREE.DirectionalLight(0xffffff, 1.15);
    lightOut.castShadow = false;
    lightOut.position.y = -100;
    lightOut.position.x = camera.position.x * 10;
    lightOut.position.z = camera.position.z * 10;

    scene.add(lightOut);

    function update(time, camera) {
      lightOut.position.y = -100;
      lightOut.position.x = camera.position.x * 10;
      lightOut.position.z = camera.position.z * 10;
    }

    return {
        update
    }
}
