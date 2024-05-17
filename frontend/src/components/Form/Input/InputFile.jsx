import {FileInput, InputFileGroup, InputFileLabel} from "./Input.styles.js";

// eslint-disable-next-line react/prop-types
const InputFile = (props) => {
    return (
        <InputFileGroup className={"file-group"}>
            <InputFileLabel htmlFor={props.id}>
                  <span className="material-symbols-rounded">
                    {props.icon}
                  </span>
            </InputFileLabel>
            <FileInput
                type={props.type}
                id={props.id}
                name={props.name}
                disabled={props.disabled}
                onChange={props.onChange}
            />
        </InputFileGroup>
    );
};

export default InputFile;