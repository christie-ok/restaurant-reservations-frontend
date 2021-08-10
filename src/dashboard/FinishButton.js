import React from "react";

function FinishButton({clickHandler, table}) {
//RENDERS FINSIH BUTTON ONLY IF THE TABLE HAS A PARTY SEATED
    return (table.reservation_id && (
        <button onClick={clickHandler} data-table-id-finish={table.table_id}>Finish</button>
        )
    )
}

export default FinishButton;