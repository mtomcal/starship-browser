/* jshint: esnext: true, browser: true */
import React from 'react';
import {Route, DefaultRoute, RouteHandler} from 'react-router'
import Hello from './pages/HelloPage.jsx';
import About from './pages/AboutPage.jsx';
import AsyncRouter from 'react-router-async-props';
let AsyncRouteHandler = AsyncRouter.RouteHandler;


var DataHarness;

if (typeof window !== 'undefined') {
    DataHarness = React.createClass({
        childContextTypes: {
            asyncPropsState: React.PropTypes.object
        },

        getChildContext: function() {
            return {
                asyncPropsState: {
                    props: window.asyncProps
                }
            };
        },
        render: function() {
            return (<AsyncRouteHandler />);
        }
    });
} else {
    DataHarness = React.createClass({
        render: function() {
            return (<AsyncRouteHandler />);
        }
    });
}


export default (
    <Route handler={DataHarness}>
        <Route path="/" handler={Hello} />
        <Route path="/about" handler={About} />
    </Route>
);
