const GAP = 30; // Общая ширина боковых маргинов каждого слайда
const Last = {
  desktop: 3,
  tablet: 2,
  mobile: 1
};

export default class Slider {
  constructor(container) {
    this._container = container;
    this._slides = container.querySelectorAll('.slider__item');
    this._prevControl = container.querySelector('.slider__control--prev');
    this._nextControl = container.querySelector('.slider__control--next');
    this._index = 0;

    this._prevControl.addEventListener('click', () => this._scroll(-1));
    this._nextControl.addEventListener('click', () => this._scroll(1));
    window.addEventListener('resize', this._handleResize.bind(this));
  }

  get _lastStep() {
    return this._slides.length - Last[window.breakpoint];
  }

  get _slideWidth() {
    return this._slides[0].clientWidth + GAP;
  }

  _handleResize() {
    if (this._index !== 0) {
      this._index = 0;
      this._slide();
    }
  }

  _scroll(step) {
    this._index += step;
    this._slide();
  }

  _slide() {
    this._prevControl.disabled = this._index <= 0;
    this._nextControl.disabled = this._index >= this._lastStep;

    if (this._index >= 0 && this._index <= this._lastStep) {
      this._container.style.setProperty('--shift', `-${this._slideWidth * this._index}px`);
    }
  }
}
