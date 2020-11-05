
const { Shahar } = require('../models');
const mongoose = require('mongoose')

const _getShaharsList = async () => {
    try {
        const shahars = await Shahar.find().lean().exec();
        return shahars;
    }
    catch(ex) {
        console.log(`cannot get shaharItems from db. ${ex}`);
        return Promise.reject();
    }
};

const _getShaharsListByName = async (name) => {
    try {
        const shahars = await Shahar.findOne({
            name: name
        }).lean().exec();

        return shahars;
    }
    catch(ex) {
        console.log(`cannot get shaharItems by name from db. ${ex}`);
        return Promise.reject();
    }
};

module.exports = {
    getShaharsList: () => {
        return _getShaharsList();
    }, 

    getShaharsListByName: (name) => {
        return _getShaharsListByName(name);
    }
}
