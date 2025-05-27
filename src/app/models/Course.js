const { create } = require('express-handlebars');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
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

//custom query helpers
CourseSchema.query.sortable = function(req) {
    if(req.query.hasOwnProperty('_sort')) {
        const isValidtype = ['asc','desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidtype ? req.query.type : 'desc',
        });
    }
    return this;
}

//add plugins
CourseSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', CourseSchema);
