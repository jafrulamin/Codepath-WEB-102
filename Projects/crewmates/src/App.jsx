import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import CreateCrewmate from './pages/CreateCrewmate'
import CrewmateGallery from './pages/CrewmateGallery'
import CrewmateDetails from './pages/CrewmateDetails'
import UpdateCrewmate from './pages/UpdateCrewmate'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCrewmate />} />
            <Route path="/gallery" element={<CrewmateGallery />} />
            <Route path="/crewmate/:id" element={<CrewmateDetails />} />
            <Route path="/update/:id" element={<UpdateCrewmate />} />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  )
}

export default App