'use strict';

const InstaPicModel = require('./../models/instapic.model');

class InstaPicRepository {

    find(query) {
        return InstaPicModel.find(query);
    }

    create(data) {
        const newPic = new InstaPicModel(data);
        return newPic.save();
    }

    removeByInstaCode(instaCode) {
        return InstaPicModel.remove({instaCode: instaCode}, {multiple: true})
    }

}

module.exports = new InstaPicRepository();
