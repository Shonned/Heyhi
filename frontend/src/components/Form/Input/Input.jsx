import {InputGroup, InputLabel, InputLabelIcon, TextInput} from "./Input.styles.js";

// eslint-disable-next-line react/prop-types
const Input = (props) => {
    return (
        <InputGroup className='input-group'>
            {props.icon && (
                <InputLabelIcon>
                  <span className="material-symbols-rounded">
                    {props.icon}
                  </span>
                </InputLabelIcon>
            )}
            <TextInput
                type={props.type}
                placeholder={props.placeholder}
                id={props.id}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
            />
            {props.label && (
                <InputLabel htmlFor={props.id} className="input-label">
                    {props.label}
                </InputLabel>
            )}
        </InputGroup>
    );
};

export default Input;