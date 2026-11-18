class HttpError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`HTTP Error: ${status}`);
    this.status = status;
    this.name = 'HttpError';
  }
}

export { HttpError };
