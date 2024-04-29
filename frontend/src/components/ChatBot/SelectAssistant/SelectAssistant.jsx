import Dropdown from "../../Utils/Dropdown/Dropdown.jsx";
import {useState} from "react";

const SelectAssistant = () => {
    const [selectedOption, setSelectedOption] = useState('Choose Assistant');
    const options = ['Assistant 1', 'Assistant 2', 'Assistant 3'];

    const dropdownStyle = {
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 2,
    }

    const handleChange = (option) => {
        setSelectedOption(option);
    };

    return (
        <>
            <Dropdown
                text={selectedOption}
                style={dropdownStyle}
                icon="accessibility_new"
                options={options}
                selectedOption={selectedOption}
                onChange={handleChange}
            />
        </>
    )
}

export default SelectAssistant;