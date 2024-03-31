import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { mutate } from "swr";

import { toast } from "react-toastify";

interface IProps {
  isCreate?: boolean;
  isUpdate?: boolean;
  showModal: boolean;
  postData?: IPost;
  handleClose: () => void;
}

const PostModal = (props: IProps) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  useEffect(() => {
    if (props.postData) {
      setTitle(props.postData.title);
      setAuthor(props.postData.author);
      setContent(props.postData.content);
    }
  }, []);

  const handleAddNew = async () => {
    if (!title || !author || !content) {
      toast.warn("Enter all field!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    await fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author, content }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          toast.success("New post!", {
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

  const handleUpdate = async () => {
    if (!title || !author || !content) {
      toast.warn("Enter all field!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    await fetch(`http://localhost:8000/blogs/${props.postData?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author, content }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
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
          console.log("muteeeeeeeeeeeeeeeeee");
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
      <Modal show={props.showModal} onHide={() => props.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.isCreate ? "Create New Post" : "Update Current Post"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
                placeholder="Enter title..."
              />
            </div>
            <div className="form-group">
              <label>Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-control"
                placeholder="Enter content..."
              ></textarea>
            </div>
            <div className="form-group">
              <label>Author</label>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="form-control"
                placeholder="Enter author..."
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.handleClose()}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => (props.isCreate ? handleAddNew() : handleUpdate())}
          >
            {props.isCreate ? "Save" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostModal;
