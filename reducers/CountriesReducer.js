import axios from 'axios'

//  This is basically a state object/function?. 
//  It takes in a state and an action and determines what happens when an action is called on it. Check LoginAction.jsx
export const CountriesReducer = (state = {countries : axios.get('https://api.covid19api.com/summary').then(response => { return response.data.Countries; }).catch(error => { console.log(error); return []; })}, action) => {
    switch(action.type) {
        case 'GET':
            return state;

    }
}

