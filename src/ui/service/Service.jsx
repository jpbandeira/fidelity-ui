import { useContext, useState, useEffect } from 'react';
import ClientContext from '../../contexts/client.js'
import './Service.css';

import DateInput from '../../components/DateInput/index.jsx'
import TextInput from '../../components/TextInput/index.jsx'
import SelectInput from '../../components/SelectInput/index.jsx'
import { PriceInput, formatPrice } from '../../components/PriceInput/index.jsx'
import { formatPhone } from '../../components/PhoneInput/index.jsx'
import ButtonInput from '../../components/Button/index.jsx';
import { MdDelete } from "react-icons/md";

import { createServices } from '../../data/services/service.js';
import { listAttendants } from '../../data/services/attendant.js';
import { listServiceType } from '../../data/services/serviceType.js';

import { getCurrentDate, getCurrentTimeZone } from '../../utils/utils.js'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { HttpStatusCode } from 'axios';


function Service() {
  const { client } = useContext(ClientContext)
  const navigate = useNavigate();

  const [attendants, setAttendants] = useState([])
  const [attendantsNames, setAttendantsNames] = useState([])
  const [serviceTypes, setServiceTypes] = useState([])

  const [serviceDate, setServiceDate] = useState(getCurrentDate())

  const [attendant, setAttendant] = useState(attendantsNames[0] || "")
  const [description, setDescription] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [paymentType, setPaymentType] = useState("")
  const [price, setPrice] = useState("")
  const [services, setServices] = useState([])

  useEffect(() => {
    handleFetchAttendants()
    handleFetchServiceTypes()
  }, [])

  useEffect(() => {
    if (attendantsNames.length > 0) {
      setAttendant(attendantsNames[0]);
    }
  }, [attendantsNames]);

  const warning = (message) => {
    toast.warning(message, {
      duration: 6000
    })
  }

  const formHasError = () => {
    let has_error = false

    if (attendant === "") {
      warning("Selecione um atendente")
      has_error = true
    }

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
    const selectedAttendant = attendants.find(att => att.name.trim() === attendant.trim());

    if (formHasError()) {
      return
    }

    let service = {
      price: Number(price),
      serviceType: serviceType,
      paymentType: paymentType,
      description: description,
      serviceDate: serviceDate + getCurrentTimeZone(),
      client: {
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone
      },
      attendant: {
        id: selectedAttendant.id,
        name: selectedAttendant.name,
        email: selectedAttendant.email,
        phone: selectedAttendant.phone
      },
    }

    setServices(prevState =>
      [
        ...prevState,
        service
      ])

    setAttendant(attendantsNames[0]);
    setPrice("")
    setServiceType("")
    setPaymentType("")
    setDescription("")
  }

  const handleRemoveService = (index) => {
    let service = services[index]
    setServices(l => l.filter(item => item !== service))
  }

  const handleSaveService = () => {
    services.forEach(async (service) => {
      var resp = await createServices(service)
      if (resp.status !== HttpStatusCode.Created) {
        toast.error('Falha ao salvar atendimentos!')
      }
    });
    toast.success('Atendimentos salvos!')
    navigate("/*")
  }

  const handleFetchAttendants = async () => {
    var resp = await listAttendants([])

    setAttendants(resp.data);
    setAttendantsNames(resp.data.map(att => att.name.trim()))
  }

  const handleFetchServiceTypes = async () => {
    var resp = await listServiceType([])

    const fetchedServiceTypes = resp.data.map((v) => v.description);
    setServiceTypes(fetchedServiceTypes);
  }

  return (
    <div id="service-container">
      <Toaster position="top-right" richColors expand={true} />
      <div id='service-grid-container'>
        <div id='service-grid-container-line1'>
          {client && client.name}
        </div>
        <div id='service-grid-container-line2'>
          <div>Telefone: {client && formatPhone(client.phone)}</div>
          <div>Email: {client && client.email}</div>
        </div>
        <div id='service-grid-container-line3'>
          <DateInput
            id="fservice-date"
            name="service-date"
            value={serviceDate}
            setValue={setServiceDate}
          />
          <SelectInput
            id="fattedant"
            name="attedant"
            value={attendant}
            onChange={setAttendant}
            values={attendantsNames}
            placeholder='Atendente'
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
                  <div id='line1-column1'>{service.serviceType}</div>
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
