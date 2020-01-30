const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");

router.get("/", restricted, (req, res) => {
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
});

// function onlyDepartment(department) {
//     return function(req, res, next) {
//         if (req.user && req.user.department && req.user.department.toLowerCase() === department) {
//             next();
//         } else {
//             res.status(403).json({ sorry: "couldnt get users in your department" })
//         }
//     }
// }

module.exports = router;