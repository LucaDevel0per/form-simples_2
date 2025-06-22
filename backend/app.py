from flask import Flask, request, jsonify
from flask_cors import CORS
import hashlib
import json
import os

app = Flask(__name__)
CORS(app)

usuarios = {}
DB_FILE = 'usuarios.json'

def carregar_usuarios():
    global usuarios
    if os.path.exists(DB_FILE):
        try:
            with open(DB_FILE, 'r', encoding='utf-8') as f:
                usuarios = json.load(f)
        except:
            usuarios = {}

def salvar_usuarios():
    try:
        with open(DB_FILE, 'w', encoding='utf-8') as f:
            json.dump(usuarios, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"Erro ao salvar usuários: {e}")

def hash_senha(senha):
    return hashlib.sha256(senha.encode()).hexdigest()

def verificar_senha(senha, hash_armazenado):
    return hash_senha(senha) == hash_armazenado

carregar_usuarios()

@app.route('/api/cadastro', methods=['POST'])
def cadastro():
    data = request.get_json()
    nome = data.get('nome', '').strip()
    email = data.get('email', '').strip().lower()
    senha = data.get('senha', '')
    
    if not nome or not email or not senha:
        return jsonify({"mensagem": "Todos os campos são obrigatórios"}), 400
    
    if len(senha) < 6:
        return jsonify({"mensagem": "A senha deve ter pelo menos 6 caracteres"}), 400
    
    if '@' not in email:
        return jsonify({"mensagem": "Email inválido"}), 400
    
    if email in usuarios:
        return jsonify({"mensagem": "Este email já está cadastrado"}), 400
    
    usuarios[email] = {
        'nome': nome,
        'senha_hash': hash_senha(senha)
    }
    
    salvar_usuarios()
    
    print(f"Novo usuário cadastrado: {nome} ({email})")
    return jsonify({"mensagem": "Usuário cadastrado com sucesso!"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    nome = data.get('nome', '').strip()
    email = data.get('email', '').strip().lower()
    senha = data.get('senha', '')
    
    if not nome or not email or not senha:
        return jsonify({"mensagem": "Todos os campos são obrigatórios"}), 400
    
    if '@' not in email:
        return jsonify({"mensagem": "Email inválido"}), 400
    
    if email not in usuarios:
        return jsonify({"mensagem": "Usuário não encontrado. Faça o cadastro primeiro."}), 404
    
    usuario = usuarios[email]
    
    if usuario['nome'].lower() != nome.lower():
        return jsonify({"mensagem": "Nome ou email incorretos"}), 401
    
    if not verificar_senha(senha, usuario['senha_hash']):
        return jsonify({"mensagem": "Senha incorreta"}), 401
    
    print(f"Login realizado: {nome} ({email})")
    return jsonify({"mensagem": f"Bem-vindo de volta, {nome}! Login realizado com sucesso."})

@app.route('/api/usuarios', methods=['GET'])
def listar_usuarios():
    usuarios_sem_senha = {}
    for email, dados in usuarios.items():
        usuarios_sem_senha[email] = {
            'nome': dados['nome']
        }
    return jsonify(usuarios_sem_senha)

@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({
        "status": "online",
        "usuarios_cadastrados": len(usuarios),
        "mensagem": "API funcionando corretamente"
    })

if __name__ == '__main__':
    print("Iniciando servidor...")
    print(f"Usuários carregados: {len(usuarios)}")
    app.run(debug=True, host='0.0.0.0', port=5000) 