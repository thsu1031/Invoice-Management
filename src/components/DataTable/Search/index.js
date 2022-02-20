import React, {useState} from  "react";
import Form from "react-bootstrap/Form";

const Search = ({onSearch}) => {
  const [search, setSearch] = useState("");

  const inputChangeHandler  = value => {
    setSearch(value);
    onSearch(value);
  }

  return (
    <Form.Control
      type="text"
      className="form-control"
      style={{width: "200px"}}
      placeholder="Search"
      value={search}
      onChange={ e => inputChangeHandler(e.target.value)}
    />

  )
};

export default Search;
