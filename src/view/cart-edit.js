// Функция для проверки просрочена ли задача
const isExpired = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  let currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  currentDate = new Date(currentDate);

  return currentDate.getTime() > dueDate.getTime();
};

// Функция для проверки повтора задачи
const isRepeating = (repeating) => {
  return Object.values(repeating).some(Boolean);
};

// Шаблон для даты
const createTaskEditDateTemplate = (dueDate) => {
  return `<button class="card__date-deadline-toggle" type="button">
      date: <span class="card__date-status">no</span>
    </button>

    ${dueDate !== null
    ? `<fieldset class="card__date-deadline" disabled>
          <label class="card__input-deadline-wrap">
            <input
              class="card__date"
              type="text"
              placeholder="23 September"
              name="date"
              value="${dueDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`})}"
            />
          </label>
        </fieldset>`
    : ``}
  `;
};

// Шаблон для повторений
const createTaskEditRepeatingTemplate = (repeating) => {
  return `<button class="card__repeat-toggle" type="button">
      repeat:<span class="card__repeat-status">no</span>
    </button>

    ${isRepeating(repeating)
    ? `<fieldset class="card__repeat-days" disabled>
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

// Шаблон для повторений
const createTaskEditColorsTemplate = (currentColor) => {
  const colors = [`black`, `yellow`, `blue`, `green`, `pink`];

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

export const createCartEditTemplate = (task = {}) => {
  const {
    color = `black`,
    description = ``,
    dueDate = null,
    repeating = {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false,
    }
  } = task;

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

  const colorTemplate = createTaskEditColorsTemplate(repeating);

  return (
    `<article class="card card--edit card--${color} ${deadLineClassName} ${repeatClassName}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg width="100%" height="10">
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
