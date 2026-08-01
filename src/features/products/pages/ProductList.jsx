import { useEffect, useState } from "react";

import {
    getProducts,
    deleteProduct
} from "../services/productService";

import ProductTable from "../components/ProductTable";
import ProductSearch from "../components/ProductSearch";
import Pagination from "../components/Pagination";
import ProductModal from "../components/ProductModal";
import DeleteProductModal from "../components/DeleteProductModal";
import GenerateProductsModal from "../components/GenerateProductsModal";
import { getCategories } from "../../categories/services/categoryService";
import { getSuppliers } from "../../suppliers/services/supplierService";

function ProductList() {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);

    const [pageSize] = useState(10);

    const [search, setSearch] = useState("");

    const [totalPages, setTotalPages] = useState(0);

    const [selectedProduct, setSelectedProduct] = useState(null);

    const [showProductModal, setShowProductModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [categories, setCategories] = useState([]);

    const [suppliers, setSuppliers] = useState([]);

    const [showGenerateModal, setShowGenerateModal] = useState(false);

    useEffect(() => {

        loadProducts();
        loadCategories();
        loadSuppliers();

    }, [page, search]);

    const loadProducts = async () => {

        try {

            setLoading(true);

            const response = await getProducts({

                page,

                pageSize,

                search

            });

            setProducts(response.data);

            setTotalPages(response.totalPages);

        }
        catch (error) {

            console.error(error);

        }
        finally {

            setLoading(false);

        }

    };

    const loadCategories = async () => {

    const response = await getCategories();

    setCategories(response);
    };

    const loadSuppliers = async () => {

        const response = await getSuppliers();

        setSuppliers(response);
    };

    const handleCreate = () => {

        setSelectedProduct(null);

        setShowProductModal(true);

    };

    const handleEdit = (product) => {

        setSelectedProduct(product);

        setShowProductModal(true);

    };

    const handleDelete = (product) => {

        setSelectedProduct(product);

        setShowDeleteModal(true);

    };

    const handleCloseProductModal = () => {

        setShowProductModal(false);

        setSelectedProduct(null);

    };

    const handleCloseDeleteModal = () => {

    setShowDeleteModal(false);

    setSelectedProduct(null);

    };

    const handleGenerateClose = () => {

    setShowGenerateModal(false);

    };

    const handleGenerated = async () => {

    await loadProducts();

    };

    const confirmDelete = async () => {

        try {

            await deleteProduct(selectedProduct.productId);

            setShowDeleteModal(false);

            setSelectedProduct(null);

            await loadProducts();

        }
        catch (error) {

            console.error(error);

        }

    };

    return (

        <>

            <div className="d-flex justify-content-between align-items-center mb-3">

                <h2>Productos</h2>

                <button
                    className="btn btn-primary"
                    onClick={handleCreate}
                >

                    Nuevo producto

                </button>

                

            </div>
            <div className="d-flex justify-content-end mb-3">
                <button
                    className="btn btn-success"
                    onClick={() => setShowGenerateModal(true)}
                >
                    Generar productos
                </button>
            </div>
            

            <ProductSearch

                value={search}

                onChange={(value) => {

                    setPage(1);

                    setSearch(value);

                }}

            />

            {
                loading ?

                    <div className="text-center mt-5">

                        <div className="spinner-border"/>

                    </div>

                    :

                    <ProductTable

                        products={products}

                        onEdit={handleEdit}

                        onDelete={handleDelete}

                    />

            }

            <Pagination

                page={page}

                totalPages={totalPages}

                onPageChange={setPage}

            />

            <ProductModal

                show={showProductModal}

                product={selectedProduct}

                categories={categories}

                suppliers={suppliers}

                onClose={handleCloseProductModal }

                onSaved={loadProducts}
            />

            <DeleteProductModal

                show={showDeleteModal}

                product={selectedProduct}

                onClose={handleCloseDeleteModal}

                onConfirm={confirmDelete}

            />

            <GenerateProductsModal
                show={showGenerateModal}
                onClose={handleGenerateClose}
                onGenerated={handleGenerated}
            />

        </>

    );

}

export default ProductList;