import React from "react";

const NotFound = ({ message }) => {
  return (
    <div className="text-center py-5">
      <h2 className="fw-bold text-danger mb-3">❌ Not Found</h2>
      <p className="text-muted fs-5">
        {message || "Sorry, nothing was found."}
      </p>
    </div>
  );
};

export default NotFound;
