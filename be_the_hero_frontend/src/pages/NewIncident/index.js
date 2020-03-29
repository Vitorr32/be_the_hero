import React, { useState } from 'react';

import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styles.scss';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {
    const ngoId = localStorage.getItem('ngoId');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [targetValue, setTargetValue] = useState('');
    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title, description, target_value: targetValue
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ngoId
                }
            })

            history.push('/profile')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero" />

                    <h1>Register new incident</h1>
                    <p>
                        Register a indicent to be sent to the heroes
                        on the platform to help
                    </p>

                    <Link className="navigation-link" to="/profile">
                        <FiArrowLeft size={16} color={'#e02041'} />
                        Return to Profile
                    </Link>

                </section>

                <form onSubmit={handleNewIncident}>
                    <input
                        type="text"
                        placeholder="Title of incident"
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <textarea
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)} />
                    <input
                        type="text"
                        placeholder="Target Value"
                        value={targetValue}
                        onChange={e => setTargetValue(e.target.value)} />

                    <button className="button" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}