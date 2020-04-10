import React, { useEffect } from 'react';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { Incident } from '../../Context/ongs.types';
import { OngsContext } from '../../Context/OngsContext';
import './styles.scss';

export default function Profile() {
  const {
    action: { getIncidentsByONG, deleteIncident, logout },
    state: { currentOng, incidents },
  } = React.useContext(OngsContext);

  const history = useHistory();

  useEffect(() => {
    getIncidentsByONG();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(incidents);
  }, [incidents]);

  const handleLogout = async () => {
    await logout();
    history.push('/login');
  };

  const handleDeleteIncident = (id: number) => {
    deleteIncident(id).then((res) => {
      if (res === undefined) {
        getIncidentsByONG();
      }
    });
  };

  return (
    <div className='profile-container'>
      <header>
        <img src={logoImg} alt='Be The Hero' />
        <span>Bem vinda, {currentOng.name}</span>

        <Link className='button' to='/incidents/new'>
          Cadastrar novo caso
				</Link>

        <button onClick={handleLogout}>
          <FiPower size={18} color='#E02040' />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map((incident: Incident, index) => (
          <li key={index}>
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

            <button onClick={() => handleDeleteIncident(Number(incident.id))}>
              <FiTrash2 size={20} color='#a8a8b3' />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
