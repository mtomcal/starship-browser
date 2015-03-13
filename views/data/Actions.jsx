import Reflux from 'reflux';
import axios from 'axios';

let Starships = Reflux.createActions({
    "Get": {asyncResult: true}
});

Starships.Get.preEmit = function (id) {
     axios.get(`http://swapi.co/api/starships/${id}/`)
        .then(function (res) {
            Starships.Get.completed(res.data);
        })
        .catch(function (err) {
            Starships.Get.failed(err);
        });
};

export default {
    Starships
}

