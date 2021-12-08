/* eslint-disable no-lonely-if */
/* eslint-disable no-else-return */
/* eslint-disable prettier/prettier */

import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import App, { AppState, getTaskIndex } from './App';

import 'bootstrap/dist/css/bootstrap.css'; // bootstrap (https://getbootstrap.com/) has layout controls
import '@fortawesome/fontawesome-free/css/all.css'; // fontAwesome (https://fontawesome.com/) has icons
import './index.scss';

const LOCAL_STORAGE_KEY = 'lemon_timer'; // The key in localStorage that we save everything to.


const DEFAULT_APP_STATE: AppState = { // When we start with no current application state, these are our defaults
    tasks: [], activeTaskID: false, workingUntil: false, onBreakUntil: false,
    workInterval: 25, breakInterval: 5
};


// Save the current state to localStorage
function saveState(state: AppState) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
}

// Load the state from localStorage (or return false if we couldn't find it)
function loadState(): AppState|false {
    try {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);
        if(data) {
            return JSON.parse(data);
        } else {
            return false;
        }
    } catch {
        return false; // probably an error parsing the JSON
    }
}

const MApp = React.memo(App);

function Root() {
    const [state, setAppState] = useState<AppState>(loadState() || DEFAULT_APP_STATE)

    const onStateChange = React.useCallback((newState: AppState) => {
        setAppState(newState);
        saveState(newState);
    }, []);

    return <>
        <MApp onStateChange={onStateChange} state={state} />
    </>
}

ReactDOM.render(<Root />, document.getElementById('root'));
