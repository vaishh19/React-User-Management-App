function Pagination({
  currentPage,
  totalPages,
  pageSize,
  setCurrentPage,
  setPageSize,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">

      <div className="page-size">

        <label>Rows per page :</label>

        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>

      </div>

      <div className="pagination">

        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
        >
          ◀ Previous
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            className={
              currentPage === page
                ? "page-number active"
                : "page-number"
            }
            onClick={() =>
              setCurrentPage(page)
            }
          >
            {page}
          </button>
        ))}

        <button
          className="page-btn"
          disabled={
            currentPage === totalPages ||
            totalPages === 0
          }
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
        >
          Next ▶
        </button>

      </div>

    </div>
  );
}

export default Pagination;