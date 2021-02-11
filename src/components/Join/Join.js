import React, { useState, Fragment, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { roommed } from "../../action/index";
import { connect } from "react-redux";
import queryString from "query-string";
import axios from "axios";
import { getRoomData } from "../../action/index";
import ImageUploading from "react-images-uploading";
import "./Join.css";
import { API, Bearer } from "../../shared/constant";
import { getUsers } from "../../action/getUsers";

const SignIn = ({
  roommed,
  isAuthenticated,
  location,
  getRoomData,
  authToken,
  getUsers,
}) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [selectedImage, setImage] = useState("");
  const students = "Students";
  const officers = "Officers";
  const clients = "Clients";
  const developers = "Developers";
  const privateRoom = "Private";
  const [pictures, setPicture] = useState([]);
  /**get email from the link**/
  const { email } = queryString.parse(location.search);
  const userEmail =  authToken.token.user;

  useEffect(() => {
    getUsers(accessToken);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  if (isAuthenticated) {
    return <Redirect to={`/chat?name=${name}&room=${room}`} />;
  }

  const onChangeHandler = (event) => {
    setImage(event.target.files[0]);
  };
  let msg = null;
  let accessToken = authToken.token.accessToken;
  const fielUploadHandler = (event) => {
    const formData = new FormData();
    formData.append("file", selectedImage);
    axios
      .post(`${API}/api/user/upload`, formData, {
        headers: { Authorization: `${Bearer} ${accessToken}` },
      })
      .then((res) => {
        msg = res.data.message;
      });
  };

  const onChange = (picture) => {
    setPicture(pictures.concat(picture));
  };

  const getPrivateChatMessage = () => {};

  return (
    <Fragment>
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <ImageUploading
            mode="multiple"
            onChange={onChange}
            withIcon={true}
            buttonText="Choose images"
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          ></ImageUploading>
          <p
            style={{
              backgroundColor: "green",
              textAlign: "center",
              color: "white",
            }}
          >
            {msg}
          </p>
          <h1 className="heading">Rooms</h1>
          <Link to={`/chat?name=${userEmail}&room=${students}`}>
            <button className={"button mt-20"} type="submit">
              Students
            </button>
          </Link>
          <Link
            to={`/chat?name=${userEmail}&room=${officers}`}
            onClick={(e) => getRoomData(officers)}
          >
            <button className={"button mt-20"} type="submit">
              Officers
            </button>
          </Link>
          <Link to={`/chat?name=${userEmail}&room=${clients}`}>
            <button className={"button mt-20"} type="submit">
              Clients
            </button>
          </Link>
          <Link to={`/chat?name=${userEmail}&room=${developers}`}>
            <button className={"button mt-20"} type="submit">
              Developers
            </button>
          </Link>
        </div>
        <div className="joinInnerContainer">
          <h1 className="heading">Join</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <div>
              <input
                placeholder="Name"
                className="joinInput"
                type="text"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="Room"
                className="joinInput mt-20"
                type="text"
                onChange={(event) => setRoom(event.target.value)}
              />
            </div>
            <Link
              onClick={(e) =>
                !name || !room ? e.preventDefault() : getRoomData(room)
              }
              to={`/chat?name=${name}&room=${room}`}
            >
              <button className={"button mt-20"} type="submit">
                Sign In
              </button>
            </Link>
            <Link to={`/privateChat?name=${email}&room=${privateRoom}`}>
              <button
                className={"button mt-20"}
                onClick={getPrivateChatMessage}
                type="submit"
              >
                Private Message
              </button>
            </Link>
            <input
              type="file"
              className="btn btn-warning btn-lg btn-block mt-20"
              onChange={onChangeHandler}
              ref={(fileInput) => (fileInput = fileInput)}
            ></input>
            <button
              onClick={fielUploadHandler}
              className="btn btn-primary btn-lg btn-block mt-20"
            >
              {" "}
              Upload{" "}
            </button>
            {/* <button onClick={(fileInput)=>{fileInput.click()}}>Pick Image</button>
            <button onClick={fielUploadHandler}>Upload</button> */}
          </form>
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.registeredRoom,
  authToken: state.auth.data,
});
export default connect(mapStateToProps, { roommed, getRoomData, getUsers })(
  SignIn
);
