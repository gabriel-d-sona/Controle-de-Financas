import React, { Component } from "react";

class Controle extends Component {
    state = {
        descricao: "",
        valor: "",
        quantidade1: "0,00",
        quantidade2: "0,00",
        total: "0,00",
        entrada: false,
        saida: false,
        arr: [],
    };

    componentDidMount() {
        const storedArr = localStorage.getItem("meuArr");
        if (storedArr) {
            this.setState({ arr: JSON.parse(storedArr) });
        }
    }

    handleAddClick = (event) => {
        event.preventDefault();
        this.setState((prevState) => {
            const { descricao, valor, entrada, saida } = prevState;
            const novoItem = {
                descricao,
                valor: saida ? `-${valor}` : valor,
                tipo: entrada ? "entrada" : "saida",
            };
            const arr = [...prevState.arr, novoItem];
            localStorage.setItem("meuArr", JSON.stringify(arr));
            return {
                arr,
                descricao: "",
                valor: "",
                entrada: false,
                saida: false,
            };
        });
    };

    handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        this.setState({ [name]: type === "checkbox" ? checked : value });
    };

    handleRadioChange = (event) => {
        const { value } = event.target;
        this.setState({
            entrada: value === "entrada",
            saida: value === "saida",
        });
    };

    render() {
        const { descricao, valor, quantidade1, arr } = this.state;
        return (
            <div className="controle-page">
                <div className="tabela-total">
                    <h1>Controle de Finanças</h1>
                    <label className="entrada">Entradas</label>
                    <h2 name="quantidade1" value={quantidade1}>
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
                        checked={this.state.entrada}
                    />
                    <label htmlFor="saida">Saída</label>
                    <input
                        id="saida"
                        type="radio"
                        name="input"
                        value="saida"
                        onChange={this.handleRadioChange}
                        checked={this.state.saida}
                    />
                    <button
                        id="btn-adicionar"
                        name="btn-adicionar"
                        onClick={this.handleAddClick}
                    >
                        Adicionar
                    </button>
                </form>
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th>Tipo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {arr.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.descricao}</td>
                                    <td>{item.valor}</td>
                                    <td>{item.tipo}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                const newArr = arr.filter((_, i) => i !== index);
                                                this.setState({ arr: newArr });
                                                localStorage.setItem("meuArr", JSON.stringify(newArr));
                                            }}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Controle;
