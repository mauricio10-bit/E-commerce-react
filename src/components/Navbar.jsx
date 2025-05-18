import { Link } from 'react-router-dom'
import '../components/Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserImg from '../assets/Usuario.png'
import { useAdmin } from '../hooks/useAdmin'

function Navbar() {
  const { isAdmin } = useAdmin()

  return (
    <nav style={{ backgroundColor: '#00f5d7' }} className="navbar navbar-expand-lg" data-bs-theme="light">
      <div className="container d-flex justify-content-between align-items-center">

        <Link className="navbar-brand" to="/"><b>Jema Store</b></Link>

        <div className="d-flex align-items-center gap-2">

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <Link id="user" className="nav-link p-0" to="/auth">
            <img
              style={{ height: "35px", width: "35px" }}
              src={UserImg}
              alt="Autenticación"
            />
          </Link>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/productos">Admin</Link>
              </li>
            <li className="nav-item">
              <Link className="nav-link" to="/store">Tienda</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">Carrito</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
