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

    Users.add(user)
        .then(newUser => {
            res.status(201).json(saved);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});