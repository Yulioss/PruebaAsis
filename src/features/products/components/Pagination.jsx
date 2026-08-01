import PropTypes from "prop-types";

function Pagination({
    page,
    totalPages,
    onPageChange
}) {

    if (totalPages <= 1)
        return null;

    const start = Math.max(2, page - 2);
    const end = Math.min(totalPages - 1, page + 2);

    const pages = [];

    pages.push(1);

    if (page > 4) {
    pages.push("...");
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (page < totalPages - 3) {
    pages.push("...");
    }

    if (totalPages > 1) {
    pages.push(totalPages);
    }   

    return (

        <nav className="mt-4">

            <ul className="pagination justify-content-center">

                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>

                    <button
                        className="page-link"
                        onClick={() => onPageChange(page - 1)}
                    >
                        ‹
                    </button>

                </li>

                {pages.map(number => (

                    <li
                        key={number}
                        className={`page-item ${number === page ? "active" : ""}`}
                    >

                        <button
                            className="page-link"
                            onClick={() => onPageChange(number)}
                        >
                            {number}
                        </button>

                    </li>

                ))}

                <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>

                    <button
                        className="page-link"
                        onClick={() => onPageChange(page + 1)}
                    >
                        ›
                    </button>

                </li>

            </ul>

        </nav>

    );

}

Pagination.propTypes = {

    page: PropTypes.number.isRequired,

    totalPages: PropTypes.number.isRequired,

    onPageChange: PropTypes.func.isRequired

};

export default Pagination;