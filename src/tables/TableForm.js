import React from "react";

function TableForm({submitHandler, newTable, changeHandler, handleCancel}) {

    return (
        <form className="form-group" onSubmit={submitHandler}>
            <label>Table Name:</label>
                <input className="form-control" type="text" name="table_name" required="required" value={newTable.table_name} onChange={changeHandler} minLength={2} />
            
            <label>Capacity:</label>
                <input className="form-control" type="number" name="capacity" required="required" value={newTable.capacity} onChange={changeHandler} min="1" />
            
            <button type="submit">Submit</button>
            <button onClick={handleCancel}>Cancel</button>
        </form>
    )
}

export default TableForm;