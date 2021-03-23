var express = require('express');

var wrapper = function(db) {
  var router = express.Router();
  /* POST comment */
  router.post('/', function(req, res, next) {
    db.get('comments')
      .push(req.body)
      .write();
    res.send({data: 'success'});
  });

  return router;
}

module.exports = wrapper;
