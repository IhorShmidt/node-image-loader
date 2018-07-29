'use strict';

const LOCAL_MONGO_URI = 'mongodb://admin:rootadmin1@ds257851.mlab.com:57851/instagram';

module.exports = {
    mongo: {
        uri:  process.env.MONGO_URL,
    },
    instagramOptions:{
        "headers": {
          "Cache-Control": "no-cache",
          "User-Agent": "Instagram 27.0.0.7.97 Android (24/7.0; 380dpi; 1080x1920; OnePlus; ONEPLUS A3010; OnePlus3T; qcom; en_US)",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Encoding": "gzip, deflate, sdch, br",
          "Accept-Language": "en-US,en;q=0.8",
          "cookie": process.env.INSTAGRAM_COOKIE,
        }
      }
}
