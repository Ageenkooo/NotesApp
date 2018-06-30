var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  // res.send('respond with a resource');

  // And insert something like this instead:
  res.json([
    {
      id : 1,
      book : "my first book",
      note : "one",
      selected: false,
      deleted:false,
    },
    {
      id : 2,
      book : "my second book",
      note : "two",
      selected: false,
      deleted : false,
    },
    {
      id : 3,
      book : "my third book",
      note:"three",
      selected: false,
      deleted : false
    }]);
});

module.exports = router;
