import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import AvatarEditor from "react-avatar-editor";

function Register() {
  const [validated, setValidated] = useState(false);
  const [registerMessage, setRegisterMessage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(null);

  const route = "/register";

  const registerIntoAPI = async (form) => {
    setRegisterMessage(null);
    const data = new FormData(form);
    data.set("avatar", currentAvatar);
    const res = await fetch(route, {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (res.status === 200) {
      window.location = "/";
    } else {
      const message = await res.text();
      setRegisterMessage(message);
    }
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      registerIntoAPI(form);
    }
    event.preventDefault();
    setValidated(true);
  };

  const handleUsernameChange = (e) => {
    if (e.currentTarget.value.includes(" ")) {
      e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
    }
  };

  const handleCropperOpen = (e) => {
    setShowCropper(true);
    setCurrentAvatar(e.target.files[0]);
  };

  const handleCropperClose = () => {
    setShowCropper(false);
  };

  const handleSetAvatarChange = (image) => {
    setCurrentAvatar(image);
  };

  return (
    <>
      <Container>
        <div className="auth-form-container mt-5">
          <h2>Register to Learn Bundle</h2>
          <Form
            validated={validated}
            onSubmit={handleSubmit}
            method="POST"
            action={route}
            noValidate
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please provide a valid email address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="text"
                placeholder="Enter username"
                onChange={handleUsernameChange.bind(this)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a non empty username.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a non-empty password.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                type="file"
                name="avatar"
                placeholder="Place a cool image here"
                onChange={handleCropperOpen.bind(this)}
                accept=".jpg, .jpeg, .png"
              />
              <Form.Control.Feedback type="invalid">
                Image must be a jpg, jpeg, or png
              </Form.Control.Feedback>
            </Form.Group>
            {currentAvatar && (
              <img
                src={URL.createObjectURL(currentAvatar)}
                alt="Avatar candidate"
                style={{ width: "100px", height: "100px" }}
              />
            )}
            {registerMessage && (
              <p className="mt-2 text-danger">{registerMessage}</p>
            )}
            <p className="lead mt-2">
              Already have an account? <a href="/signin">Sign In</a>
            </p>
            <Button variant="primary" type="submit" className="mt-2">
              Sign Up
            </Button>
          </Form>
        </div>
      </Container>
      {currentAvatar && (
        <CropperModal
          show={showCropper}
          handleClose={handleCropperClose.bind(this)}
          imageToBeCropped={currentAvatar}
          handleSetAvatarChange={handleSetAvatarChange.bind(this)}
        ></CropperModal>
      )}
    </>
  );
}

function SignIn(props) {
  const [validated, setValidated] = useState(false);

  const [signInFailure, setSignInFailure] = useState(false);

  const route = "/signin";
  const signInIntoAPI = async (form) => {
    setSignInFailure(false);
    const data = new URLSearchParams(new FormData(form));
    const res = await fetch(route, {
      method: "POST",
      body: data,
      credentials: "include",
      withCredentials: true,
    });
    if (res.status === 200) {
      window.location = "/";
    } else {
      setSignInFailure(true);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      signInIntoAPI(form);
    }
    event.preventDefault();

    setValidated(true);
  };

  const handleUsernameChange = (e) => {
    if (e.currentTarget.value.includes(" ")) {
      e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
    }
  };
  return (
    <Container>
      <div className="auth-form-container mt-5">
        <h2>Sign in to Learn Bundle</h2>
        <Form validated={validated} noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Enter username"
              onChange={handleUsernameChange.bind(this)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a non empty username.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a non-empty password.
            </Form.Control.Feedback>
          </Form.Group>
          {signInFailure && (
            <p className="mt-2 text-danger">Incorrect Username or Password</p>
          )}
          <p className="lead">
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
          <Button variant="primary" type="submit" className="mt-2">
            Sign In
          </Button>
        </Form>
      </div>
    </Container>
  );
}

function CropperModal({
  show,
  handleClose,
  imageToBeCropped,
  handleSetAvatarChange,
}) {
  const [scaleFactor, setScaleFactor] = useState(1.0);

  let cropper = "";

  const setCropperRef = (cp) => {
    cropper = cp;
  };
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const handleCroppedImageSubmit = () => {
    if (cropper) {
      const canvasScaled = cropper.getImageScaledToCanvas();
      const croppedImg = canvasScaled.toDataURL();
      handleSetAvatarChange(dataURLtoFile(croppedImg));
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center align-items-center">
        <AvatarEditor
          image={URL.createObjectURL(imageToBeCropped)}
          ref={setCropperRef}
          width={250}
          height={250}
          border={25}
          color={[150, 150, 150, 0.6]} // RGBA
          scale={scaleFactor}
          rotate={0}
          onWheel={(e) => {
            if (e.deltaY < 0) {
              setScaleFactor(Math.min(4.0, scaleFactor + 0.2));
            } else if (e.deltaY > 0) {
              setScaleFactor(Math.max(1.0, scaleFactor - 0.2));
            }
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCroppedImageSubmit.bind(this)}>
          Understood
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export { Register, SignIn };
