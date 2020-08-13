import {createSiteMenuTemplate} from './view/site-menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createTaskTemplate} from './view/task.js';
import {createTaskEditTemplate} from './view/task-edit.js';
import {createBoardTemplate} from './view/board.js';
import {createLoadMoreButtonTemplate} from './view/loader-more-button.js';
import {generateTask} from './mock/task.js';
import {generateFilter} from './mock/filter.js';
import {renderTemplate} from './utils.js';

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

renderTemplate(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
renderTemplate(siteMainElement, createFilterTemplate(filters), `beforeend`);
renderTemplate(siteMainElement, createBoardTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = boardElement.querySelector(`.board__tasks`);

renderTemplate(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);

for (let i = 0; i < TASK_COUNT; i++) {
  renderTemplate(taskListElement, createTaskTemplate(tasks[i]), `beforeend`);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderTaskCount = TASK_COUNT_PER_STEP;

  renderTemplate(boardElement, createLoadMoreButtonTemplate(), `beforeend`);
  const loadMoreButton = boardElement.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (e) => {
    e.preventDefault();
    tasks
      .slice(renderTaskCount, renderTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => renderTemplate(taskListElement, createTaskTemplate(task), `beforeend`));

    renderTaskCount += TASK_COUNT_PER_STEP;
    if (renderTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
