import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {config} from "./Constants";
import {BrowserRouter as Router} from 'react-router-dom';

axios.defaults.baseURL = config.url.API_URL;
axios.defaults.headers={'Access-Control-Allow-Origin':'*',
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Access-Control-Allow-Origin,Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
}

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <App />
      </Router>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
