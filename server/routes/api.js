const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Video = require('../models/video')

const db = "mongodb://mateo:1216@127.0.0.1:27017/videoplayer"
mongoose.Promise = global.Promise
const promise = mongoose.connect(db, {
  useMongoClient: true
})
promise.then(function(db) {
  //TODO: finish
})

router.get('/videos', function(req, res) {
  console.log('Get request for all videos')
  Video.find({}).exec(function(err, videos) {
    if (err) {
      console.error('Error retrieving videos')
    } else {
      res.json(videos)
    }
  })
})

router.get('/videos/:id', function(req, res) {
  console.log('Get request for a single video')
  Video.findById(req.params.id).exec(function(err, video) {
    if (err) {
      console.error('Error retrieving video')
    } else {
      res.json(video)
    }
  })
})

router.post('/video', function(req, res) {
  console.log('Post a video')
  var newVideo = new Video()
  newVideo.title = req.body.title
  newVideo.url = req.body.url
  newVideo.description = req.body.description
  newVideo.save(function(err, insertedVideo) {
    if (err) {
      console.log('Error saving video')
    } else {
      res.json(insertedVideo)
    }
  })
})

router.put('/video/:id', function(req, res) {
  console.log('Update a video')
  Video.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title, 
      url: req.body.url, 
      description: req.body.description
    }
  }, {
    new: true
  }, function(err, updatedVideo) {
    if (err) {
      console.log('Error updating video')
    } else {
      res.json(updatedVideo)
    }
  })
})

router.delete('/video/:id', function(req, res) {
  console.log('Deleting a video')
  Video.findByIdAndRemove(req.params.id, function(err, deletedVideo) {
    if (err) {
      console.log('Error deleting video')
    } else {
      res.json(deletedVideo)
    }
  })
})

module.exports = router