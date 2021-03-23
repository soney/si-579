var express = require('express');
var wrapper = function(db) {
  var router = express.Router();
  /* GET comment listing. */
  router.get('/', function(req, res, next) {
    const value = db.get('comments').value();
    res.send(value);
  });

  return router;
}

module.exports = wrapper;
