import Media from '../../components/media/index.js';
import About from '../../components/about/index.js';
import Playlist from '../../components/playlist/index.js';
import Slider from '../../components/slider/index.js';

const screenChangeEvent = new CustomEvent('screenchange');
const setBreakpoint = () => {
  let breakpoint = 'mobile';
  if (window.innerWidth >= 1310) {
    breakpoint = 'desktop';
  } else if (window.innerWidth >= 768) {
    breakpoint = 'tablet';
  }
  if (window.breakpoint !== breakpoint) {
    const scrollbarWidth = Math.max(window.innerWidth - document.body.clientWidth, 0);
    document.body.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

    window.breakpoint = breakpoint;
    window.dispatchEvent(screenChangeEvent);
  }
};
setBreakpoint();
window.addEventListener('resize', setBreakpoint);


const medias = [];
for (const player of document.querySelectorAll('.media')) {
  medias.push(new Media(player));
}

for (const aboutSection of document.querySelectorAll('.about')) {
  new About(aboutSection);
}

for (const playlist of document.querySelectorAll('.playlist')) {
  new Playlist(playlist, medias);
}

for (const slider of document.querySelectorAll('.slider')) {
  new Slider(slider);
}
