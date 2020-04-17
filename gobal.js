import axios from 'axios';
import {createContext} from 'react';

const CountryState = {    
    countries : []
}

export const CountryContext = createContext(CountryState)

// module.exports = {
//     countries : null //axios.get('https://api.covid19api.com/summary').then(response => { return response.data.Countries; }).catch(error => { console.log(error); return []; })
// }
