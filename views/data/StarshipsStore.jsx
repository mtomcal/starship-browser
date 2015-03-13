import Reflux from 'reflux';
import Actions from './Actions.jsx';

let StarshipsStore = Reflux.createStore({
    listenables: Actions.Starships,

    init() {
        this.data = {};
    },

    onGetCompleted(data) {
        this.data = data;
        this.trigger(this.data);
    },

    onGetFailed(err) {
        console.error(err);
    }
});


export default StarshipsStore;

