const debounce = <Args extends unknown[]>(fn: (...args: Args) => void, delay: number): ((...args: Args) => void) => {
  let activeTimerId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Args) => {
    if (activeTimerId !== null) {
      clearTimeout(activeTimerId);
      activeTimerId = null;
    }

    activeTimerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export { debounce };
