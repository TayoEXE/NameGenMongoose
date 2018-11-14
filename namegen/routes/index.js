var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('FavName');
var randomName = require('random-game-name');



router.get('/comments', function(req, res, next) {
    Comment.find(function(err, comments) {
        if (err) { return next(err); }
        res.json(comments);
    });
});

router.post('/comments', function(req, res, next) {
    console.log(req.body)
    var comment = new Comment(req.body);
    comment.save(function(err, comment) {
        if (err) { return next(err); }
        console.log(comment)
        res.json(comment);
    });
});

router.param('comment', function(req, res, next, id) {
    Comment.findById(id, function(err, comment) {
        if (err) { return next(err); }
        if (!comment) { return next(new Error("can't find comment")); }
        req.comment = comment;
        return next();
    });
});

router.get('/comments/:comment', function(req, res) {
    console.log("Getting comment");
    res.json(req.comment);
});

router.put('/comments/:comment/upvote', function(req, res, next) {
    req.comment.upvote(function(err, comment) {
        if (err) { return next(err); }
        res.json(comment);
    });
});

router.delete('/comments/:comment', function(req, res) {
  console.log("in Delete");
  req.comment.remove();
  res.sendStatus(200);
});

module.exports = router;
