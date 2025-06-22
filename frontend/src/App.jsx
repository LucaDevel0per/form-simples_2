import { useState } from 'react';
import axios from 'axios';
import Cadastro from './Cadastro';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login' ou 'cadastro'
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMensagem('');
    setIsSuccess(false);

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        nome,
        email,
        senha
      });

      setMensagem(response.data.mensagem);
      setIsSuccess(true);
      setNome('');
      setEmail('');
      setSenha('');
    } catch (err) {
      console.error("Erro ao enviar:", err);
      setError(err.response?.data?.mensagem || 'Erro ao conectar com o servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleIrParaCadastro = () => {
    setCurrentScreen('cadastro');
    setError('');
    setMensagem('');
    setIsSuccess(false);
  };

  const handleVoltarParaLogin = () => {
    setCurrentScreen('login');
    setError('');
    setMensagem('');
    setIsSuccess(false);
  };

  const isFormValid = nome.trim() && email.trim() && email.includes('@') && senha.trim();

  // Se estiver na tela de cadastro, renderizar o componente Cadastro
  if (currentScreen === 'cadastro') {
    return <Cadastro onVoltarParaLogin={handleVoltarParaLogin} />;
  }

  // Tela de login
  return (
    <div className="app-container">
      <div className="login-card">
        <div className="header">
          <div className="logo">
            <span className="logo-icon">🔐</span>
          </div>
          <h1>Bem-vindo de volta!</h1>
          <p>Faça login para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="nome">Nome</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                id="nome"
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
                className={nome.trim() ? 'has-value' : ''}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                id="email"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={email.trim() ? 'has-value' : ''}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                className={senha.trim() ? 'has-value' : ''}
                disabled={isLoading}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={`submit-btn ${isFormValid ? 'valid' : 'invalid'}`}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <span>Entrando...</span>
              </div>
            ) : (
              <>
                <span className="btn-icon">🚀</span>
                <span>Entrar</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="message error">
            <span className="message-icon">❌</span>
            <span>{error}</span>
          </div>
        )}

        {mensagem && isSuccess && (
          <div className="message success">
            <span className="message-icon">✅</span>
            <span>{mensagem}</span>
          </div>
        )}

        <div className="footer">
          <p>Não tem uma conta? <button onClick={handleIrParaCadastro} className="link-btn">Cadastre-se</button></p>
        </div>
      </div>
    </div>
  );
}

export default App;
