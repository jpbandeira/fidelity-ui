import { useContext, useState } from 'react';
import ClientContext from '../../contexts/client.js'
import './Service.css';

import DateInput from '../../components/DateInput/index.jsx'
import TextInput from '../../components/TextInput/index.jsx'
import SelectInput from '../../components/SelectInput/index.jsx'
import NumberInput from '../../components/NumberInput/index.jsx'
import ButtonInput from '../../components/Button/index.jsx';
import { MdDelete } from "react-icons/md";

import { createServices } from '../../data/services/service.js';


function Service() {
  const { client } = useContext(ClientContext)

  let now = new Date()
  let month = (now.getMonth() + 1) < 10 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1)
  let currentDate = now.getFullYear() + '-' + month + '-' + now.getDate()
  const [serviceDate, setServiceDate] = useState(currentDate)

  const [attedant, setAttendant] = useState("")
  const [description, setDescription] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [paymentType, setPaymentType] = useState("")
  const [price, setPrice] = useState(0)
  const [services, setServices] = useState([])

  const handleAddService = () => {
    let service = {
      ServiceDate: serviceDate,
      Attendant: attedant,
      Description: description,
      ServiceType: serviceType,
      PaymentType: paymentType,
      Price: price,
      Client: {
        ID: client.id,
        Name: client.name,
        Email: client.email,
        Phone: client.phone
      }
    }
    console.log(service)
    setServices(prevState =>
      [
        ...prevState,
        service
      ])
  }

  const handleRemoveService = (index) => {
    let service = services[index]
    setServices(l => l.filter(item => item !== service))
  }

  const handleSaveService = () => {
    services.forEach(async (service) => {
      createServices(service)
        .then((response) => {
          if (response.data == null) {
            return
          }

          let body = response.data
        })
        .catch(function (error) {
          console.error(error);
        })
    });

  }

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
          <DateInput
            id="fservice-date"
            name="service-date"
            value={serviceDate}
            setValue={setServiceDate}
          />
          {/* <div>{serviceDate}</div> */}
          <SelectInput
            id="fattedant"
            name="attedant"
            value={attedant}
            onChange={setAttendant}
            values={["Atendente", "EU", "TU", "NOS"]}
          />
          <SelectInput
            id="fservice-type"
            name="service-type"
            value={serviceType}
            onChange={setServiceType}
            values={["Atendimento", "Alongamento", "U.Simples", "Manutenção"]}
          />
          <SelectInput
            id="fpayment-type"
            name="payment-type"
            value={paymentType}
            onChange={setPaymentType}
            values={["Tipo de Pagamento", "Crédito", "Débito", "Dinheiro", "PIX"]}
          />
          <NumberInput
            id="fprice"
            name="price"
            placeholder="Preço"
            value={price}
            onChange={setPrice}
          />
          <TextInput
            name="description"
            placeholder="Descrição"
            value={description}
            onChange={setDescription}
          />
          <ButtonInput
            buttonLabel="Adicionar atendimento"
            onClick={() => handleAddService()}
          />
        </div>
        <div id='service-grid-container-line4'>
          {
            services.map(
              (service, index) =>
                <div key={index} id='service-table-box'>
                  <div id='line1-column1'>{service.ServiceType}</div>
                  <div id='line1-column2'>{service.PaymentType}</div>
                  <div id='line1-column3'>{service.Price}</div>
                  <div id='line1-column4'>
                    <MdDelete
                      onClick={() => handleRemoveService(index)}
                      size={30}
                    />
                  </div>
                </div>
            )
          }
        </div>
        <div id='service-grid-container-line5'>
          <ButtonInput
            buttonLabel="Salvar"
            width="100px"
            onClick={() => handleSaveService()}
          />
        </div>
      </div>
    </div>
  );
}

export default Service;
