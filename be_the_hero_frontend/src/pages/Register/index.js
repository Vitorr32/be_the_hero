import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.scss';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name, email, contact, city, state, country
        }

        try {
            const response = await api.post('ngos', data);
            console.log(response.data.id);

            history.push('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero" />

                    <h1>Register</h1>
                    <p>
                        Register your NGO and enter the platform
                        to allow people to help in your incidents
                    </p>

                    <Link className="navigation-link" to="/">
                        <FiArrowLeft size={16} color={'#e02041'} />
                        Return to Login
                    </Link>

                </section>

                <form onSubmit={handleRegister}>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        type="text"
                        placeholder="Name of NGO" />

                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email for contact" />

                    <input
                        value={contact}
                        onChange={e => setContact(e.target.value)}
                        type="text"
                        placeholder="Number of Contact" />

                    <input
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        type="text"
                        placeholder="Country" />

                    <div className="input-group">
                        <input
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            type="text"
                            placeholder="City" />

                        <input
                            value={state}
                            onChange={e => setState(e.target.value)}
                            type="text"
                            placeholder="State" />
                    </div>

                    <button className="button" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}