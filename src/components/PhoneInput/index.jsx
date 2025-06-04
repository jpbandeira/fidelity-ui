import React from 'react';
import { PatternFormat } from "react-number-format";
import styled from "styled-components";

export const formatPhone = (phone) => {
  if (!phone) return "";
  return phone.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, "($1) $2 $3-$4");
};

const StyledPhoneInput = styled(PatternFormat)`
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
  font-size: 16px;

  color: black;
`;

export const PhoneInput = ({ name, value, onChange }) => {
  return (
    <StyledPhoneInput
      name={name}
      format="(##) # ####-####" // Máscara para telefone brasileiro
      allowEmptyFormatting
      mask="_"
      value={value}
      onValueChange={(values) => onChange(values.value)}
    />
  );
};
