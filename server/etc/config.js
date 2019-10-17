/* jshint esversion: 8 */

var exports = module.exports = {};

// Port to http server bind
exports.DEFAULT_PORT = 8080;
exports.PORT = process.env.PORT;

// Database
exports.DB = {
    uri: process.env.MONGODB_URI,
    module: '../lib/mongo'
};

// URL Bind
exports.URL = [
    {uri: '/v1/check', module: '../modules/checkssl'}
];

// Static html bases
exports.HTDOCS = [
    {uri: '/', dir:'../../www'}
];

// enable cross site
exports.hasCORS = true;