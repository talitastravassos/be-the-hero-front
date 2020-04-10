import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import OngsProvider from './context/OngsContext';
import './index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <OngsProvider>
      <App />
    </OngsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
