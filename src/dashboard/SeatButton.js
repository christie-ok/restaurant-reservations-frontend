import React from "react";

function SeatButton({status, reservation_id}) {
//RENDERS SEAT BUTTON ONLY IF RESERVATION STATUS IS BOOKED
    return (status === "Booked") && (
        <a href={`/reservations/${reservation_id}/seat`} hidden={status !== "Booked"}><button type="submit" class="btn">Seat</button></a>

    )
}

export default SeatButton;