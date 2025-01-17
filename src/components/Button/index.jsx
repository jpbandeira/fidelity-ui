import styled from "styled-components";

const Button = styled.input`  
    max-width: 1fr;
    width: ${(props) => props.width};
    height: ${(props) => props.height || "40px"};
    border-radius: 4px;
    border: 1px solid #ccc;
    margin: 8px;
`;

const ButtonInput = ({ width, height, buttonLabel, onClick }) => {
    return (
        <Button
            type="submit"
            value={buttonLabel}
            onClick={() => onClick()}
            height={height}
            width={width}
        />
    );
}

export default ButtonInput;