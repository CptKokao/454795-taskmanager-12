import AbstractView from './abstract.js';

const createSTaskListTemplate =
    `<div class="board__tasks"></div>`;

export default class TaskList extends AbstractView {

  getTemplate() {
    return createSTaskListTemplate;
  }
}
