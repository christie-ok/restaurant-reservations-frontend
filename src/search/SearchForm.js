import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import {findReservationByMobileNumber, updateReservationStatus} from "../utils/api"
import ReservationList from "../dashboard/ReservationList";


function SearchForm() {
    const history = useHistory();
    const [mobile, setMobile] = useState("");
    const [matches, setMatches] = useState([]);

    const changeHandler = (event) => setMobile(event.target.value);

    async function searchHandler(event) {
        event.preventDefault();
        //RETURNS ALL RESERVATIONS WITH PHONE NUMBER THAT MATCHES INPUT
        const matches = await findReservationByMobileNumber(mobile);
        setMatches(matches)
    }

    async function handleCancel({target}) {
        const result = window.confirm("Do you want to cancel this reservation? This cannot be undone.");
        if (result) {
          const reservation_id = target.parentNode.id;
        //CANCELS EXISTING RESERVATION
          await updateReservationStatus(reservation_id, "cancelled");
          
          history.push(`/`)
        }
      }

    return (
        <div class="search-form">
    <form class="search-form-item">
        <label>
            Mobile Number: <input type="tel" id="mobile_number" name="mobile_number" placeholder="Enter a customer's phone number" onChange={changeHandler} value={mobile} />
        </label>
        <button class="search-form-item btn btn-outline-primary" onClick={searchHandler} type="submit">Find</button>
    </form>
        <div class="search-form-item" id="placeholder"></div>
    <ReservationList reservations={matches} handleCancel={handleCancel} />
    </div>
    )
}

export default SearchForm;