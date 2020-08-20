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
