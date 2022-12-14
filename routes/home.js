const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')

//======GET=======
router.get('/',auth, async (req, res) => {
   
   return res.render('home')
})

module.exports = router;