import React from 'react';
import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import './styles.scss';



export default function Profile() {
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, APAE</span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>

        <button>
          <FiPower size={18} color="#E02040" />
        </button>
      </header>
    </div>
  )
}
