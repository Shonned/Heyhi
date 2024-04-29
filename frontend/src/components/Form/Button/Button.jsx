import './Button.css'

// eslint-disable-next-line react/prop-types
const Button = ({ onClick, text, type, className, icon }) => {
    return (
        <button className={className} type={type} onClick={onClick}>
            {text}
            {icon && (
                <span className="material-symbols-rounded">
                    {icon}
                </span>
            )}
        </button>
    );
};

Button.defaultProps = {
    type: 'button',
    className: 'button',
};

export default Button;