import './style.css';

const TextInput = ({ id, name, placeholder, value, onChange }) => {
    return (
        <div id='text-input-box'>
            <input
                type="text"
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

export default TextInput;