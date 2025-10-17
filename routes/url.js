const express= require('express');
const {handleCreateURL,
       handleGetShortURL,
}= require('../controller/url');

const router= express.Router();

router.post('/',handleCreateURL);
router.get('/:shortURL',handleGetShortURL);

module.exports= router;
