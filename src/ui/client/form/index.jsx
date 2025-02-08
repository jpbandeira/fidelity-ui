import { useState, useEffect, useContext } from 'react';

import './style.css';
import { createClient, updateClient } from '../../../data/services/client.js';
import ClientContext from '../../../contexts/client.js'
import { SAVE_BUTTON_LABEL } from '../../../consts.js';
import TextInput from '../../../components/TextInput/index.jsx'
import { PhoneInput } from '../../../components/PhoneInput/index.jsx'
import { HttpStatusCode } from 'axios';

const ClientForm = ({ buttonLabel, fetchClient, setFilterValue, toast }) => {
    const { client } = useContext(ClientContext)

    const [errors, setErrors] = useState({})

    const validate = (value, regex) => {
        return regex.test(value);
    }

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

    const warning = (message) => {
        toast.warning(message, {
            duration: 6000
        })
    }

    const formHasError = () => {
        let has_error = false

        if (name == "") {
            warning("Nome não pode ser vazio")
            has_error = true
        } else if (name !== "" && !validate(name, /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)) {
            warning("Nome só deve conter letras A-Z a-z",)
            has_error = true
        }

        if (email == "") {
            warning("Email não pode ser vazio")
            has_error = true
        } else if (email !== "" && !validate(email, /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/)) {
            warning("Digite um email valido: #@#####.com ou #@#####.com.br")
            has_error = true
        }

        if (phone == "") {
            warning("Telefone não pode ser vazio")
            has_error = true
        } else if (phone !== "" && !validate(phone, /^\d{11}$/)) {
            warning("Telefone deve conter 11 digitos")
            has_error = true
        }

        return has_error
    }

    const handleSaveClient = async () => {
        if (formHasError()) {
            return
        }

        if (id == "") {
            var resp = await createClient({
                name: name,
                email: email,
                phone: phone
            })

            let body = resp.data
            fetchClient(["uuid=" + body.id])
            setFilterValue("")

            if (resp.status == HttpStatusCode.Created) {
                toast.success('Cliente salvo!')
            }
        } else {
            var resp = await updateClient(id, {
                id: id,
                name: name,
                email: email,
                phone: phone
            })

            let body = resp.data
            fetchClient(["uuid=" + body.id])
            setFilterValue("")

            if (resp.status == HttpStatusCode.OK) {
                toast.success('Cliente atualizado!')
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
                    <input
                        className='buttom-save-input'
                        type="submit"
                        value={buttonLabel}
                        onClick={() => handleSaveClient()}
                        disabled={Object.keys(errors).length > 0}
                    />
                </div>
            </div>
        </div >
    );
}

export default ClientForm;
