import {InputGroup, InputLabel, InputLabelIcon, TextInput} from "./Input.styles.js";

// eslint-disable-next-line react/prop-types
const Input = ({ type, placeholder = "", id, name, value, onChange, icon, label, disabled }) => {
    return (
        <InputGroup className='input-group'>
            {icon && (
                <InputLabelIcon>
          <span className="material-symbols-rounded">
            {icon}
          </span>
                </InputLabelIcon>
            )}
            <TextInput
                type={type}
                placeholder={placeholder}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            {label && (
                <InputLabel htmlFor={id} className="input-label">
                    {label}
                </InputLabel>
            )}
        </InputGroup>
    );
};


export default Input;