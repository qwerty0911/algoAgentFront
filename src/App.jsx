import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Chatting from './pages/Chatting'
import NotFound from './pages/NotFound'
import Recommand from './pages/Recommand'

function App() {
  return (
    <>
      <Routes>
        <Route path='/'
          element={<Home />} />
        <Route path='/chatting/:nickname/:session_id'
          element={<Chatting />} />
        <Route path='/recommand/:nickname/:session_id'
          element={<Recommand />} />
        <Route path="*"
          element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
