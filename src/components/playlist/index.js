export default class Playlist {
  constructor(container, medias) {
    this._container = container;
    this._medias = medias;
    this._players = container.querySelectorAll('.playlist__player');
    this._trackList = container.querySelector('.playlist__tracks');
    this._openers = container.querySelectorAll('.playlist__track-opener');

    this._trackList.addEventListener('click', this._handleClick.bind(this));
  }

  _handleClick({ target }) {
    if (target.dataset.track) {
      for (const media of this._medias) {
        // Останавливаем каждый плеер
        media.pause();
      }

      for (const opener of this._openers) {
        if (opener === target) {
          opener.classList.add('playlist__track-opener--active');
        } else {
          opener.classList.remove('playlist__track-opener--active');
        }
      }

      for (const player of this._players) {
        if (player.dataset.track === target.dataset.track) {
          player.classList.add('playlist__player--active');
        } else {
          player.classList.remove('playlist__player--active');
        }
      }
    }
  }
}
