import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import './Service.css';

function Service() {
  var { state } = useLocation()
  var [client, setClient] = useState(state)

  useEffect(() => {
    setClient(state)
  }, [state])

  return (
    <div className="body">
      {client && client.name}
    </div>
  );
}

export default Service;
