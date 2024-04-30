import './Button.css'

// eslint-disable-next-line react/prop-types
const Button = ({ onClick, text, type, className, icon, loading }) => {
    return (
        <button className={className} type={type} onClick={onClick}>
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
                <span className="loader"></span>
            )}
        </button>
    );
};

Button.defaultProps = {
    type: 'button',
    className: 'button',
};

export default Button;