import React, { useEffect, useState } from "react";
import IntervalConfigDisplay from "./IntervalConfig";
import TaskDisplay  from "./TaskDisplay";
import CountdownTimerDisplay  from "./Timer";
import update from 'immutability-helper';
import classNames from "classnames";

/**
 * The primary application container
 */

const MS_PER_MINUTE = 60 * 1000; // Milliseconds per minute

const MTaskDisplay = React.memo(TaskDisplay); // Memoize the TaskDisplay component to avoid unnecessary re-rendering

export enum STOP_REASON { USER_INTERRUPT, COMPLETED } // Encodes *why* a timer was stopped (whether it finished or the user manually hit stop)

type AppProps = {
    state: AppState,                     // Optionally pass in an initial state
    onStateChange?: (state: AppState) => void   // A callback to be called when the state changes
}

export type AppState = { // (no, not the school)
    tasks: Array<Task>,         // The list of tasks
    workInterval: number,       // How long work intervals should be (in minutes)
    breakInterval: number,      // How long break intervals should be (in minutes)
    activeTaskID: number|false, // false: no active task. Otherwise, the ID of the active task
    workingUntil: number|false, // false: no active task. Otherwise, the timestamp at which this work session ends
    onBreakUntil: number|false  // false: not on break.   Otherwise, the timestamp at which the break ends
}

export type Task = { // Represents a single task
    id: number,                // A unique ID for the task
    description: string,       // A description of the task
    completedIntervals: number // How many times we have worked on this task (how many lemons)
}
const pingAudio = new Audio('ping.wav');


let editingTaskUid: number|false = false; // When we first create a new task, we want to start editing it. This variable tracks the last task we created (so that we know to edit it)
const App: React.FC<AppProps> = ({ state: initialState, onStateChange }) => {
    const [state, setState] = useState<AppState>(initialState); // If the user did not pass in an initial state, use the defaults

    useEffect(() => { // Whenever the state changes, call the appropriate callback
        if(onStateChange) {
            onStateChange(state);
        }
    }, [state]);

    const addTask = React.useCallback(() => { // When the user adds a new task
        setState((state) => {
            // Come up with a new unique id by taking the maximum of existing IDs...
            const maxExistingID = Math.max(0, ...state.tasks.map((t) => t.id));
            const id = editingTaskUid = maxExistingID + 1; // ... and adding 1

            const newTask: Task = {id, description: '', completedIntervals: 0}; // The new task object to be pushed
            return update(state, { tasks: {$push: [newTask]}});
        });
    }, []);

    const startTask = React.useCallback((id: number) => { // When the user starts a task
        setState((state) => {
            const workingUntil = Date.now() + (state.workInterval||0) * MS_PER_MINUTE; // The timestamp at which we've completed working on the task
            return update(state, { activeTaskID: {$set: id}, workingUntil: {$set: workingUntil} });
        });
    }, []);

    const stopTask = React.useCallback((id: number, reason: STOP_REASON) => { // When the user stops a task (whether manually or because the timer completed)
        setState((state) => {
            if(reason === STOP_REASON.COMPLETED) { // If we stopped because we actually finished the task
                pingAudio.play();
                const taskIndex = getTaskIndex(state.tasks, id);
                if(taskIndex!==false) {
                    // Add one more completed interval, remove the tactive task ID, mark that we're on break
                    const breakUntil = Date.now() + (state.breakInterval||0) * MS_PER_MINUTE;
                    return update(state, { activeTaskID: {$set: false}, workingUntil: {$set: false}, onBreakUntil: {$set: breakUntil}, tasks: { [taskIndex]: { completedIntervals: {$apply: (c) => c+1}}}});
                }
            }
            // If the user cancelled, just set the active task to false (don't add another completed stamp and don't go on break)
            return update(state, { activeTaskID: {$set: false}, workingUntil: {$set: false} });
        });
    }, []);

    const removeTask = React.useCallback((id: number) => { // Delete a task
        setState((state) => {
            const taskIndex = getTaskIndex(state.tasks, id); // get the task index...
            if(taskIndex!==false) {
                return update(state, {tasks: {$splice: [[taskIndex, 1]]}}); //...and remove it
            } else {
                return state;
            }
        });
    }, []);

    const setTaskDescription = React.useCallback((id: number, description: string) => { // Change a task description
        setState((state) => {
            const taskIndex = getTaskIndex(state.tasks, id);
            if(taskIndex!==false) {
                return update(state, {tasks: {[taskIndex]: { description: {$set: description }}}});
            } else {
                return state;
            }
        });
    }, []);

    const setWorkInterval = React.useCallback((newWorkInterval: number) => { // Change how long each work interval is
        setState((state) => {
            return update(state, {workInterval: {$set: newWorkInterval}});
        });
    }, []);

    const setBreakInterval = React.useCallback((newBreakInterval: number) => { // Change how long each break interval is
        setState((state) => {
            return update(state, {breakInterval: {$set: newBreakInterval}});
        });
    }, []);

    const stopBreak = (reason: STOP_REASON) => { // When the user interrupts the break
        setState((state) => {
            if(reason === STOP_REASON.COMPLETED) { // Only play the ping if the user did *not interrupt*
                pingAudio.play();
            }
            return update(state, {onBreakUntil: {$set: false}})
        });
    };

    const currentlyWorking = state.activeTaskID !== false;
    const currentlyOnBreak = state.onBreakUntil !== false;
    const currentlyIdle    = !currentlyWorking && !currentlyOnBreak;

    const taskElements = state.tasks.map((t) => {
        const isActiveTask = t.id === state.activeTaskID;
        const editable = (state.activeTaskID===false) && (state.onBreakUntil === false);
        return <MTaskDisplay key={t.id} onStop={stopTask} onStart={startTask} task={t} editing={t.id===editingTaskUid} onRemove={removeTask} onDescriptionChange={setTaskDescription} workOnUntil={isActiveTask && state.workingUntil} editable={editable}  />
    });
    editingTaskUid = false; // Ensure that we aren't going to auto-edit the next task on start

    return <>
    <main className="container">
        <table id="lemon-app" className={classNames('table', {working: currentlyWorking})}>
            <thead>
                <tr>
                    <th colSpan={3} className = {classNames({invisible: currentlyWorking})}>
                        {!currentlyOnBreak  && <h1>what do you want to do?</h1>}
                        {state.onBreakUntil && <h1>take a break&nbsp;
                                <CountdownTimerDisplay target={state.onBreakUntil} onDone={() => stopBreak(STOP_REASON.COMPLETED)} />&nbsp;
                                <button className="btn btn-outline-danger btn-block"  onClick={() => stopBreak(STOP_REASON.USER_INTERRUPT)}><i className="fa-solid fa-stop" />&nbsp;end break</button>
                            </h1>}
                    </th>
                </tr>
            </thead>
            <tbody>{!currentlyOnBreak && taskElements}</tbody>
            <tfoot>
                <tr>
                    <td colSpan={3}>
                        <div className="d-grid">
                            {currentlyIdle && <button className="btn btn-primary btn-block" disabled={state.activeTaskID!==false} onClick={addTask}><i className="fa-solid fa-plus" />&nbsp;add task</button> }
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    </main>
    <footer className="container">
        {currentlyIdle && <IntervalConfigDisplay workInterval={state.workInterval} breakInterval={state.breakInterval} onChangeWorkInterval={setWorkInterval} onChangeBreakInterval={setBreakInterval} /> }
    </footer>
    </>
};

export default App;

/**
 * Given a list of tasks, this function finds the task with the specified ID (or false if it could not find that task)
 * 
 * @param tasks A list of tasks
 * @param id The ID of the task we are seraching for
 * @returns The task index (or false if we could not find the task)
 */
export function getTaskIndex(tasks: Array<Task>, id: number): number|false {
    for(let idx: number = 0; idx<tasks.length; idx++) {
        if(tasks[idx].id === id) {
            return idx
        }
    }
    return false;
}