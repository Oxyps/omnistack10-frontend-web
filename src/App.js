import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from './services/api';
import './global.css';
import './App.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

toast.configure({
  autoClose: 5000,
  pauseOnHover: false
});

function App() {
  const [devs, setDevs] = useState([]);


  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    await api.post('/devs', data)
      .then( response => {
        setDevs([...devs, response.data]);

        toast.success('Dev adicionado ao radar!!'); 
      })
      .catch( error => {
        toast.error('Algo de errado aconteceu, desculpa..', error);
      })
    ;
  }

  return (
    <div id="app">
      <aside>
       	<strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
