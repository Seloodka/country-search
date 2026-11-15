import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { searchCountries } from '../src/core/searchCountries';

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
