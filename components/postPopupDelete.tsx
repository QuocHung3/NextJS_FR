import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { mutate } from "swr";

import { toast } from "react-toastify";

interface IProps {
  show: boolean;
  handleClose: () => void;
  id?: string;
}

const PostPopupDelete = (props: IProps) => {
  const handleDelete = async () => {
    if (!props.id) {
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    await fetch(`http://localhost:8000/blogs/${props.id}`, {
      method: "DELETE",
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => {
        if (res) {
          toast.success("Updated!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // recall API
          mutate("http://localhost:8000/blogs");
          props.handleClose();
        }
      })
      .catch(() => {
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      });
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure delete this post!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostPopupDelete;
