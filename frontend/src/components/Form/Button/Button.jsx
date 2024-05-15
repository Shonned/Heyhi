import {StyledButton, ButtonServiceIcon} from './Button.styles';
import {ring} from 'ldrs'

ring.register()

const Button = (props) => {
    return (
        <StyledButton className={props.className} type={props.type} onClick={props.onClick} style={props.style} disabled={props.disabled}>
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
                <l-ring
                    size="21"
                    stroke="3"
                    bg-opacity="0"
                    speed="2"
                    color="#171717"
                ></l-ring>
            )}
        </StyledButton>
    );
};

export default Button;