import Particle from './Particle';
import Stage from './Stage';

export default class WebGl {
  constructor() {
    // Debug
    // const gui = new dat.GUI();

    const stage = new Stage();
    stage.init();

    const particle = new Particle(stage);
    particle.init();

    window.addEventListener('resize', () => {
      stage.onResize();
      particle.onResize();
    });

    const _raf = () => {
      window.requestAnimationFrame(() => {
        _raf();

        stage.onRaf();
        particle.onRaf();
      });
    };
    _raf();
  }
}
