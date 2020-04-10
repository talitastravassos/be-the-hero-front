import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { initialOng, Ong } from '../../Context/ongs.types';
import { OngsContext } from '../../Context/OngsContext';
import './styles.scss';

export default function Register() {
  const [data, setData] = useState<Ong>(initialOng);

  const {
    action: { register },
  } = React.useContext(OngsContext);

  const history = useHistory();

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    register(data).then((res) => {
      if (res === undefined) {
        history.push('/');
      }
    });
  };

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target;

      setData((prevState) => ({ ...prevState, [name]: value }));
    },
    []
  );

  React.useEffect(() => {
    // console.log(data)
  }, [data])

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

        <form onSubmit={handleRegister}>
          <input
            placeholder='Nome da ONG'
            name='name'
            value={data.name}
            onChange={handleChange}
          />
          <input
            type='email'
            placeholder='E-mail'
            name='email'
            value={data.email}
            onChange={handleChange}
          />
          <input
            placeholder='Whatsapp'
            name='whatsapp'
            value={data.whatsapp}
            onChange={handleChange}
          />
          <div className='input-group'>
            <input
              placeholder='Cidade'
              name='city'
              value={data.city}
              onChange={handleChange}
            />
            <input
              placeholder='UF'
              style={{ width: 80 }}
              name='uf'
              value={data.uf}
              onChange={handleChange}
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
