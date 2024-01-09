import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './components/navBar.jsx/navBar'
import AppRoutes from './routes/appRoutes'
import { UserProvider } from './contexts/userContext'

function App() {


  return (
    <>
      <UserProvider>
        <NavBar />
        <AppRoutes />
      </UserProvider>
    </>
  )
}
export default App
