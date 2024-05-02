import './Input.css'

// eslint-disable-next-line react/prop-types
const Input = ({ type, placeholder, name, value, onChange, icon, disabled }) => {
    return (
        <div className='input-group'>
            {icon && (
                <label className="input-label">
                   <span className="material-symbols-rounded">
                       {icon}
                   </span>
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className="text-input"
                disabled={disabled}
            />
        </div>
    );
};


export default Input;