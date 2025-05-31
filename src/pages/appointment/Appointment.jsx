import { useContext, useState, useEffect } from 'react';

import { useClient } from '../../contexts/client/Context.js';
import './Appointment.css';

import DateInput from '../../components/DateInput/index.jsx'
import TextInput from '../../components/TextInput/index.jsx'
import SelectInput from '../../components/SelectInput/index.jsx'
import { PriceInput, formatPrice } from '../../components/PriceInput/index.jsx'
import { formatPhone } from '../../components/PhoneInput/index.jsx'
import { ButtonGradient } from '../../components/Button/index.jsx';
import { MdDelete } from "react-icons/md";

import { createAppointment } from '../../data/services/appointment.js';
import { listServiceTypes } from '../../data/services/serviceType.js';

import { formatDateToBackend, getCurrentDate, getCurrentTimeZone } from '../../utils/utils.js'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'

import { useSession } from '../../contexts/session/Context.js';


function Appointment() {
  const navigate = useNavigate();
  const { client } = useClient()

  const [serviceTypes, setServiceTypes] = useState([])

  const [serviceDate, setServiceDate] = useState(new Date())

  const [description, setDescription] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [paymentType, setPaymentType] = useState("")
  const [price, setPrice] = useState("")
  const [services, setServices] = useState([])

  const { userSession } = useSession()

  useEffect(() => {
    handleFetchServiceTypes()
  }, [])

  const warning = (message) => {
    toast.warning(message, {
      duration: 6000
    })
  }

  const formHasError = () => {
    let has_error = false

    if (serviceType === "") {
      warning("Selecione um tipo de serviço")
      has_error = true
    }

    if (paymentType === "") {
      warning("Selecione um tipo de pagamento")
      has_error = true
    }

    if (price === "") {
      warning("Preço não deve ser vazio")
      has_error = true
    } else if (Number(price) === 0) {
      warning("Preço deve ser maior que zero")
      has_error = true
    }

    return has_error
  }

  const handleAddService = () => {
    if (formHasError()) {
      return
    }

    var now = new Date();
    var dateWithTime = new Date(
      serviceDate.getFullYear(),
      serviceDate.getMonth(),
      serviceDate.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    )

    let service = {
      name: serviceType,
      price: Number(price),
      paymentType: paymentType,
      description: description,
      serviceDate: formatDateToBackend(dateWithTime),
    }

    setServices(prevState =>
      [
        ...prevState,
        service
      ])

    setPrice("")
    setServiceType("")
    setPaymentType("")
    setDescription("")
    setServiceDate(new Date())
  }

  const handleRemoveService = (index) => {
    let service = services[index]
    setServices(l => l.filter(item => item !== service))
  }

  const handleSaveAppointment = async () => {
    var appointment = {
      "client": {
        id: client.id
      },
      "attendantID": userSession.id,
      "services": services
    }

    var body = await createAppointment(appointment)
    if (body === null) {
      toast.error('Falha ao salvar atendimentos!')
    }
    toast.success('Atendimentos salvos!')
    navigate("/client")
  }

  const handleFetchServiceTypes = async () => {
    var body = await listServiceTypes([])
    if (body !== null) {
      setServiceTypes(body.map((v) => v.description));
    }

  }

  return (
    <div id="service-container">
      <Toaster position="top-right" richColors expand={true} />
      <div id='service-grid-container'>
        <div id='service-grid-container-line1'>
          {client !== null && client.name}
        </div>
        <div id='service-grid-container-line2'>
          <div>Telefone: {client !== null && formatPhone(client.phone)}</div>
          <div>Email: {client !== null && client.email}</div>
        </div>
        <div id='service-grid-container-line3'>
          <DateInput
            id="fservice-date"
            name="serviceDate"
            value={serviceDate}
            setValue={setServiceDate}
          />
          <SelectInput
            id="fservice-type"
            name="service-type"
            value={serviceType}
            onChange={setServiceType}
            values={serviceTypes}
            placeholder='Tipo de Serviço'
          />
          <SelectInput
            id="fpayment-type"
            name="payment-type"
            value={paymentType}
            onChange={setPaymentType}
            values={["Crédito", "Débito", "Dinheiro", "PIX"]}
            placeholder='Tipo de Pagamento'
          />
          <PriceInput
            id="fprice"
            name="price"
            placeholder="R$ 0,00"
            value={price}
            handlePrice={setPrice}
          />
          <TextInput
            name="description"
            placeholder="Descrição"
            value={description}
            onChange={setDescription}
            type="text"
          />
          <ButtonGradient
            onClick={() => handleAddService()}
          >
            Adicionar atendimento
          </ButtonGradient>
        </div>
        <div id='service-grid-container-line4'>
          {
            services.map(
              (service, index) =>
                <div key={index} id='service-table-box'>
                  <div id='line1-column1'>{service.name}</div>
                  <div id='line1-column2'>{service.paymentType}</div>
                  <div id='line1-column3'>{formatPrice(service.price)}</div>
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
          <ButtonGradient
            $width="100px"
            onClick={() => handleSaveAppointment()}
          >
            Salvar
          </ButtonGradient>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
