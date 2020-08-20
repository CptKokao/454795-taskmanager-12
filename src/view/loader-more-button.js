import AbstractView from './abstract.js';

const createLoadMoreButtonTemplate =
  `<button class="load-more" type="button">load more</button>`
;

export default class LoadMoreButton extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createLoadMoreButtonTemplate;
  }

  _clickHandler(e) {
    e.preventDefault();
    this._callback.click();
  }

  setEditClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}
