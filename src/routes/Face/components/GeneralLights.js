import * as THREE from 'three'

export default scene => {

    const lightOut = new THREE.DirectionalLight(0xffffff, 1.5);
    lightOut.castShadow = true;
    lightOut.position.set(500, 1000, 500);

    scene.add(lightOut);

    function update(time) {
    }

    return {
        update
    }
}
