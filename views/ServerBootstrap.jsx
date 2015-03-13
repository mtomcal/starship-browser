/* jshint: esnext: true, browser: true */
import React from 'react';

var ServerBootstrap = React.createClass({
    render() {
      var styles = {};

      return (
          <html>
              <head>
                  <title>Browser</title>
                  <link rel="stylesheet" href="static/css/main.css" />
                  <script src="static/js/bundle.js"></script>
              </head>
              <script dangerouslySetInnerHTML={{__html: "window.asyncProps = " + JSON.stringify(this.props.asyncProps)}}>
              </script>
              <body dangerouslySetInnerHTML={{__html: this.props.bodyHTML}}>
              </body>
          </html>
      );
    }

});
module.exports = ServerBootstrap;
