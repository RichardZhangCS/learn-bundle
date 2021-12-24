import { useParams } from "react-router";
import { Container, Form, Spinner, InputGroup, Button } from "react-bootstrap";
import { useContext, useEffect, useState, useRef } from "react";
import defaultAvatar from "../default_profile_picture.jpg";
import UserContext from "./../util/UserContext";
import CropperModal from "./CropperModal";
function UserProfile({ ownUser }) {
  const [user, getUserFromServer] = useContext(UserContext);
  const routeParams = useParams();
  const [userOfProfile, setUserOfProfile] = useState(undefined);
  const [editUsernameMode, setEditUsernameMode] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState({
    avatar: false,
    name: false,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const newAvatarCandidate = useRef(null);

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
        if (encoded.length % 4 > 0) {
          encoded += "=".repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  const handleSetAvatarChange = async (croppedImage) => {
    newAvatarCandidate.current = null;
    // updateAPI
    let formData = new FormData();
    formData.append("avatar", croppedImage);
    setLoading({ ...loading, avatar: true });
    const res = await fetch(`/users/id/${userOfProfile._id}/avatar`, {
      method: "PUT",
      credentials: "include",
      withCredentials: true,
      body: formData,
    });
    if (res.ok) {
      setUserOfProfile({
        ...userOfProfile,
        avatar: {
          contentType: croppedImage.type,
          dataBase64Encoded: await getBase64(croppedImage),
        },
      });
      setLoading({ ...loading, avatar: false });
    }
  };

  const isEditable = () => {
    return userOfProfile && userOfProfile._id === user._id;
  };

  const handleUsernameChangeSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.checkValidity()) {
      // call to api;

      setLoading({ ...loading, username: true });
      async function callUsernameChangeToAPI() {
        const formData = new URLSearchParams(new FormData(e.currentTarget));
        const res = await fetch(`/users/id/${userOfProfile._id}/username`, {
          method: "PUT",
          body: formData,
          credentials: "include",
        });
        if (res.ok) {
          setLoading({ ...loading, username: false });
          setUserOfProfile({
            ...userOfProfile,
            username: formData.get("username"),
          });
          setEditUsernameMode(false);
          getUserFromServer();
        } else {
          const message = await res.text();
          setLoading({ ...loading, username: false });
          setErrorMessage(message);
        }
      }

      callUsernameChangeToAPI();
    }
    setValidated(true);
  };

  const handleAvatarChange = (e) => {
    setShowCropper(true);
    newAvatarCandidate.current = e.target.files[0];
  };

  useEffect(() => {
    if (routeParams.username) {
      async function getUserByNameFromAPI() {
        const res = await fetch(`/users/name/${routeParams.username}`);
        const userJson = await res.json();
        setUserOfProfile(userJson);
      }
      getUserByNameFromAPI();
    } else if (routeParams.userid) {
      async function getUserByIDFromAPI() {
        const res = await fetch(`/users/id/${routeParams.userid}`);
        const userJson = await res.json();
        setUserOfProfile(userJson);
      }
      getUserByIDFromAPI();
    } else if (ownUser && user) {
      async function getCurrentUserFromAPI() {
        const res = await fetch(`/users/id/${user._id}`);
        const userJson = await res.json();
        setUserOfProfile(userJson);
      }
      getCurrentUserFromAPI();
    }
  }, [routeParams, user]);
  return (
    <section className="user-profile">
      {userOfProfile ? (
        <>
          <Container className="p-3 profile-view-container mt-5 d-flex flex-column align-items-center">
            <div className="position-relative user-avatar-container rounded-circle">
              <img
                className="rounded-circle user-avatar"
                src={
                  userOfProfile.avatar
                    ? `data:image/${userOfProfile.avatar.contentType};base64,${userOfProfile.avatar.dataBase64Encoded}`
                    : defaultAvatar
                }
                alt="User avatar"
                style={{ width: "250px", height: "auto" }}
              />
              <p className="h5 position-absolute text-center" unselectable="on">
                Click to change your avatar
              </p>
              {loading.avatar && (
                <div className="spinner-container">
                  <Spinner animation="border"></Spinner>
                </div>
              )}
              <input
                type="file"
                style={{
                  opacity: 0.0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
                accept=".jpg, .jpeg, .png"
                onChange={handleAvatarChange.bind(this)}
              />
            </div>
            {!editUsernameMode ? (
              <h4
                className={`username rounded p-1 my-2${
                  isEditable() ? " editable" : ""
                }`}
                onClick={() => {
                  if (isEditable()) setEditUsernameMode(true);
                }}
              >
                {userOfProfile.username}
                {isEditable() && (
                  <i className="ms-2 position-absolute bi bi-pencil-fill"></i>
                )}
              </h4>
            ) : (
              <>
                <Form
                  validated={validated}
                  noValidate
                  onSubmit={handleUsernameChangeSubmit.bind(this)}
                  className="position-relative"
                >
                  <Form.Group>
                    {loading.username && (
                      <Spinner
                        animation="border"
                        className="ms-2 position-absolute"
                        style={{
                          top: "calc(50% - 1rem)",
                          right: "-50px",
                        }}
                      ></Spinner>
                    )}
                    <InputGroup style={{ width: "250px" }} className="my-2">
                      <Form.Control
                        required="true"
                        type="text"
                        name="username"
                        defaultValue={userOfProfile.username}
                        onChange={() => {
                          setErrorMessage(null);
                        }}
                      ></Form.Control>

                      <Button type="submit">
                        <i className="bi bi-check"></i>
                      </Button>
                      <Button
                        onClick={() => {
                          setEditUsernameMode(false);
                        }}
                      >
                        <i className="bi bi-x-circle"></i>
                      </Button>
                      <Form.Control.Feedback
                        type="invalid"
                        className="text-center"
                      >
                        {"Please enter a nonempty user name"}
                      </Form.Control.Feedback>
                      <Form.Control.Feedback className="text-danger text-center">
                        {errorMessage}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Form>
              </>
            )}
          </Container>
          <Container className="p-3 bg-light post-view-container my-2 border rounded">
            <h5>Posts</h5>
          </Container>
        </>
      ) : (
        <div className="spinner-container mt-3">
          <Spinner className="post-loading-spinner" animation="border" />
        </div>
      )}
      {newAvatarCandidate.current && (
        <CropperModal
          show={showCropper}
          handleClose={() => {
            setShowCropper(false);
          }}
          imageToBeCropped={newAvatarCandidate.current}
          handleSetAvatarChange={handleSetAvatarChange.bind(this)}
        ></CropperModal>
      )}
    </section>
  );
}

export default UserProfile;
