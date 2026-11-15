import { describe, expect, it } from 'vitest';
import rawCountriesData from './data/rawCountriesData.json';
import mappedCountriesData from './data/mappedCountriesData.json';
import { mapCountryResponse, mappedResponse } from '../src/core/mapCountryResponse';
import { Country } from '../src/types/apiResponse';

const RAW_COUNTRIES_DATA: Country[] = rawCountriesData;
const MAPPED_COUNTRIES_DATA: mappedResponse[] = mappedCountriesData;

describe('mapCountryResponse', () => {
  it('should return properly data', (_, rawData = RAW_COUNTRIES_DATA, preMappedData = MAPPED_COUNTRIES_DATA) => {
    const rawCountriesData = rawData.slice(0, 2);
    const preMapped = preMappedData.slice(0, 2);

    const mappedResponse = mapCountryResponse(rawCountriesData);

    expect(mappedResponse).toEqual(preMapped);
  });

  it('should properly return data with null', (_, rawData = RAW_COUNTRIES_DATA, preMappedData = MAPPED_COUNTRIES_DATA) => {
    const rawCountriesData = rawData.slice();
    const preMapped = preMappedData.slice();

    const mappedResponse = mapCountryResponse(rawCountriesData);

    expect(mappedResponse).toEqual(preMapped);
  });

  it('should not mutate original array', (_, rawData = RAW_COUNTRIES_DATA) => {
    const rawCountriesData = rawData;
    const rawCountriesDataCopy = rawData.slice();

    mapCountryResponse(rawCountriesData);

    expect(rawCountriesData).toEqual(rawCountriesDataCopy);
  });

  it('should return new array instance', (_, rawData = RAW_COUNTRIES_DATA) => {
    const rawCountriesData = rawData.slice();
    const mappedResponse = mapCountryResponse(rawCountriesData);

    expect(rawCountriesData).not.toBe(mappedResponse);
  });
});
