'use strict';
const _ = require('lodash'),

    express = require('express'),
    router = express.Router();

const InstagramService = require('./../services/instagram.service');


router.get('/', (req, res) => {

    const endpoint = 'saved';
    const instagram = new InstagramService(endpoint);


     instagram.start()
    // .then((data) => {
    //  return res.sendStatus(200).json(data)
    // });

    res.send(200);

});

module.exports = router;