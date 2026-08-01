import PropTypes from "prop-types";

function DeleteProductModal({
    show,
    product,
    onClose,
    onConfirm
}) {

    if (!show)
        return null;

    return (

        <div
            className="modal d-block"
            style={{
                backgroundColor: "rgba(0,0,0,.5)"
            }}
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">

                            Eliminar producto

                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <div className="modal-body">

                        <p>

                            ¿Está seguro de eliminar el producto?

                        </p>

                        <strong>

                            {product?.productName}

                        </strong>

                    </div>

                    <div className="modal-footer">

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >

                            Cancelar

                        </button>

                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={onConfirm}
                        >

                            Eliminar

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

DeleteProductModal.propTypes = {

    show: PropTypes.bool.isRequired,

    product: PropTypes.object,

    onClose: PropTypes.func.isRequired,

    onConfirm: PropTypes.func.isRequired

};

export default DeleteProductModal;