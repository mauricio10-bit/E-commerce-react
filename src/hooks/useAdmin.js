import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { useAuth } from '../context/AuthContext'

export function useAdmin() {
  const { user } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAdmin() {
      if (user) {
        const docRef = doc(db, 'usuarios', user.uid)
        const snap = await getDoc(docRef)
        const datos = snap.data()
        setIsAdmin(datos?.rol === 'admin')
      }
      setLoading(false)
    }

    checkAdmin()
  }, [user])

  return { isAdmin, loading }
}
