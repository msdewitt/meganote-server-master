var db = require('../config/db');
var sanitizeHtml = require('sanitize-html');
var htmlToText = require('html-to-text');
var noteSchema = require('./user-schema');

module.exports = db.model('Note', noteSchema);
