import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../features/authSlice';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Dispatch the signin action and await its resolution if async
            await dispatch(signin(formData)).unwrap();

            // If successful, show a success notification
            setNotification({ message: 'Login successful!', type: 'success' });

            // Redirect to the home or dashboard page
            navigate('/home');
        } catch (error) {
            console.log(error);

            if (error.message === 'Please verify your email first.') {
                // Redirect to the email verification page

                // Store email in local storage
                localStorage.setItem('email', formData.email);
                setTimeout(() => {
                    navigate('/verifyemail');
                }, 2000);
            }

            // If failed, show an error notification
            setNotification({ message: error.message || 'Login failed!', type: 'danger' });
        }
    };

    return (
        <Container style={{ maxWidth: '400px', marginTop: '50px' }}>
            <h3 className="mb-4">Login</h3>

            {/* Notification */}
            {notification.message && (
                <Alert
                    variant={notification.type}
                    onClose={() => setNotification({ message: '', type: '' })}
                    dismissible
                >
                    {notification.message}
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Login
                </Button>
            </Form>

            {/* Forgot password link */}
            <div className="mt-3 text-center">
                <p>
                    <Link to="/forget-password">Forgot Password?</Link>
                </p>
            </div>

            {/* Sign up link */}
            <div className="mt-3 text-center">
                <p>
                    Don't have an account?{' '}
                    <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </Container>
    );
};

export default LoginPage;
