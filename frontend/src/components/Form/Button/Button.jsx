import { StyledButton, Loader } from './Button.styles';

const Button = (props) => {
    return (
        <StyledButton className={props.className} type={props.type} onClick={props.onClick} style={props.style}>
            {!props.loading && (
                <>
                    <span>{props.text}</span>
                    {props.icon && (
                        <span className="material-symbols-rounded">
              {props.icon}
            </span>
                    )}
                </>
            )}
            {props.loading && (
                <Loader className="loader" />
            )}
        </StyledButton>
    );
};

export default Button;