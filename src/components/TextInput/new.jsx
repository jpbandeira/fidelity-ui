// components/StyledInput.js
import styled, { css } from 'styled-components';

const sizeStyles = {
    small: css`
    padding: 0.5rem;
    font-size: 0.875rem;
  `,
    medium: css`
    padding: 0.75rem;
    font-size: 1rem;
  `,
    large: css`
    padding: 1rem;
    font-size: 1.125rem;
  `,
};

export const StyledInput = styled.input`
  border: 2px solid #ff5f6d;
  background-color: #fff0f5;
  color: #4b1c1c;
  border-radius: 8px;
  outline: none;
  width: 100%;
  transition: all 0.3s ease;

  ${(props) => sizeStyles[props.size || 'medium']}

  &::placeholder {
    color: #aa6c84;
  }

  &:focus {
    border-color: #ffc371;
    box-shadow: 0 0 0 3px rgba(255, 95, 109, 0.2);
    background-color: #ffe4ec;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
