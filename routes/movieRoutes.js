var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');
var jwt = require('express-jwt');
var auth = jwt({
  userProperty: 'payload',
  secret: "Don't look at this!"
});



// router.param('id', function(req,res,next,id){
//   Moive.findOne({_id: id},function(err,result){
//     if(err) return next(err);
//     if(!result) return next({err:"Could not find that id."});
//     req.todo = result;
//     next();
//   });
// });
//
//
router.get('/', function(req,res,next){
  Movie.find({},function(err,result){
    if(err) return next(err);
    res.send(result);
  });
});

router.get('/:id', function(req,res,next){
  Movie.findOne({_id:req.params.id},function(err,result){
    if(err) return next(err);
    if(!result) return next("Could not find that movie!!");
    res.send(result);
  });
});

router.put('/',function(req,res,next){
  Movie.update({_id: req.body.IDofpostToEdit}, req.body.postEditted, function(err,result){
    if(err) return next(err);
    if(!result) return next({err: "The post wasnt found for updating."});
    res.send(result);
  });
});

router.delete('/:id',function(req,res,next){
  Movie.remove({_id:req.params.id},function(err,result){
    if(err) return next(err);
    console.log(result);
    res.send();
  });
});

router.post('/',function(req,res,next){
  var abc = new Movie (req.body);
  abc.save(function(err,result){
    if(err) return next(err);
    console.log(result);
    res.send(result);
  });
});

router.post('/:id/comment',auth, function(req,res,next){
  var comment = {
    body:req.body.body,
    user:req.payload._id,
    rating:req.body.rating
  };
  Movie.findOne({_id:req.params.id}, function(err,movie){
    if(err) return next(err);
    if(!movie) return next("Could not find that movie");
    movie.comments.push(comment);
    movie.save(function(err,movies){
      res.send(movie);
    });
  });
});

module.exports = router;
