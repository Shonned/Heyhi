import {StyledButton, ButtonServiceIcon} from './Button.styles';
import { tailspin } from 'ldrs'
tailspin.register()

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
                <l-tailspin
                size="23"
                stroke="4"
                speed="0.9"
                color="white"
                ></l-tailspin>
            )}
        </StyledButton>
    );
};

export default Button;