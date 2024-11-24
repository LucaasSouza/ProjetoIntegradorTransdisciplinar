// Components
import Input, { ActionButton } from "@/components/Input";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// JS Imports
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const { push } = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', senha: '' })

  async function Login() {
    if(formData.email == '' || formData.senha == '')
      return alert("Preencha todos os campos obrigatórios!*")

    await axios.get(process.env.FRONTEND + "usuarios/?email=" + formData.email + "&senha=" + formData.senha)
    .then(res => {
      if(res.data.length > 0) {
        localStorage.setItem("user", JSON.stringify(res.data[0]))
        push("/home")
      } else {
        alert("Email ou senha inválidos!")
      }
    })
    .catch(err => {
      alert("Ocorreu um erro ao realizar o login!")
    })
  }

  return (
    <div className="min-vh-100 position-relative" style={{ background: "#FFCFD9" }}>
      <section
        className="w-100 position-absolute bottom-0"
        style={{ borderRadius: "10% 10% 0 0", height: "85%", background: "#8C5B65" }}
      >
        <div className="position-absolute" style={{ top: -70, left: "50%", transform: "translateX(-50%)" }}>
          <img
            alt="Logo cupcake"
            src="/img/logo.png"
            className="bg-light rounded-circle px-3 pb-1"
            style={{ width: 140, height: 135 }}
          />

          <h4 className="m-0 mt-1 text-center text-light">CupCapp</h4>
          <p className="m-0 text-center text-light" style={{ fontSize: 14 }}>Vida doce</p>
        </div>

        <main className="h-100 d-flex flex-column align-items-center justify-content-center">
          <div className="mt-2" style={{ width: "85%" }}>
            <Input
              className="w-100 mb-3"
              value={formData.email}
              label="Digite aqui seu email"
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />

            <Input
              className="w-100"
              value={formData.senha}
              label="Digite aqui sua senha"
              type={showPassword ? "text" : "password"}
              onChange={e => setFormData({ ...formData, senha: e.target.value })}
              adornment={{ position: "end", label: <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={() => setShowPassword(!showPassword)} /> }}
            />

            <p className="m-0 text-end text-light mt-1" style={{ fontSize: 12, fontStyle: "italic" }}>Esqueceu sua senha?</p>

            <ActionButton
              label="Entrar"
              onClick={Login}
              style={{ backgroundColor: "#6B4950" }}
              className="w-100 text-center mt-5 mb-2"
            />

            <p className="m-0 text-center text-light" style={{ fontSize: 14, cursor: "pointer" }}>
              <span className="border-bottom" onClick={() => push("/cadastro")}>Cadastre-se</span>
            </p>

            <section className="d-flex justify-content-center gap-3 mt-4">
              <FontAwesomeIcon icon={faGoogle} className="p-2 rounded-circle" size="xl" color="#D4A7B0" />
              <FontAwesomeIcon icon={faFacebook} className="p-2 rounded-circle" size="xl" color="#D4A7B0" />
            </section>
          </div>

          <footer className="position-absolute bottom-0 mb-1 text-center text-light" style={{ fontSize: 12 }}>
            Desenvolvido por Lucas Souza | 2024
          </footer>
        </main>
      </section>
    </div>
  )
}