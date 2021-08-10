import React from "react";

function TableForm({submitHandler, newTable, changeHandler, handleCancel}) {

    return (
        <form class="form-group" onSubmit={submitHandler}>
            <label>Table Name:</label>
                <input class="form-control" type="text" name="table_name" required="required" value={newTable.table_name} onChange={changeHandler} minLength={2} />
            
            <label>Capacity:</label>
                <input class="form-control" type="number" name="capacity" required="required" value={newTable.capacity} onChange={changeHandler} min="1" />
            
            <button type="submit">Submit</button>
            <button onClick={handleCancel}>Cancel</button>
        </form>
    )
}

export default TableForm;