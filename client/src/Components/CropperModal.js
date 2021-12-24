import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import AvatarEditor from "react-avatar-editor";

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
        <Modal.Title>Crop Avatar</Modal.Title>
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
        <Button variant="primary" onClick={handleCroppedImageSubmit.bind(this)}>
          Crop
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default CropperModal;
