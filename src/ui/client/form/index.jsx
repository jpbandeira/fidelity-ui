import { useState, useEffect, useContext } from 'react';


import './style.css';
import { createClient, updateClient } from '../../../data/services/client.js';
import ClientContext from '../../../contexts/client.js'
import { SAVE_BUTTON_LABEL } from '../../../consts.js';
import TextInput from '../../../components/TextInput/index.jsx'

const ClientForm = ({ buttonLabel, fetchClient, setFilterValue }) => {
    const { client } = useContext(ClientContext)

    const [id, setID] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

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

    const handleClientOnSave = () => {
        if (id == "") {
            createClient({
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
                    setFilterValue("")
                })
                .catch(function (error) {
                    console.error(error);
                })
        } else {
            updateClient(id, {
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
                    setFilterValue("")
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
                        <TextInput id="fname"
                            name="name"
                            placeholder="Nome..."
                            value={name}
                            onChange={setName}
                        />
                    </div>
                </div>
            </div>
            <div id='form-area-line-2'>
                <div id='form-area-line-2-column-1'>
                    <div className='input-box'>
                        <TextInput
                            id="femail"
                            name="email"
                            placeholder="Email..."
                            value={email}
                            onChange={setEmail}
                        />
                    </div>
                </div>
            </div>
            <div id='form-area-line-3'>
                <div id='form-area-line-3-column-1'>
                    <div className='input-box'>
                        <TextInput
                            id="fphone"
                            name="phone"
                            placeholder="Telefone..."
                            value={phone}
                            onChange={setPhone}
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
                        onClick={() => handleClientOnSave()}
                    />
                </div>
            </div>
        </div>
    );
}

export default ClientForm;
