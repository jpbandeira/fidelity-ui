import React, { forwardRef } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { ptBR } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

// Componente estilizado igual seu input original
const StyledInput = styled.input`
  display: flex;
  justify-content: center;
  width: ${(props) => props.width || "300px"};

  padding: 12px 20px;
  margin: 8px 0;
  border: 1px solid #CCCCCC;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;

  background-color: #FFFFFF;
  color: black;
  cursor: pointer;
`;

// Componente custom para input — necessário para impedir o teclado
const CustomInput = forwardRef(({ value, onClick, width }, ref) => (
    <StyledInput
        onClick={onClick}
        value={value}
        readOnly
        ref={ref}
        width={width}
    />
));

export const formatDateToBackend = (date) => {
    const pad = (n) => String(n).padStart(2, "0");
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
};

const DateInput = ({ name, value, setValue, width }) => {
    const handleChange = (date) => {
        const now = new Date();
        const dateWithTime = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            now.getHours(),
            now.getMinutes(),
            now.getSeconds()
        );
        const formatted = formatDateToBackend(dateWithTime);
        setValue(formatted);
    };

    return (
        <DatePicker
            selected={value ? new Date(value) : null}
            onChange={handleChange}
            dateFormat="dd/MM/yyyy"
            locale={ptBR}
            placeholderText="Selecione a data"
            customInput={<CustomInput width={width} />}
        />
    );
};

export default DateInput;
