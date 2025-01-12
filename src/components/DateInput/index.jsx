import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import './style.css';

const DateInput = ({ id, name, value, onChange }) => {
    return (
        <div id='date-input-box'>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <MobileDatePicker
                    id={id}
                    name={name}
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    sx={{ minWidth: 300 }}
                />
            </LocalizationProvider>
        </div>
    );
}

export default DateInput;