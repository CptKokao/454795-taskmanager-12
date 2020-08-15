import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';
import TaskView from './view/task.js';
import TaskEditView from './view/task-edit.js';
import BoardView from './view/board.js';
import SortView from './view/sort.js';
import TaskListView from './view/task-list.js';
import LoadMoreButtonView from './view/loader-more-button.js';
import {generateTask} from './mock/task.js';
import {generateFilter} from './mock/filter.js';
import {renderTemplate, renderElement, renderPosition} from './utils.js';

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

renderElement(siteHeaderElement, new SiteMenuView().getElement(), renderPosition.BEFOREEND);
renderElement(siteMainElement, new FilterView(filters).getElement(), renderPosition.BEFOREEND);

const boardComponent = new BoardView();
renderElement(siteMainElement, boardComponent.getElement(), renderPosition.BEFOREEND);
renderElement(boardComponent.getElement(), new SortView().getElement(), renderPosition.BEFOREEND);

const taskListComponent = new TaskListView();
renderElement(boardComponent.getElement(), taskListComponent.getElement(), renderPosition.BEFOREEND);
renderElement(taskListComponent.getElement(), new TaskEditView(tasks[0]).getElement(), renderPosition.BEFOREEND);

// const boardElement = siteMainElement.querySelector(`.board`);
// const taskListElement = boardElement.querySelector(`.board__tasks`);

// renderTemplate(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);

for (let i = 0; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  renderElement(taskListComponent.getElement(), new TaskView(tasks[i]).getElement(), renderPosition.BEFOREEND);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderTaskCount = TASK_COUNT_PER_STEP;

  const loadMoreButtonComponent = new LoadMoreButtonView();
  renderElement(boardComponent.getElement(), loadMoreButtonComponent.getElement(), renderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener(`click`, (e) => {
    e.preventDefault();
    tasks
      .slice(renderTaskCount, renderTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => renderElement(taskListComponent.getElement(), new TaskView(task).getElement(), renderPosition.BEFOREEND));

    renderTaskCount += TASK_COUNT_PER_STEP;
    if (renderTaskCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.remove();
    }
  });
}
