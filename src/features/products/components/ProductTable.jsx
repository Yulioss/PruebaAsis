import PropTypes from "prop-types";

function ProductTable({
    products,
    onEdit,
    onDelete
}) {

    if (products.length === 0) {
        return (
            <div className="alert alert-info">
                No se encontraron productos.
            </div>
        );
    }

    return (

        <div className="table-responsive">

            <table className="table table-striped table-hover align-middle">

                <thead className="table-dark">

                    <tr>

                        <th>#</th>

                        <th>Nombre</th>

                        <th>Categoría</th>

                        <th>Proveedor</th>

                        <th className="text-end">Precio</th>

                        <th className="text-end">Cantidad Unidad</th>

                        <th className="text-center">Stock</th>

                        <th className="text-center">Estado</th>

                        <th className="text-center">Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        products.map(product => (

                            <tr key={product.productId}>

                                <td>{product.productId}</td>

                                <td>{product.productName}</td>

                                <td>{product.categoryName}</td>

                                <td>{product.supplierName}</td>

                                <td className="text-end">

                                    ${Number(product.unitPrice).toFixed(2)}

                                </td>

                                <td>{product.quantityPerUnit}</td>

                                <td className="text-center">

                                    {product.unitsInStock}

                                </td>

                                <td className="text-center">

                                    {
                                        product.discontinued
                                            ? (
                                                <span className="badge bg-danger">
                                                    Inactivo
                                                </span>
                                            )
                                            : (
                                                <span className="badge bg-success">
                                                    Activo
                                                </span>
                                            )
                                    }

                                </td>

                                <td className="text-center">

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => onEdit(product)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => onDelete(product)}
                                    >
                                        Eliminar
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );

}

ProductTable.propTypes = {
    products: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default ProductTable;