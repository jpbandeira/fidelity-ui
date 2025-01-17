import styled from "styled-components";

const Input = styled.input`  
    display: flex;
    justify-content: center;
    width: ${(props) => props.width || "300px"};

    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`;

const NumberInput = ({ name, placeholder, value, onChange }) => {
    return (
        <Input
            type="number"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}

export default NumberInput;