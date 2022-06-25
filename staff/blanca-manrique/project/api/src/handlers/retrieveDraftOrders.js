const { extractUserIdFromAuthorization } = require('./helpers')
const { retrieveDraftOrders } = require('logic')
const { errors: { NotFoundError, AuthError, FormatError } } = require('commons')

module.exports = (req, res) => {
    try {
        const userId = extractUserIdFromAuthorization(req)

        retrieveDraftOrders(userId)
            .then(orders => res.status(200).json(orders))
            .catch(error => {
                let status = 500

                if (error instanceof NotFoundError)
                    status = 404

                else if (error instanceof AuthError)
                status = 401

                res.status(status).json({ error: error.message })
            })
    } catch (error) {
        let status = 500

        if (error instanceof TypeError || error instanceof FormatError)
            status = 400

        res.status(status).json({ error: error.message })
    }
}