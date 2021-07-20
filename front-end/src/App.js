import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { apiURL } from './util/apiURL.js'
import axios from 'axios'
// const API = apiURL();

import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Index from './Pages/Index'
import New from './Pages/New'
import Show from './Pages/Show'
import Edit from './Pages/Edit'
import Four0Four from './Pages/Four0Four'

function App () {
  const [days, setDays] = useState([])

  useEffect(() => {
    axios
      .get(`/products`)
      .then(
        response => setDays(response.data),
        error => console.log('get', error)
      )
      .catch(c => console.warn('catch', c))
  }, [])

  return (
    <Router>
      <NavBar />
      <main>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/products'>
            <Index />
          </Route>
          <Route exact path='/products/new'>
            <New />
          </Route>
          <Route exact path='/products/:id'>
            <Show />
          </Route>
          <Route exact path='/products/:id/edit'>
            <Edit />
          </Route>
          <Route exact path='*'>
            <Four0Four />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  )
}

export default App

// <ul>
// {days.map((day) => (
//  <li key={day.name}>{day.name}</li>
// ))}
// </ul>
