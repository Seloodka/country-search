import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { searchCountries } from '../src/core/searchCountries';
import { HttpError } from '../src/core/HttpError';
describe('searchCountries', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  it('returns an array of countries when the response is ok', async () => {
    const countries = [{ name: 'Germany' }, { name: 'France' }];

    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(countries),
    });

    const result = await searchCountries('ger', new AbortController().signal);

    expect(result).toEqual(countries);
  });

  it('calls fetch with the correct URL', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([]),
    });

    await searchCountries('ger', new AbortController().signal);

    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('ger'), expect.anything());
  });

  it('uses GET method for the request', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([]),
    });

    await searchCountries('ger', new AbortController().signal);

    expect(fetchMock).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ method: 'GET' }));
  });
});

describe('handle searchCountries Errors', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  const mockFetchWithAbort = () => {
    fetchMock.mockImplementation((_input, init) => {
      return new Promise<Response>((_resolve, reject) => {
        const signal = init.signal;

        const handleAbort = () => reject(signal.reason);

        if (signal.aborted) {
          handleAbort();
          return;
        }

        signal.addEventListener('abort', handleAbort, { once: true });
      });
    });
  };

  it('returns an empty array when response status is 404', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 404 }));

    const result = await searchCountries('unknown', new AbortController().signal).catch((error) => error);

    expect(result).not.toBeInstanceOf(HttpError);
    expect(result).toEqual([]);
  });

  it.each([400, 500, 503])('throws HttpError when response is not ok', async (status) => {
    fetchMock.mockResolvedValue(new Response(null, { status }));

    const error = await searchCountries('ger', new AbortController().signal).catch((error) => error);

    expect(error).toBeInstanceOf(HttpError);
    expect(error).toHaveProperty('status', status);
  });

  it('rejects with AbortError when request is aborted', async () => {
    const controller = new AbortController();
    mockFetchWithAbort();

    const promise = searchCountries('ger', controller.signal);
    controller.abort();

    await expect(promise).rejects.toMatchObject({ name: 'AbortError' });
  });

  it('rejects with TimeoutError when request times out', async () => {
    mockFetchWithAbort();
    const timedOut = AbortSignal.abort(new DOMException('Timed out', 'TimeoutError'));

    await expect(searchCountries('ger', timedOut)).rejects.toMatchObject({
      name: 'TimeoutError',
    });
  });
});
