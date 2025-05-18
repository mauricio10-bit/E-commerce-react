import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div style={{ width: '4rem', height: '4rem', borderWidth: '0.5rem'}} className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!user) return <div className="container text-center mt-5">
    <p style={{ backgroundColor: '#5d005d' }} className='badge fs-3'>Registrate o inicia sesion para ver esta sección</p>
  </div>
  return children
}

export default ProtectedRoute
