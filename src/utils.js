export const renderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, place) => {
  switch (place) {
    case renderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case renderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

// export const renderTemplate = (container, template, place) => {
//   container.insertAdjacentHTML(place, template);
// };

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// Генерирует случайное число из диапазона
export const getRandomInteger = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Функция для проверки просрочена ли задача
export const isExpired = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  let currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  currentDate = new Date(currentDate);

  return currentDate.getTime() > dueDate.getTime();
};

// Функция для проверки повтора задачи
export const isRepeating = (repeating) => {
  return Object.values(repeating).some(Boolean);
};

// Функция для форматирования даты
export const humanizeTaskDueDate = (dueDate) => {
  return dueDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`});
};
