import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faSave,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";



const EditableTable = ({
  cols,
  data,
  editId,
  clickEditHandler,
  clickCancelHandler,
  editChangeHandler,
  clickDeleteHandler,
  register,
  schema
}) => {

  const { formState: { errors }} = useForm({
    resolver: yupResolver(schema),
  });
  
  return (
    <>
      {data.map((item, index) => (
        <tr key={index}>
          {cols.map((col, key) => (
            <td key={key}>
              {editId === item.id && col.isEditable === true ? (
                <Form.Control
                  type={col.type}
                  name={col.name}
                  defaultValue={col.value}
                  {...register(col.name, { required: true })}
                  style={{width: "90px"}}
                />
                
              ) : (
                col.render(item)
              )}
              
            </td>
          ))}
          {editId === item.id ? (
            <td>
              <Button className="action-button" size="sm" type="submit">
                <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
              </Button>
              <Button
                className="action-button"
                size="sm"
                type="button"
                onClick={clickCancelHandler}
              >
                <FontAwesomeIcon icon={faWindowClose}></FontAwesomeIcon>
              </Button>
            </td>
          ) : (
            <td>
              <Button
                className="action-button"
                size="sm"
                type="button"
                onClick={(event) => clickEditHandler(event, item)}
              >
                <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
              </Button>
              <Button
                className="action-button"
                size="sm"
                type="button"
                onClick={(event) => clickDeleteHandler(item)}
              >
                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
              </Button>
            </td>
          )}
        </tr>
      ))}
    </>
  );
};

export default EditableTable;
