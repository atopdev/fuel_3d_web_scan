import * as OrbitControls from 'three-orbitcontrols';

export default (camera, canvas, updateTexture, loadFace) => {
  const controls = new OrbitControls(camera, canvas);
  controls.maxDistance = 2000;
  controls.maxZoom = 100;
  controls.enableRotate = false;
  controls.autoRotateSpeed = -4.0;
  controls.autoRotate = false;
  let lastValue = controls.getAzimuthalAngle();
  let lastTexture = 'golden';

  function update(time) {
    if (Math.abs(controls.getAzimuthalAngle()) >= Math.PI / 2) {
      controls.autoRotateSpeed *= -1;
    }
    const newValue = controls.getAzimuthalAngle();
    if (lastValue < 0 && newValue > 0 && controls.autoRotateSpeed < 0) {
      toggleRotation(false);
      if (lastTexture === 'wine') {
        reset();
        loadFace();
      } else {
        lastValue = controls.getAzimuthalAngle();
        lastTexture = 'wine';
        updateTexture('wine');
      }
      return;
    }
    lastValue = newValue;
    controls.update(time);
  }

  function toggleRotation(flag) {
    controls.autoRotate = !!flag;
  }

  function reset() {
    lastValue = 0;
    lastTexture = 'golden';
    controls.reset();
  }

  return {
    update,
    toggleRotation,
    reset,
  }
}
