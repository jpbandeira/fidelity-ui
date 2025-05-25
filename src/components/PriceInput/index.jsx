import styled from "styled-components";
import { NumericFormat } from "react-number-format";

export const formatPrice = (value) => {
    if (!value) return "R$ 0,00";
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    }).format(value);
};

const StyledNumericFormat = styled(NumericFormat)`
    display: flex;
    justify-content: center;
    width: ${(props) => props.width || "300px"};

    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
`

export const PriceInput = ({ name, placeholder, value, handlePrice }) => {
    return (
        <StyledNumericFormat
            name={name}
            placeholder={placeholder}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            value={value}
            onValueChange={(values) => handlePrice(values.value)}
            allowNegative={false}
            decimalScale={2}
            fixedDecimalScale
            displayType="input"
        />
    );
}