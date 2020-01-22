import React, { Component } from 'react';

import './styles.css';

export default class DevForm extends Component {
  state = {
    github_username: '',
    techs: '',
    longitude: '',
    latitude: ''
  }

  getCoords = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const {longitude, latitude} = position.coords;

        this.setState({ longitude, latitude });
      },
      error => {
        console.log(error);
      },
      {
        timeout: 30000,
      }
    );
  }

  componentDidMount() {
    this.getCoords();
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { github_username, techs, latitude, longitude } = this.state;

    await this.props.onSubmit({ github_username, techs, latitude, longitude });

    this.setState({ github_username: '', techs: '' });
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do GitHub</label>
          <input
            name="github_username"
            id="github_username"
            required
            value={this.github_username}
            onChange={ e => this.setState({ github_username: e.target.value }) }
          />
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input
            name="techs"
            id="techs"
            required
            value={this.state.techs}
            onChange={ e => this.setState({ techs: e.target.value }) }
          />
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input
              type="number"
              name="latitude"
              id="latitude"
              required
              value={this.state.latitude}
              onChange={ e => this.setState({ latitude: e.target.value }) }
            />
          </div>

          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input
              type="number"
              name="longitude"
              id="longitude"
              required
              value={this.state.longitude}
              onChange={ e => this.setState({ longitude: e.target.value }) }
            />
          </div>
        </div>

        <button type="submit">Salvar</button>
      </form>
    );
  }
}