import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/subcomponents/Navbar';
import Home from './components/Home';
import Notes from './components/Notes';
import Signup from './components/Signup';
import Blob from './components/subcomponents/Blob'
import Deletenote from './components/subcomponents/Deletenote'
import { NotesState } from './context api/NotesState';


function App() {

  const [delModal, setDelModal] = useState("hide-it")

  return (
    <>
    <main className="home_section">
      <NotesState>
        <Router>
          <Navbar setDelModal={setDelModal} />
          <Blob xview={500} yview={100} color="orangered" size="0.5" rotate="180" />
          <Blob xview={-150} yview={200} color="#FE840E" size="1" />
          <Blob xview={-150} yview={600} color="#FE840E" size="0.6" rotate="55" />
          <Blob xview={700} yview={500} color="#FE840E" size="0.9" rotate="40" />
          <Blob xview={420} yview={400} color="orangered" size="0.3" rotate="20" />
          <Deletenote title="Log Out" msg="Conform to log out?" option="Log out" delModal={delModal} setDelModal={setDelModal} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/notes" element={<Notes />} />
            <Route exact path="/signup" element={<Signup signBtn="Sign me Up" />} />
            <Route exact path="/login" element={<Signup signBtn="Log in" />} />
          </Routes>
        </Router>
      </NotesState>
    </main>
    </>
  );
}

export default App;
