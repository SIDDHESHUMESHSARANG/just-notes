import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import NotesDetail from './pages/NotesDetail'
import SearchResultPage from './pages/SearchResultPage'
import CreatePage from './pages/CreatePage'
import SubjectWisePage from './pages/SubjectWisePage'
import CountNotes from './pages/CountNotes'
import NotesUpdate from './pages/NotesUpdate'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import UnpublishedNotes from './pages/UnpublishedNotes'

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/notes/:id' element={<NotesDetail />} />
        <Route path='/update/:id' element={<NotesUpdate />} />
        <Route path='/search-results' element={<SearchResultPage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/subject-wise' element={<SubjectWisePage />} />
        <Route path='/count-per-semester' element={<CountNotes />} />
        <Route path='/unpublished' element={<UnpublishedNotes/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
