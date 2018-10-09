import * as THREE from 'three';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import GeneralLights from './GeneralLights';

import goldenTexture from '../../../assets/images/materials/golden.jpg';

export default (canvas) => {

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
  const sceneSubjects = createSceneSubjects(scene, camera);
  let material;
  let textures = {
    origin: {
      texture: null,
      properties: {},
    },
    golden: {
      texture: goldenTexture,
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
  let passTime = 0;
  let animation = false;

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

  function createSceneSubjects(scene, camera) {
    const sceneSubjects = [
      new GeneralLights(scene, camera),
    ];

    return sceneSubjects;
  }

  function update() {
    const time = clock.getDelta();

    if (animation) {
      passTime += time;
      if (passTime / 3.75 >= 4) {
        passTime = 0;
      }
      camera.position.x = 400 * Math.sin(passTime / 3.75 * Math.PI / 2) ;
      camera.position.z = Math.abs(400 * Math.cos(passTime / 3.75 * Math.PI / 2));
      camera.lookAt(origin);
    } else {
      camera.position.set(0, 0, 400);
      camera.lookAt(origin);
    }

    for(let i=0; i<sceneSubjects.length; i++)
      sceneSubjects[i].update(time, camera);

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
      .load(data.mtl, function ( materials ) {
        materials.preload();
        new OBJLoader()
          .setMaterials(materials)
          .setPath(data.path)
          .load(data.obj, function ( object ) {
            object.traverse(function(child) {
              if (child instanceof THREE.Mesh) {
                material = child.material;
                textures.origin.texture = data.path + data.img;
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
            new THREE.TextureLoader().load(textures.golden.texture, function(texture) {
              material.map = texture;
              for(let key in textures.golden.properties) {
                material[key] = textures.golden.properties[key];
              }
              for (let i = scene.children.length - 1; i >= 0 ; i--) {
                let child = scene.children[i];
                if ( child.type === 'Group' ) {
                  scene.remove(child);
                }
              }
              scene.add( object );
              passTime = 0;
              animation = true;
            });
          });
      });
  }

  function updateTexture(textureName) {
    let name = 'origin';

    switch(textureName) {
      case 'golden':
        name = textureName;
        break;
      default:
        name = 'origin';
    }

    new THREE.TextureLoader().load(textures[name].texture, function(texture) {
      material.map = texture;
      for(let key in textures[name].properties) {
        material[key] = textures[name].properties[key];
      }
      update();
    });
  }

  function stopAnimation() {
    animation = false;
    passTime = 0;
    update();
  }

  return {
    update,
    onWindowResize,
    updateTexture,
    loadModels,
    stopAnimation,
  };
};
