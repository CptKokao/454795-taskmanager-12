import BoardView from '../view/board.js';
import SortView from '../view/sort.js';
import TaskListView from '../view/task-list.js';
import NoTaskView from '../view/no-tasks.js';
import TaskView from '../view/task.js';
import TaskEditView from '../view/task-edit.js';
import LoadMoreButtonView from '../view/loader-more-button.js';
import {render, renderPosition, replace, remove} from '../utils/render.js';

const TASK_COUNT_PER_STEP = 8;

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedTaskCount = TASK_COUNT_PER_STEP;

    this._boardComponent = new BoardView();
    this._sortComponent = new SortView();
    this._taskListComponent = new TaskListView();
    this._noTaskComponent = new NoTaskView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this)
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

  // Логика по созданию и рендерингу компонетов задачи,
  _renderTask(task) {

    const taskComponent = new TaskView(task);
    const taskEditComponent = new TaskEditView(task);

    const replaceCardToForm = () => {
      replace(taskEditComponent, taskComponent);
    };

    const replaceFormToCard = () => {
      replace(taskComponent, taskEditComponent);
    };

    const onEscKeyDown = (e) => {
      if (e.key === `Escape` || EventTarget.key === `Esc`) {
        e.preventDefault();
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    taskComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.setEditClickHandler(() => {
      replaceFormToCard();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    render(this._taskListComponent, taskComponent, renderPosition.BEFOREEND);
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

  // Метод по загрузки задач по нажатию на кнопку
  _handleLoadMoreButtonClick() {
    this._renderTasks(this._renderedTaskCount, this._renderedTaskCount + TASK_COUNT_PER_STEP);
    this._renderedTaskCount += TASK_COUNT_PER_STEP;

    if (this._renderedTaskCount >= this._boardTasks.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    render(this._boardComponent, this._loadMoreButtonComponent, renderPosition.BEFOREEND);
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderTaskList() {
    this._renderTasks(0, Math.min(this._boardTasks.length, TASK_COUNT_PER_STEP));

    if (this._boardTasks.length > TASK_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }

  _renderBoard() {
    if (this._boardTasks.every((task) => task.isArchive)) {
      this._renderNoTasks();
      return;
    }

    this._renderSort();
    this._renderTaskList();
  }
}
