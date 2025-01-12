import './style.css';

const SelectInput = ({ id, name, value, onChange, values }) => {
    return (
        <div id='select-input-box'>
            <select
                type="select"
                id={id}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {
                    values.map(
                        (v, index) =>
                            <option key={index} value={v}>{v}</option>
                    )
                }
            </select>
        </div>
    );
}

export default SelectInput;