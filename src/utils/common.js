// Генерирует случайное число из диапазона
export const getRandomInteger = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// Date.now() и Math.random() - плохие решения для генерации id
// в "продуктовом" коде, а для моков самое то.
// Для "продуктового" кода используйте что-то понадежнее,
// вроде nanoid - https://github.com/ai/nanoid
export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);
