import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";

function MainLayout() {

    const { logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/");
    };

    return (

        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                <div className="container">

                    <Link
                        className="navbar-brand"
                        to="/products">

                        Prueba Asis

                    </Link>

                    <div className="collapse navbar-collapse">

                        <ul className="navbar-nav me-auto">

                            <li className="nav-item">

                                <Link
                                    className="nav-link"
                                    to="/products">

                                    Productos

                                </Link>

                            </li>

                            <li className="nav-item">

                                <Link
                                    className="nav-link"
                                    to="/categories">

                                    Categorías

                                </Link>

                            </li>

                        </ul>

                        <button
                            className="btn btn-outline-light"
                            onClick={handleLogout}>

                            Cerrar sesión

                        </button>

                    </div>

                </div>

            </nav>

            <div className="container mt-4">

                <Outlet />

            </div>

        </>
    );
}

export default MainLayout;