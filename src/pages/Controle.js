import React, { Component } from "react";

class Controle extends Component {
    state = {
        quantidade1: "0,00",
        quantidade2: "0,00",
        total: "0,00",
    };

    handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        this.setState({ [name]: type === "checkbox" ? checked : value });
    };

    handleRadioChange = (event) => {
        const { value } = event.target;
        this.setState({ 
            entrada: value === "entrada",
            saida: value === "saida"
         });
    }

    handleAddClick = (event) => {
        event.preventDefault();
        this.setState((prevState) => {
            let valorAtualizado =  prevState.valor.trim() ? prevState.valor : "0,00"
            if (prevState.saida) {
                valorAtualizado = prevState.valor.trim() ? - prevState.valor : "0,00"
            }
            return {
                quantidade1: valorAtualizado,
                valor: "",
            }
        });
    };

    render() {
        const { descricao, valor, quantidade1 } = this.state;
        return (
            <div className="controle-page">
                <div className="tabela-total">
                    <h1>Controle de Finanças</h1>
                    <label className="entrada">Entradas</label>
                    <h2 
                        name="quantidade1" 
                        value={quantidade1}
                    >
                        {quantidade1}
                    </h2>
                    <label className="saidas">Saídas</label>
                    <h2>Quantidade 2</h2>
                    <label className="total">Total</label>
                    <h2>Total</h2>
                </div>
                <form>
                    <label htmlFor="descricao">Descrição</label>
                    <input
                        id="descricao"
                        type="text"
                        name="descricao"
                        value={descricao}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="valor">Valor</label>
                    <input
                        id="valor"
                        type="text"
                        name="valor"
                        value={valor}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="entrada">Entrada</label>
                    <input
                        id="entrada"
                        type="radio"
                        name="input"
                        value="entrada"
                        onChange={this.handleRadioChange}
                    />
                    <label htmlFor="saida">Saída</label>
                    <input
                        id="saida"
                        type="radio"
                        name="input"
                        value="saida"
                        onChange={this.handleRadioChange}
                    />
                    <button
                        id="btn-adicionar"
                        name="btn-adicionar"
                        onClick={this.handleAddClick}
                    >
                        Adicionar
                    </button>
                </form>
            </div>
        );
    }
}

export default Controle;
