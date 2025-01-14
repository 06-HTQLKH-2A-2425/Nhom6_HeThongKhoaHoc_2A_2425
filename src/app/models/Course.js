const { create } = require('express-handlebars');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        videoId: { type: String, required: true },
        level: { type: String },
        slug: { type: String, unique: true, default: uuidv4 },
    },
    {
        timestamps: true,
    }
);

//add plugins
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);
