import SceneManager from './SceneManager';

export default (container, data) => {
  const canvas = createCanvas(document, container);
  const sceneManager = new SceneManager(canvas, data);

  bindEventListeners();
  render();

  function createCanvas(document, container) {
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    return canvas;
  }

  function bindEventListeners() {
    window.onresize = resizeCanvas;
    resizeCanvas();
  }

  function resizeCanvas() {
    canvas.style.width = '100%';
    canvas.style.height= '100%';

    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    sceneManager.onWindowResize();
  }

  function render(time) {
    requestAnimationFrame(render);
    sceneManager.update();
  }

  return {
    updateTexture: sceneManager.updateTexture,
  };
};
