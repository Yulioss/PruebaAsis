import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
    createProduct,
    updateProduct
} from "../services/productService";

function ProductModal({
    show,
    product,
    categories,
    suppliers,
    onClose,
    onSaved
}) {

    const [saving, setSaving] = useState(false);

    const initialState = {

        productName: "",

        categoryId: "",

        supplierId: "",

        quantityPerUnit: "",

        unitPrice: 0,

        unitsInStock: 0,

        unitsOnOrder: 0,

        reorderLevel: 0,

        discontinued: false

    };

    const [form, setForm] = useState(initialState);

    const [errors, setErrors] = useState({});

    const validate = () => {

    const validationErrors = {};

    if (!form.productName.trim()) {

        validationErrors.productName =
            "El nombre es obligatorio.";

    }
    else if (form.productName.length > 40) {

        validationErrors.productName =
            "El nombre no puede superar los 40 caracteres.";

    }

    if (!form.categoryId) {

        validationErrors.categoryId =
            "Seleccione una categoría.";

    }

    if (!form.supplierId) {

        validationErrors.supplierId =
            "Seleccione un proveedor.";

    }

    if (form.unitPrice === "" || Number(form.unitPrice) <= 0) {

        validationErrors.unitPrice =
            "El precio debe ser mayor a cero.";

    }

    if (form.quantityPerUnit === "" || Number(form.quantityPerUnit) <= 0) {

        validationErrors.quantityPerUnit =
            "La cantidad por unidad debe ser mayor a cero.";

    }

    if (form.unitsInStock === "" || Number(form.unitsInStock) < 0) {

        validationErrors.unitsInStock =
            "El stock no puede ser negativo.";

    }

    if (form.unitsOnOrder === "" || Number(form.unitsOnOrder) < 0) {

        validationErrors.unitsOnOrder =
            "Las unidades en orden no pueden ser negativas.";

    }

    if (form.reorderLevel === "" || Number(form.reorderLevel) < 0) {

        validationErrors.reorderLevel =
            "El nivel de reorden no puede ser negativo.";

    }

    return validationErrors;

};

    useEffect(() => {

        if (!show)
            return;

        if (product) {
            console.log("llego", product);
            setForm({

                productName: product.productName,

                categoryId: product.categoryId,

                supplierId: product.supplierId ?? "",

                quantityPerUnit: product.quantityPerUnit,

                unitPrice: product.unitPrice,

                unitsInStock: product.unitsInStock,

                unitsOnOrder: product.unitsOnOrder,

                reorderLevel: product.reorderLevel,

                discontinued: product.discontinued

            });
            console.log("form", form);
        }
        else {

            setForm(initialState);

        }

    }, [product, show]);

    const handleChange = ({ target }) => {

    const { name, value, type, checked } = target;

    setForm(previous => ({

        ...previous,

        [name]:

            type === "checkbox"

                ? checked

                : value

    }));

    setErrors(previous => ({

        ...previous,

        [name]: ""

    }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {

            setErrors(validationErrors);

            return;

        }

        setErrors({});

        try {

            setSaving(true);

            const dto = {

                ...form,

                categoryId: Number(form.categoryId),

                supplierId: form.supplierId === ""
                    ? null
                    : Number(form.supplierId),


                unitPrice: Number(form.unitPrice),

                unitsInStock: Number(form.unitsInStock),

                unitsOnOrder: Number(form.unitsOnOrder),

                reorderLevel: Number(form.reorderLevel)

            };

            if (product) {

                await updateProduct(
                    product.productId,
                    dto);

            }
            else {

                await createProduct(dto);

            }

            await onSaved();

            onClose();

        }
        catch (error) {

            console.error(error);

        }
        finally {

            setSaving(false);

        }

    };

    if (!show)
        return null;

    return (

        <div
            className="modal d-block"
            style={{ backgroundColor: "rgba(0,0,0,.5)" }}
        >

            <div className="modal-dialog modal-lg">

                <div className="modal-content">

                    <form onSubmit={handleSubmit}>

                        <div className="modal-header">

                            <h5 className="modal-title">

                                {
                                    product

                                        ? "Editar Producto"

                                        : "Nuevo Producto"
                                }

                            </h5>

                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            />

                        </div>

                        <div className="modal-body">

                            <div className="row mb-3">

                                <div className="col-md-6">

                                    <label className="form-label">

                                        Nombre

                                    </label>

                                    <input
                                        className={`form-control ${
                                            errors.productName ? "is-invalid" : ""
                                        }`}
                                        name="productName"
                                        value={form.productName}
                                        onChange={handleChange}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.productName}
                                    </div>

                                </div>

                                <div className="col-md-6">

                                    <label className="form-label">

                                        Categoría

                                    </label>

                                    <select
                                        className={`form-select ${
                                            errors.categoryId ? "is-invalid" : ""
                                        }`}
                                        name="categoryId"
                                        value={form.categoryId}
                                        onChange={handleChange}
                                    >
                                    <div className="invalid-feedback">
                                    {errors.categoryId}
                                    </div>

                                        <option value="">
                                            Seleccione...
                                        </option>

                                        {

                                            categories.map(category => (

                                                <option
                                                    key={category.categoryId}
                                                    value={category.categoryId}
                                                >

                                                    {category.categoryName}

                                                </option>

                                            ))

                                        }

                                    </select>

                                </div>

                            </div>

                            <div className="row mb-3">

                                <div className="col-md-6">

                                    <label className="form-label">

                                        Proveedor

                                    </label>

                                    <select
                                        className={`form-select ${
                                            errors.supplierId ? "is-invalid" : ""
                                        }`}
                                        name="supplierId"
                                        value={form.supplierId}
                                        onChange={handleChange}
                                    >
                                    <div className="invalid-feedback">
                                    {errors.supplierId}
                                    </div>

                                        <option value="">
                                            Seleccione...
                                        </option>

                                        {

                                            suppliers.map(supplier => (

                                                <option
                                                    key={supplier.supplierId}
                                                    value={supplier.supplierId}
                                                >

                                                    {supplier.companyName}

                                                </option>

                                            ))

                                        }

                                    </select>

                                </div>

                                <div className="col-md-6">

                                    <label className="form-label">

                                        Precio

                                    </label>

                                    <input
                                        type="number"
                                        step="0.01"
                                        className={`form-control ${
                                            errors.unitPrice ? "is-invalid" : ""
                                        }`}
                                        name="unitPrice"
                                        value={form.unitPrice}
                                        onChange={handleChange}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.unitPrice}
                                    </div>

                                </div>

                            </div>
                                                        <div className="row mb-3">

                                <div className="col-md-4">

                                    <label className="form-label">

                                        Cantidad por Unidad

                                    </label>

                                    <input
                                        type="text"
                                        className={`form-control ${
                                            errors.quantityPerUnit ? "is-invalid" : ""
                                        }`}
                                        name="quantityPerUnit"
                                        value={form.quantityPerUnit}
                                        onChange={handleChange}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.quantityPerUnit}
                                    </div>

                                </div>

                                <div className="col-md-4">

                                    <label className="form-label">

                                        Unidades en Stock

                                    </label>

                                    <input
                                        type="number"
                                        className={`form-control ${
                                            errors.unitsInStock ? "is-invalid" : ""
                                        }`}
                                        name="unitsInStock"
                                        value={form.unitsInStock}
                                        onChange={handleChange}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.unitsInStock}
                                    </div>

                                </div>

                                <div className="col-md-4">

                                    <label className="form-label">

                                        Unidades en Orden

                                    </label>

                                    <input
                                        type="number"
                                        className={`form-control ${
                                            errors.unitsOnOrder ? "is-invalid" : ""
                                        }`}
                                        name="unitsOnOrder"
                                        value={form.unitsOnOrder}
                                        onChange={handleChange}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.unitsOnOrder}
                                    </div>

                                </div>

                            </div>

                            <div className="row mb-3">

                                <div className="col-md-6">

                                    <label className="form-label">

                                        Nivel de Reorden

                                    </label>

                                    <input
                                        type="number"
                                        className={`form-control ${
                                            errors.reorderLevel ? "is-invalid" : ""
                                        }`}
                                        name="reorderLevel"
                                        value={form.reorderLevel}
                                        onChange={handleChange}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.reorderLevel}
                                    </div>

                                </div>

                                <div className="col-md-6 d-flex align-items-end">

                                    <div className="form-check">

                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="discontinued"
                                            name="discontinued"
                                            checked={form.discontinued}
                                            onChange={handleChange}
                                        />

                                        <label
                                            htmlFor="discontinued"
                                            className="form-check-label"
                                        >

                                            Producto Descontinuado

                                        </label>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                                disabled={saving}
                            >

                                Cancelar

                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={saving}
                            >

                                {

                                    saving

                                        ? (

                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                />

                                                Guardando...

                                            </>

                                        )

                                        : (

                                            product

                                                ? "Actualizar"

                                                : "Crear"

                                        )

                                }

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

ProductModal.propTypes = {

    show: PropTypes.bool.isRequired,

    product: PropTypes.object,

    categories: PropTypes.array.isRequired,

    suppliers: PropTypes.array.isRequired,

    onClose: PropTypes.func.isRequired,

    onSaved: PropTypes.func.isRequired

};

export default ProductModal;