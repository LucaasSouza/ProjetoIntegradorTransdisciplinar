import NavBar from "./Navbar";
import Footer from "./Footer";

export default function AdminLayout({ children }) {
    return (
        <div className="min-vh-100 position-relative" style={{ background: "#D4A7B0" }}>
            <NavBar />

            <main className="p-2 pb-5">
                { children }
            </main>

            <Footer />
        </div>
    )
}