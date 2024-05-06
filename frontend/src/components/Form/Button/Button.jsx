import {StyledButton, Loader, ButtonServiceIcon} from './Button.styles';

const Button = (props) => {
    return (
        <StyledButton className={props.className} type={props.type} onClick={props.onClick} style={props.style}>
            {!props.loading && (
                <>
                    {props.serviceIcon && (
                        <ButtonServiceIcon>
                            {props.serviceIcon}
                        </ButtonServiceIcon>
                    )}
                    <span>{props.text}</span>
                    {props.icon && (
                        <span className="material-symbols-rounded">
                            {props.icon}
                        </span>
                    )}
                </>
            )}
            {props.loading && (
                <Loader className="loader"/>
            )}
        </StyledButton>
    );
};

export default Button;