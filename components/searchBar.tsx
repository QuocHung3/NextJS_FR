import { useState } from "react";

interface IProps {
  getSearchText: (value: string) => void;
}

const SearchBar = (props: IProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IPost[]>();

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (!searchValue) {
      return;
    }
    props.getSearchText(searchValue);
  };
  return (
    <div className="d-flex justify-content-center">
      <form className="form-inline my-2 my-lg-0 d-flex justify-content-between">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          onClick={(e) => handleSearch(e)}
          className="btn btn-outline-success my-2 my-sm-0 mx-2"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
