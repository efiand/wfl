import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration.js';
dayjs.extend(durationPlugin);

export default class Media {
  constructor(player) {
    this._player = player;
    this._media = player.querySelector('.media__src');
    this._control = player.querySelector('.media__control');
    this._positionPlace = player.querySelector('.media__position');
    this._progress = player.querySelector('.media__progress');
    this._timeline = this._progress.querySelector('.media__timeline');
    this._timeline.value = 0;
    this._playLabel = this._control.getAttribute('aria-label');
    this._pauseLabel = this._control.dataset.pauseLabel;

    this._control.addEventListener('click', this._handleClick.bind(this));
    this._timeline.addEventListener('input', this._handleInput.bind(this));
    this._media.addEventListener('play', this._handlePlay.bind(this));
    this._media.addEventListener('pause', this._handlePause.bind(this));
    this._media.addEventListener('timeupdate', this._handleTimeUpdate.bind(this));
  }

  // Публичный метод для остановки плеера извне
  pause() {
    this._media.pause();
  }

  _handleClick() {
    if (this._media.paused) {
      this._media.play();
    } else {
      this._media.pause();
    }
  }

  _handleTimeUpdate() {
    const value = this._media.currentTime * 1000;
    this._timeline.value = value;
    this._positionPlace.textContent = dayjs.duration(value).format('mm:ss');
    this._progress.style.setProperty('--progress', `${ value / this._media.duration / 10 }%`);
  }

  _handlePlay() {
    this._control.classList.add('media__control--playing');
    this._control.setAttribute('aria-label', this._pauseLabel);
  }

  _handlePause() {
    this._control.classList.remove('media__control--playing');
    this._control.setAttribute('aria-label', this._playLabel);
  }

  _handleInput() {
    const playing = !this._media.paused;
    if (playing) {
      this._media.pause();
    }
    this._media.currentTime = this._timeline.value / 1000;
    if (playing) {
      this._media.play();
    }
  }

  _changeControl() {
    this._control.classList.toggle('media__control--playing');
  }
}
