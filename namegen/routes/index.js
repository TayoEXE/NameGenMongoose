var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var FavName = mongoose.model('FavName');
var randomName = require('random-game-name');

router.get('/generate', function(req, res, next) {
    console.log("Enter /generate")
    var name = randomName.random();
    console.log(name);
    res.send(name);
});

router.get('/names', function(req, res, next) {
    FavName.find(function(err, names) {
        if (err) { return next(err); }
        res.json(names);
    });
});

router.post('/names', function(req, res, next) {
    console.log("Req body is " + req.body);
    var name = new FavName(req.body);
    name.save(function(err, comment) {
        if (err) { return next(err); }
        console.log(name)
        res.json(name);
    });
});

router.param('name', function(req, res, next, id) {
    FavName.findById(id, function(err, name) {
        if (err) { return next(err); }
        if (!name) { return next(new Error("can't find the name")); }
        req.comment = name;
        return next();
    });
});

router.get('/names/:name', function(req, res) {
    console.log("Getting name");
    res.json(req.name);
});

router.put('/names/:name/upvote', function(req, res, next) {
    req.comment.upvote(function(err, name) {
        if (err) { return next(err); }
        res.json(name);
    });
});

router.delete('/delete', function(req, res, next) {
    console.log("Enter /delete");
    FavName.remove({}, function(err, list) {
        if (err) {
            console.log("Error delete comments on DB")
            res.sendStatus(500);
        }
        else {
            res.sendStatus(200);
            console.log("All favorite names deleted");
        }
    })
});

module.exports = router;
