import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../services/firebase'
import ProductCard from '../components/ProductCard'

function Store() {
  const [productos, setProductos] = useState([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas')
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    const obtenerProductos = async () => {
      const productosRef = collection(db, 'productos')
      const snapshot = await getDocs(productosRef)
      const productosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setProductos(productosData)

      const categoriasUnicas = ['Todas', ...new Set(productosData.map(p => p.categoria))]
      setCategorias(categoriasUnicas)
    }

    obtenerProductos()
  }, [])

  const productosFiltrados =
    categoriaSeleccionada === 'Todas'
      ? productos
      : productos.filter(p => p.categoria === categoriaSeleccionada)

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center align-items-center mb-4" style={{ height: '10vh' }}>
        <h1 className="text-center">TIENDA</h1>
      </div>

      <div className="mb-4 text-center">
        <label style={{marginRight: '10px'}}>Filtrar por Categoria</label>

        <select
          className="form-select w-auto d-inline-block"
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
          {categorias.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="row">
        {productosFiltrados.map(p => (
          <div key={p.id} className="col-md-4 mb-3">
            <ProductCard producto={p} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Store
