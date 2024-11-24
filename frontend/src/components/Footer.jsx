import { ActionButton } from "./Input";
import { Dialog, DialogContent } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHouse, faHeart, faCartShopping } from "@fortawesome/free-solid-svg-icons";
// JS
import { useState } from "react";
import { useRouter } from "next/router";


export default function Footer() {
    const { push } = useRouter()
    const [usuario, setDadosUsuario] = useState({})

    return (
        <>
            <Dialog
                fullWidth
                maxWidth="xl"
                onClose={() => setDadosUsuario({})}
                open={Object.keys(usuario).length > 0}
            >
                <DialogContent>
                    <h4 className="m-0">
                        <FontAwesomeIcon icon={faUser} className="me-2" />
                        Dados do usuário
                    </h4>

                    <hr className="my-2" />

                    <p className="m-0">
                        <span className="text-muted">Usuário:</span> {`${usuario.id}. ${usuario.nome} `}
                    </p>

                    <p className="m-0">
                        <span className="text-muted">Email:</span> {usuario.email}
                    </p>

                    <p className="m-0">
                        <span className="text-muted">CPF/CNPJ:</span> {usuario.cpfCnpj}
                    </p>

                    <p className="m-0">
                        <span className="text-muted">N° do telefone:</span> {usuario.numTelefone}
                    </p>

                    <ActionButton
                        label="Sair"
                        className="w-100 mt-3"
                        onClick={() => {
                            localStorage.removeItem("user")
                            setDadosUsuario({})
                            push("/")
                        }}
                    />
                </DialogContent>
            </Dialog>

            <footer className="w-100 position-fixed bottom-0 d-flex justify-content-around align-items-center py-2" style={{ background: "#8C5B65" }}>
                <FontAwesomeIcon size="lg" color="white" icon={faHouse} onClick={() => push("/home")} />
                <FontAwesomeIcon size="lg" color="white" icon={faHeart} />
                <FontAwesomeIcon size="lg" color="white" icon={faCartShopping} />
                <FontAwesomeIcon size="lg" color="white" icon={faUser} onClick={() => setDadosUsuario(JSON.parse(localStorage.getItem("user")))} />
            </footer>
        </>
    )
}