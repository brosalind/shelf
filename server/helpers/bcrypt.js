const bcrypt = require('bcryptjs')

const checkPassword = (orgPassword, encryptedPassword) => {
    return bcrypt.compareSync(orgPassword, encryptedPassword)
}

module.exports = {checkPassword}