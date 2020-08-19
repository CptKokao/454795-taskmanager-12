import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';
import TaskView from './view/task.js';
import TaskEditView from './view/task-edit.js';
import BoardView from './view/board.js';
import SortView from './view/sort.js';
import TaskListView from './view/task-list.js';
import NoTaskView from './view/no-tasks.js';
import LoadMoreButtonView from './view/loader-more-button.js';
import {generateTask} from './mock/task.js';
import {generateFilter} from './mock/filter.js';
import {render, renderPosition} from './utils.js';

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskView(task);
  const taskEditComponent = new TaskEditView(task);

  const replaceCardToForm = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceFormToCard = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const onEscKeyDown = (e) => {
    if (e.key === `Escape` || EventTarget.key === `Esc`) {
      e.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (e) => {
    e.preventDefault();
    replaceFormToCard();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent.getElement(), renderPosition.BEFOREEND);
};

const renderBoard = (boardContainer, boardTasks) => {
  const boardComponent = new BoardView();
  const taskListComponent = new TaskListView();

  render(boardContainer, boardComponent.getElement(), renderPosition.BEFOREEND);
  render(boardComponent.getElement(), taskListComponent.getElement(), renderPosition.BEFOREEND);

  if (tasks.length === 0 || tasks.every((task) => task.isArchive)) {
    render(boardComponent.getElement(), new NoTaskView().getElement(), renderPosition.AFTERBEGIN);
    return;
  }

  render(boardComponent.getElement(), new SortView().getElement(), renderPosition.AFTERBEGIN);

  boardTasks
    .slice(0, Math.min(tasks.length, TASK_COUNT_PER_STEP))
    .forEach((boardTask) => renderTask(taskListComponent.getElement(), boardTask));

  if (boardTasks.length > TASK_COUNT_PER_STEP) {
    let renderTaskCount = TASK_COUNT_PER_STEP;

    const loadMoreButtonComponent = new LoadMoreButtonView();
    render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), renderPosition.BEFOREEND);

    loadMoreButtonComponent.getElement().addEventListener(`click`, (e) => {
      e.preventDefault();
      boardTasks
        .slice(renderTaskCount, renderTaskCount + TASK_COUNT_PER_STEP)
        .forEach((boardTask) => renderTask(taskListComponent.getElement(), boardTask));

      renderTaskCount += TASK_COUNT_PER_STEP;
      if (renderTaskCount >= boardTasks.length) {
        loadMoreButtonComponent.getElement().remove();
        loadMoreButtonComponent.remove();
      }
    });
  }
};

render(siteHeaderElement, new SiteMenuView().getElement(), renderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters).getElement(), renderPosition.BEFOREEND);

renderBoard(siteMainElement, tasks);
