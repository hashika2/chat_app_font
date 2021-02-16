import React, { useState } from "react";
import { Alert } from "reactstrap";
import { useHistory } from "react-router-dom";

const AlertMessageShower = ({ timeout }) => {
  const [timeOut, setTime] = useState(timeout);
  const history = useHistory();

  const setLogin = () => {
    setTime(false);
    history.push("/");
    localStorage.removeItem("token");
  };

  if (timeout) {
    return (
      <Alert severity="warning">
        This is an error alert — <strong>Session Expired</strong>
        <br></br>
        <input
          type="submit"
          className="btn btn-primary"
          value="login"
          onClick={setLogin}
        />
        <input type="submit" className="btn btn-danger" value="close" />
      </Alert>
    );
  }
  return null;
};

export default AlertMessageShower;
