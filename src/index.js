import {reactify} from './observer';

let data = {
    user: {
        name: "name",
        age: "24"
    },
    address: {
        city: "beijing"
    }
};

window.data = data;

reactify(data);