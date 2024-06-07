import React from "react";
import { Navigate } from "react-router-dom";

class Login extends React.Component {
    state = {
        email: "",
        senha: "",
        btnDisable: true,
        navigate: false
    };

    // Função para validar o formato do e-mail
    emailValido = (email) => {
        const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
        return emailRegex.test(email);
    }

   // Função para lidar com mudanças nos inputs
    onInputChange = (event) => {
        const { target } = event;
        const { value, name } = target;
        this.setState(
            (prevState) => {
                const newState = { ...prevState, [name]: value };
                const isFormValid = this.emailValido(newState.email) && newState.senha.length > 5;
                return { ...newState, btnDisable: !isFormValid };
            }
        );
    };

    // Função para lidar com o clique do botão
    btn = () => {
        this.setState({ navigate: true });
    };

    render () {
        const { email, senha, btnDisable, navigate } = this.state;
        if (navigate) {
            return <Navigate to="/financas" />;
        }
        return (
            <div>
                <label htmlFor="email">Email: </label>
                <input
                    id="email-input"
                    data-testid="login-email-input"
                    type="text"
                    name="email"
                    value={email}
                    onChange={this.onInputChange}
                />
                <label htmlFor="senha">Senha: </label>
                <input
                    id="senha-input"
                    data-testid="login-senha-input"
                    type="text"
                    name="senha"
                    value={senha}
                    onChange={this.onInputChange}
                />
                <br />
                <button
                    id="btnLogin"
                    data-testid="login-btn"
                    disabled={btnDisable}
                    onClick={this.btn}
                >
                    Entrar
                </button>
            </div>
        );
    }
}

export default Login;