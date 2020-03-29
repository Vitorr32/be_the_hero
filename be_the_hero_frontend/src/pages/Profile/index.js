import React, { useState, useEffect } from 'react';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import './styles.scss';
import api from '../../services/api';

export default function Profile() {
    const ngoName = localStorage.getItem('ngoName');
    const ngoId = localStorage.getItem('ngoId');

    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ngoId
            }
        })
            .then(response => setIncidents(response.data))
            .catch(err => console.log(err));
    }, [ngoId]);

    async function handleDeleteIndicent(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Auhtorization: ngoId
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            console.log(err);
        }
    }

    function handleLogout() {
        localStorage.removeItem('ngoId');
        localStorage.removeItem('ngoName')

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Welcome, {ngoName} </span>

                <Link className="button" to="/incidents/new">
                    Register new Incident
                </Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E020414" />
                </button>
            </header>

            <h1>Registered incidents</h1>

            <ul>
                {
                    incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>Caso:</strong>
                            <p>{incident.title}</p>

                            <strong>Descrição</strong>
                            <p>{incident.description}</p>

                            <strong>Valor:</strong>
                            <p>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(incident.target_value)}</p>

                            <button onClick={() => handleDeleteIndicent(incident.id)} type="button">
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>

    );
}