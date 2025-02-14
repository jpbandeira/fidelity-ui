import './style.css';
import { useContext, useState, useEffect } from 'react'
import ClientContext from '../../../contexts/client.js'
import { formatPhone } from '../../../components/PhoneInput/index.jsx'

import { listServices } from '../../../data/services/service.js'
import ServiceDetail from '../../../components/ServiceDetail/index.jsx';
import { capitalizeWords } from '../../../utils/utils.js';
import { formatPrice } from '../../../components/PriceInput/index.jsx';

const ClientList = () => {
    const { client } = useContext(ClientContext)
    const [clientServices, setClientServices] = useState([])
    const [recentServices, setRecentServices] = useState([])

    useEffect(() => {
        handleFetchClientServices([])
    }, [])

    const handleFetchClientServices = async (filterArgs) => {
        var resp = await listServices(client.id, filterArgs)

        var body = resp.data

        setRecentServices(filterByCurrentMonth(body.items))

        setClientServices(groupByServiceType(body.items, body.serviceTypes))
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

    const groupByServiceType = (services, serviceTypes) => {
        let result = []

        serviceTypes.filter(st => {
            let sList = []
            let obj = {
                "serviceType": st.serviceType,
                "count": st.count,
                "totalPrice": 0,
                "items": []
            }

            services.filter(s => {
                if (st.serviceType === s.serviceType) {
                    sList.push(s)
                    obj.totalPrice = Number(obj.totalPrice) + Number(s.price)
                }
            })

            obj.items = sList
            result.push(obj)
        })
        console.log(result)
        return result
    }

    return (
        <div id='list-container'>
            <div id='grid-container'>
                <div id='grid-container-line1'>
                    <div id='grid-container-line1-element1'>{client.name}</div>
                </div>
                <div id='grid-container-line2'>
                    <div>Telefone: {formatPhone(client.phone)}</div>
                    <div>Email: {client.email}</div>
                </div>
                <div id='grid-container-line3'>
                    <ServiceDetail
                        label="Atendimentos Recentes"
                        content={
                            <div>
                                {
                                    recentServices.map(
                                        (service, index) =>
                                            <div key={index} id='table-line'>{formatDate(service.serviceDate)} - {capitalizeWords(service.serviceType)} - R${service.price}</div>
                                    )
                                }
                            </div>
                        }
                    />

                    {
                        clientServices.map(
                            (service, index) =>
                                <ServiceDetail
                                    key={index}
                                    label={service.serviceType}
                                    content={
                                        <div id='service-type-content-container'>
                                            <div id='service-type-content-container-line1-column1'>Quantidade</div>
                                            <div id='service-type-content-container-line1-column2'>Total R$</div>
                                            <div id='service-type-content-container-line2-column1'>{service.count}</div>
                                            <div id='service-type-content-container-line2-column2'>{formatPrice(service.totalPrice)}</div>
                                        </div>
                                    }
                                />
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ClientList;
