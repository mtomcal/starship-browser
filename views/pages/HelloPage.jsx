/* jshint: esnext: true, browser: true */
import React from 'react';
import Actions from '../data/Actions.jsx';
import StarshipsStore from '../data/StarshipsStore.jsx';
import _ from 'lodash';

var HelloPage = React.createClass({
	statics: {
		asyncProps: {
			starships: {
				load () {
					return Actions.Starships.Get.triggerPromise(9);
				},
				setup (onChange) {
					this.unsubscribe = StarshipsStore.listen(onChange);
				},
				teardown (onChange) {
					this.unsubscribe();
				}
			}
		}
	},
	render() {
		var styles = {};

		return (
			<div><h1>{this.props.starships.name}</h1></div>
		);
	}
});
module.exports = HelloPage;
