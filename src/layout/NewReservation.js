import React from "react";
import { useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";

function NewReservation() {
    
    return (
        <div>
            <h5>New Reservation</h5>
           <ReservationForm reservation_id={null} /> 
        </div>
    )
}



export default NewReservation;