import AdminLayout from "@/components/AdminLayout";
import { ActionButton, ImagemProduto } from "@/components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
// Javascript
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const BRLFormat = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })

export async function getServerSideProps() {
    const produtos = await axios.get(process.env.FRONTEND + "produtos/")
    const feedbacks = [
        { nome: "João", comentario: "Ótimo produto!" },
        { nome: "Maria", comentario: "Bom produto!" },
        { nome: "Pedro", comentario: "Muito bom!" },
        { nome: "Ana", comentario: "Excelente!" },
        { nome: "Anônimo", comentario: "Legal!"}
    ]

    return {
        props: {
            produtos: produtos.data,
            feedbacks
        }
    }
}

export default function Produto({ produtos, feedbacks }) {
    const router = useRouter()
    const [dadosProduto, setDadosProduto] = useState({})

    useEffect(() => {
        const { id } = router.query

        const getProduto = async () => {
            await axios.get(process.env.FRONTEND + "produtos/?codigo=" + id)
            .then(response => setDadosProduto(response.data[0]))
        }

        if(id)
            getProduto()
    }, [])

    return (
        <AdminLayout>
            <div className="bg-light p-2 rounded shadow-sm mb-2">
                <img src="/img/produto.png" alt="Imagem do produto" className="w-100" />
                <div className="d-flex justify-content-between">
                    <section>
                        <p className="m-0 fw-bold">{ dadosProduto.nome }</p>
                        <p className="m-0 text-muted" style={{ fontSize: 12 }}>{ dadosProduto.descricao }</p>
                    </section>

                    <h4 className="m-0 text-success">{ BRLFormat.format(dadosProduto.preco) }</h4>
                </div>
            </div>

            <ActionButton
                className="w-100"
                label="Adicionar ao carrinho"
                onClick={() => console.log(dadosProduto)}
            />

            <div className="d-flex gap-2 w-100 mt-2" style={{ overflowX: "auto" }}>
                {
                    produtos.map(p => (
                        <ImagemProduto
                            key={p.codigo}
                            nome={p.nome}
                            preco={p.preco}
                            precoPromocional={p.valorPromocional}
                            descricao={p.descricao}
                        />
                    ))
                }
            </div>

            <h6 className="m-0 mt-3">Comentários</h6>

            <ul className="list-unstyled m-0" style={{ maxHeight: 180, overflowY: "auto" }}>
                {
                    feedbacks.map((f, i) => (
                        <li key={i} className="bg-light rounded p-2 shadow-sm mb-2" style={{ minWidth: 150 }}>
                            <section className="d-flex align-items-center gap-2">
                                <FontAwesomeIcon icon={faUser} className="rounded-circle bg-dark p-2" color="white" size="xs" />
                                { f.nome }
                            </section>

                            <p className="m-0 p-0" style={{ fontSize: 12 }}>
                                { f.comentario }
                            </p>
                        </li>
                    ))
                }
            </ul>
        </AdminLayout>
    )
}