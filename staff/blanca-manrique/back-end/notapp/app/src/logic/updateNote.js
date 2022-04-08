import { validators, errors } from 'commons'

const { validateToken, validateId, validateText, validateBoolean } = validators
const { ClientError, ServerError } = errors

function updateNote(token, noteId, text, color, _public) {
    validateToken(token)
    validateId(noteId, 'note id')
    validateText(text, 'text')
    validateText(color, 'color')
    validateBoolean(_public, 'public')

    return fetch(`http://localhost:8080/api/notes/${noteId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, color, public: _public })
    })
        .then(res => {
            const { status } = res

            if (status === 204)
                return
            else if (status >= 400 && status < 500)
                return res.json()
                    .then(payload => {
                        const { error: message } = payload

                        throw new ClientError(message)
                    })
            else if (status >= 500)
                return res.text()
                    .then(text => {
                        throw new ServerError(text)
                    })
        })
}
export default updateNote