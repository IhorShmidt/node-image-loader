'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    mongoose.Promise = require('bluebird');
    const AuthorSchema = new Schema({
      userName: {
          type: String
      },
      fullName: {
          type: String
      }
})

const InstaPic = new Schema({
  instaCode: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  author: AuthorSchema,
  likeCount: {
      type: Number
  } 
}, {
  timestamps: true
});

module.exports = mongoose.model('InstaPic', InstaPic);






/**
{ taken_at: 1531665391,
  pk: 1824063969221352700,
  id: '1824063969221352776_13832398',
  device_timestamp: 1531665305525553,
  media_type: 1,
  code: 'BlQYIQFBx1I',
  client_cache_key: 'MTgyNDA2Mzk2OTIyMTM1Mjc3Ng==.2',
  filter_type: 0,
  image_versions2: { candidates: [ [Object], [Object] ] },
  original_width: 1080,
  original_height: 1350,
  user:
   { pk: 13832398,
     username: 'verabambilive',
     full_name: 'Jurassic Pussy',
     is_private: false,
     profile_pic_url: 'https://instagram.flwo1-1.fna.fbcdn.net/vp/84c3a9993f4a45fe937f08a624353b5f/5BDD6E91/t51.2885-19/s150x150/36612327_268626003896930_6930441644953042944_n.jpg',
     profile_pic_id: '1822226469603905162_13832398',
     friendship_status: { following: false, outgoing_request: false, is_bestie: false },
     is_verified: false,
     has_anonymous_profile_picture: false,
     reel_auto_archive: 'on',
     is_unpublished: false,
     is_favorite: false },
  can_viewer_reshare: true,
  caption:
   { pk: 17951808886075076,
     user_id: 13832398,
     text: 'Sexy lil black bear for the Bam Fam in this months video AND bonus mini-set! CHECK THE LINK IN MY BIO TO GET IT\n- - - - - -\nPhoto by @martinwongphoto \nDress from @aritzia \nHat is also @aritzia with some pompoms glued on �',
     type: 1,
     created_at: 1531665392,
     created_at_utc: 1531665392,
     content_type: 'comment',
     status: 'Active',
     bit_flags: 0,
     user:
      { pk: 13832398,
        username: 'verabambilive',
        full_name: 'Jurassic Pussy',
        is_private: false,
        profile_pic_url: 'https://instagram.flwo1-1.fna.fbcdn.net/vp/84c3a9993f4a45fe937f08a624353b5f/5BDD6E91/t51.2885-19/s150x150/36612327_268626003896930_6930441644953042944_n.jpg',
        profile_pic_id: '1822226469603905162_13832398',
        friendship_status: [Object],
        is_verified: false,
        has_anonymous_profile_picture: false,
        reel_auto_archive: 'on',
        is_unpublished: false,
        is_favorite: false },
     did_report_as_spam: false,
     media_id: 1824063969221352700 },
  caption_is_edited: false,
  like_count: 26696,
  has_liked: false,
  comment_likes_enabled: true,
  comment_threading_enabled: true,
  has_more_comments: true,
  next_max_id: 17856589504276018,
  max_num_visible_preview_comments: 2,
  preview_comments:
   [ { pk: 17948668420109752,
       user_id: 4132188463,
       text: 'Aww dont cry�',
       type: 0,
       created_at: 1532574125,
       created_at_utc: 1532574125,
       content_type: 'comment',
       status: 'Active',
       bit_flags: 0,
       user: [Object],
       did_report_as_spam: false,
       media_id: 1824063969221352700 },
     { pk: 17856589504276018,
       user_id: 4197378899,
       text: 'Nice�',
       type: 0,
       created_at: 1532822516,
       created_at_utc: 1532822516,
       content_type: 'comment',
       status: 'Active',
       bit_flags: 0,
       user: [Object],
       did_report_as_spam: false,
       media_id: 1824063969221352700 } ],
  can_view_more_preview_comments: true,
  comment_count: 196,
  inline_composer_display_condition: 'impression_trigger',
  photo_of_you: false,
  usertags: { in: [ [Object], [Object] ] },
  can_viewer_save: true,
  has_viewer_saved: true,
  saved_collection_ids: [],
  organic_tracking_token: 'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiNGNmYzlhMmY4YjM3NGY5ZmI4NDRlZGVkOTBjMTNlMGMxODI0MDYzOTY5MjIxMzUyNzc2Iiwic2VydmVyX3Rva2VuIjoiMTUzMjg2NTkwMTE2OXwxODI0MDYzOTY5MjIxMzUyNzc2fDQxOTAwNjY2NDZ8MjMwMWU5ZjQ2MzFkNDhjZGQ2NzFhMmUyMmVkNTk1M2Q3ZWEyNzM0YzU4YjU1MzgyZjIxNzEwNjdiZDJiMTE1MCJ9LCJzaWduYXR1cmUiOiIifQ==' }










 * 
 */