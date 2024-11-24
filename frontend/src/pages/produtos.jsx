import AdminLayout from "@/components/AdminLayout";
import { Context_data } from "@/context/context";
// Javascript
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export async function getServerSideProps() {
    const produtos = await axios.get(process.env.FRONTEND + "produtos/")

    return {
        props: {
            produtos: produtos.data
        }
    }
}

export default function Produtos({ produtos }) {
    const { push } = useRouter()
    const { pesquisa } = useContext(Context_data)
    const [listaProdutos, setListaProdutos] = useState(produtos)

    useEffect(() => {
        setListaProdutos(produtos.filter(p => p.nome.toLowerCase().includes(pesquisa.toLowerCase())))
    }, [pesquisa])

    const BRLFormat = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })

    return (
        <AdminLayout>
            {
                listaProdutos.map(p => (
                    <div
                        key={p.codigo}
                        className="d-flex gap-2 w-100 mb-2 bg-light p-2 rounded shadow-sm"
                        // style={{ overflowX: "auto" }}
                        onClick={() => push("/produto/" + p.codigo)}
                    >
                        <img
                            alt={p.nome}
                            className="rounded"
                            src="/img/produto.png"
                            style={{ width: 65 }}
                        />

                        <section
                            style={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis"
                            }}
                        >
                            <p className="m-0 fw-bold">{p.nome}</p>
                            <p
                                className="text-nowrap m-0"
                                style={{
                                    fontSize: 9,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                }}
                            >
                                { p.descricao }
                            </p>

                            <section className="w-100 d-flex align-items-end gap-1 mt-2">
                                {
                                    (p.valorPromocional != '0.00' && p.valorPromocional) && 
                                    <p className="m-0 fw-bold text-success">
                                        { BRLFormat.format(p.valorPromocional) }
                                    </p>
                                }

                                <p
                                    style={{
                                        fontSize: (p.valorPromocional != '0.00' && p.valorPromocional) ? 10 : 14,
                                        marginBottom: (p.valorPromocional != '0.00' && p.valorPromocional) ? 3 : 0,
                                    }}
                                    className={`fw-bold ${(p.valorPromocional != '0.00' && p.valorPromocional) ? "text-danger text-decoration-line-through mt-0 mx-0" : "text-success m-0"}`}
                                >
                                    { BRLFormat.format(p.preco) }
                                </p>
                            </section>
                        </section>
                    </div>
                ))
            }
        </AdminLayout>
    )
}