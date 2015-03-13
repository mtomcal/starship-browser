/* jshint: esnext: true, browser: true */
import React from 'react';
import Router from 'react-router'

var Hello = React.createClass({
        render() {
                var styles = {};

                function output() {
                        console.log('HERE!!!');

                }

                return (
                        <div><h1 onClick={output}>Hello World!!!</h1></div>
                );
        }

});
module.exports = Hello;
