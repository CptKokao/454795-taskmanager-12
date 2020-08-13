import {createElement} from '../utils.js';

const createSTaskListTemplate =
    `<div class="board__tasks"></div>`;

export default class TaskList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSTaskListTemplate;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
