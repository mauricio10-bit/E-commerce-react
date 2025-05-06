import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from './firebase'

export async function crearUsuarioSiNoExiste(user) {
  const userRef = doc(db, 'usuarios', user.uid)
  const snap = await getDoc(userRef)

  if (!snap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      nombre: user.displayName || '',
      rol: 'usuario' 
    })
  }
}
