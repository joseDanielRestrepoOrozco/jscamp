import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import NotFoundPage from './pages/404.jsx'

import Search from './pages/Search.jsx'
import Home from './pages/Home.jsx'
import Route from './components/Route.jsx'
import Contact from './pages/Contact.jsx'

const App = () => {
  return (
    <>
      <Header />
      <Route path="/" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/search" component={Search} />
      <Footer />
    </>
  )
}

export default App
