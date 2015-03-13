/* jshint: esnext: true, browser: true */
import React from 'react';
import Router from 'react-router'
import Routes from './Routes.jsx'
var {
  RouteHandler, // <-- not the usual RouteHandler!
  run
} = require('react-router-async-props');

document.addEventListener("DOMContentLoaded", function (event) {
    run(Routes, Router.HistoryLocation, function (Handler, state) {
        React.render(<Handler/>, document.body);
    });
});
