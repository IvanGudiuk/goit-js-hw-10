import Notiflix from 'notiflix';
import Debounce from 'lodash.debounce';

export const fetchCountries = name => {
  return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages
  `).then(response => {
    if (!response.ok) throw new Error();

    return response.json();
  });
};
