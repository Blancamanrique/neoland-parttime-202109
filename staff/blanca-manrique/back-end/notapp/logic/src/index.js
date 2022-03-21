const registerUser = require('./registerUser')
const retrieveUser = require('./retrieveUser')
const authenticateUser = require('./authenticateUser')
const deleteUser = require('./deleteUser')
const updateUser = require('./updateUser')
const createNote = require('./createNote')
const retrieveNotes = require('./retrieveNotes')
const retrievePublicNotesFromUser = require('./retrievePublicNotesFromUser')
const updateNote = require('./updateNote')
const deleteNote = require('./deleteNote')

module.exports = {
    registerUser,
    retrieveUser,
    authenticateUser,
    deleteUser,
    updateUser,
    createNote,
    retrieveNotes,
    retrievePublicNotesFromUser,
    updateNote,
    deleteNote
}