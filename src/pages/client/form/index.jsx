import React, { useState, useEffect } from 'react';

import './style.css';
import { createClient, updateClient } from '../../../data/services/client.js';
import { useClient } from '../../../contexts/client/Context.js';
import { SAVE_BUTTON_LABEL } from '../../../consts.js';
import TextInput from '../../../components/TextInput/index.jsx'
import { PhoneInput } from '../../../components/PhoneInput/index.jsx'
import { ButtonGradient } from '../../../components/Button/index.jsx';
import { is_valid_email, is_valid_name, is_valid_phone } from '../../../utils/regex.js';

const ClientForm = ({ buttonLabel, fetchClient, setFilterValue, toast }) => {
    const { client } = useClient()

    const [id, setID] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    useEffect(() => {
        if (buttonLabel === SAVE_BUTTON_LABEL) {
            setID("")
            setName("")
            setEmail("")
            setPhone("")
        } else {
            if (client !== null) {
                setID(client.id)
                setName(client.name)
                setEmail(client.email)
                setPhone(client.phone)
            }
        }
    }, [buttonLabel])

    const warning = (message) => {
        toast.warning(message, {
            duration: 6000
        })
    }

    const formHasError = () => {
        let has_error = false

        if (name === "") {
            warning("Nome não pode ser vazio")
            has_error = true
        } else if (name !== "" && !is_valid_name(name)) {
            warning("Nome só deve conter letras A-Z a-z",)
            has_error = true
        }

        if (email === "") {
            warning("Email não pode ser vazio")
            has_error = true
        } else if (email !== "" && !is_valid_email(email)) {
            warning("Digite um email valido: #@#####.com ou #@#####.com.br")
            has_error = true
        }

        if (phone === "") {
            warning("Telefone não pode ser vazio")
            has_error = true
        } else if (phone !== "" && !is_valid_phone(phone)) {
            warning("Telefone deve conter 11 digitos")
            has_error = true
        }

        return has_error
    }

    const handleSaveClient = async () => {
        if (formHasError()) {
            return
        }

        if (id === "") {
            let body = await createClient({
                name: name,
                email: email,
                phone: phone
            })

            if (body !== null) {
                toast.success('Cliente salvo!')
                fetchClient(["uuid=" + body.id])
            }
        } else {
            let body = await updateClient(id, {
                id: id,
                name: name,
                email: email,
                phone: phone
            })

            if (body !== null) {
                toast.success('Cliente atualizado!')
                fetchClient(["uuid=" + body.id])
            }
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
                            type="text"
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
                            type="email"
                        />
                    </div>
                </div>
            </div>
            <div id='form-area-line-3'>
                <div id='form-area-line-3-column-1'>
                    <div className='input-box'>
                        <PhoneInput
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
                    <ButtonGradient onClick={() => handleSaveClient()} $width="100px">{buttonLabel}</ButtonGradient>
                </div>
            </div>
        </div >
    );
}

export default ClientForm;
