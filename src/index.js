import * as React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root'


window.addEventListener('DOMContentLoaded', (event) => {
    const root = document.getElementById("root");
    ReactDOM.render(<Root />, root);
})