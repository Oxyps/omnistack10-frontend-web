import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from './services/api';
import { socket, connect, disconnect } from './services/socket';
import './global.css';
import './App.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

toast.configure({
  autoClose: 5000,
  pauseOnHover: false
});

export default class App extends Component{
  state = {
    devs: []
  }
  
  loadDevs = async () => {
    const response = await api.get('/devs');

    this.setState({ devs: response.data });
  }

  componentDidMount() {
    this.loadDevs();

    disconnect();
    connect();
    socket.on('new-dev', dev => this.setState({ devs: [...this.state.devs, dev] }));
  }

  handleAddDev = async data => {
    await api.post('/devs', data)
      .then( response => {
        toast.success('Dev adicionado ao radar!!'); 
      })
      .catch( error => {
        toast.error('Algo de errado aconteceu, desculpa..', error);
      })
    ;
  }

  render() {
    const { devs } = this.state;

    return(
      <div id="app">
        <aside>
          <strong>Cadastrar</strong>
          <DevForm onSubmit={this.handleAddDev} />
        </aside>

        <main>
          <ul>
            {devs.map(dev => (
              <DevItem key={dev._id} dev={dev} />
            ))}
          </ul>
        </main>
      </div>
    )
  }
}