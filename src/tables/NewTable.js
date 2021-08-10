import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import TableForm from "./TableForm";
import {postNewTable} from "../utils/api"


function NewTable() {
    const history = useHistory();
    const [newTable, setNewTable] = useState({
        "table_name": "",
        "capacity": ""
      });

      //CHANGE HANDLER FOR CREATING NEW TABLE
      function changeHandler({target}) {
        setNewTable({
                  ...newTable,
                  [target.name]: target.value
              });
          };

    function handleCancel() {
        history.goBack();
    };

    //CREATES NEW TABLE
    async function newTableSubmitHandler(event) {
        event.preventDefault();
        await postNewTable(newTable);
          
        setNewTable({
          "table_name": "",
          "capacity": ""
        });
      
        history.push("/dashboard");
      };

    return (
            <TableForm submitHandler={newTableSubmitHandler} changeHandler={changeHandler} newTable={newTable} handleCancel={handleCancel} />
    )
}

export default NewTable;