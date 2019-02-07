const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    if(req.isAuthenticated()){
    pool.query(`SELECT "username" FROM person`)
    .then(results => res.send(results.rows))
    .catch(error => {
    console.log('Error making SELECT for all users:', error);
             res.sendStatus(500);
         });
    }
    else {
        // They are not authenticated.
        res.sendStatus(403);
    }
});

module.exports = router;