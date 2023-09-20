export default class About {
  constructor(container) {
    this._images = container.querySelectorAll('.about__img');

    container.addEventListener('click', this._handleClick.bind(this));
  }

  _handleClick({ target }) {
    if (!target.classList.contains('about__img')) {
      return;
    }

    for (const img of this._images) {
      if (img === target) {
        img.classList.add('about__img--active');
      } else {
        img.classList.remove('about__img--active');
      }
    }
  }
}
