import React from 'react';
import { useForm } from 'react-hook-form';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { Ong } from '../../context/ongs.types';
import { OngsContext } from '../../context/OngsContext';
import './styles.scss';

export default function Register() {
  const { register, handleSubmit, errors } = useForm();

  const {
    action: { registerOng },
  } = React.useContext(OngsContext);

  const history = useHistory();

  const handleRegister = (data: Ong | any) => {
    registerOng(data).then((res) => {
      if (res === undefined) {
        history.push('/');
      }
    });
  };

  return (
    <div className='register-container'>
      <div className='content'>
        <section>
          <img src={logoImg} alt='Be The Hero' />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
					</p>

          <Link className='back-link' to='/'>
            <FiArrowLeft size={16} color='#E02041' />
						Voltar para o login
					</Link>
        </section>

        <form onSubmit={handleSubmit(handleRegister)}>
          <input
            placeholder='Nome da ONG'
            name='name'
            ref={register({ required: true })}
          />
          <p style={{ color: 'red', marginTop: '10px' }}>
            {errors.name && 'O nome da ONG é obrigatório.'}
          </p>
          <input
            type='email'
            placeholder='E-mail'
            name='email'
            ref={register({ required: true })}
          />
          <p style={{ color: 'red', marginTop: '10px' }}>
            {errors.email && errors.email.message}
          </p>
          <input placeholder='Whatsapp' name='whatsapp' ref={register} />
          <div className='input-group'>
            <input placeholder='Cidade' name='city' ref={register} />
            <input
              placeholder='UF'
              style={{ width: 80 }}
              name='uf'
              ref={register}
            />
          </div>

          <button className='button' type='submit'>
            Cadastrar
					</button>
        </form>
      </div>
    </div>
  );
}
