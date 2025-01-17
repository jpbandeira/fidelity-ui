import styled from "styled-components";

const Input = styled.input`  
    display: flex;
    justify-content: center;
    width: 300px;
    height: ${(props) => props.height || "70px"};

    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`;

const TextInput = ({ width, id, name, placeholder, value, onChange }) => {
    return (
        <div>
            <Input
                type="text"
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                width={width}
            />
        </div>
    );
}

export default TextInput;