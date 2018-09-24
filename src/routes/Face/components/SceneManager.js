import * as THREE from 'three';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import GeneralControls from './GeneralControls';
import GeneralLights from './GeneralLights';

import texture0 from '../../../assets/images/materials/GoodwoodFOStexture/head3d.jpg';

export default (canvas, data) => {

  const clock = new THREE.Clock();
  const origin = new THREE.Vector3(0, 0, 0);

  const screenDimensions = {
    width: canvas.width,
    height: canvas.height
  }

  const scene = buildScene();
  const renderer = buildRender(screenDimensions);
  renderer.setClearColor(scene.fog.color);
  const camera = buildCamera(screenDimensions);
  scene.add(camera);
  const sceneSubjects = createSceneSubjects(scene, camera);
  let material;
  let textures = {
    origin: {
      texture: null,
      properties: {},
    },
    goodwood: {
      texture: texture0,
      properties: {
        shininess: 65,
        reflectivity: 0.47,
        bumpScale: 0.49,
        opacity: 1,
        refractionRatio: 1 / 1.281,
      },
    },
  };

  loadModels(scene);

  function buildScene() {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xffffff, 0.0003);

    return scene;
  }

  function buildRender({ width, height }) {
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
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

    camera.position.set(0, 100, 300);
    camera.lookAt(origin);

    return camera;
  }

  function createSceneSubjects(scene, camera) {
    const sceneSubjects = [
      new GeneralLights(scene),
      new GeneralControls(camera, canvas)
    ];

    return sceneSubjects;
  }

  function update() {
    const time = clock.getDelta();

    for(let i=0; i<sceneSubjects.length; i++)
      sceneSubjects[i].update(time);

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

  function loadModels(scene) {
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
                  shininess: material.shininess,
                  reflectivity: material.reflectivity,
                  bumpScale: material.bumpScale,
                  opacity: material.opacity,
                  refractionRatio: material.refractionRatio,
                };
              }
            });
            scene.add( object );
          });
      });
  }

  function updateTexture(textureName) {
    let name = 'origin';

    switch(textureName) {
      case 'goodwood':
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

  return {
    update,
    onWindowResize,
    updateTexture,
  };
};
