import React from "react";
import {useParams} from "react-router-dom";
import ReservationForm from "./ReservationForm";

function EditReservation() {
    const reservation_id = useParams().reservation_id;
    
    return (
        <div>
            <h2>Edit Reservation</h2>
            <ReservationForm reservation_id={reservation_id} />
        </div>
    )


}

export default EditReservation;