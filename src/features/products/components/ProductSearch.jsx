import PropTypes from "prop-types";

function ProductSearch({
    value,
    onChange
}) {

    return (

        <div className="row mb-3">

            <div className="col-md-6">

                <div className="input-group">

                    <span className="input-group-text">

                        <i className="bi bi-search"></i>

                    </span>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por nombre..."
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    />

                </div>

            </div>

        </div>

    );

}

ProductSearch.propTypes = {

    value: PropTypes.string.isRequired,

    onChange: PropTypes.func.isRequired

};

export default ProductSearch;