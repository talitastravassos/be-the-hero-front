import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { Incident, initialIncident } from '../../context/ongs.types';
import { OngsContext } from '../../context/OngsContext';
import './styles.scss';

export default function NewIncident() {
  const {
    action: { addIncident },
  } = React.useContext(OngsContext);

  const [incident, setIncident] = useState<Incident>(initialIncident);

  const history = useHistory();

  const handleNewIncident = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addIncident(incident).then((res) => {
      if (res === undefined) {
        history.push('/');
      }
    });
  };

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value, name } = event.target;

      setIncident((prevState) => ({ ...prevState, [name]: value }));
    },
    []
  );

  return (
    <div className='new-incident-container'>
      <div className='content'>
        <section>
          <img src={logoImg} alt='Be The Hero' />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
					</p>

          <Link className='back-link' to='/'>
            <FiArrowLeft size={16} color='#E02041' />
						Voltar para home
					</Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            value={incident.title}
            name='title'
            onChange={handleChange}
            placeholder='Título do caso'
          />
          <textarea
            value={incident.description}
            name='description'
            onChange={handleChange}
            placeholder='Descrição'
          />
          <input
            value={incident.value}
            name='value'
            onChange={handleChange}
            placeholder='Valor em reais'
          />

          <button className='button' type='submit'>
            Cadastrar
					</button>
        </form>
      </div>
    </div>
  );
}
