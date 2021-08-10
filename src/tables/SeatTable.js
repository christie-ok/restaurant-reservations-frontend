import React, {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import {readReservation, listTables, reserveTable, updateReservationStatus} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert"


function SeatTable() {
    const [reservation, setReservation] = useState({});
    const {reservation_id} = useParams();
    const [reservationError, setReservationError] = useState(null);
    const [tables, setTables] = useState([]);
    const [tableError, setTableError] = useState(null);
    const [chosenTable, setChosenTable] = useState(null);

    const history = useHistory();
    
    useEffect(loadTables, []);
    useEffect(loadReservation, [reservation_id]);
    
    //PROVIDES DATA FOR RESERVATION USER IS GOING TO CHOOSE A TABLE FOR
    function loadReservation() {
        const abortController = new AbortController();
        setReservationError(null);
        readReservation(reservation_id, abortController.signal)
          .then(setReservation)
          .catch(setReservationError);
        return () => abortController.abort();
      }
      
      //LISTS TABLES FOR DROP DOWN MENU CHOICE
      function loadTables() {
        const abortController = new AbortController();
        async function tablesUp() {
            const ts =  await listTables(abortController.signal);
            setTables(ts);
          }
        tablesUp();
       
        return () => abortController.abort();
      }
      
      async function seatSubmitHandler(event) {
        event.preventDefault();
        
        //VERIFIY TABLE WAS CHOSEN
        if (!chosenTable || chosenTable === "0") {
            setTableError({message: "Please choose a table."})
            return;
        };

        const tableInfo = tables.find((table) => table.table_id == chosenTable);
        const {capacity} = tableInfo;

        //VERIFY TABLE IS BE ENOUGH FOR PARTY
        if (capacity < reservation.people) {
            setTableError({message: "Choose a table big enough for the party."})
            return;
        };

        //UPDATE TABLE WITH RESERVATION
        const reservedTable = {
            ...tableInfo,
            reservation_id: reservation_id
        };

        await reserveTable(reservedTable)

        //UPDATE RESERVATION WITH STATUS "SEATED"
        await updateReservationStatus(reservation_id, "seated");


        history.push("/dashboard")
      };
      
      function seatTableChangeHandler(event) {
        setChosenTable(event.target.value);
      };

      function handleCancel() {
          history.goBack();
      };

    return ( 
        <div>
             
             <table class="reservations-item-group">
                  <tr>
                    <th>Name:</th>
                    <td>{`${reservation.first_name} ${reservation.last_name}`}</td>
                  </tr>
                  <tr>
                    <th>Date/Time:</th>
                    <td>{`${reservation.reservation_date} at ${reservation.reservation_time}`}</td>
                  </tr>
                  <tr>
                    <th>People:</th>
                    <td>{reservation.people}</td>
                  </tr>
                  <tr>
                    <th>Status:</th>
                    <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
                  </tr>
                </table>
        <form onSubmit={seatSubmitHandler}>
        <div class="form-group row">
            <label class="font-weight-bold col-sm-2 col-form-label">Table Number:</label>
            <div class="col-sm-10">
        <select class="form-control" name="table_id" required="required" onChange={seatTableChangeHandler}> 
        <option key="0" value="0">Choose Table - Capacity</option>
            {
                tables.map((table) => {
                    const {table_name, capacity, table_id} = table;
                    return (
                        <option key={table_id} value={`${table_id}`}>{table_name} - {capacity}</option>
                    )
                })
            }
        </select>
        </div>
        </div>
        
        <button type="submit">Submit</button>
        <button onClick={handleCancel}>Cancel</button>
        </form>
        
        <ErrorAlert error={tableError} />
        <ErrorAlert error={reservationError} />
        </div>
    
    )
}

export default SeatTable;