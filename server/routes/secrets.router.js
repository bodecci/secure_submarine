const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
    console.log('req.user:', req.user);
    
    pool.query('SELECT * FROM "secret";')
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
    }
    else {
        // They are not authenticated.
        res.sendStatus(403);
    }
});

module.exports = router;