import { useCart } from '../context/CartContext'
import 'bootstrap-icons/font/bootstrap-icons.css'

function Cart() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity
  } = useCart()

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.cantidad * (item.oferta ? item.precio * (1 - item.descuento) : item.precio),
    0
  )

  return (
    <div className="container mt-4">
      <h2>Carrito de compras</h2>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cartItems.map(item => {
              const precioUnitario = item.oferta
                ? item.precio * (1 - item.descuento)
                : item.precio

              return (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="flex-grow-1">
                    <strong>{item.nombre}</strong>
                    {item.oferta && <span className="badge bg-warning ms-2">Oferta</span>}
                    <div className="mt-1">
                      <button
                        className="btn btn-sm btn-outline-info rounded-pill me-2"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        <i style={{color: 'black'}} class="bi bi-dash-circle"></i>
                      </button>
                      <span>{item.cantidad}</span>
                      <button
                        className="btn btn-sm btn-outline-info rounded-pill ms-2"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        <i style={{color: 'black'}} class="bi bi-plus-circle"></i>
                      </button>
                    </div>
                  </div>
                  <div className="text-end">
                    <p className="mb-1">${(precioUnitario * item.cantidad).toFixed(0)}</p>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
          <h4>Total: ${total.toFixed(0)}</h4>
          <button className="btn btn-outline-danger" onClick={clearCart}>
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  )
}

export default Cart
