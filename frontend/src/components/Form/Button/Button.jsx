import { StyledButton, Loader } from './Button.styles';

const Button = ({ onClick = '', text, type = 'button', className = 'button', icon = '', loading, style }) => {
    return (
        <StyledButton className={className} type={type} onClick={onClick} style={style}>
            {!loading && (
                <>
                    <span>{text}</span>
                    {icon && (
                        <span className="material-symbols-rounded">
              {icon}
            </span>
                    )}
                </>
            )}
            {loading && (
                <Loader className="loader" />
            )}
        </StyledButton>
    );
};

export default Button;