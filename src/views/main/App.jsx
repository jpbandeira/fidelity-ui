import './App.css';
import { BrowserRouter } from 'react-router-dom'
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="body">
      <BrowserRouter>
        <div className='header' id='start'>
          <div className='logo'>
            LOGO
          </div>

          <div className='menu'>
            MENU
          </div>
        </div>

        <div className='content'>
          <Routes>
            {/* <Route path='*' element={<Content />} />
            <Route path='/profile' element={<Profile />} /> */}
          </Routes>
        </div>

        <div className='app-footer'>
            FOOTER
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
