import React, { useState } from "react";
import { faArrowUp, faArrowDown, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ headers, onSorting }) => {

  const [sortingField, setSortingField] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");
  const onSortingHandler = (field) => {
    const order = field === sortingField && sortingOrder === "asc" ? "desc" : "asc";
    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };
  return (
    <thead>
      <tr>
        {headers.map(({ name, field, sortable }) => (
          <th
            key={name}
            onClick={() => (sortable ? onSortingHandler(field) : null)}
          >
            {name}
            {sortable && sortingField !== field && (
               <FontAwesomeIcon
               icon={faSort}
             />

            )}
            {sortingField && sortingField === field && (
              <FontAwesomeIcon
                icon={sortingOrder === "asc" ? faArrowDown : faArrowUp}
              />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Header;
