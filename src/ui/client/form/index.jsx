import { useState } from 'react';

import './style.css';
import { createUser } from '../../../data/services/user.js';

const ClientForm = ({ nameProp, emailProp, phoneProp, buttonLabel }) => {
    const [id, setId] = useState("")
    const [name, setName] = useState(nameProp)
    const [email, setEmail] = useState(emailProp)
    const [phone, setPhone] = useState(phoneProp)

    const createClient = () => {
        createUser({
            name: name,
            email: email,
            phone: phone
        })
            .then((response) => {
                if (response.data == null) {
                    return
                }

                var body = response.data
                setId(body.ID)
                setName(body.Name)
                setEmail(body.Email)
                setPhone(body.Phone)
            })
            .catch(function (error) {
                console.error(error);
            })
    }

    return (
        <div className='form-area'>
            <div id='form-area-line-1'>
                <div id='form-area-line-1-column-1'>
                    <div className='input-box'>
                        <input
                            type="text"
                            id="fname"
                            name="name"
                            placeholder="Nome..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div id='form-area-line-2'>
                <div id='form-area-line-2-column-1'>
                    <div className='input-box'>
                        <input
                            type="email"
                            id="femail"
                            name="email"
                            placeholder="Email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div id='form-area-line-3'>
                <div id='form-area-line-3-column-1'>
                    <div className='input-box'>
                        <input
                            type="text"
                            id="fphone"
                            name="phone"
                            placeholder="Telefone..."
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div id='form-area-line-4'>
                <div className='buttom-save-area'>
                    <input
                        className='buttom-save-input'
                        type="submit"
                        value={buttonLabel}
                        onClick={() => createClient()}
                    />
                </div>
            </div>
        </div>
    );
}

export default ClientForm;
