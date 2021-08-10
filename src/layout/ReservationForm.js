import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {postReservation, updateReservation, readReservation} from "../utils/api";
import formatReservationDate from "../utils/format-reservation-date";
import ErrorAlert from "../layout/ErrorAlert";


function ReservationForm({reservation_id}) {
//SETS STATE AS EMPTY RESERVATION
    const [reservation, setReservation] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0
    });

    const [dayOfWeekError, setdayOfWeekError] = useState(null);
    const [pastDateError, setPastDateError] = useState(null);
    const [validTimeError, setValidTimeError] = useState(null);
    const history = useHistory();
    const path = useLocation().pathname;
    
    //UPON LOADING AND ANYTIME THE RESERVATIONID CHANGES, RELOAD RESERVATION INFO
    useEffect(() => {
        async function readRes() {
            if (reservation_id) {
                const res = await readReservation(reservation_id);
                setReservation(formatReservationDate(res))
            }
        }
        readRes();
    }, [reservation_id]);

    //CHANGE HANDLER FOR UPDATING RESERVATION
    function changeHandler({target}) {
        setReservation({
            ...reservation,
            [target.name]: target.value
        });
    };

    //CREATES NEW RESERVATION
    async function submitHandler(event) {
        event.preventDefault();
        const abortController = new AbortController();

        //CLEAR ANY EXISTING STATE ERRORS
        setPastDateError(null)
        setValidTimeError(null)
        setdayOfWeekError(null)
        
        const date = reservation.reservation_date;
        const time = reservation.reservation_time;
        
            //VALIDATE NEW RESERVATION DATE IS NOT TUESDAY OR IN THE PAST
            if (dateIsTuesday(date) && pastDateTime(date, time)) {
                setdayOfWeekError({message: "Restaurant Closed Tuesdays."});
                setPastDateError({message: "Reservations must be in the future."})
                return;
            }
            if(dateIsTuesday(date)) {
                setdayOfWeekError({message: "Restaurant Closed Tuesdays."});
                return;
            }
            
            if(pastDateTime(date, time)) {
                setPastDateError({message: "Reservations must be in the future."});
                return;
            };

        //VALIDATE NEW RESERVATION TIME IS DURING OPEN HOURS
        if (!timeIsValid(time)) {
            setValidTimeError({message: `Restaurant is not open at ${time}`});
            return;
        }

        //IF DATE VALID, SAVE/UPDATE RES  
        if (path === "/reservations/new") {
            await postReservation(reservation);
        } else {
            await updateReservation(reservation);
        }
        history.push(`/dashboard?date=${reservation.reservation_date}`);
        
        return () => abortController.abort();
    };

    //RETURNS TRUE IF RESERVATION DAY IS A TUESDAY
    function dateIsTuesday(date) {
        const current = new Date(date);
        const utcDate = new Date(current.toUTCString());
        utcDate.setHours(utcDate.getHours()+8);
        const usDate = new Date(utcDate)

        return usDate.getDay() === 2;
    };

    //RETURNS TRUE IF RESERVATION IS IN THE PAST
    function pastDateTime(date, time) {
        const event = new Date(`${date} ${time} PDT`);
        const now = new Date();
        
        return (now >= event)
    };

    //RETURNS TRUE IF THE RESERVATION TIME IS DURING OPEN HOURS
    function timeIsValid(time) {
        return ("10:30" <= time && time <= "21:30")
    }

    function handleCancel() {
        history.goBack();
    };

    return (
        <div>
        <form class="form-group" onSubmit={submitHandler}>
                <label>First Name: </label>
                    <input class="form-control" type="text" name="first_name" required="required" value={reservation.first_name} onChange={changeHandler} />
                
                <label>Last Name:</label>
                    <input class="form-control" type="text" name="last_name" required="required" value={reservation.last_name} onChange={changeHandler} />
                
                <label>Mobile Number:</label>
                    <input class="form-control" type="tel" name="mobile_number" required="required" value={reservation.mobile_number} onChange={changeHandler} />
                
                <label>Date of Reservation:</label>
                 <input class="form-control" type="date" name="reservation_date"  required="required" value={reservation.reservation_date} onChange={changeHandler} />
                
                <label>Time of Reservations:</label>
                 <input class="form-control" type="time" name="reservation_time" required="required" value={reservation.reservation_time} onChange={changeHandler} />
                
                <label>Number of People:</label>
                 <input class="form-control" type="number" min="1" name="people" required="required" value={reservation.people} onChange={changeHandler} />
                
                <button type="submit">Submit</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>
            <ErrorAlert error={dayOfWeekError} />
            <ErrorAlert error={pastDateError} />
            <ErrorAlert error={validTimeError} />
            </div>
    )
}

export default ReservationForm;