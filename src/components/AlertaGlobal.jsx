import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function AlertaGlobal() {
  const { alertas: alertasCarrito } = useCart()
  const { alertas: alertasSesion } = useAuth()

  const todas = [...alertasCarrito, ...alertasSesion]

  return (
    <div className="position-fixed top-0 start-50 translate-middle-x mt-3" style={{ zIndex: 9999 }}>
      {todas.map(alerta => (
        <div
          key={alerta.id}
          className={`alert alert-${alerta.tipo || 'success'} alert-dismissible fade show shadow mb-2 text-center`}
          role="alert"
          style={{ minWidth: '250px' }}
        >
          <b>{alerta.mensaje}</b>
        </div>
      ))}
    </div>
  )
}

export default AlertaGlobal
