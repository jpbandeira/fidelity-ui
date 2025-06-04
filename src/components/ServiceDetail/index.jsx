import React from 'react';
import './style.css';
import { capitalizeWords } from '../../utils/utils.js';


const ServiceDetail = ({ label, children }) => {
    return (
        <div id='sd-container'>
            <div id='label'>
                {capitalizeWords(label)}
            </div>
            <div id='content'>
                {children}
            </div>
        </div>
    )
}

export default ServiceDetail