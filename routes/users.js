var express = require('express');
var router = express.Router();
const fs = require('fs');
var database;
/* GET users listing. */
router.get('/', function (req, res, next) {
  if (err) throw err;
  res.send('users root');
});
router.get('/users-list', function (req, res, next) {
  return fs.readFile('./users-data.json', 'utf8', (err, usersData) => {
    if (err) {
      console.error(err)
      return
    }
    try {
      const data = JSON.parse(usersData).filter(
        (elem) => {
          return elem.name.first.startsWith(req.query.name);
        }
      );
      res.send(data);
      return data
    } catch (err) {
      console.error(err)
    }
  });
});

module.exports = router;
