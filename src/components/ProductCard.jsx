import 'bootstrap-icons/font/bootstrap-icons.css'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function ProductCard({ producto }) {
    const { user } = useAuth()
    const { addToCart } = useCart()
    const precioFinal = producto.oferta
        ? producto.precio - producto.precio * producto.descuento
        : producto.precio

    if (!user) {
        return (
            <div className="card h-100 text-center d-flex flex-column align-items-center">
                <img style={{ height: '300px', width: '100', objectFit: 'contain' }} src={producto.imagen} className="card-img-top" alt={producto.nombre} />
                <div className="card-body mt-auto">
                    <h5 className="card-title">{producto.nombre}</h5>
                    {producto.oferta ? (
                        <p className="card-text">
                            <del>${producto.precio}</del> <strong>${precioFinal}</strong>
                        </p>
                    ) : (
                        <p className="card-text">${producto.precio}</p>
                    )}
                    <p style={{backgroundColor: '#0bff00', color: 'black'}} className="text-center badge text-wrap fs-6">
                        Debes iniciar sesion para poder comprar y añadir productos al carrito
                    </p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="card h-100 text-center d-flex flex-column align-items-center">
                <img style={{ height: '300px', width: '100', objectFit: 'contain' }} src={producto.imagen} className="card-img-top" alt={producto.nombre} />
                <div className="card-body mt-auto">
                    <h5 className="card-title">{producto.nombre}</h5>
                    {producto.oferta ? (
                        <p className="card-text">
                            <del>${producto.precio}</del> <strong>${precioFinal}</strong>
                        </p>
                    ) : (
                        <p className="card-text">${producto.precio}</p>
                    )}
                    <button style={{ marginBottom: '8px' }}  onClick={() => addToCart(producto)} className="btn btn-success"><i className="bi bi-cart-fill"></i> Carrito</button>
                    <button style={{ marginRight: '5px', marginBottom: '8px' }} className="btn btn-primary col-12">Comprar por PSE <i className="bi bi-bank2"></i></button>
                    <button style={{ marginRight: '5px', marginBottom: '8px' }} className="btn btn-primary col-12">Comprar con tarjeta <i className="bi bi-credit-card-fill"></i></button>
                </div>
            </div>
        )
    }

}
export default ProductCard
