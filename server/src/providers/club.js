
const { Cluster } = require('../models');
const { Club } = require('../models');
const mongoose = require('mongoose')

const _getClubsList = async () => {
    try {
        const sort = { clubName: 1};
        const clubs = await Club.find().sort(sort).lean().exec();
        return clubs;
    }
    catch(ex) {
        console.log(`cannot get clubs from db. ${ex}`);
        return Promise.reject();
    }
};

const _getClubById = async (clubId) => {
    try {
        const club = await Club.findOne({
            _id: mongoose.Types.ObjectId(clubId)
        }).lean().exec();
        return club;
    }
    catch(ex) {
        console.log(`cannot get club by Id from db. ${ex}`);
        return Promise.reject();
    }
};

const _getClubByClubName = async (clubName) => {
    try {
        const club = await Club.findOne({
            clubName: clubName
        }).lean().exec();
        return club;
    }
    catch(ex) {
        console.log(`cannot get club by ClubName from db. ${ex}`);
        return Promise.reject();
    }
};

const _createClub = async (clusterId, club) => {
    try {
        const newClub = new Club(club);
        
        return newClub.save().then(docClub => {

            return Cluster.findByIdAndUpdate(
                clusterId,
                { $push: { clubs: docClub._id } },
                { new: true, useFindAndModify: false }
            );
        });
    }
    catch(ex) {
        console.log(`cannot create club in db. ${ex}`);
        return Promise.reject();
    }
};

const _updateClub = async (clubId, club) => {
    try {
        await Club.findByIdAndUpdate({
            _id: clubId
        }, club);
        return;
    }
    catch(ex) {
        console.log(`cannot update club in db. ${ex}`);
        return Promise.reject();
    }
};

const _deleteClub = async (clubId) => {
    try {
        await Club.deleteOne({
            _id: clubId
        });
        return;
    }
    catch(ex) {
        console.log(`cannot delete club from db. ${ex}`);
        return Promise.reject();
    }
};

module.exports = {

    getClubsList: () => {
        return _getClubsList();
    },

    getClubById: (clubId) => {
        return _getClubById(clubId);
    },

    getClubByClubName: (clubName) => {
        return _getClubByClubName(clubName);
    },

    createClub: (clusterId, club) => {
        return _createClub(clusterId, club);
    },

    updateClub: (clubId, club) => {
        return _updateClub(clubId, club);
    },

    deleteClub: (clubId) => {
        return _deleteClub(clubId);
    }
}