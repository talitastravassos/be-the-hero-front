import React, { FormEvent, useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';
import { OngsContext } from '../../Context/OngsContext';
import './styles.scss';

export default function Login() {
  const {
    action: { login },
  } = React.useContext(OngsContext); // context api

  const [id, setId] = useState('bf8a6086ac');
  const history = useHistory();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login(id).then(res => {
      if (res === undefined) {
        history.push('/');
      }
    })
  };

  return (
    <div className='login-container'>
      <section className='form'>
        <img src={logo} alt='Logo be the hero' />

        <form onSubmit={handleLogin}>
          <h1>Faça o seu login</h1>
          <input
            placeholder='Sua ID'
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className='button' type='submit'>
            Entrar
					</button>

          <Link to='/register' className='back-link'>
            <FiLogIn size={16} color='#E02041' />
						Não tenho cadastro
					</Link>
        </form>
      </section>
      <img src={heroesImg} alt='Heroes' />
    </div>
  );
}
