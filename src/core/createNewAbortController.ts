const createAbortControllerHandler = (): (() => AbortController) => {
  let currentAbortController: AbortController | null = null;

  return (): AbortController => {
    if (currentAbortController !== null) {
      currentAbortController.abort();
    }

    currentAbortController = new AbortController();

    return currentAbortController;
  };
};

const createNewAbortController = createAbortControllerHandler();

export { createNewAbortController };
