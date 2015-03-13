import express from 'express';
import React from 'react';
import Router from 'react-router';
import ServerBootstrap from './views/ServerBootstrap.jsx';
import Routes from './views/Routes.jsx';

var {
  RouteHandler, // <-- not the usual RouteHandler!
  run
} = require('react-router-async-props');

let app = express();

function server() {

  // LOAD static assets
  app.use('/static', express['static'](__dirname + '/static'));

  app.all('/*', function(req, res, next) {
    run(Routes, req.path, function (Handler, state, asyncProps) {
      var entry = React.renderToString(<Handler />);
      var html = React.renderToStaticMarkup(<ServerBootstrap asyncProps={asyncProps} bodyHTML={entry} />);
      res.send('<!DOCTYPE html>' + html);
    });

  });

  app.listen(3000);
}

module.exports = server;
