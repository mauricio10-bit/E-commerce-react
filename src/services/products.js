import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from './firebase'

const productosRef = collection(db, 'productos')

export async function crearProducto(producto) {
  const docRef = await addDoc(productosRef, producto)
  return docRef.id
}

export async function obtenerProductos() {
  const snapshot = await getDocs(productosRef)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function obtenerProductoPorId(id) {
  const docRef = doc(db, 'productos', id)
  const snap = await getDoc(docRef)
  return { id: snap.id, ...snap.data() }
}

export async function actualizarProducto(id, datos) {
  const docRef = doc(db, 'productos', id)
  await updateDoc(docRef, datos)
}

export async function eliminarProducto(id) {
  const docRef = doc(db, 'productos', id)
  await deleteDoc(docRef)
}
