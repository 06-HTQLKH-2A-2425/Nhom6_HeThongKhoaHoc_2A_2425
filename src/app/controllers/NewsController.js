class NewsController {
    index(req, res) {
        res.render('news');
    }
    //[GET] /news/:slug
    show(req, res) {
        res.send('news detail');
    }
}

module.exports = new NewsController();
