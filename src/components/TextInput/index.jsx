import styled from "styled-components";

const Input = styled.input`  
    display: flex;
    justify-content: center;
    width: 300px;
    height: ${(props) => props.height || "70px"};

    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #CCCCCC;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
    
    background-color: #FFFFFF;
`;

const TextInput = ({ width, id, name, placeholder, value, onChange, type }) => {
    return (
        <div>
            <Input
                type={type}
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