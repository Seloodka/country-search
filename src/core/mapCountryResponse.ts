import type { Country, Currency, Flags, Language } from '../types/apiResponse';

interface countryAdditionalData {
  area: number | null;
  currencies: string[] | null;
  borders: string[] | null;
}

interface mappedResponse {
  name: string;
  flagImagePath: string | null;
  capital: string | null;
  region: string;
  population: number | null;
  languages: string[] | null;
  details: countryAdditionalData;
}

type ItemWithNameProperty = { name?: string };

const getCountryFlagImage = (flagPath: Flags | undefined): string | null => {
  if (flagPath === undefined) {
    return null;
  }

  if (flagPath.svg !== undefined) {
    return flagPath.svg;
  }

  if (flagPath.png !== undefined) {
    return flagPath.png;
  }

  return null;
};

const createNameExtractor = <T extends ItemWithNameProperty>(): ((items: T[] | undefined) => string[] | null) => {
  return (items: T[] | undefined): string[] | null => {
    if (items === undefined || items.length === 0) {
      return null;
    }

    const names = items.map((item) => item.name || null).filter((name) => name !== null);
    if (names.length === 0) {
      return null;
    }

    return names;
  };
};

const getCountryLanguages = createNameExtractor<Language>();
const getCountryCurrencies = createNameExtractor<Currency>();

const mapCountryResponse = (raw: Country[]): mappedResponse[] => {
  return raw.map((country) => {
    return {
      name: country.name,
      flagImagePath: getCountryFlagImage(country.flags),
      capital: country.capital || null,
      region: country.region,
      population: country.population || null,
      languages: getCountryLanguages(country.languages),
      details: {
        area: country.area || null,
        currencies: getCountryCurrencies(country.currencies),
        borders: country.borders || null,
      },
    };
  });
};

export { mapCountryResponse, type mappedResponse };
