
import {createElement} from '../utils.js';
import {COLORS} from "../const.js";
import {isExpired, isRepeating, humanizeTaskDueDate} from "../utils.js";

const BLANK_TASK = {
  color: `black`,
  description: ``,
  dueDate: null,
  repeating: {
    mo: false,
    tu: false,
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: false,
  },
  isArchive: false,
  isFavotite: false
};

// Шаблон для даты
const createTaskEditDateTemplate = (dueDate) => {
  return `<button class="card__date-deadline-toggle" type="button">
      date: <span class="card__date-status">${dueDate !== null ? `yes` : `no`}</span>
    </button>

    ${dueDate !== null
    ? `<fieldset class="card__date-deadline">
          <label class="card__input-deadline-wrap">
            <input
              class="card__date"
              type="text"
              placeholder="23 September"
              name="date"
              value="${humanizeTaskDueDate(dueDate)}"
            />
          </label>
        </fieldset>`
    : ``}
  `;
};

// Шаблон для повторений
const createTaskEditRepeatingTemplate = (repeating) => {
  return `<button class="card__repeat-toggle" type="button">
      repeat:<span class="card__repeat-status">yes</span>
    </button>

    ${isRepeating(repeating)
    ? `<fieldset class="card__repeat-days">
        <div class="card__repeat-days-inner">
          ${Object.entries(repeating).map(([day, repeat]) => `<input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-${day}"
            name="repeat"
            value="${day}"
            ${repeat ? `checked` : ``}
          />
          <label class="card__repeat-day" for="repeat-${day}"
            >${day}</label
          >`).join(``)}
        </div>
      </fieldset>`
    : ``}`;
};

// Шаблон для цвета
const createTaskEditColorsTemplate = (currentColor) => {
  const colors = COLORS;

  return colors.map((color) => `<input
    type="radio"
    id="color-${color}"
    class="card__color-input card__color-input--${color} visually-hidden"
    name="color"
    value="${color}"
    ${currentColor === color ? `checked` : ``}
  />
  <label
    for="color-${color}"
    class="card__color card__color--${color}"
    >${color}</label
  >`).join(``);
};

const createTaskEditTemplate = (task) => {
  const {color, description, dueDate, repeating} = task;

  // Проверяет задача просрочена?
  const deadLineClassName = isExpired(dueDate)
    ? `card--deadline`
    : ``;

  const dateTemplate = createTaskEditDateTemplate(dueDate);

  // Проверяет задача повторяется?
  const repeatClassName = isRepeating(repeating)
    ? `card--repeat`
    : ``;

  const repeatingTemplate = createTaskEditRepeatingTemplate(repeating);

  const colorTemplate = createTaskEditColorsTemplate(color);

  return (
    `<article class="card card--edit card--${color} ${deadLineClassName} ${repeatClassName}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                ${dateTemplate}

                ${repeatingTemplate}
              </div>
            </div>
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${colorTemplate}
              </div>
            </div>
          </div>
          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">cancel</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

export default class TaskEdit {
  constructor(task) {
    this._task = task || BLANK_TASK;
    this._element = null;
  }

  getTemplate() {
    return createTaskEditTemplate(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

