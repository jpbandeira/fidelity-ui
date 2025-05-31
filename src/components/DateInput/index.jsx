import React, { forwardRef } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { ptBR } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

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

const CustomInput = forwardRef(({ value, onClick, width }, ref) => (
    <StyledInput
        onClick={onClick}
        value={value}
        readOnly
        ref={ref}
        width={width}
    />
));

const DateInput = ({ value, setValue, width }) => {
    const handleChange = (date) => {
        setValue(date);
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
