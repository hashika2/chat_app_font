import React, { useState } from "react";
import { Alert } from "reactstrap";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

const AlertMessageShower = ({ timeout }) => {
  const [timeOut, setTime] = useState(timeout);
  const history = useHistory();

  const setLogin = () => {
    console.log("*********")
    setTime(false);
    localStorage.removeItem("token");
    history.push("/");
  };
  document.createElement('swal2-confirm').addEventListener('click',setLogin)

  if (timeout) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: `<button>Login</button>`
    })
  }
  return null;
};

export default AlertMessageShower;
