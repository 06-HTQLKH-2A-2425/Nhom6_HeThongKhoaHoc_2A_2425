const Course = require('../models/Course');

class MeController {
    //[GET] /me / stored / courses
    storedCourses(req, res, next) {
        
        let courseQuery = Course.find({});
        Promise.all([
            courseQuery.sortable(req),
            Course.countDocumentsWithDeleted({ deleted: true })]
        )
            .then((courses) => {
                console.log(deletedCount);
            })
            .catch(() => {});

        courseQuery.lean()
            .then((courses) => res.render('me/stored-courses', { courses }))
            .catch(next);
    }

    //[GET] /me / trash / courses
    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .lean()
            .then((courses) => res.render('me/trash-courses', { courses }))
            .catch(next);
    }
}

module.exports = new MeController();