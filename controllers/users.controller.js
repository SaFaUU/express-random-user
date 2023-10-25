const fs = require('fs')
const path = require('path')
module.exports.getAll = (req, res) => {
    const limit = req.query.limit
    const data = fs.readFileSync(path.join(__dirname, '..', 'data.json'))
    const limitedData = JSON.parse(data).slice(0, parseInt(limit));
    res.json(limitedData)
}

module.exports.getRandom = (req, res) => {
    const data = fs.readFileSync(path.join(path.join(__dirname, '..', 'data.json')))
    const users = JSON.parse(data)
    const randomIndex = Math.floor(Math.random() * users.length)
    const randomUser = users[randomIndex]
    res.json(randomUser)
}

module.exports.saveUser = (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, '..', 'data.json'))
    const users = JSON.parse(data)

    const newUser = {
        id: users.length + 1,
        ...req.body
    }
    // Validate user data
    if (!req.body.gender || !req.body.name || !req.body.contact || !req.body.address || !req.body.photoUrl) {
        return res.status(400).json({ message: 'Please insert all the required fields' })
    }

    users.push(newUser)
    fs.writeFileSync(path.join(__dirname, '..', 'data.json'), JSON.stringify(users))
    res.status(200).json({ message: 'User saved successfully' })
}

module.exports.updateUser = (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, '..', 'data.json'))
    const users = JSON.parse(data)
    const id = parseInt(req.params.id)
    const body = req.body
    const index = users.findIndex(user => user.id === id)

    if (index === -1) {
        return res.status(400).json({ message: 'User not found' })
    }
    users[index] = {
        id,
        ...users[index],
        ...body
    }
    fs.writeFileSync(path.join(__dirname, '..', 'data.json'), JSON.stringify(users))
    res.status(200).json({ message: 'User updated successfully' })
}

module.exports.deleteUser = (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, '..', 'data.json'))
    const users = JSON.parse(data)
    const id = parseInt(req.params.id)
    const index = users.findIndex(user => user.id === id)
    if (index === -1) {
        return res.status(400).json({ message: 'User not found' })
    }
    users.splice(index, 1)
    fs.writeFileSync(path.join(__dirname, '..', 'data.json'), JSON.stringify(users))
    res.status(200).json({ message: 'User deleted successfully' })
}

module.exports.bulkUpdate = (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, '..', 'data.json'))
    const users = JSON.parse(data)
    const body = req.body

    if (body == null || body.length === 0 || !Array.isArray(body)) {
        return res.status(400).json({ message: 'No data provided' })
    }

    body.forEach(bodyUser => {
        const index = users.findIndex(user => user.id === bodyUser.id)
        if (index === -1) {
            res.status(400).json({ message: 'User not found' })
        }

        if (index !== -1) {
            users[index] = {
                id: bodyUser.id,
                ...users[index],
                ...bodyUser
            }
        }
    })
    fs.writeFileSync(path.join(__dirname, '..', 'data.json'), JSON.stringify(users))
    res.status(200).json({ message: 'Users updated successfully' })
}