import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../services/firebase'
import { crearUsuarioSiNoExiste } from '../services/users'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [alertas, setAlertas] = useState([])

  const mostrarAlerta = (mensaje, tipo = 'success') => {
    const id = Date.now()
    setAlertas(prev => [...prev, { id, mensaje, tipo }])
    setTimeout(() => {
      setAlertas(prev => prev.filter(alerta => alerta.id !== id))
    }, 3000)
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await crearUsuarioSiNoExiste(currentUser)
        setUser(currentUser)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, alertas, mostrarAlerta }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
