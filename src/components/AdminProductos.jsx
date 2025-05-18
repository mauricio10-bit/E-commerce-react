import { useAdmin } from '../hooks/useAdmin'
import ListaProductos from '../components/ListaProductos'
import { Link } from 'react-router-dom'

function AdminProductos() {
  const { isAdmin, loading } = useAdmin()

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div style={{ width: '4rem', height: '4rem', borderWidth: '0.5rem'}} className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }


  if (!isAdmin) {
    return (
      <div className="container text-center mt-5">
        <p style={{backgroundColor: '#730000'}} className='badge fs-3'>No tienes permisos para acceder a esta pagina</p>
      </div>
    )
  } 

  return (
    <div className="container mt-4">
      <h2>Administrar productos</h2>
      <Link to="/productos/nuevo" className="btn btn-primary mb-5">Crear nuevo producto</Link>
      <ListaProductos />
    </div>
  )
}

export default AdminProductos
