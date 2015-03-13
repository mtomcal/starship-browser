import express from 'express';
import React from 'react';
import Router from 'react-router';
import ServerBootstrap from './views/ServerBootstrap.jsx';
import Routes from './views/Routes.jsx';

let app = express();

function server() {

  // LOAD static assets
  app.use('/static', express['static'](__dirname + '/static'));

  app.all('/*', function(req, res, next) {
    Router.run(Routes, req.path, function (Handler) {
      var entry = React.renderToString(<Handler />);
      var html = React.renderToStaticMarkup(<ServerBootstrap bodyHTML={entry} />);
      res.send('<!DOCTYPE html>' + html);
    });

  });

  app.listen(3000);
}

module.exports = server;
