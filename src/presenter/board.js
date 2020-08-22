import BoardView from './view/board.js';
import SortView from './view/sort.js';
import TaskListView from './view/task-list.js';
import NoTaskView from './view/no-tasks.js';
import TaskView from './view/task.js';
import TaskEditView from './view/task-edit.js';
import LoadMoreButtonView from './view/loader-more-button.js';
import {render, renderPosition, replace, remove} from './utils/render.js';

const TASK_COUNT_PER_STEP = 8;

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._boardComponent = new BoardView();
    this._sortComponent = new SortView();
    this._taskListComponent = new TaskListView();
    this._noTaskComponent = new NoTaskView();
  }

  init(boardTasks) {
    this._boardTasks = boardTasks.slice();

    render(this._boardContainer, this._boardComponent, renderPosition.BEFOREEND);
    render(this._boardComponent, this._taskListComponent, renderPosition.BEFOREEND);

    this._renderBoard();
  }

  _renderSort() {
    render(this._boardComponent, this._sortComponent, renderPosition.AFTERBEGIN);
  }

  _renderTask(task) {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
  }

  // Метод для рендеринга N-задач за раз
  _renderTasks(from, to) {
    this._boardTasks
    .slice(from, to)
    .forEach((boardTask) => this._renderTask(boardTask));
  }

  // Метод для рендеринга заглушки
  _renderNoTasks() {
    render(this._boardComponent, this._noTaskComponent, renderPosition.AFTERBEGIN);
  }

  _renderLoadMoreButton() {
    // Метод, куда уйдёт логика по отрисовке компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderBoard() {
    if (this._boardTasks.every((task) => task.isArchive)) {
      this._renderNoTasks();
      return;
    }

    this._renderSort();

    this._renderTasks(0, Math.min(this._boardTasks.length, TASK_COUNT_PER_STEP));

    if (this._boardTasks.length > TASK_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }
}
