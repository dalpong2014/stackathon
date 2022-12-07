import React from "react";
import { Link } from "react-router-dom";
import edit from "./img/edit.webp";
import trash from "./img/trash.jpeg";

const Record = (props) => (
  <tr>
    <td>{props.record.description}</td>
    <td>${props.record.amount}</td>
    <td>{props.record.category}</td>
    <td className="flex flex-row">
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
        <img src={edit} alt="" className="h-4"></img>
      </Link>{" "}
      |
      <img
        src={trash}
        alt=""
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
        className="h-6 hover:cursor-pointer m-1"
      ></img>
    </td>
  </tr>
);

export default Record;
