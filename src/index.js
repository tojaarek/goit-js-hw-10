import debounce from 'lodash.debounce';
import './css/styles.css';
import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const searchInput = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function displayResults(countries) {
  const results = countries
    .map(country => {
      return `
          <li class="country-item">
            <svg><use href="${country.flags.svg}"></use></svg>
            <span class="country-name">${country.name.official}</span>
          </li>
        `;
    })
    .join('');

  countryList.innerHTML = results;
}

function searchCountries() {
  const searchedCountry = searchInput.value.trim();
  if (searchedCountry.length > 2) {
    fetchCountries(searchedCountry)
      .then(countries => displayResults(countries))
      .catch(error =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
  } else {
    countryList.innerHTML = '';
  }
}
const debouncedSearch = debounce(searchCountries, DEBOUNCE_DELAY);
searchInput.addEventListener('input', debouncedSearch);
