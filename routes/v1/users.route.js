const fs = require('fs')
const express = require('express')
const usersController = require('../../controllers/users.controller')

const router = express.Router()

router.route("/all").get(
    usersController.getAll
)
router.route("/random").get(
    usersController.getRandom
)

router.route("/save").post(
    usersController.saveUser
)

router.route("/update/:id").put(
    usersController.updateUser
)

router.route("/delete/:id").delete(
    usersController.deleteUser
)

router.route("/bulk-update").put(
    usersController.bulkUpdate
)

module.exports = router
