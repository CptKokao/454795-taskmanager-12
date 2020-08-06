
// Генерирует случайное число из диапазона
const getRandomInteger = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Генерирует описание для карточки
const generateDescription = () => {
  const descriptions = [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex()];
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
  }
}

export const generateTask = () => {
  return {
    description: generateDescription(),
    dueDate: generateDate(),
    repeating: generateRepeating(),
    color: `black`,
    isArchive: false,
    isFavorite: false
  };
};

console.log(generateTask());
