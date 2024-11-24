import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgetPassword } from '../features/authSlice';
import { Form, Button, Alert, Container } from 'react-bootstrap';

const ForgotPasswordPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Dispatch the forgetPassword action
            await dispatch(forgetPassword({ email })).unwrap();

            // Notify the user that the OTP has been sent
            setNotification({
                message: 'An OTP has been sent to your email address. Please check your inbox.',
                type: 'success',
            });
        } catch (error) {
            // Notify the user of any errors
            setNotification({
                message: error.message || 'Failed to send OTP. Please try again later.',
                type: 'danger',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container style={{ maxWidth: '400px', marginTop: '50px' }}>
            <h3 className="mb-4">Forgot Password</h3>

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
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={isLoading}
                >
                    {isLoading ? 'Sending...' : 'Send OTP'}
                </Button>
            </Form>

            {/* Back to Login */}
            <div className="mt-3 text-center">
                <p>
                    Remember your password?{' '}
                    <a href="/">Back to Login</a>
                </p>
            </div>
        </Container>
    );
};

export default ForgotPasswordPage;
