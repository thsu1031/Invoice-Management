import React from "react";


const AutoCompleteItem = ({ name, onSelectItem }) => {

  return (
    <li
      className={`list-group-item `}
      onClick={onSelectItem}
    >
      <div className="row">
        <div className="col text-left">
          <p className="mb-0 font-weight-bold line-height-1">
            {name}
            {""}
          </p>
        </div>
      </div>
    </li>
  );
};

export default AutoCompleteItem;
