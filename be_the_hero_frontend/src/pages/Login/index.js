import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.scss';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Login() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('ngoName', response.data.name);
            localStorage.setItem('ngoId', id)

            history.push('/profile');
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Login</h1>

                    <input
                        value={id}
                        onChange={e => setId(e.target.value)}
                        placeholder="Your ID" />
                    <button className="button" type="submit"> Login </button>

                    <Link className="navigation-link" to="/register">
                        <FiLogIn size={16} color={'#e02041'} />
                        Register
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}