/* jshint: esnext: true, browser: true */
import React from 'react';

var AboutPage = React.createClass({
	render() {
		var styles = {};

		function output() {
			console.log('HERE!!!');

		}

		return (
			<div><h1 onClick={output}>About!!!!!</h1></div>
		);
	}
});
module.exports = AboutPage;
