/* jshint: esnext: true, browser: true */
import React from 'react';
import {Route, DefaultRoute} from 'react-router'
import Hello from './Hello.jsx';
import About from './About.jsx';

export default (
    <Route>
        <Route path="/" handler={Hello} />
        <Route path="/about" handler={About} />
    </Route>
);
