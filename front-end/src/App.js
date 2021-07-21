import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { apiURL } from './util/apiURL.js'
import axios from 'axios'

import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Products from './Pages/Products'
import New from './Pages/New'
import Show from './Pages/Show'
import Edit from './Pages/Edit'
import Four0Four from './Pages/Four0Four'

const API = apiURL()

function App () {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios
      .get(`${API}/products`)
      .then(
        response => setProducts(response.data),
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
            <Products products={products} />
          </Route>
          <Route exact path='/products/new'>
            <New />
          </Route>
          <Route exact path='/products/:id'>
            <Show product={products}/>
          </Route>
          <Route exact path='/products/:id/edit'>
            <Edit />
          </Route>
          <Route>
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
