// Componentes
import Input, { ActionButton } from "@/components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// Javascript
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Cadastro() {
    const { push } = useRouter()

    const [showPassword, setShowPassword] = useState({ senha: false, confirmeSenha: false }) // Mostra ou esconde a senha
    const [formData, setFormData] = useState({
        nome: '', numTelefone: '', email: '', senha: '', cpfCnpj: '', confirmeSenha: '',
        numCasa: '', rua: '', bairro: '', cidade: '', cep: '', estado: '',
        complemento: ''
    })

    async function EnviarCadastro() {
        if(formData.nome == '' || formData.email == '' || formData.senha == '' || formData.confirmeSenha == '' || formData.cpfCnpj == '')
            return alert("Preencha todos os campos obrigatórios!*")

        // await axios.post(process.env.BACKEND + "usuarios/", formData)
        await axios.post(process.env.FRONTEND + "usuarios/", {
            nome: formData.nome,
            email: formData.email,
            senha: formData.senha,
            cpfCnpj: formData.cpfCnpj,
            numTelefone: formData.numTelefone,
            tipoUsuario: 'C' 
        })
        .then(res => {
            alert("Usuário cadastrado com sucesso!")
            push("/")
        })
        .catch(err => {
            alert("Ocorreu um erro ao cadastrar o usuário!")
        })
    }

    return (
        <div className="min-vh-100 position-relative" style={{ background: "#FFCFD9" }}>
            <section
                className="w-100 position-absolute top-0 p-3"
                style={{ borderRadius: "0 0 10% 10%", height: "90%", background: "#8C5B65" }}
            >
                <div className="d-flex gap-2 mb-2">
                    <section
                        style={{ width: 100, height: 80 }}
                        className="bg-light p-3 rounded-circle d-flex align-items-center justify-content-center"
                    >
                        <FontAwesomeIcon icon={faUser} size="3x" color="gray" />
                    </section>

                    <section className="w-100">
                        <Input
                            required
                            className="w-100 mb-2"
                            value={formData.nome}
                            label="Digite aqui seu nome"
                            onChange={e => setFormData({ ...formData, nome: e.target.value })}
                        />

                        <Input
                            className="w-100"
                            value={formData.numTelefone}
                            label="Digite aqui seu n° do telefone"
                            onChange={e => setFormData({ ...formData, numTelefone: e.target.value })}
                        />
                    </section>
                </div>

                <Input
                    required
                    label="CPF ou CNPJ"
                    className="w-100 mb-2"
                    value={formData.cpfCnpj}
                    onChange={e => setFormData({ ...formData, cpfCnpj: e.target.value })}
                    onBlur={() => {
                        if(formData.cpfCnpj !== '' && (formData.cpfCnpj.length != 11 && formData.cpfCnpj.length != 14)) {
                            alert("CPF ou CNPJ inválido")
                            setFormData({ ...formData, cpfCnpj: '' })
                        }
                    }}
                />

                <Input
                    required
                    className="w-100 mb-2"
                    value={formData.email}
                    label="Digite aqui seu email"
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                />

                <div className="d-flex gap-2 mb-2">
                    <Input
                        required
                        label="Senha"
                        className="w-100"
                        value={formData.senha}
                        type={showPassword.senha ? "text" : "password"}
                        onChange={e => setFormData({ ...formData, senha: e.target.value })}
                        adornment={{ position: "end", label: <FontAwesomeIcon icon={showPassword.senha ? faEyeSlash : faEye} onClick={() => setShowPassword({ ...showPassword, senha: !showPassword.senha })} /> }}
                    />

                    <Input
                        required
                        className="w-100"
                        label="Confirme a senha"
                        value={formData.confirmeSenha}
                        type={showPassword.confirmeSenha ? "text" : "password"}
                        onChange={e => setFormData({ ...formData, confirmeSenha: e.target.value })}
                        adornment={{ position: "end", label: <FontAwesomeIcon icon={showPassword.confirmeSenha ? faEyeSlash : faEye} onClick={() => setShowPassword({ ...showPassword, confirmeSenha: !showPassword.confirmeSenha })} /> }}
                        onBlur={() => {
                            if(formData.senha != formData.confirmeSenha) {
                                alert("As senhas não coincidem")
                                setFormData({ ...formData, confirmeSenha: '' })
                            }
                        }}
                    />
                </div>

                <h6 className="m-0 text-white text-center mt-3 mb-2">Endereço</h6>

                <div className="d-flex gap-2 mb-2">
                    <Input
                        type="number"
                        className="w-100"
                        label="CEP"
                        value={formData.cep}
                        onChange={e => setFormData({ ...formData, cep: e.target.value })}
                        onBlur={async () => {
                            if(formData.cep.length === 8) {
                                await axios.get(`https://viacep.com.br/ws/${formData.cep}/json/`)
                                .then(res => {
                                    if(!res.data.hasOwnProperty("erro")) {
                                        setFormData({
                                            ...formData,
                                            rua: res.data.logradouro,
                                            bairro: res.data.bairro,
                                            cidade: res.data.localidade,
                                            estado: res.data.uf,
                                            complemento: res.data.complemento
                                        })
                                    }
                                })
                                .catch(err => {
                                    alert("Erro ao buscar CEP")
                                })
                            }
                        }}
                    />

                    <Input
                        type="number"
                        className="w-100"
                        label="N° da casa"
                        value={formData.numCasa}
                        onChange={e => setFormData({ ...formData, numCasa: e.target.value })}
                    />
                </div>

                <div className="d-flex gap-2 mb-2">
                    <Input
                        label="Rua"
                        className="w-100"
                        value={formData.rua}
                        onChange={e => setFormData({ ...formData, rua: e.target.value })}
                    />

                    <Input
                        label="Bairro"
                        className="w-100"
                        value={formData.bairro}
                        onChange={e => setFormData({ ...formData, bairro: e.target.value })}
                    />
                </div>

                <div className="d-flex gap-2 mb-2">
                    <Input
                        label="Cidade"
                        className="w-100"
                        value={formData.cidade}
                        onChange={e => setFormData({ ...formData, cidade: e.target.value })}
                    />

                    <Input
                        label="Estado"
                        className="w-100"
                        value={formData.estado}
                        onChange={e => setFormData({ ...formData, estado: e.target.value })}
                    />
                </div>

                <Input
                    label="Complemento"
                    className="w-100"
                    value={formData.complemento}
                    onChange={e => setFormData({ ...formData, complemento: e.target.value })}
                />

                <ActionButton
                    label="Enviar cadastro"
                    onClick={EnviarCadastro}
                    style={{ backgroundColor: "#6B4950" }}
                    className="w-100 text-center mt-4"
                />

                <p className="m-0 text-center text-light mt-1" style={{ fontSize: 12, cursor: "pointer" }}>
                    <span className="border-bottom" onClick={() => push("/")}>Voltar</span>
                </p>
            </section>
        </div>
    )
}