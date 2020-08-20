import AbstractView from './abstract.js';

const createNoTasksTemplate =
    `<p class="board__no-tasks">
      Click  «ADD NEW TASKS» in menu to create your first task
    </p>`;

export default class NoTasks extends AbstractView {

  getTemplate() {
    return createNoTasksTemplate;
  }
}
