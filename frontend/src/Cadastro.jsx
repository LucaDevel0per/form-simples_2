import { useState } from 'react';
import axios from 'axios';
import './App.css';

function Cadastro({ onVoltarParaLogin }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setIsSuccess(false);

    // Validação das senhas
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem');
      setIsLoading(false);
      return;
    }

    if (senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/cadastro', {
        nome,
        email,
        senha
      });

      setIsSuccess(true);
      setNome('');
      setEmail('');
      setSenha('');
      setConfirmarSenha('');
      
      // Redirecionar para login após 2 segundos
      setTimeout(() => {
        onVoltarParaLogin();
      }, 2000);
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      setError(err.response?.data?.mensagem || 'Erro ao cadastrar usuário');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = nome.trim() && email.trim() && email.includes('@') && 
                     senha.length >= 6 && senha === confirmarSenha;

  return (
    <div className="app-container">
      <div className="login-card">
        <div className="header">
          <div className="logo">
            <span className="logo-icon">📝</span>
          </div>
          <h1>Criar Conta</h1>
          <p>Preencha os dados para se cadastrar</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="nome">Nome Completo</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                id="nome"
                type="text"
                placeholder="Digite seu nome completo"
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
                placeholder="Digite sua senha (mín. 6 caracteres)"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                className={senha.length >= 6 ? 'has-value' : ''}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <div className="input-wrapper">
              <span className="input-icon">🔐</span>
              <input
                id="confirmarSenha"
                type="password"
                placeholder="Confirme sua senha"
                value={confirmarSenha}
                onChange={e => setConfirmarSenha(e.target.value)}
                className={confirmarSenha === senha && senha.length >= 6 ? 'has-value' : ''}
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
                <span>Cadastrando...</span>
              </div>
            ) : (
              <>
                <span className="btn-icon">✨</span>
                <span>Criar Conta</span>
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

        {isSuccess && (
          <div className="message success">
            <span className="message-icon">✅</span>
            <span>Cadastro realizado com sucesso! Redirecionando...</span>
          </div>
        )}

        <div className="footer">
          <p>Já tem uma conta? <button onClick={onVoltarParaLogin} className="link-btn">Fazer Login</button></p>
        </div>
      </div>
    </div>
  );
}

export default Cadastro; 