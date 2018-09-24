import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';

export default (camera, canvas) => {
    const controls = new OrbitControls(camera, canvas);
    controls.target = new THREE.Vector3(0, 0, 0);
    controls.maxDistance = 2000;
    controls.enableZoom = true;

    function update(time) {
        controls.update(time);
    }

    return {
        update,
    }
}
