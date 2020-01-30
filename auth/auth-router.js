const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/secret.js");

const User = require("../users/users-model.js");

// for endpoints begginig with /api/auth
router.post("/register", (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // hashed a password when registering a user
    user.password = hash;

    User.add(user)
        .then(newUser => {
            res.status(201).json(newUser);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post("/login", (req, res) => {
    let { username, password } = req.body;

    User.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = signToken(user)

                res.status(200).json({
                    message: ({token}),
                });
            } else {
                res.status(401).json({ you: "shall not pass" });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

function signToken(user) { 
    const payload = {
      user
    };
  
    const options = {
      expiresIn: '1d'
    }
  
    return jwt.sign(payload, jwtSecret, options)
  }

module.exports = router;