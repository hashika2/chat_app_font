import React from 'react'

const ErroShowing = ({ isError ,iserror}) => {
  if (iserror) {
    return (
      <p
        style={{
          backgroundColor: "red",
          textAlign: "center",
          color: "white",
        }}
      >
        {isError}
      </p>
    );
  }
  return <p></p>;
};

  export default ErroShowing;