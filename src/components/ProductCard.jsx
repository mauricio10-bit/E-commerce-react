import 'bootstrap-icons/font/bootstrap-icons.css'
import { useCart } from '../context/CartContext'

function ProductCard({ producto }) {
    const { addToCart } = useCart()
    const precioFinal = producto.oferta
        ? producto.precio - producto.precio * producto.descuento
        : producto.precio

    return (
        <div className="card h-100 text-center d-flex flex-column align-items-center">
            <img style={{height: '300px', width: '100', objectFit: 'contain'}} src={producto.imagen} className="card-img-top" alt={producto.nombre} />
            <div className="card-body mt-auto">
                <h5 className="card-title">{producto.nombre}</h5>
                {producto.oferta ? (
                    <p className="card-text">
                        <del>${producto.precio}</del> <strong>${precioFinal}</strong>
                    </p>
                ) : (
                    <p className="card-text">${producto.precio}</p>
                )}
                <button style={{ marginBottom: '8px' }} className="btn btn-success" onClick={() => addToCart(producto)}><i class="bi bi-cart-fill"></i> Carrito</button>
                <button style={{ marginRight: '5px', marginBottom: '8px' }} className="btn btn-primary col-12">Comprar por PSE <i class="bi bi-bank2"></i></button>
                <button style={{ marginRight: '5px', marginBottom: '8px' }} className="btn btn-primary col-12">Comprar con tarjeta <i class="bi bi-credit-card-fill"></i></button>
            </div>
        </div>
    )
}
export default ProductCard
