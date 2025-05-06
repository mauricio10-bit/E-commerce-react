import { Navigate } from 'react-router-dom'
import { useAdmin } from '../hooks/useAdmin'

export default function AdminRoute({ children }) {
  const esAdmin = useAdmin()

  if (esAdmin === null) return <p>Cargando...</p>
  return esAdmin ? children : <Navigate to="/" />
}
