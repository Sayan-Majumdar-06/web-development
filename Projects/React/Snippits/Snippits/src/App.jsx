import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Snippits from './components/Snippits'
import ViewSnippits from './components/ViewSnippits'
import NotFound from './components/NotFound'

function App() {

  const router = createBrowserRouter(
    [
      { 
        path:'/',
        element : 
        <div>
           <Navbar/>
           <Home/>
        </div>
      },

      { 
        path:'/snippits',
        element : 
        <div>
          <Navbar/>
          <Snippits/>
        </div>
      },

      { 
        path:'/snippits/:id',
        element : 
        <div>
          <Navbar/>
          <ViewSnippits/>
        </div>,
      },

      {
        path: '*',
        element: 
        <div>
          <NotFound/>
        </div>
      }
    ]
  )
  return (
    <div>
      <RouterProvider router={ router }/>
    </div>
  )
}

export default App
