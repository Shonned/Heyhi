import './Dropdown.css'
import {useState} from "react";

const Dropdown = ({text, style, options, icon, selectedOption, onChange}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown" style={style}>
            <button onClick={toggleDropdown}>
                <div className="icon">
                    {icon && (
                        <span className="material-symbols-rounded">
                        {icon}
                    </span>
                    )}
                </div>
                {text}
            </button>
            {isOpen && (
                <ul>
                    {options.map((option, index) => (
                        <li key={index} className={option === selectedOption ? 'active' : ''} onClick={() => onChange(option)}>
                            <div className="icon">
                                {option === selectedOption && <span className="material-symbols-rounded">done</span>}
                            </div>
                            <div className="content">{option}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
