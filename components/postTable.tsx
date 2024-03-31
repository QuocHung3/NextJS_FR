import PostModal from "./postModal";
import { useEffect, useState } from "react";
import Link from "next/link";
import PostPopupDelete from "./postPopupDelete";
import PostsPaginate from "./postsPaginate";
import SearchBar from "./searchBar";

interface IProps {
  data: IPost[];
}

const PostTable = (props: IProps) => {
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [postData, setPostData] = useState<IPost>();
  const [idPost, setIdPost] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [postList, setPostList] = useState<IPost[]>();
  const [search, setSearch] = useState<string>("");
  const [searchValue, setSearchValue] = useState<IPost[]>();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleClosePopupDelete = () => setShowPopupDelete(false);
  const handleShowPopupDelete = () => setShowPopupDelete(true);

  useEffect(() => {}, [props.data]);

  useEffect(() => {
    const newData = props.data.filter((post) => Number(post.idPage) === page);
    setPostList(newData);
  }, [page]);

  useEffect(() => {
    if (props.data) {
      const searchVal = props.data.filter(
        (blog) =>
          blog.title.toLowerCase().trim().includes(search.toLowerCase()) ||
          blog.author.toLowerCase().trim().includes(search.toLowerCase()) ||
          blog.content.toLowerCase().trim().includes(search.toLowerCase())
      );

      setSearchValue(searchVal);
    }
  }, [search]);

  const handleShowModal = (value: IPost) => {
    handleShow();
    setPostData(value);
  };

  const handleDeletePost = (id: string) => {
    handleShowPopupDelete();
    setIdPost(id);
  };

  const handleChangePage = (index: number) => {
    setPage(index);
  };
  if (!postList)
    return <div className="d-flex justify-content-center">Loading...</div>;

  const getSearchText = (value: string) => {
    setSearch(value);
  };

  if (search && searchValue) {
    return (
      <>
        <SearchBar getSearchText={getSearchText} />
        <table className="table container">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">Author</th>
            </tr>
          </thead>
          <tbody>
            {searchValue
              .sort((a: any, b: any) => b.id - a.id)
              .map((value: IPost) => (
                <tr key={value.id}>
                  <th scope="row">{value.id}</th>
                  <td>{value.title.slice(0, 22) + "..."}</td>
                  <td>{value.content.slice(0, 30) + "..."}</td>
                  <td>{value.author}</td>
                  <td>
                    <Link
                      className="btn btn-primary my-2"
                      href={`/posts/${value.id}`}
                    >
                      View
                    </Link>
                    <button
                      type="button"
                      className="btn btn-warning my-2 mx-2"
                      onClick={() => handleShowModal(value)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDeletePost(value.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  }

  return (
    <>
      <SearchBar getSearchText={getSearchText} />
      <table className="table container">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">Author</th>
          </tr>
        </thead>
        <tbody>
          {postList
            .sort((a: any, b: any) => b.id - a.id)
            .map((value: IPost) => (
              <tr key={value.id}>
                <th scope="row">{value.id}</th>
                <td>{value.title.slice(0, 22) + "..."}</td>
                <td>{value.content.slice(0, 30) + "..."}</td>
                <td>{value.author}</td>
                <td>
                  <Link
                    className="btn btn-primary my-2"
                    href={`/posts/${value.id}`}
                  >
                    View
                  </Link>
                  <button
                    type="button"
                    className="btn btn-warning my-2 mx-2"
                    onClick={() => handleShowModal(value)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeletePost(value.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <PostsPaginate
          handleChangePage={handleChangePage}
          pageCount={Math.ceil(Number(props.data.length / 6))}
        />
      </div>
      {showModal && (
        <PostModal
          showModal={showModal}
          handleClose={handleClose}
          postData={postData}
          isUpdate
        />
      )}

      {showPopupDelete && (
        <PostPopupDelete
          show={showPopupDelete}
          handleClose={handleClosePopupDelete}
          id={idPost}
        />
      )}
    </>
  );
};

export default PostTable;
