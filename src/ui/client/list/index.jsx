import './style.css';
import { useContext, useState, useEffect } from 'react'
import ClientContext from '../../../contexts/client.js'
import { formatPhone } from '../../../components/PhoneInput/index.jsx'

import { listServices } from '../../../data/services/service.js'
import ServiceDetail from '../../../components/ServiceDetail/index.jsx';
import { capitalizeWords } from '../../../utils/utils.js';

const ClientList = () => {
    const { client } = useContext(ClientContext)
    const [clientServices, setClientServices] = useState([])
    const [clientServicesCount, setClientServicesCount] = useState([])

    const [recentServices, setRecentServices] = useState([])

    useEffect(() => {
        handleFetchClientServices([])
    }, [])

    const handleFetchClientServices = async (filterArgs) => {
        var resp = await listServices(client.id, filterArgs)

        var body = resp.data

        setRecentServices(filterByCurrentMonth(body.items))

        setClientServices(body.items)
        setClientServicesCount(body.serviceTypes)
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
                    <div id='grid-container-line1-element1'>{client.name}</div>
                </div>
                <div id='grid-container-line2'>
                    <div>Telefone: {formatPhone(client.phone)}</div>
                    <div>Email: {client.email}</div>
                </div>
                <div id='grid-container-line3'>
                    <ServiceDetail
                        label="Serviços Recentes"
                        content={
                            <div>
                                {
                                    recentServices.map(
                                        (service, index) =>
                                            <div key={index} className='table-line'>{formatDate(service.serviceDate)} - {capitalizeWords(service.serviceType)} - R${service.price}</div>
                                    )
                                }
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default ClientList;
