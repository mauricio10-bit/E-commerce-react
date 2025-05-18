import { useEffect, useState } from 'react'
import { obtenerProductos, eliminarProducto } from '../services/products'
import { Link } from 'react-router-dom'
import { useAdmin } from '../hooks/useAdmin'

export default function ListaProductos() {
  const [productos, setProductos] = useState([])
  const esAdmin = useAdmin()

  useEffect(() => {
    obtenerProductos().then(setProductos)
  }, [])

  const handleEliminar = async (id) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      await eliminarProducto(id)
      setProductos(prev => prev.filter(p => p.id !== id))
    }
  }

  return (
    <div className="lista-productos ">
      <div className="row">
        {productos.map(producto => (
          <div key={producto.id} className="col-md-4">
            <div className="card d-flex flex-column text-center justify-content-center align-items-center mb-4">
              <div className="producto">
                <img src={producto.imagen} alt={producto.nombre} width="200" height="200"/>
                <div className='mb-5'>
                  <h3>{producto.nombre}</h3>
                  <p>${producto.precio}</p>
                  <p>Categoría: {producto.categoria}</p>
                  <p>
                    {producto.destacado && '⭐ '}
                    {producto.popular && '🔥 '}
                    {producto.oferta && '💸 '}
                  </p>
                  {esAdmin && (
                    <>
                      <Link style={{ marginRight: '10px' }} className='btn btn-warning' to={`/productos/editar/${producto.id}`}>Editar</Link>
                      <button className='btn btn-danger' onClick={() => handleEliminar(producto.id)}>Eliminar</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

