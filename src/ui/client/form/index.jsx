import { useState, useEffect, useContext } from 'react';


import './style.css';
import { createUser, updateUser } from '../../../data/services/user.js';
import ClientContext from '../../../contexts/client.js'
import { SAVE_BUTTON_LABEL } from '../../../consts.js';

const ClientForm = ({ buttonLabel, fetchClient }) => {
    const { client } = useContext(ClientContext)

    const [id, setID] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()

    useEffect(() => {
        if (buttonLabel == SAVE_BUTTON_LABEL) {
            setID("")
            setName("")
            setEmail("")
            setPhone("")
        } else {
            setID(client.id)
            setName(client.name)
            setEmail(client.email)
            setPhone(client.phone)
        }
    }, [buttonLabel])

    const createClient = () => {
        if (id == "") {
            createUser({
                name: name,
                email: email,
                phone: phone
            })
                .then((response) => {
                    if (response.data == null) {
                        return
                    }

                    let body = response.data
                    fetchClient(["uuid=" + body.id])
                })
                .catch(function (error) {
                    console.error(error);
                })
        } else {
            updateUser(id, {
                id: id,
                name: name,
                email: email,
                phone: phone
            })
                .then((response) => {
                    if (response.data == null) {
                        return
                    }

                    let body = response.data
                    fetchClient(["uuid=" + body.id])
                })
                .catch(function (error) {
                    console.error(error);
                })
        }
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
