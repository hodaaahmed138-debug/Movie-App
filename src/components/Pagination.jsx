import React from "react";

function Pagination({ page, totalPages, setPage }) {
  const maxVisible = 5;
  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav>
      <ul className="d-flex gap-2 pagination justify-content-center mt-5">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button
            className="page-link btn btn-primary px-2"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
        </li>

        {start > 1 && (
          <>
            <li className="page-item">
              <button className="page-link" onClick={() => setPage(1)}>1</button>
            </li>
            {start > 2 && <span className="page-link disabled border-0">...</span>}
          </>
        )}

        {pages.map((p) => (
          <li className={`page-item ${p === page ? "active" : ""}`} key={p}>
            <button
              className="page-link"
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          </li>
        ))}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && <span className="page-link disabled border-0">...</span>}
            <li className="page-item">
              <button className="page-link" onClick={() => setPage(totalPages)}>{totalPages}</button>
            </li>
          </>
        )}

        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link btn btn-primary px-2"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;