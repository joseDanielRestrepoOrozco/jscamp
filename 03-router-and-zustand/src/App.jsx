import { lazy, Suspense } from 'react'

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

// import Home from './pages/Home.jsx'
// import Search from './pages/Search.jsx'
// import Detail from './pages/Detail.jsx'
// import Contact from './pages/Contact.jsx'
// import NotFoundPage from './pages/404.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const Search = lazy(() => import('./pages/Search.jsx'))
const Detail = lazy(() => import('./pages/Detail.jsx'))
const NotFoundPage = lazy(() => import('./pages/404.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Profile = lazy(() => import('./pages/Profile.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Register = lazy(() => import('./pages/Register.jsx'))

import { Routes, Route } from 'react-router'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<div>cargando</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<Search />} />
          <Route path="/jobs/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute redirectTo="/search">
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

export default App
