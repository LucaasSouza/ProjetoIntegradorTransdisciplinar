import AdminLayout from "@/components/AdminLayout";
import { ImagemProduto } from "@/components/Input";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Javascript
import axios from "axios";
import { useRouter } from "next/router";

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

export default function Home({ produtos, feedbacks }) {
    const { push } = useRouter()

    return (
        <AdminLayout>
            <h6 className="m-0 mb-1">Produtos em promoção</h6>
            <div className="d-flex gap-2 w-100" style={{ overflowX: "auto" }}>
                {
                    produtos.filter(p => p.valorPromocional != '0.00' && p.valorPromocional).map(p => (
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

            <h6 className="m-0 mb-1 mt-3">Produtos</h6>
            <div className="d-flex gap-2 w-100" style={{ overflowX: "auto" }}>
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

            <h6 className="m-0 mb-1 mt-3">Localização no mapa</h6>
            <img className="w-100" src="/img/maps.png" alt="Localização no mapa" />

            <h6 className="m-0 mt-3">Comentários</h6>

            <ul className="list-unstyled m-0 d-flex gap-2 w-100" style={{ overflowX: "auto" }}>
                {
                    feedbacks.map((f, i) => (
                        <li key={i} className="bg-light rounded p-2 shadow-sm" style={{ minWidth: 150 }}>
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