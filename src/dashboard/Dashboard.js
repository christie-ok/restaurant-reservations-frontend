import React, { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom";
import { cancelReservation, listReservations, listTables, freeUpTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";
import TableList from "./TableList";
import ReservationList from "./ReservationList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const urlDate = useLocation().search.slice(6);
  date = urlDate ? urlDate : today();

  //UPON LOADING AND ANYTIME THE DATE CHANGES, RUN EFFECT TO RELOAD RESERVATION AND TABLE DATA.
  useEffect(() => {
    async function loadDashboard() {
      const abortController = new AbortController();
      setReservationsError(null);
      setTablesError(null);
      
     await listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
      
      await listTables()
        .then(setTables)
        .catch(setTablesError)
  
      return () => abortController.abort();
    };
    loadDashboard();
  }, [date])
  
  async function finishClickHandler({target}) {
    const result = window.confirm("Is this table ready to seat new guests? This cannot be undone.");
    if (result) {
        const table_id = target.parentNode.id;

//REMOVES RESERVATION ID FROM TABLE
        await freeUpTable(table_id)
          .then(listTables)
          .then(setTables);

//RELISTS RESEREVATIONS REMOVING FINISH RESERVATION
        await listReservations({date})
          .then(setReservations);
}
}

async function handleCancel({target}) {
  const result = window.confirm("Do you want to cancel this reservation? This cannot be undone.");
  if (result) {
    const reservation_id = target.parentNode.id;
    //CANCELS RESERVATION AND RELISTS ALL RESERVATIONS WITHOUT THE CANCELLED ONE.
    await cancelReservation(reservation_id);
    await listReservations({date})
    .then(setReservations);
  }
}

  return (
    <main>
      <h4>Dashboard</h4>
      <div className="d-md-flex mb-3">
        <h5 className="mb-0">Reservations for {date}</h5>
      </div>
      <div>
      <Link to={`/dashboard?date=${previous(date)}`}><button className="btn">Previous</button></Link>
      <Link to="/dashboard"><button className="btn">Today</button></Link>
      <Link to={`/dashboard?date=${next(date)}`}><button className="btn">Next</button></Link>
      </div>
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      <ReservationList reservations={reservations} handleCancel={handleCancel} />
      <TableList date={date} finishClickHandler={finishClickHandler} tables={tables} />
    </main>
  );
}

export default Dashboard;
