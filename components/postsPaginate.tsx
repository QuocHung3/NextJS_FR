import ReactPaginate from "react-paginate";

interface IProps {
  handleChangePage: (i: number) => void;
  pageCount: number;
}

const PostsPaginate = (props: IProps) => {
  return (
    <>
      <ReactPaginate
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        activeClassName={"active"}
        onPageChange={(event) => props.handleChangePage(event.selected + 1)}
        pageCount={props.pageCount}
        pageRangeDisplayed={3}
        breakLabel="..."
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-item"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeLinkClassName="active"
      />
    </>
  );
};

export default PostsPaginate;
