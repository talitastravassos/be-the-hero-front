import axios from 'axios';
import React from 'react';
import { Incident, initialIncident, initialOng, Ong } from './ongs.types';

// global application state definition
interface State {
  currentOng: Ong;
  incidents: Array<Incident>;
}

// definition of type IContext used by context api
interface IContext {
  state: State;
  action: {
    login(id: string): Promise<any>;
    register(data: Ong): Promise<any>;
    logout(): void;
    addIncident(incident: Incident): Promise<any>;
    deleteIncident(id: number): Promise<void>;
    getIncidentsByONG(): Promise<void>;
  };
}

// const base_url = 'http://localhost:4000/'; //rest api url

export const OngsContext = React.createContext({} as IContext);
export default class OngsProvider extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentOng: initialOng,
      incidents: [initialIncident],
    };
  }

  login = async (id: string): Promise<void> => {
    try {
      const response = await axios.post('http://localhost:4000/login', {
        id,
      });

      console.log(response);

      this.setState({
        currentOng: response.data,
      });

      localStorage.setItem('ongId', id);
    } catch (error) {
      alert('Falha no login, tente novamente');
      return error;
    }
  };

  register = async (data: Ong): Promise<void> => {
    try {
      const response = await axios.post('http://localhost:4000/ongs', data);

      alert(`Seu ID de acesso: ${response.data.id}`);

    } catch (error) {
      alert('Erro no cadastro, tente novamente');
      return error;
    }
  };

  logout = () => {
    localStorage.removeItem('ongId')
    this.setState({
      currentOng: initialOng
    }, () => console.log(this.state.currentOng))
  }

  addIncident = async (incident: Incident): Promise<void> => {
    const { id } = this.state.currentOng;

    try {
      await axios.post('http://localhost:4000/incidents', incident, {
        headers: {
          Authorization: id,
        },
      });
    } catch (error) {
      alert('Erro ao cadastrar caso, tente novamente.');
      return error;
    }
  };

  deleteIncident = async (idIncident: number): Promise<void> => {
    const { id } = this.state.currentOng;

    try {
      await axios.delete(`http://localhost:4000/incidents/${idIncident}`, {
        headers: {
          Authorization: id,
        },
      });
    } catch (error) {
      alert('Erro ao deletar caso, tente novamente');
      return error
    }
  };

  getIncidentsByONG = async (): Promise<void> => {
    const { id } = this.state.currentOng;

    try {
      const response = await axios.get(
        'http://localhost:4000/profile/incidents',
        {
          headers: {
            Authorization: id,
          },
        }
      );
      this.setState({
        incidents: response.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    const loggedIn = localStorage.getItem('ongId');

    if (loggedIn) {
      this.login(loggedIn).then(res => {
        if (res === undefined) {
          this.getIncidentsByONG()
        }
      })
    }
  }

  render() {
    // definition of the data and operations that the entire application will have access
    const value = {
      state: { ...this.state },
      action: {
        login: this.login,
        register: this.register,
        logout: this.logout,
        addIncident: this.addIncident,
        deleteIncident: this.deleteIncident,
        getIncidentsByONG: this.getIncidentsByONG,
      },
    };

    return <OngsContext.Provider value={value} {...this.props} />;
  }
}
