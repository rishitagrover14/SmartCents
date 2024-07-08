import './Login.css';
import logo from './logo.png';
import login2 from './login2.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/api/v1/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: username, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error);
                return;
            }

            // Assuming successful signup, you can handle storing JWT token or other logic here
            // For example, redirecting to another page after successful signup
            navigate('/login');
        } catch (err) {
            console.error('Signup failed:', err);
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <div className='login'>
            <div className='left'>
                <div className='textlogin'>
                    <span>One of Us?</span>
                    <br />
                    Sign in to continue your Financial journey with SmartCents!
                </div>
                <button className='signup' onClick={() => navigate('/login')}>
                    Sign In
                </button>
                <img src={login2} className='login1' alt='Login Image' />
            </div>

            <div className='right'>
                <img className='logo' src={logo} alt='Logo' />
                <div className='textsignin'>Sign Up</div>
                <form className='formlogin' onSubmit={handleSignup}>
                    <input
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    ></input>
                    <br />
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    ></input>
                    <br />
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    ></input>
                    {error && <div className='error'>{error}</div>}
                    <button type='submit' className='signin'>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;