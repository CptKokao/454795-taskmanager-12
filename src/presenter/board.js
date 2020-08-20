import BoardView from './view/board.js';
import SortView from './view/sort.js';
import TaskListView from './view/task-list.js';
import NoTaskView from './view/no-tasks.js';
import TaskView from './view/task.js';
import TaskEditView from './view/task-edit.js';
import LoadMoreButtonView from './view/loader-more-button.js';
import {render, renderPosition, replace, remove} from './utils/render.js';

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._boardContainer = new BoardView();
    this._sortContainer = new SortView();
    this._taskListContainer = new TaskListView();
    this._noTaskContainer = new NoTaskView();
  }

  init(boardTasks) {
    this._boardTasks = boardTasks.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
  }

  _renderSort() {
    // Метод для рендеринга сортировки
  }

  _renderTask() {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderTasks() {
    // Метод для рендеринга N-задач за раз
  }

  _renderNoTasks() {
    // Метод для рендеринга заглушки
  }

  _renderLoadMoreButton() {
    // Метод, куда уйдёт логика по отрисовке компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderBoard() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
  }
}
