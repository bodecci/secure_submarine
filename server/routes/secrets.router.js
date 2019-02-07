const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    if(req.isAuthenticated()) {
        pool.query(`SELECT * FROM "secret"
                    WHERE "secret"."id" = $1
                    AND "secret"."secrecy_level" <= $2;`,
                    [req.params.id, req.user.clearance_level])
                    .then((result) => {
                        res.send(result.rows);
                    }).catch((error) => {
                        res.sendStatus(500);
                    })
    }
});

router.get('/', (req, res) => {
    // Authentication
    if (req.isAuthenticated()) {
    console.log('req.user:', req.user);
    // Authorisation
    pool.query(`SELECT * FROM "secret" 
                WHERE "secret"."secrecy_level" <= ${req.user.clearance_level};`)
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