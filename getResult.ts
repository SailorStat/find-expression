const runCode = (code: string): number => new Function(`return ${code};`)();

const cache = new Map<number, string>();

const generateNext = (prev: string[]): string[] => {
  let currentIndex = 1;
  const next = [...prev];

  while (currentIndex < prev.length - 1) {
    const currentChar = prev[currentIndex];

    if (currentChar === "_") {
      next[currentIndex] = '+'
      currentIndex += 2;
      continue;
    }

    if (currentChar === '+') {
      next[currentIndex] = '-'
      return next
    }

    if (currentChar === '-') {
      next[currentIndex] = '_'
      return next
    }
  }

  return next;
}

let current = "9+8+7+6+5+4+3+2+1+0".split('');
const last = "9_8_7_6_5_4_3_2_1_0".split('');

export const getResult = (value: number): string => {
  if (cache.has(value)) {
    return cache.get(value)!;
  }

  let isSearch = true;

  while (isSearch) {
    isSearch = JSON.stringify(current) !== JSON.stringify(last)

    const prettyExpression = current.join('').replaceAll("_", '');
    const currentValue = runCode(prettyExpression);

    cache.set(currentValue, prettyExpression);

    const next = generateNext(current);
    current = next;

    if (value === currentValue) {
      return prettyExpression;
    }
  }

  return 'Невозможно получить значение'
} 
