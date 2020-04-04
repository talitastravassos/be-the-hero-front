import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';
import './styles.scss';

export default function Login() {
  return (
    <div className='login-container'>
      <section className='form'>
        <img src={logo} alt='Logo be the hero' />

        <form>
          <h1>Faça o seu login</h1>
          <input placeholder='Sua ID' />
          <button className='button' type='submit'>
            Entrar
					</button>

          <a href='/register' className='back-link'>
            <FiLogIn size={16} color='#E02041' />
						Não tenho cadastro
					</a>
        </form>
      </section>
      <img src={heroesImg} alt='Heroes' />
    </div>
  );
}