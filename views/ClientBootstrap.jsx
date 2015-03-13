/* jshint: esnext: true, browser: true */
import React from 'react';
import Router from 'react-router'
import Routes from './Routes.jsx'

document.addEventListener("DOMContentLoaded", function (event) {
    Router.run(Routes, Router.HistoryLocation, function (Handler, state) {
        React.render(<Handler/>, document.body);
    });
});
