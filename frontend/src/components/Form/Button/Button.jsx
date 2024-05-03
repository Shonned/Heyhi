import './Button.css'

const Button = ({ onClick = '', text, type = 'button', className = 'button', icon = '', loading, style }) => {
    return (
        <button className={className} type={type} onClick={onClick} style={style}>
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

export default Button;