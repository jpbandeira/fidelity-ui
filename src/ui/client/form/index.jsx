import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import './style.css';
import { listUsers, createUser, deleteUser } from '../../../data/services/user.js';

const ClientForm = ({ nameProp, emailProp, phoneProp, buttonLabel }) => {
    useEffect(() => {
        setName(nameProp)
        setEmail(emailProp)
        setPhone(phoneProp)
    })

    const [id, setId] = useState("")
    const [name, setName] = useState(nameProp)
    const [email, setEmail] = useState(emailProp)
    const [phone, setPhone] = useState(phoneProp)

    // const [buttonLabel, setButtonLabel] = useState(SAVE_BUTTON_LABEL)

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
                // setButtonLabel(UPDATE_BUTTON_LABEL)
            })
            .catch(function (error) {
                console.error(error);
                // setButtonLabel(SAVE_BUTTON_LABEL)
            })
    }

    // const storeClient = () => {
    //     setName("")
    //     setEmail("")
    //     setPhone("")
    //     // setFilterValue("")
    //     setButtonLabel(SAVE_BUTTON_LABEL)
    // }

    return (
        <div className='form-area'>
            <div id='form-area-line-1'>
                <div id='form-area-line-1-column-1'>
                    <div className='input-box'>
                        {/* <label for="fname">Nome</label> */}
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
                        {/* <label for="fname">Email</label> */}
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
                    <div className='phone-input-box'>
                        {/* <label for="fname">Telefone</label> */}
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
                <div id='form-area-line-3-column-2'>
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
        </div>
    );
}

export default ClientForm;
