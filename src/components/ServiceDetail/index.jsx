import './style.css';
import { capitalizeWords } from '../../utils/utils.js';


const ServiceDetail = ({ label, content }) => {
    return (
        <div id='sd-container'>
            <div id='label'>
                {capitalizeWords(label)}
            </div>
            <div id='content'>
                {content}
            </div>
        </div>
    )
}

export default ServiceDetail