import { useState } from "react";
import { useNavigate } from "react-router-dom";

import authService from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [form, setForm] = useState({

        username: "",

        password: ""
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            const response = await authService.login(form);

            login(response.token);

            navigate("/products");

        } catch {

            setError("Usuario o contraseña incorrectos.");

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="container">

            <div
                className="row justify-content-center mt-5">

                <div className="col-md-4">

                    <div className="card shadow">

                        <div className="card-body">

                            <h3 className="text-center mb-4">

                                Iniciar sesión

                            </h3>

                            {

                                error &&

                                <div className="alert alert-danger">

                                    {error}

                                </div>

                            }

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label>

                                        Usuario

                                    </label>

                                    <input

                                        type="text"

                                        name="username"

                                        className="form-control"

                                        value={form.username}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <div className="mb-3">

                                    <label>

                                        Contraseña

                                    </label>

                                    <input

                                        type="password"

                                        name="password"

                                        className="form-control"

                                        value={form.password}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >

                                    {

                                        loading

                                            ? "Ingresando..."

                                            : "Ingresar"

                                    }

                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Login;