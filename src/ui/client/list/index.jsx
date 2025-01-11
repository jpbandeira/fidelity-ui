import './style.css';
import { useContext } from 'react'
import ClientContext from '../../../contexts/client.js'

const ClientList = () => {
    var typesList = ["Alongamento", "Unha Simples", "Alongamento", "U.Simples", "Alongamento", "U.Simples", "Alongamento", "U.Simples", "Alongamento", "U.Simples"]
    const { client } = useContext(ClientContext)

    return (
        <div id='container'>
            <div id='grid-container'>
                <div id='grid-container-line1'>
                    <div id='grid-container-line1-element1'>{client.name}</div>
                </div>
                <div id='grid-container-line2'>
                    <div>Telefone: {client.phone}</div>
                    <div>Email: {client.email}</div>
                </div>
                <div id='grid-container-line3'>
                    <div id='grid-container-line3-element1'>
                        Dashboard
                    </div>
                    <div id='grid-container-line3-element2'>
                        {
                            typesList.map(
                                (type, index) =>
                                    <div key={index} className='info-box'>
                                        <div className='info-box-label'>
                                            {type}
                                        </div>
                                        <div className='info-box-value'>
                                            2
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
                        <div className='table-line'>25/12/2023 - Alongamento - R$50</div>
                        <div className='table-line'>25/12/2023 - Alongamento - R$50</div>
                        <div className='table-line'>25/12/2023 - Alongamento - R$50</div>
                        <div className='table-line'>25/12/2023 - Alongamento - R$50</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientList;
