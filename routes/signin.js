const express = require('express')
const router = express.Router();

//======GET=======
router.get('/', async (req, res) => {
   return res.render('signIn',{
    title:"Sign in"
   })
})

module.exports = router;