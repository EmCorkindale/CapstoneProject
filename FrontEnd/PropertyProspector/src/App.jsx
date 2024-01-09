import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './components/NavBar/navBar'
import AppRoutes from './routes/appRoutes'
import { UserProvider } from './contexts/userContext'


function App() {
  document.body.style.backgroundColor = "#E5E0DC";

  return (
    <>

      <UserProvider>
        <NavBar />
        <AppRoutes />
    </UserProvider >

    </>
  )
}
export default App
