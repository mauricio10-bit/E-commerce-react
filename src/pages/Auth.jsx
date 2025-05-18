import { useState } from 'react'
import { auth } from '../services/firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import UserInfo from '../components/UserInfo'

function Auth() {
    const { user, mostrarAlerta } = useAuth()
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password)
                mostrarAlerta('Sesión iniciada correctamente', 'success')
            } else {
                await createUserWithEmailAndPassword(auth, email, password)
                mostrarAlerta('Usuario registrado correctamente', 'success')
            }
            navigate('/store')
        } catch (error) {
            mostrarAlerta('Error: ' + error.message, 'danger')
        }
    }

    if (user) return <UserInfo />

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <Col md={6} className="text-center">
                <h1 style={{ color: 'black', marginBottom: '30px' }}>
                    {isLogin ? 'Iniciar sesión' : 'Registrarse'}
                </h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            className='anchoInput mb-3'
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            className='anchoInput mb-3'
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="success" type="submit" className="mt-2 mb-3">
                        {isLogin ? 'Iniciar sesión' : 'Registrarse'}
                    </Button>
                </Form>

                <Button variant="primary" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Crear una cuenta nueva' : 'Ya tengo una cuenta'}
                </Button>
            </Col>
        </div>
    )
}

export default Auth
