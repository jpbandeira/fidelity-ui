import styled from "styled-components";

const Button = styled.button`
  max-width: 100%;
  width: ${(props) => props.$width || "auto"};
  height: ${(props) => props.$height || "40px"};
  border-radius: 4px;
  border: 1px solid #ccc;
  margin: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background-color: #eee;
    border-color: #999;
  }

  &:active {
    background-color: #ddd;
    border-color: #666;
  }

  &:disabled {
    background-color: #f9f9f9;
    border-color: #eee;
    cursor: not-allowed;
    color: #aaa;
  }
`;

export const ButtonGradient = styled(Button)`
  background: linear-gradient(45deg, #ff6b6b, #f06595);
  color: white;
  border: none;
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(240, 101, 149, 0.6);
  font-weight: 700;

  &:hover {
    background: linear-gradient(45deg, #f06595, #ff6b6b);
  }

  &:active {
    box-shadow: 0 2px 7px rgba(240, 101, 149, 0.9);
  }
`;

export const ButtonModern = styled(Button)`
  background-color: #007bff;
  color: white;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 123, 255, 0.4);

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004080;
  }
`;

export const ButtonOutline = styled(Button)`
  background: transparent;
  color: #28a745;
  border: 2px solid #28a745;
  font-weight: 600;
  overflow: hidden;
  position: relative;
  z-index: 0;

  &:before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: #28a745;
    z-index: -1;
    transition: transform 0.3s ease;
    transform: scaleX(0);
    transform-origin: left;
  }

  &:hover:before {
    transform: scaleX(1);
  }

  &:hover {
    color: white;
  }
`;
