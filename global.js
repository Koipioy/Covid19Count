import axios from 'axios';
import {createContext} from 'react';

const GlobalDataContext = {    
    countries : [],
    locations : [],
    global : {}
}

export const GlobalContext = createContext(GlobalDataContext)

// module.exports = {
//     countries : null //axios.get('https://api.covid19api.com/summary').then(response => { return response.data.Countries; }).catch(error => { console.log(error); return []; })
// }
