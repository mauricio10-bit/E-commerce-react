import { useAuth } from '../context/AuthContext'
import { auth } from '../services/firebase'
import { signOut } from 'firebase/auth'

function UserInfo() {
  const { user } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      alert('Error al cerrar sesión')
    }
  }

  if (!user) return null

  return (
    <div className="container mt-3 text-end">
      <span className="me-3">Ha iniciado sesion <i><b>{user.email}</b></i></span>
      <button className="btn btn-danger btn-sm" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  )
}

export default UserInfo
