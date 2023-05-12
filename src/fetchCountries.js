import Notiflix from 'notiflix';

export default function fetchCountries(name) {
  const searchParams = new URLSearchParams({
    fields: 'name.official,capital,population,flags.svg,languages',
  });
  return fetch(`https://restcountries.com/v3/name/${name}?${searchParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      const countries = data.map(country => ({
        name: country.name.official,
        capital: country.capital,
        population: country.population,
        flag: country.flags.svg,
        languages: country.languages,
      }));
      return countries;
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}