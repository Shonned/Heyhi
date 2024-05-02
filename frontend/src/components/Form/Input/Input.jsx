import './Input.css'

// eslint-disable-next-line react/prop-types
const Input = ({ type, placeholder = "", id, name, value, onChange, icon, label, disabled }) => {
    return (
        <div className='input-group'>
            {icon && (
                <label className="input-label-icon">
                   <span className="material-symbols-rounded">
                       {icon}
                   </span>
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="text-input"
                disabled={disabled}
            />
            {label && (
                <label htmlFor={id} className="input-label">
                    {label}
                </label>
            )}
        </div>
    );
};


export default Input;