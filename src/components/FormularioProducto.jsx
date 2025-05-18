import { useEffect, useState } from 'react'
import { crearProducto, actualizarProducto, obtenerProductoPorId } from '../services/products'
import { useNavigate, useParams } from 'react-router-dom'

const productoInicial = {
    nombre: '',
    precio: '',
    imagen: '',
    categoria: '',
    destacado: false,
    popular: false,
    oferta: false,
    descuento: null,
}

export default function FormularioProducto() {
    const [producto, setProducto] = useState(productoInicial)
    const [editando, setEditando] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams() 

    useEffect(() => {
        if (id) {
            setEditando(true)
            obtenerProductoPorId(id).then(data => setProducto(data))
        }
    }, [id])

    const handleChange = e => {
        const { name, value, type, checked } = e.target
        setProducto(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (producto.oferta) {
            const descuento = parseFloat(producto.descuento)
            if (isNaN(descuento) || descuento <= 0 || descuento >= 1) {
                alert('Debes ingresar un descuento válido entre 0 y 1 (por ejemplo: 0.2 para 20%)')
                return
            }
        }

        if (editando) {
            await actualizarProducto(id, producto)
        } else {
            await crearProducto({ ...producto, precio: parseFloat(producto.precio) })
        }
        navigate('/productos')
    }

    return (
        <div className="container mt-3">
            <form onSubmit={handleSubmit} className="formulario-producto">
                <h2>{editando ? 'Editar' : 'Crear'} Producto</h2>
                <input className='form-control mb-2' name='nombre' placeholder="Nombre" value={producto.nombre} onChange={handleChange} required />
                <input className='form-control mb-2' name="precio" placeholder="Precio" value={producto.precio} onChange={handleChange} required />
                <input className='form-control mb-2' name="imagen" placeholder="URL de imagen" value={producto.imagen} onChange={handleChange} required />
                <input className='form-control mb-2' name="categoria" placeholder="Categoría" value={producto.categoria} onChange={handleChange} />

                <div className="form-check mb-2">
                    <input className='form-check-input' type='checkbox' name="destacado" checked={producto.destacado} onChange={handleChange} />
                    <label className='form-check-label'>Destacado</label>
                </div>

                <div className="form-check mb-2">
                    <input className='form-check-input' type='checkbox' name="oferta" checked={producto.oferta} onChange={handleChange} />
                    <label className='form-check-label'>Oferta</label>
                </div>

                {producto.oferta && (
                    <input
                        step="0.01"
                        min="0"
                        max="1"
                        style={{ width: '30%' }}
                        className="form-control mb-2"
                        name="descuento"
                        placeholder="Descuento (ej: 0.2 para 20%)"
                        value={producto.descuento}
                        onChange={handleChange}
                        required
                    />
                )}


                <div className="form-check mb-4">
                    <input className='form-check-input' type='checkbox' name="popular" checked={producto.popular} onChange={handleChange} />
                    <label className='form-check-label'>Popular</label>
                </div>
                <button className='btn btn-success' type="submit">{editando ? 'Actualizar' : 'Crear'}</button>
            </form>
        </div>
    )
}
