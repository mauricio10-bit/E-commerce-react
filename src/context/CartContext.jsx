import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [alertas, setAlertas] = useState([])

  const addToCart = producto => {
    setCartItems(prev => {
      const existe = prev.find(p => p.id === producto.id)
      if (existe) {
        return prev.map(p =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      } else {
        return [...prev, { ...producto, cantidad: 1 }]
      }
    })

    const id = Date.now()
    setAlertas(prev => [...prev, { id, mensaje: `${producto.nombre} agregado al carrito` }])

    setTimeout(() => {
      setAlertas(prev => prev.filter(alerta => alerta.id !== id))
    }, 3000)
  }

  const increaseQuantity = id => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    )
  }

  const decreaseQuantity = id => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter(item => item.cantidad > 0)
    )
  }

  const removeFromCart = id => {
    setCartItems(prev => prev.filter(p => p.id !== id))
  }

  const clearCart = () => setCartItems([])

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, alertas }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
