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
    test(): void;
    login(id: string): Promise<any>;
  };
}

// const base_url = 'http://localhost:4000/'; //rest api url

export const OngsContext = React.createContext({} as IContext); // create context

// class with the data and operations stored in context api that the application will consume
export default class OngsProvider extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentOng: initialOng,
      incidents: [initialIncident],
    };
  }

  test = () => {
    console.log('context working');
  };

  login = async (id: string): Promise<void> => {
    try {
      const response = await axios.post('http://localhost:4000/login', {
        id,
      });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

    } catch (error) {
      alert('Falha no login, tente novamente');
      return error
    }
  };

  componentDidMount() { }

  render() {
    // definition of the data and operations that the entire application will have access
    const value = {
      state: { ...this.state },
      action: {
        test: this.test,
        login: this.login
      },
    };

    return <OngsContext.Provider value={value} {...this.props} />;
  }
}
