import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { debounce } from '../src/core/debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('should debounce a function', () => {
    const mockFn = vi.fn();
    const debounced = debounce(mockFn, 300);
    expect(typeof debounced).toBe('function');
  });

  it('does not call the function immediately', () => {
    const mockFn = vi.fn();
    const debounced = debounce(mockFn, 300);

    debounced();
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(299);
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('does call the function after timer ends', () => {
    const mockFn = vi.fn();
    const debounced = debounce(mockFn, 300);

    debounced();
    vi.advanceTimersByTime(300);
    expect(mockFn).toHaveBeenCalled();
  });

  it('should reset timer on every call', () => {
    const mockFn = vi.fn();
    const debounced = debounce(mockFn, 300);

    debounced();
    vi.advanceTimersByTime(200);
    debounced();
    vi.advanceTimersByTime(200);
    debounced();
    vi.advanceTimersByTime(200);
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should call with last argument', () => {
    const mockFn = vi.fn();
    const debounced = debounce(mockFn, 300);

    debounced('s');
    debounced('sp');
    debounced('spain');

    vi.advanceTimersByTime(300);
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledWith('spain');
  });
});
