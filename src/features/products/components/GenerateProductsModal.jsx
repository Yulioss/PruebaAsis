import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { generateProducts } from "../services/productService";

const GenerateProductsModal = ({
    show,
    onClose,
    onGenerated
}) => {

    const [quantity, setQuantity] = useState(100);

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({});

    useEffect(() => {

        if (show) {

            setQuantity(100);

            setErrors({});

        }

    }, [show]);

    const validate = () => {

        const validationErrors = {};

        if (!quantity) {

            validationErrors.quantity =
                "La cantidad es obligatoria.";

        }
        else if (quantity <= 0) {

            validationErrors.quantity =
                "La cantidad debe ser mayor a cero.";

        }
        else if (quantity > 1000) {

            validationErrors.quantity =
                "La cantidad máxima es 1000.";

        }

        return validationErrors;

    };

    const handleGenerate = async (e) => {

        e.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {

            setErrors(validationErrors);

            return;

        }

        try {

            setLoading(true);

            await generateProducts(quantity);

            await onGenerated();

            handleClose();

        }
        catch (error) {

            console.error(error);

        }
        finally {

            setLoading(false);

        }

    };

    const handleClose = () => {

        setQuantity(100);

        setErrors({});

        onClose();

    };

    return (

        <>

            {
                show &&
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{
                        backgroundColor: "rgba(0,0,0,.5)"
                    }}
                >

                    <div className="modal-dialog">

                        <div className="modal-content">

                            <form onSubmit={handleGenerate}>

                                <div className="modal-header">

                                    <h5 className="modal-title">

                                        Generar Productos

                                    </h5>

                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={handleClose}
                                    />

                                </div>

                                <div className="modal-body">

                                    <div className="mb-3">

                                        <label className="form-label">

                                            Cantidad

                                        </label>

                                        <input

                                            type="number"

                                            className={`form-control ${
                                                errors.quantity ? "is-invalid" : ""
                                            }`}

                                            value={quantity}

                                            onChange={(e) => {

                                                setQuantity(Number(e.target.value));

                                                setErrors({});

                                            }}

                                        />

                                        <div className="invalid-feedback">

                                            {errors.quantity}

                                        </div>

                                    </div>

                                    <small className="text-muted">

                                        Se crearán productos aleatorios.

                                    </small>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={handleClose}
                                        disabled={loading}
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        disabled={loading}
                                    >

                                        {
                                            loading
                                                ? "Generando..."
                                                : "Generar"
                                        }

                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>
            }

        </>

    );

};

GenerateProductsModal.propTypes = {

    show: PropTypes.bool.isRequired,

    onClose: PropTypes.func.isRequired,

    onGenerated: PropTypes.func.isRequired

};

export default GenerateProductsModal;