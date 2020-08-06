import {createMenuTemplate} from './view/menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createCartTemplate} from './view/cart.js';
import {createCartEditTemplate} from './view/cart-edit.js';
import {createLoadingTemplate} from './view/loader.js';
import {generateTask} from './mock/task.js';

const TASK_COUNT = 3;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
console.log(tasks);

const render = (container, place, template) => {
  container.insertAdjacentHTML(place, template);
};

const mainElement = document.querySelector(`.main`);
const mainControlElement = mainElement.querySelector(`.main__control`);
const boardElement = document.querySelector(`.board`);
const boardTaskElement = boardElement.querySelector(`.board__tasks`);

render(mainControlElement, `afterbegin`, createMenuTemplate());
render(mainElement, `afterbegin`, createFilterTemplate());
render(boardElement, `afterbegin`, createSortTemplate());

for (let i = 0; i < 3; i++) {
  render(boardTaskElement, `afterbegin`, createCartTemplate());
}
render(boardTaskElement, `afterbegin`, createCartEditTemplate());
render(boardElement, `beforeend`, createLoadingTemplate());
