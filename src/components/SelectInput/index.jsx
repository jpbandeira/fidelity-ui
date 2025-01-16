import styled from "styled-components";

const Select = styled.select`  
    width: ${(props) => props.width || "300px"};
    display: flex;
    justify-content: center;
    width: ;
`;

const SelectInput = ({
    name,
    value,
    onChange,
    values,
    width
}) => {

    return (
        <div id='select-input-box'>
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