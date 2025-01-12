import { useContext, useState } from 'react';
import ClientContext from '../../contexts/client.js'
import './Service.css';
import TextInput from '../../components/TextInput/index.jsx'
import DateInput from '../../components/DateInput/index.jsx'
import SelectInput from '../../components/SelectInput/index.jsx'
import NumberInput from '../../components/NumberInput/index.jsx'


function Service() {
  const { client } = useContext(ClientContext)

  const [serviceDate, setServiceDate] = useState()
  const [attedant, setAttendant] = useState("")
  const [description, setDescriion] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [paymentType, setPaymentType] = useState("")
  const [price, setPrice] = useState(0)

  return (
    <div id="service-container">
      <div id='service-grid-container'>
        <div id='service-grid-container-line1'>
          {client && client.name}
        </div>
        <div id='service-grid-container-line2'>
          <div>Telefone: {client && client.phone}</div>
          <div>Email: {client && client.email}</div>
        </div>
        <div id='service-grid-container-line3'>
          <DateInput id="fservice-date" name="service-date" value={serviceDate} onChange={setServiceDate} />
          <SelectInput id="fattedant" name="attedant" value={attedant} onChange={setAttendant} values={["Atendente", "EU", "TU", "NOS"]} />
          <SelectInput id="fservice-type" name="service-type" value={serviceType} onChange={setServiceType} values={["Atendimento", "Alongamento", "U.Simples", "Manutenção"]} />
          <SelectInput id="fpayment-type" name="payment-type" value={paymentType} onChange={setPaymentType} values={["Tipo de Pagamento", "Crédito", "Débito", "Dinheiro", "PIX"]} />
          <NumberInput id="fprice" name="price" placeholder="Preço" value={price} onChange={setPrice} />
          <TextInput id="fdesctiption" name="description" placeholder="description" value={description} onChange={setDescriion} />
          <div>
            Botão add Atendimento
          </div>
        </div>
        <div id='service-grid-container-line4'>
          Lista de Atendimentos
        </div>
        <div>Botão salvar</div>
      </div>
    </div>
  );
}

export default Service;
