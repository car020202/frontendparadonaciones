import { useState } from 'react'
import Login from './login/login';
import Home from './inicio/inicio'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home/>
    </>
  )
}

export default App
