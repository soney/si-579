import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

/**
 * An EditableTextField is a button that you can push in order to edit the content.
 * When editing its content, it appears as a text input. After the user hits [Enter]
 * or clicks away from the input, it reverts back to a button whose content is
 * what the user just entered.
 */

enum STATE { EDITING, VIEWING}; // the state of a given editable text field

type EditableTextFieldProps = {
    placeholder?: string,                         // What should appear when the input field is empty
    value?: string,                               // The current value
    editing?: boolean,                            // If set to `true`, will start out editing
    editingClassName?: string,                    // HTML class names that our component should have while editing
    viewingClassName?: string,                    // HTML class names that our component should have while viewing
    editable?: boolean,                           // `false` if the user should **not** be able to edit the content
    onChange?: (newValue: string) => void,        // A callback to be called as the user edits (keystroke level)
    onFinishChange?: (newValue: string) => void   // A callback to be called when the user finishes editing (when the <input /> disappears)
    onStartEditing?: () => void                   // A callback to be called when the user begins editing
    onStopEditing?: () => void                    // A callback to be called when the user finishes editing
}

const EditableTextField: React.FC<EditableTextFieldProps> = ({value, placeholder, editing, editable, editingClassName, viewingClassName, onChange: onValueChange, onFinishChange, onStartEditing, onStopEditing}) => {
    const [currentState, setState] = useState<STATE>(editing ? STATE.EDITING : STATE.VIEWING); // Represents the current state (editing or viewing)
    const [beforeEditValue, setBeforeEditValue] = useState<string>(value||'');                 // Represents the current value **before** the user started editing (in case we need to revert when the user hits Esc)
    const [currentValue, setValue] = useState<string>(value||'');                              // Represents the current value
    const inputRef = useRef<HTMLInputElement>(null);    // A reference to the <input /> element

    useEffect(() => { // When we begin editing, focus and select the <input /> element
        if(currentState === STATE.EDITING) {
            if(inputRef.current) {
                inputRef.current.focus();
                inputRef.current.select();
            }
        }
    }, [currentState]);

    if(currentState === STATE.EDITING) {
        // When the user changes the input value
        const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = ev.target.value;
            setValue(newValue);
            if(onValueChange) { onValueChange(newValue); }
        };

        // When the user is done editing. If they cancelled, revert back to the old value
        const onDoneEditing = (cancelled:boolean=false) => {
            setState(STATE.VIEWING);
            if(onStopEditing)  { onStopEditing(); }

            if(cancelled) { // If the user cancelled, then revert to the old value (before we started editing)
                setValue(beforeEditValue);
                if(onFinishChange) { onFinishChange(beforeEditValue); }
            } else { // If the user didn't cancel, notify that we finished editing with the new value
                if(onFinishChange) { onFinishChange(currentValue); }
            }

        };
        const onBlur = () => onDoneEditing(); // The user is done editing this cell (usually means they clicked elsewhere)
        const onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
            if(ev.key === 'Enter') {
                onDoneEditing();
            } else if(ev.key === 'Esc') {
                onDoneEditing(true);
            }
        };

        return <input className={classNames(editingClassName)} type="text" value={currentValue} onKeyDown={onKeyDown} onChange={onChange} onBlur={onBlur} placeholder={placeholder} ref={inputRef}></input>
    } else {
        // When the user clicks, begin editing
        const onClick = () => {
            if(editable) {
                setState(STATE.EDITING);
                setBeforeEditValue(currentValue); // track what the value was before
                if(onStartEditing)  { onStartEditing(); }
            }
        };
        const usePlaceholder = !currentValue.trim(); // If the user hasn't entered anything, we need to use the placeholder

        return <button disabled={!editable} className={classNames('btn', 'btn-link', viewingClassName, {placeholder: usePlaceholder})} onClick={onClick}>{usePlaceholder ? (placeholder || '(empty)') : currentValue}</button>
    }
}

export default EditableTextField;