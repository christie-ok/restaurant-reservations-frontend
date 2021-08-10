import React from "react";
import SeatButton from "./SeatButton";
import redX from "./redX.png";


function ReservationList({reservations, handleCancel}) {
//IF NO EXISTING RESERVATIONS, RETURN "NO RESERVATIONS FOUND"
  if (reservations.length === 0) return (
    <div class="d-flex justify-content-center">
      <img src={redX} alt="redX" width="20" height="20" />
  <p>No reservations found</p>
  <img src={redX} alt="redX" width="20" height="20" />
  </div>
  )
//IF RESERVATIONS EXIST, LIST THEM WITH ALL DATA POINTS
    return ( reservations.length > 0 && (
<ul class="reservations-group">
        {
          reservations.map((reservation) => {
            const {reservation_id, first_name, last_name, people, reservation_date, reservation_time, status} = reservation;
            return (
              <li key={reservation_id} id={reservation_id} class="reservations-item">
                <table class="reservations-item-group">
                  <tr>
                    <th>Name:</th>
                    <td>{`${first_name} ${last_name}`}</td>
                  </tr>
                  <tr>
                    <th>Date/Time:</th>
                    <td>{`${reservation_date} at ${reservation_time}`}</td>
                  </tr>
                  <tr>
                    <th>People:</th>
                    <td>{people}</td>
                  </tr>
                  <tr>
                    <th>Status:</th>
                    <td data-reservation-id-status={reservation.reservation_id}>{status}</td>
                  </tr>
                </table>
                <div class="reservations-item-group">
                <SeatButton reservation_id={reservation_id} status={status}  />
                <a href={`/reservations/${reservation_id}/edit`}><button class="btn" type="button">Edit</button></a>
                <button class="btn" data-reservation-id-cancel={reservation.reservation_id} onClick={handleCancel} type="button">Cancel</button>
                </div>
              </li>
              )
            })
          }       
      </ul>
    )
    )
}

export default ReservationList;