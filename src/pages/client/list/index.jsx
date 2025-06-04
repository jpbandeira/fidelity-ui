import './style.css';

import React, { useState, useEffect } from 'react'
import { useClient } from '../../../contexts/client/Context.js';
import { formatPhone } from '../../../components/PhoneInput/index.jsx'

import { listServices } from '../../../data/services/appointment.js'
import ServiceDetail from '../../../components/ServiceDetail/index.jsx';
import { capitalizeWords } from '../../../utils/utils.js';
import { formatPrice } from '../../../components/PriceInput/index.jsx';

const ClientList = () => {
    const { client } = useClient()
    const [clientServices, setClientServices] = useState([])
    const [recentServices, setRecentServices] = useState([])

    useEffect(() => {
        handleFetchClientServices()
    }, [])

    const handleFetchClientServices = async () => {
        var body = await listServices(["client_uuid=" + client.id])
        if (body !== null) {
            setRecentServices(filterByCurrentMonth(body.services))
            setClientServices(body.serviceSummaries)
        }
    }

    const formatDate = (serviceDate) => {
        let date = new Date(serviceDate);

        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = date.getFullYear();

        return `${day}/${month}/${year}`
    }

    const filterByCurrentMonth = (list) => {
        const now = new Date();
        return list.filter(item => {
            const date = new Date(item.serviceDate);
            return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
        });
    }

    return (
        <div id='list-container'>
            <div id='grid-container'>
                <div id='grid-container-line1'>
                    <div id='grid-container-line1-element1'>{client !== null && client.name}</div>
                </div>
                <div id='grid-container-line2'>
                    <div>Telefone: {client !== null && formatPhone(client.phone)}</div>
                    <div>Email: {client !== null && client.email}</div>
                </div>
                <div id='grid-container-line3'>
                    <ServiceDetail
                        label="Atendimentos Recentes"

                    >
                        <div>
                            {
                                recentServices.map((service, index) => (
                                    <div key={index} className="table-line">
                                        <span className="table-cell cell-date">
                                            {formatDate(service.serviceDate)}
                                        </span>
                                        <span className="table-cell cell-name">
                                            {capitalizeWords(service.name)}
                                        </span>
                                        <span className="table-cell cell-price">
                                            R${service.price}
                                        </span>
                                    </div>
                                ))
                            }
                        </div>

                    </ServiceDetail>

                    {
                        clientServices.map(
                            (service, index) =>
                                <ServiceDetail
                                    key={index}
                                    label={service.name}
                                >
                                    <div id='service-type-content-container'>
                                        <div id='service-type-content-container-line1-column1'>Quantidade</div>
                                        <div id='service-type-content-container-line1-column2'>Total R$</div>
                                        <div id='service-type-content-container-line2-column1'>{service.count}</div>
                                        <div id='service-type-content-container-line2-column2'>{formatPrice(service.totalPrice)}</div>
                                    </div>
                                </ServiceDetail>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ClientList;
