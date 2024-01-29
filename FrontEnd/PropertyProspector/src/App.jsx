import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './components/NavBar/navBar'
import AppRoutes from './routes/appRoutes'
import { UserProvider } from './contexts/userContext'
import { ThemeProvider } from 'react-bootstrap'


function App() {
  document.body.style.backgroundColor = "#E5E0DC";

  return (
    <>
      <ThemeProvider
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs"
      >
        <UserProvider>
          <div className="container-fluid">
            <NavBar />
            <AppRoutes />
          </div>
        </UserProvider >
      </ThemeProvider>
    </>
  )
}
export default App
