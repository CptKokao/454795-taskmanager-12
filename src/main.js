import SiteMenuView from './view/site-menu.js';
import StatisticsView from "./view/statistics.js";
import BoardPresenter from "./presenter/board.js";
import FilterPresenter from "./presenter/filter.js";
import TasksModel from "./model/tasks.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import {MenuItem, UpdateType, FilterType} from "./const.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic hS2sd3dfSwcl1sa2j`;
const END_POINT = `https://12.ecmascript.pages.academy/task-manager`;
const api = new Api(END_POINT, AUTHORIZATION);

const tasksModel = new TasksModel();
const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const siteMenuComponent = new SiteMenuView();

const boardPresenter = new BoardPresenter(siteMainElement, tasksModel, filterModel, api);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, tasksModel);

const handleTaskNewFormClose = () => {
  siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = false;
  siteMenuComponent.setMenuItem(MenuItem.TASKS);
};

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_TASK:
      // Скрыть статистику
      remove(statisticsComponent);

      // Показать доску
      boardPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
      boardPresenter.init();

      // Показать форму добавления новой задачи
      boardPresenter.createTask(handleTaskNewFormClose);

      // Убрать выделение с ADD NEW TASK после сохранения
      siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = true;
      break;
    case MenuItem.TASKS:
      // Показать доску
      boardPresenter.init();

      // Скрыть статистику
      remove(statisticsComponent);
      break;
    case MenuItem.STATISTICS:
      // Скрыть доску
      boardPresenter.destroy();

      // Показать статистику
      statisticsComponent = new StatisticsView(tasksModel.getTasks());
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

filterPresenter.init();
boardPresenter.init();

api.getTasks()
  .then((tasks) => {
    tasksModel.setTasks(UpdateType.INIT, tasks);
    render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    tasksModel.setTasks(UpdateType.INIT, []);
    render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  });
