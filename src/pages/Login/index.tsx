import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';
import { OngsContext } from '../../context/OngsContext';
import './styles.scss';

export default function Login() {
  const { register, handleSubmit, errors } = useForm();
  const {
    action: { login },
  } = React.useContext(OngsContext); // context api

  const [id, setId] = useState('bf8a6086ac');
  const history = useHistory();

  const handleLogin = (data: any) => {
    setId(data.id)

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

        <form onSubmit={handleSubmit(handleLogin)}>
          <h1>Faça o seu login</h1>
          <input
            placeholder='Sua ID'
            value={id}
            name='id'
            ref={register({ required: true })}
            onChange={(e) => setId(e.target.value)}
          />
          <p style={{ color: 'red', marginTop: '10px' }}>
            {errors.id && 'Por favor insira um ID.'}
          </p>
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
