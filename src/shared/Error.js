import React from "react";

const ErroShowing = ({ isError, iserror }) => {
  if (iserror) {
    return (
      <div class="alert alert-danger alert-dismissible fade show text-center" role="alert">
        {isError}
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  } else {
    return null;
  }
};

export default ErroShowing;
