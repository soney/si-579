import EditableTextField from "./EditableTextField"
import { times } from 'lodash';
import { useState } from "react";
import CountdownTimerDisplay from "./Timer";
import LemonIcon from "./LemonIcon";
import { STOP_REASON, Task } from "./App";
import classNames from "classnames";


/**
 * Represents the display for an individual task
 */

export type TaskProps = {
    task: Task,                                                          // The task we are displaying
    editing: boolean,                                                    // If true, we edit the task description on load
    onRemove: (id: number) => void,                                      // Callback for when the user requests to remove this task
    onDescriptionChange: (id: number, description: string) => void,      // Callback for when the user requests to edit the task description
    onStart: (id: number) => void,                                       // Callback for when the user requests to start the task
    onStop: (id: number, reason: STOP_REASON) => void,                   // Callback for when the task stops (whether initiated by the user or completed)
    workOnUntil: number|false,                                           // The timestamp that we're working on **this task** until (or false if we aren't working on this task)
    editable: boolean                                                    // Whether the user should be able to edit/remove/start this task
}

const TaskDisplay: React.FC<TaskProps> = ({task, editing, onRemove, onDescriptionChange, onStart, workOnUntil, editable, onStop}) => {
    const [currentlyEditing, setCurrentlyEditing] = useState<boolean>(editing); // Are we currently editing the description?
    const lemonIcons = times(task.completedIntervals, (idx) => <LemonIcon blinking={false} key={idx} />); // Show the appropriate number of lemon icons

    return <tr className={"task" + (workOnUntil ? ' active' : '')}>
        <td className="input-group" style={{minWidth: '25em'}}>
            <EditableTextField editable={editable} onStartEditing={() => setCurrentlyEditing(true)} onStopEditing={() => setCurrentlyEditing(false)} editingClassName={'form-control'} value={task.description} editing={editing} placeholder='Task description' onFinishChange={(desc) => onDescriptionChange(task.id, desc)} />
            {currentlyEditing && <button className="btn btn-outline-danger btn-sm" onMouseDown={() => onRemove(task.id)}><i className="fa-regular fa-trash-can" /></button>}
        </td>
        <td className="completedCount align-middle" style={{width: '100%'}}>
            <div className="py-1">
                {lemonIcons}
                {workOnUntil && <><LemonIcon blinking={true} key={lemonIcons.length} />&nbsp;<span className="lemon-timer"><CountdownTimerDisplay target={workOnUntil} onDone={() => onStop(task.id, STOP_REASON.COMPLETED)} /></span></>}
            </div>
        </td>
        <td className="d-grid" style={{width: '15em'}}>
            {workOnUntil  && <button className="btn btn-outline-danger btn-block"  onClick={() => onStop(task.id, STOP_REASON.USER_INTERRUPT)}><i className="fa-solid fa-stop" />&nbsp;stop</button>}
            {!workOnUntil && <button className={classNames('btn', 'btn-outline-success', 'btn-block', {invisible: !editable})} onClick={() => onStart(task.id)}><i className="fa-solid fa-play" />&nbsp;start</button> }
        </td>
    </tr>
}


export default TaskDisplay;