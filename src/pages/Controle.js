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
            const arr = JSON.parse(storedArr);
            this.setState({ arr }, this.updateQuantities);
        }
    }

// Atualiza as quantidades
    updateQuantities = () => {
        const { arr } = this.state;
        let quantidade1 = 0;
        let quantidade2 = 0;

        arr.forEach(item => {
            if (item.tipo === "entrada") {
                quantidade1 += parseFloat(item.valor.replace(",", "."));
            } else if (item.tipo === "saida") {
                quantidade2 += parseFloat(item.valor.replace(",", "."));
            }
        });

        this.setState({
            quantidade1: quantidade1.toFixed(2).replace(".", ","),
            quantidade2: quantidade2.toFixed(2).replace(".", ","),
            total: (quantidade1 + quantidade2).toFixed(2).replace(".", ",")
        });
    }

//click do botao
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
        }, this.updateQuantities);
    };

//da valor e diferencia texto de checkbox
    handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        this.setState({ [name]: type === "checkbox" ? checked : value });
    };

//diferencia as checkbox
    handleRadioChange = (event) => {
        const { value } = event.target;
        this.setState({
            entrada: value === "entrada",
            saida: value === "saida",
        });
    };

    render() {
        const { descricao, valor, quantidade1, quantidade2, total, arr } = this.state;
        return (
            <div className="controle-page">
                <div className="tabela-total">
                    <h1>Controle de Finanças</h1>
                    <label className="entrada">Entradas</label>
                    <h2 name="quantidade1" value={quantidade1}>
                        {quantidade1}
                    </h2>
                    <label className="saidas">Saídas</label>
                    <h2>{quantidade2}</h2>
                    <label className="total">Total</label>
                    <h2>{total}</h2>
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
                                                this.setState({ arr: newArr }, this.updateQuantities);
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
