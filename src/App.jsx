import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Store from './pages/Store'
import Cart from './pages/Cart'
import Auth from './pages/Auth'
import ProtectedRoute from './context/ProtectedRoute'
import AdminRoute from './context/AdminRoute'
import AdminProductos from './components/AdminProductos'
import FormularioProducto from './components/FormularioProducto'
import ListaProductos from './components/ListaProductos'
import AlertaGlobal from './components/AlertaGlobal'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ListaProductos />} />
        <Route path="/admin/productos" element={
          <AdminRoute>
            <AdminProductos />
          </AdminRoute>
        } />

        <Route path="/productos/nuevo" element={
          <AdminRoute>
            <FormularioProducto />
          </AdminRoute>
        } />

        <Route path="/productos/editar/:id" element={
          <AdminRoute>
            <FormularioProducto />
          </AdminRoute>
        } />

        <Route path="/store" element={
          <ProtectedRoute>
            <Store />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
      </Routes>
      <AlertaGlobal />
    </>
  )
}

export default App
