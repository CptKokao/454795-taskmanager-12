
import {COLORS} from "../const.js";
import {getRandomInteger} from "../utils/common.js";

// Date.now() и Math.random() - плохие решения для генерации id
// в "продуктовом" коде, а для моков самое то.
// Для "продуктового" кода используйте что-то понадежнее,
// вроде nanoid - https://github.com/ai/nanoid
const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

// Генерирует описание для карточки
const generateDescription = () => {
  const descriptions = [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

// Генерирует дату дедлайна
const generateDate = () => {
  // Генерирует случайное число
  // 0 - нет дедлайна
  // 1 - есть дедлайн
  const isDate = getRandomInteger(0, 1);

  if (!isDate) {
    return null;
  }

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();

  // Меняем текущее время на конец дня
  currentDate.setHours(23, 59, 59, 999);
  // Меняем дату
  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

// Генерирует повторяюющиеся дни
const generateRepeating = () => {
  return {
    mo: false,
    tu: false,
    we: Boolean(getRandomInteger(0, 1)),
    th: false,
    fr: Boolean(getRandomInteger(0, 1)),
    sa: false,
    su: false,
  };
};

// Генерирует случайные цвета
const generateRandomColor = () => {
  const colors = COLORS;
  const randomIndex = getRandomInteger(0, colors.length - 1);

  return colors[randomIndex];
};

export const generateTask = () => {
  const description = generateDescription();
  const dueDate = generateDate();
  const color = generateRandomColor();
  const repeating = dueDate === null
    ? generateRepeating()
    : {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false,
    };

  return {
    id: generateId(),
    description,
    dueDate,
    repeating,
    color,
    isArchive: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
