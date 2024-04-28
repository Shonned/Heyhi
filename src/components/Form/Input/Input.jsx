import './Input.css'

// eslint-disable-next-line react/prop-types
const Input = ({ type, placeholder, value, onChange, icon }) => {
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
                value={value}
                onChange={onChange}
                className="text-input"
            />
        </div>
    );
};


export default Input;