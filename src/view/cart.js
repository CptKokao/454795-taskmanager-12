// Проверяет просрочена ли задача
const isExpired = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  let currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  currentDate = new Date(currentDate);

  return currentDate.getTime() > dueDate.getTime();
};

// Функция для проверки задача
const isRepeating = (repeating) => {
  console.log(Object.values(repeating).some(Boolean));
  return Object.values(repeating).some(Boolean);
};

export const createCartTemplate = (task) => {
  const {color, description, dueDate, repeating, isArhive, isFavorite} = task;

  const date = dueDate !== null
    ? dueDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`})
    : ``;

  const deadLineClassName = isExpired(dueDate)
    ? `card--deadline`
    : ``;

  // Проверяет задача повторяется?
  const repeatClassName = isRepeating(repeating)
    ? `card--repeat`
    : ``;

  // Проверяет задача в архиве?
  const arhiveClassName = isArhive
    ? `cart__btn--archive card__btn--disabled`
    : `cart__btn--archive`;

  // Проверяет задача в избранном?
  const favotiteClassName = isFavorite
    ? `cart__btn--favotite card__btn--disabled`
    : `cart__btn--favotite`;

  return (
    `<article class="card card--${color} ${deadLineClassName} ${repeatClassName}">
        <div class="card__form">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--edit">
                edit
              </button>
              <button type="button" class="card__btn card__btn--edit ${arhiveClassName}">
                archive
              </button>
              <button type="button" class="card__btn card__btn--edit ${favotiteClassName}">
                favorites
              </button>
            </div>
            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>
            <div class="card__textarea-wrap">
              <p class="card__text">${description}</p>
            </div>
            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <div class="card__date-deadline">
                    <p class="card__input-deadline-wrap">
                      <span class="card__date">${date}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>`
  );
};
