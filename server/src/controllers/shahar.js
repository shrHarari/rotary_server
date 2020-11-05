const { shaharProvider } = require('../providers');

module.exports = {

    getShaharsList: async (req, res) => {
        try {
            const shaharItems = await shaharProvider.getShaharsList();
            res.send(shaharItems);
        }
        catch(ex) {
            console.log(`error getting shaharItems - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getShaharsListByName: async (req, res) => {
        try {
            const { name } = req.params;

            const shaharItems = await shaharProvider.getShaharsListByName(name);
            res.send(shaharItems);
        }
        catch(ex) {
            console.log(`error getting shaharItems by name - ${ex}`);
            res.status(500).send('error in server');
        }
    }
}