import { useState } from 'react'
import Modal from './Modal'
import CreateNote from './CreateNote'
import Feed from './Feed'
import { Routes, Route, useNavigate } from 'react-router-dom'
import MyNotes from './MyNotes'

function Home({ onLoggedOut }) {
    const [modal, setModal] = useState()
    const [refresh, setRefresh] = useState() //inicialmente está undefined, es decir, es como false
    const navigate = useNavigate()

    const logout = () => {
        delete sessionStorage.token

        onLoggedOut()
    }

    const handleCloseModal = () => setModal(false)

    const handleOpenModal = () => setModal(true)

    const handleCloseModalAndReloadNotes = () => {
        handleCloseModal()

        setRefresh(Date.now())
    }

    const handleOpenMyNotes = () => navigate('/notes')

    const handleOpenPublicNotes = () => navigate('/notes/public')

    return <div>
        <h1>home</h1>
        <button onClick={logout}>Logout</button>
        <button onClick={handleOpenModal}>+</button>
        <button onClick={handleOpenPublicNotes}>Public notes</button>
        <button onClick={handleOpenMyNotes}>My notes</button>

        {modal &&
            <Modal content={
                <CreateNote onCreated={handleCloseModalAndReloadNotes} />
            }
                onClose={handleCloseModal}
            />
        }

        <Routes>
            <Route path='notes/public/*' element={<Feed refresh={refresh} />} />
            <Route path='notes/*' element={<MyNotes />} />
        </Routes>
    </div>
}
export default Home