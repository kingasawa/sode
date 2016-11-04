/**
 * User.js
 *
 * @description :: Thông tin về User.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var md5 = require('md5');

module.exports = {

  attributes: {
    phone: {
      type: 'string',
      unique: true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    group: {
      type: 'string',
      defaultsTo: 'Admin'
    },
    name: {
      type: 'string',
      required: true
    },
    birthday: {
      type: 'string'
    },
    point: {
      type: 'integer',
      defaultsTo:10
    },
    about: {
      type: 'longtext',
      defaultsTo: 'viết nội dung giới thiệu về bản thân của bạn'
    },
    expired: {
      type: 'string'
    },
    bets: {
      collection: 'bet',
      via: 'owner'
    },
    players: {
      collection: 'player',
      via: 'owner'
    }

  },
  // Check Login
  login: (phone, password) => {
    return new Promise((resolve, reject) => {
      password = md5(password);
      sails.log('Thông tin đăng nhập {phone, password}', {phone, password});
      User.findOne({phone, password}).exec(function (err, res) {
        if (err)
          reject(err);
        if (typeof res == 'undefined'){
          reject("đăng nhập thất bại");
        }
        resolve(res);
      })
    })
  },
  beforeCreate: function (attrs, cb) {
    attrs.password = md5(attrs.password);
    return cb();
  }
};

