import './style.css';
import { useContext, useState, useEffect } from 'react'
import ClientContext from '../../../contexts/client.js'
import { formatPhone } from '../../../components/PhoneInput/index.jsx'

import { listServices } from '../../../data/services/service.js'

const ClientList = () => {
    const { client } = useContext(ClientContext)
    const [clientServices, setClientServices] = useState([])
    const [clientServicesCount, setClientServicesCount] = useState([])

    useEffect(() => {
        handleFetchClientServices([])
    }, [])

    const handleFetchClientServices = (filterArgs) => {
        listServices(client.id, filterArgs).then((response) => {
            if (response.data == null) {
                return
            }

            var body = response.data
            setClientServices(body.items)
            setClientServicesCount(body.countOfServiceTypes)
        })
    }

    const formatDate = (serviceDate) => {
        let date = new Date(serviceDate);

        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = date.getFullYear();

        return `${day}/${month}/${year}`
    }

    return (
        <div id='container'>
            <div id='grid-container'>
                <div id='grid-container-line1'>
                    <div id='grid-container-line1-element1'>{client.name}</div>
                </div>
                <div id='grid-container-line2'>
                    <div>Telefone: {formatPhone(client.phone)}</div>
                    <div>Email: {client.email}</div>
                </div>
                <div id='grid-container-line3'>
                    <div id='grid-container-line3-element1'>
                        Contagem por Atendimento
                    </div>
                    <div id='grid-container-line3-element2'>
                        {
                            clientServicesCount.map(
                                (service, index) =>
                                    <div key={index} className='info-box'>
                                        <div className='info-box-label'>
                                            {service.serviceType}
                                        </div>
                                        <div className='info-box-value'>
                                            {service.count}
                                        </div>
                                    </div>
                            )
                        }
                    </div>
                </div>
                <div id='grid-container-line4'>
                    <div id='grid-container-line4-element1'>
                        Historico de Atendimentos
                    </div>
                    <div id='grid-container-line4-element2'>
                        {
                            clientServices.map(
                                (service, index) =>
                                    <div key={index} className='table-line'>{formatDate(service.serviceDate)} - {service.serviceType} - R${service.price}</div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientList;
