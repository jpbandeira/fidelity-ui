import styled from "styled-components";

const Select = styled.select`  
    width: ${(props) => props.width || "300px"};
    display: flex;
    justify-content: center;

    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`;

const SelectInput = ({
    name,
    value,
    onChange,
    values,
    width
}) => {
    return (
        <div>
            <Select
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                width={width}
            >
                {
                    values.map(
                        (v, index) =>
                            <option key={index} value={v}>{v}</option>
                    )
                }
            </Select>
        </div>
    );
}

export default SelectInput;