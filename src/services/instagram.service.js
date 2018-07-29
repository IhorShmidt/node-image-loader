'use strict';

const config = require('./..//util/config');
const request = require('request-promise');
const _ = require('lodash')
const Promise = require('bluebird')

const API = 'https://i.instagram.com/api/v1/'
const WEB_API = 'https://www.instagram.com/web/'

// const instaModelRepository = new require('./../repository/instapic.repository');

const instaModelRepository = require('./../repository/instapic.repository');

console.log(instaModelRepository)
module.exports = class Instagram {
    contructor(endpoint) {
        this.endpoint = endpoint; // e.g. liked
        // this.action = endpoint.slice(0, -1) // e.g. like
        this.uid = UID
        this.uuid = UUID

        this.firstNextMaxId = undefined
        this.firstRun = true

        this.nextMaxId = null
        this.items = []

        this.start = this.start.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.storeNext = this.storeNext.bind(this)
        this.normalize = this.normalize.bind(this)
        this.storeData = this.storeData.bind(this)
        this.storeData = this.storeData.bind(this)
    }

    start() {
        return this.recursiveFetch()
    }

    recursiveFetch() {
        return Promise.resolve()
            .then(() => this.fetchData())
            .then(data => this.storeNext(data))
            .then(data => this.normalize(data))
            .then(data => this.prepareDataSet(data))
            .then(data => this.storeData(data))  
            .then(data => this.finish(data))
            .catch(err => {
                console.log('ERROr: ', err);
            });

    }

    finish(data) {
        console.log('finish');
        if (this.nextMaxId) {
            console.log('Before new round');
            console.log();
            return this.recursiveFetch();
        } else {
            console.log('DONE')
            console.log('DONE')
            console.log('DONE')
        }
        
    }

    fetchData() {
        const options = this._getOptions();
        return request(options);
    }

    storeNext(data) {
        console.log('storeNext')
        this.nextMaxId = data.next_max_id !== undefined ? `${data.next_max_id}` : ''

        return data
    }

    normalize(data) {
        if (data.items !== undefined && data.items.length && data.items[0].media !== undefined) {
            // we need to normalize "saved"
            data.items = data.items.map(item => item.media)
        } else {

        }
        return data
    }

    prepareDataSet(data) {
        console.log('prepareDataSet')
        let prepared = [];

        _.each(data.items, (processingImage) => {

            if (processingImage.image_versions2) {

                const imageObject = this._instaPicInterface(processingImage);
                return imageObject && prepared.push(imageObject);

            }

            if (!processingImage.image_versions2 && processingImage.carousel_media) {
                const carouselArray = [];

                _.each(processingImage.carousel_media, (item) => {
                    const imageObject = this._instaPicInterface(item);
                    imageObject && carouselArray.push(imageObject);
                });

                prepared = prepared.concat(...carouselArray);
                return prepared;
            }

        });
        data.items = prepared;
        return data;
    }

    prepareImages(data) {
        let prepared = [];

        _.each(data, (processingImage) => {

            if (processingImage.image_versions2) {
                const imageObject = this._instaPicInterface(processingImage);
                return imageObject && prepared.push(imageObject);

            }

            if (!processingImage.image_versions2 && processingImage.carousel_media) {
                const carouselArray = [];

                _.each(processingImage.carousel_media, (item) => {
                    const imageObject = this.imageInterface(item, processingImage);
                    imageObject && carouselArray.push(imageObject);
                });

                prepared = prepared.concat(...carouselArray);
                return prepared;
            }

        });
        return prepared;
    }

    storeData(data) {
        
        return Promise.map(data.items, (picture) => {
            return instaModelRepository.find({imageUrl: picture.imageUrl})
                .then((foundedPics) => {
                    if (!(foundedPics || []).length) {
                        return instaModelRepository.create(picture);
                    } else {
                        // console.log('------already added----');
                        // console.log(picture);
                    }
                    return;
                });
            return picture;
        })
        .then(() => data);
    
    }

    _getPhotoName(image) {
        let fullName = this._getFullName(image);
        fullName = fullName.replace('/', '');
        return `${fullName}_${this._randomString()}.jpeg`;
    }

    _getOptions() {
        const url = `${API}feed/${this.endpoint || 'saved'}/${this.nextMaxId ? `?max_id=${this.nextMaxId}&` : ''}`;
        const {headers} = config.instagramOptions;
        return {method: 'get', json: true, url, gzip: true, headers};
    } 

    _getImageUrl(imageVersions) {
        return imageVersions.candidates[0].url;
    }
    _getFullName(pic) {
        return pic.caption && pic.caption.user && pic.caption.user.full_name || 
            pic.user && pic.user.full_name  || 'no-name';
    }

    _getUserName(pic) {
        return pic.caption && pic.caption.user && pic.caption.user.username || 
            pic.user && pic.user.username ;
    }

        
    _getLikesCount(pic) {
        return pic.caption && pic.caption.like_count && pic.caption.like_count || 
            pic.like_count && pic.like_count || 0 ;
    }

    _instaPicInterface(pic) {
        
        const imageUrl = this._getImageUrl(pic.image_versions2);
        const userFullname = this._getFullName(pic) || 'no-name';
        const userName = this._getUserName(pic) || 'no-name';

        return {
            imageUrl: imageUrl,
            author: {
                userName: userName,
                fullName: userFullname
            },
            instaCode: pic.code,
            likeCount: this._getLikesCount(pic),
            name: this._getPhotoName(pic)
        };
    }

    _randomString() {
        let text = '';
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        _.times(5, () => text += possible.charAt(Math.floor(Math.random() * possible.length)));
        return text;
    }
};