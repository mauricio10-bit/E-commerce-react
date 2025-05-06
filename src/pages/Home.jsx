import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../services/firebase'
import ProductCard from '../components/ProductCard'

function Home() {
  const [destacados, setDestacados] = useState([])
  const [ofertas, setOfertas] = useState([])
  const [populares, setPopulares] = useState([])

  useEffect(() => {
    const cargarDatos = async () => {
      const productosRef = collection(db, 'productos')

      const destacadosSnap = await getDocs(query(productosRef, where('destacado', '==', true)))
      const ofertasSnap = await getDocs(query(productosRef, where('oferta', '==', true)))
      const popularesSnap = await getDocs(query(productosRef, where('popular', '==', true)))

      setDestacados(destacadosSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      setOfertas(ofertasSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      setPopulares(popularesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }

    cargarDatos()
  }, [])

  const Seccion = ({ titulo, productos }) => (
    <>
      <h3 className="mt-4">{titulo}</h3>
      <div className="row">
        {productos.map(p => (
          <div key={p.id} className="col-md-4 mb-3">
            <ProductCard producto={p} />
          </div>
        ))}
      </div>
    </>
  )

  return (
    <div className="container mt-4">
      <h1>Bienvenido a nuestra tienda</h1>
      <p>Explora nuestros productos destacados, ofertas y más</p>

      <Seccion titulo="⭐ Productos Destacados" productos={destacados} />
      <div className='progress mt-1 mb-1' role='progressbar' aria-label='Animated stripped example' aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}>
        <div className='progress-bar progress-bar-striped progress-bar-animated' style={{ backgroundColor: 'rgb(157, 0, 168)', width: '100%' }}></div>
      </div>
      <Seccion titulo="💸 Ofertas Especiales" productos={ofertas} />
      <div className='progress mt-1 mb-1' role='progressbar' aria-label='Animated stripped example' aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}>
        <div className='progress-bar progress-bar-striped progress-bar-animated' style={{ backgroundColor: 'rgb(157, 0, 168)', width: '100%' }}></div>
      </div>
      <Seccion titulo="🔥 Más Populares" productos={populares} />
    </div>
  )
}
export default Home
