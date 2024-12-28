import './style.css';

const ClientList = ({ nameProp, emailProp, phoneProp }) => {
    var typesList = ["Alongamento", "U.Simples", "Pe", "Manutenção"]

    return (
        <div className='container'>
            <div className='grid-column'>
                <div className='grid-line1'>
                    <div className='info-separator'>
                        {nameProp}
                    </div>
                    <div className='info-separator'>
                        {phoneProp}
                    </div>
                    <div className='info-separator'>
                        {emailProp}
                    </div>
                    <div className='info-separator'>
                        Quantidade de atendimentos: 10
                    </div>
                </div>
                <div className='grid-line3'>
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
        </div>
    );
}

export default ClientList;