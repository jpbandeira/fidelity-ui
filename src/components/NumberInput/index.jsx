import './style.css';

const NumberInput = ({ id, name, placeholder, value, onChange }) => {
    return (
        <input
            type="number"
            id='number-input'
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}

export default NumberInput;