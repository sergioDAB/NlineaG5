import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './components/css/index.css';

import 'font-awesome/css/font-awesome.css';
import App from './components/scripts/App';

import registerServiceWorker from './components/scripts/registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>

    , document.getElementById('root'));
registerServiceWorker();
