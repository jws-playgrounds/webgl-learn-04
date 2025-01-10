import Scroll from '@ts/components/Scroll';
import WebGl from '@ts/components/WebGl';

document.addEventListener('DOMContentLoaded', async () => {
  const scroll = new Scroll();
  await commonFunc();
});

const commonFunc = async () => {
  new WebGl();
};
