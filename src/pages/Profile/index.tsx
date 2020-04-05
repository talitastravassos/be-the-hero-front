import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import './styles.scss';

export default function Profile() {
  const [incidents, setIncidents] = useState<Array<any>>([]);

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    axios
      .get('http://localhost:4000/profile/incidents', {
        headers: {
          Authorization: ongId,
        },
      })
      .then((response) => {
        setIncidents(response.data.data);
      });
  }, [ongId]);

  useEffect(() => {
    console.log(incidents);
  }, [incidents]);

  const handleLogout = () => {
    localStorage.clear();

    history.push('/');
  };

  const handleDeleteIncident = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      });

      setIncidents(incidents.filter((incident: any) => incident.id !== id));
    } catch (error) {
      alert('Erro ao deletar caso, tente novamente');
    }
  };

  return (
    <div className='profile-container'>
      <header>
        <img src={logoImg} alt='Be The Hero' />
        <span>Bem vinda, {ongName}</span>

        <Link className='button' to='/incidents/new'>
          Cadastrar novo caso
				</Link>

        <button onClick={handleLogout}>
          <FiPower size={18} color='#E02040' />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map((incident: any) => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </p>

            <button onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color='#a8a8b3' />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
