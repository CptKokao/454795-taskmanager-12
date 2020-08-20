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
import {render, renderPosition, replace, remove} from './utils/render.js';

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

  render(taskListElement, taskComponent, renderPosition.BEFOREEND);
};

const renderBoard = (boardContainer, boardTasks) => {
  const boardComponent = new BoardView();
  const taskListComponent = new TaskListView();

  render(boardContainer, boardComponent, renderPosition.BEFOREEND);
  render(boardComponent, taskListComponent, renderPosition.BEFOREEND);

  if (tasks.length === 0 || tasks.every((task) => task.isArchive)) {
    render(boardComponent, new NoTaskView(), renderPosition.AFTERBEGIN);
    return;
  }

  render(boardComponent, new SortView(), renderPosition.AFTERBEGIN);

  boardTasks
    .slice(0, Math.min(tasks.length, TASK_COUNT_PER_STEP))
    .forEach((boardTask) => renderTask(taskListComponent, boardTask));

  if (boardTasks.length > TASK_COUNT_PER_STEP) {
    let renderTaskCount = TASK_COUNT_PER_STEP;

    const loadMoreButtonComponent = new LoadMoreButtonView();
    render(boardComponent, loadMoreButtonComponent, renderPosition.BEFOREEND);

    loadMoreButtonComponent.setEditClickHandler(() => {
      boardTasks
        .slice(renderTaskCount, renderTaskCount + TASK_COUNT_PER_STEP)
        .forEach((boardTask) => renderTask(taskListComponent, boardTask));

      renderTaskCount += TASK_COUNT_PER_STEP;
      if (renderTaskCount >= boardTasks.length) {
        remove(loadMoreButtonComponent);
      }
    });
  }
};

render(siteHeaderElement, new SiteMenuView(), renderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters), renderPosition.BEFOREEND);

renderBoard(siteMainElement, tasks);
