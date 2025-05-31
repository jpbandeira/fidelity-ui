import styled from "styled-components";

const Input = styled.input`  
    display: flex;
    justify-content: center;
    width: ${(props) => props.width || "300px"};

    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #CCCCCC;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;

    background-color: #FFFFFF;
    color: black;
`;

const DateInput = ({ name, value, setValue, width }) => {
    return (
        <div>
            <Input
                type="date"
                name={name}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                width={width}
            />
        </div>
    );
}

export default DateInput;