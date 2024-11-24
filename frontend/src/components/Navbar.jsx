import axios from "axios";
import Input from "./Input";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { Context_data } from "@/context/context";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function NavBar() {
    const { asPath, push } = useRouter()
    const { pesquisa, setPesquisa } = useContext(Context_data)

    return (
        <nav
            className="p-2 d-flex justify-content-between align-items-center gap-2"
            style={{ backgroundColor: "#6B4950", borderRadius: "0 0 10% 10%" }}
        >
            <img alt="Logo" src="/img/logo.png" style={{ width: 55, height: 55 }} />

            <section className="w-100">
                <Input
                    value={pesquisa}
                    label="Pesquisar"
                    className="w-100"
                    onChange={e => setPesquisa(e.target.value)}
                    adornment={{ position: "end", label: <FontAwesomeIcon icon={faSearch} /> }}
                    onKeyDown={async (e) => {
                        if(e.key == "Enter")
                            push("/produtos")
                    }}
                />

                <ul className="list-unstyled m-0 mt-1 d-flex justify-content-between gap-2">
                    <li className="rounded-pill w-100 text-center" style={{ fontSize: 11, color: "#665256", backgroundColor: "#FFCFD9" }}>
                        CupCakes
                    </li>
                    <li className="rounded-pill w-100 text-center" style={{ fontSize: 11, color: "#665256", backgroundColor: "#FFCFD9" }}>
                        Bolos
                    </li>
                    <li className="rounded-pill w-100 text-center" style={{ fontSize: 11, color: "#665256", backgroundColor: "#FFCFD9" }}>
                        Sorvetes
                    </li>
                </ul>
            </section>
        </nav>
    )
}