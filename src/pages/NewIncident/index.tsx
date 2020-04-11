import numeral from 'numeral';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FiArrowLeft } from 'react-icons/fi';
import { IMaskInput } from 'react-imask';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { Incident } from '../../context/ongs.types';
import { OngsContext } from '../../context/OngsContext';
import './styles.scss';

export default function NewIncident() {
  const { register, handleSubmit, errors } = useForm();

  const {
    action: { addIncident },
  } = React.useContext(OngsContext);

  const history = useHistory();

  const configBlocks = {
    valueInput: {
      mask: Number,
      radix: ",", // fractional delimiter
      scale: 2, // digits after point, 0 for integers
      signed: true, // disallow negative
      thousandsSeparator: ".", // any single char
      padFractionalZeros: true, // if true, then pads zeros at end to the length of scale
      normalizeZeros: true, // appends or removes zeros at ends
      value: "",
      unmask: true // true|false|'typed'
    }
  };

  const toNumber = (value: string): number => {
    return numeral(value.replace(/\./g, '').replace(',', '.')).value()
  }

  const handleNewIncident = (data: Incident | any) => {
    data.value = toNumber(data.value)

    addIncident(data).then((res) => {
      if (res === undefined) {
        history.push('/');
      }
    });
  };

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

        <form onSubmit={handleSubmit(handleNewIncident)}>
          <input
            name='title'
            ref={register({ required: true })}
            placeholder='Título do caso'
          />
          <p style={{ color: 'red', marginTop: '10px' }}>
            {errors.title && 'Por favor insira um titulo ao caso.'}
          </p>
          <textarea
            name='description'
            ref={register({ required: true })}
            placeholder='Descrição'
          />
          <p style={{ color: 'red', marginTop: '10px' }}>
            {errors.description && 'Descreva o ocorrido'}
          </p>
          <IMaskInput
            blocks={configBlocks}
            mask="valueInput"
            name='value'
            inputRef={register({ required: true })}
            placeholder='Valor em reais'
          />
          <p style={{ color: 'red', marginTop: '10px' }}>
            {errors.value && 'Registre um valor em reais.'}
          </p>

          <button className='button' type='submit'>
            Cadastrar
					</button>
        </form>
      </div>
    </div>
  );
}
