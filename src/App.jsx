import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Chatting from './pages/Chatting'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Routes>
        <Route path='/'
          element={<Home />} />
        <Route path='/chatting/:userId'
          element={<Chatting />} />
        <Route path="*"
          element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
