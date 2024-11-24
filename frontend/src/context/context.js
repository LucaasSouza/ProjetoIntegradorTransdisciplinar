import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const Context_data = createContext();

export default function Context({ children }) {
    // const { asPath } = useRouter()
    const [pesquisa, setPesquisa] = useState('')

    return (
        <Context_data.Provider value={{ pesquisa, setPesquisa }}>
            { children }
        </Context_data.Provider>
    )
}