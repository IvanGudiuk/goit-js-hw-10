import '../css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import { countriesMarkup } from './countryMarkup.js';
import { singleCountryMarkup } from './countryMarkup.js';
import Notiflix from 'notiflix';
import Debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const handleCountryInput = e => {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  const country = e.target.value.trim();
  if (country) {
    fetchCountries(country)
      .then(data => {
        if (data.length === 1) {
          singleCountryMarkup(data);
        } else if (data.length > 1 && data.length <= 10) {
          countriesMarkup(data);
        } else {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      })
      .catch(error =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
  }
};
countryInput.addEventListener('input', Debounce(handleCountryInput, 300));
