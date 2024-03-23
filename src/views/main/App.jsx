import './App.css';
import { BrowserRouter } from 'react-router-dom'
import {
  Routes,
  Route,
} from "react-router-dom";
import Menu from '../../components/menu/Menu';
import Client from './../client/Client';
import Service from './../service/Service';

function App() {
  return (
    <div className="body">
      <BrowserRouter>
        <div className='header' id='start'>
          <div className='logo'>
            LOGO
          </div>

          <div className='menu'>
            <Menu/>
          </div>
        </div>

        <div className='content'>
          <Routes>
            <Route path='*' element={<Client />} />
            <Route path='/service' element={<Service />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
