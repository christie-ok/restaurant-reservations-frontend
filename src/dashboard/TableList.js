import React from "react";
import { today } from "../utils/date-time";

function TableList({date, finishClickHandler, tables}) {
//LISTS ALL TABLES
    return  (
        <div id="table-div">
            <h5>Tables</h5>
        <ul class="tables-group" >
            {
                tables.map((table) => {
                    const {table_name, table_id, reservation_id, capacity} = table;
                    return (
                        <li key={table_id} id={table_id} class="tables-item">
                            <table>
                                <tr>
                                    <th>Table:</th>
                                    <td>{table_name}</td>
                                </tr>
                                <tr>
                                    <th>Capacity:</th>
                                    <td>{capacity}</td>
                                </tr>
                                <tr>
                                    <th>Status:</th>
                                    <td id={`status-${table_id}`} data-table-id-status={table.table_id}>{reservation_id ? "occupied" : "free"}</td>
                                </tr>
                                </table>
                            <button hidden={!reservation_id} onClick={finishClickHandler} data-table-id-finish={table.table_id} class="btn btn-outline-dark btn-lg tables-item-sub">Finish</button>  
                        </li>
                    )
                })
            }
        </ul>
        </div>
    )
}


export default TableList;