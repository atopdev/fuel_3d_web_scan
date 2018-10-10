import * as THREE from 'three';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import GeneralLights from './GeneralLights';
import GeneralControls from './GeneralControls';

import goldenTexture from '../../../assets/images/materials/golden.jpg';
import wineTexture from '../../../assets/images/materials/wine.jpg';

export default (canvas, loadFace) => {
  const clock = new THREE.Clock();
  const origin = new THREE.Vector3(0, 0, 0);

  const screenDimensions = {
    width: canvas.width,
    height: canvas.height
  }

  const scene = buildScene();
  const renderer = buildRender(screenDimensions);
  renderer.setClearColor(0x000000, 0);

  const camera = buildCamera(screenDimensions);
  scene.add(camera);

  const lightObject = new GeneralLights(scene, camera);
  const controlObject = new GeneralControls(camera, canvas, updateTexture, loadFace);

  let textures = {
    origin: {
      file: null,
      properties: {},
    },
    golden: {
      file: goldenTexture,
      properties: {
        shininess: 0.65,
        reflectivity: 0.47,
        bumpScale: 0.49,
        opacity: 1,
        refractionRatio: 1 / 1.281,
        wireframe: true,
      },
    },
    wine: {
      file: wineTexture,
      properties: {
        shininess: 0.65,
        reflectivity: 0.47,
        bumpScale: 0.49,
        opacity: 1,
        refractionRatio: 1 / 1.281,
        wireframe: true,
      },
    },
  };
  loadTextures();

  let material;
  let initialized = false;

  function buildScene() {
    const scene = new THREE.Scene();

    return scene;
  }

  function buildRender({ width, height }) {
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);

    return renderer;
  }

  function buildCamera({ width, height }) {
    const aspectRatio = width / height;
    const fieldOfView = 45;
    const nearPlane = 1;
    const farPlane = 2000;
    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

    camera.position.set(0, 0, 400);
    camera.lookAt(origin);

    return camera;
  }

  function update() {
    const time = clock.getDelta();

    lightObject.update(time, camera);
    controlObject.update(time, camera);

    renderer.render(scene, camera);
  }

  function onWindowResize() {
    const { width, height } = canvas;

    screenDimensions.width = width;
    screenDimensions.height = height;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }

  function loadModels(data) {
    new MTLLoader()
      .setCrossOrigin('')
      .setPath(data.path)
      .load('../head_mesh.mtl', function ( materials ) {
        materials.preload();
        new OBJLoader()
          .setMaterials(materials)
          .setPath(data.path)
          .load(data.obj, function ( object ) {
            object.traverse(function(child) {
              if (child instanceof THREE.Mesh) {
                material = child.material;
                textures.origin.file = data.path + data.img;
                textures.origin.properties = {
                  shininess: child.material.shininess,
                  reflectivity: child.material.reflectivity,
                  bumpScale: child.material.bumpScale,
                  opacity: child.material.opacity,
                  refractionRatio: child.material.refractionRatio,
                  wireframe: child.material.wireframe,
                };
              }
            });

            const lastTime = window.localStorage.getItem('fuel_3d_web_scan_last_time');
            const currentTime = Date.now();
            let timeInterval = currentTime - lastTime;
            if (!initialized || timeInterval >= 10000) {
              timeInterval = 0;
            } else {
              timeInterval = 10000 - timeInterval;
            }

            setTimeout(() => {
              initialized = true;
              for (let i = scene.children.length - 1; i >= 0 ; i--) {
                let child = scene.children[i];
                if ( child.type === 'Group' ) {
                  scene.remove(child);
                }
              }
              scene.add( object );
              updateTexture('golden');
            }, timeInterval);
          });
      });
  }

  function updateTexture(name) {
    if (!material) return;
    material.map = textures[name].texture;
    for(let key in textures[name].properties) {
      material[key] = textures[name].properties[key];
    }
    if (name === 'golden') {
      controlObject.reset();
    }
    controlObject.toggleRotation(true);
    update();
  }

  async function loadTextures() {
    let promises = [];
    for(let name in textures) {
      promises.push(new Promise((resolve, reject) => {
        if (name === 'origin') {
          resolve({ key: name, value: null });
        } else {
          new THREE.TextureLoader().load(textures[name].file, (texture) => {
            resolve({ key: name, value: texture });
          });
        }
      }));
    }
    const result = await Promise.all(promises);
    for(let texture of result) {
      textures[texture.key].texture = texture.value;
    }
  }

  return {
    update,
    onWindowResize,
    updateTexture,
    loadModels,
  };
};
