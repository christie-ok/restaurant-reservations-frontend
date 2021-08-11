# Periodic Tables: Restaurant Reservation System
Thank you for viewing this repo. This is my final project for Thinkful's Software Engineering program. The PERN stack is used in this application, including but not limited to: PostgreSQL, Express.js, React.js, Node.js, and Knex.js.


## LINK TO LIVE APPLICATION LINK TO LIVE APPLICATION

## API Documentation
### /reservations

GET: ?date=YYYY-MM-DD
Returns a list of reservations for the specific date.

GET: ?mobile_number={phone_number}
Returns a list of reservations that at least partially match the number query.

Shape of response from both requests above:

    {
        "data": [
            {
                "reservation_id": 49,
                "created_at": "2021-08-11T16:59:07.302Z",
                "updated_at": "2021-08-11T16:59:07.302Z",
                "first_name": "Rick",
                "last_name": "Sanchez",
                "mobile_number": "9258189750",
                "reservation_date": "2021-08-11T07:00:00.000Z",
                "reservation_time": "12:00:00",
                "people": 2,
                "status": "Booked"
            },
            {
                "reservation_id": 50,
                "created_at": "2021-08-11T16:59:42.263Z",
                "updated_at": "2021-08-11T16:59:42.263Z",
                "first_name": "Morty",
                "last_name": "Smith",
                "mobile_number": "9253775254",
                "reservation_date": "2021-08-11T07:00:00.000Z",
                "reservation_time": "13:00:00",
                "people": 4,
                "status": "Booked"
            }
        ]
    }

POST
Post route requires a request body which should look like this:
    request: {
        body: {
            data: {
                "first_name": "Bird",
                "last_name": "Person",
                "mobile_number": "9258189750",
                "reservation_date": "2021-08-11T07:00:00.000Z",
                "reservation_time": "12:00:00",
                "people": 2,
                "status": "Booked"
            }
        }
    }
Data validation for requests.  Descriptive error responses will display if request does not pass data validation.
- Date must be in the format YYYY-MM-DD.
- Date must occur either on the current day or in the future.
- Date cannot be a Tuesday.
- The time must be in 24H (HH:MM) format. Also, if the date property is on today's date, the time must not have passed on that day when the request is made.
- People must be an integer greater than 0.

Returns status 201 and the created reservation object.

### /reservations/:reservation_id
GET
As long as the reservation defined in the request URL exists, it will return the reservation object.
    {
        reservation_id: 7,
        first_name: "Summer",
        last_name: "Smith",
        mobile_number: "777-888-9999",
        reservation_date: "2022-03-12",
        reservation_time: "11:30",
        people: 2,
        status: "booked"
    }

PUT
A request body is required.  The body of the request should look like this:
    data: {
        first_name: "Beth",
        last_name: "Sanchez Smith",
        mobile_number: "123-123-1231",
        reservation_date: "2021-07-26",
        reservation_time: "18:00",
        people: 2,
        status: "booked"
    }
Returns status 200 and the updated reservation.

### /reservations/:reservation_id/status
PUT
The body of the request should look like this:
    data: {status: "booked"}
Returns status 200 and the updated reservation object.

### /tables
GET
Returns a list of all tables in the database.
    {
        "data": [
            {
                "table_id": 15,
                "table_name": "#1",
                "capacity": 6,
                "reservation_id": null
            },
            {
                "table_id": 16,
                "table_name": "#2",
                "capacity": 6,
                "reservation_id": null
            },
            ...
        ]
    }

POST
Post requires request body which must look like this:
    data : {
        table_name: "#7",
        capacity: 6,
        reservation_id: 12
    }
Data validation:
- table_name must be a string greater than one character.
- capacity must be an integer greater than 0.
- reservation_id is optional, but if one is passed, it must be the ID of a reservation that does exist in the database.

Returns 201 and the created table.

### /tables/:table_id
GET
If the table defined in the request URL exists, it returns the table object which looks like this:
    data: {
        table_id: 12,
        table_name: "Bar #4",
        capacity: 3,
        reservation_id: null
    }

### /tables/:table_id/seat
PUT
The table will be updated with the reservation_id passed.
Request body looks like this:
    data: { reservation_id: 12 }
Data validation:
- table_id exists
- reservation_id exists
- table is not currently occupied
- reservation is booked (not seated, finished, or cancelled)

When the table is updated with a reservation_id, the reservation matching that id's status is updated to "seated".
Returns status 200 and the updated reservation (not the table).
    data: {
        reservation_id: 5,
        first_name: "Jerry",
        last_name: "Smith,
        mobile_number: "981-123-4567",
        reservation_date: "2007-04-20",
        reservation_time: "18:00",
        people: 6,
        status: "seated"
    }

DELETE
As long as the table exists, any reservation status will be nullified.
    data: {
        reservation_id: 62,
        first_name: "Mister",
        last_name: "Nimbus",
        mobile_number: "505-737-4253",
        reservation_date: "2030-09-25",
        reservation_time: "14:00",
        people: 1,
        status: "finished"
    }
Returns status 200 and the updated reservation.

## React Application
### /dashboard
The /dashboard route displays all tables and the reservations that are schedules for the current date. If a reservation has been completed or canceled, it will not be displayed.

![screenshot](/images/dashboard.png)



Screenshots of your application. This makes your application description much easier to understand.
A summary section that concisely explains what your application does. Try to frame this from the standpoint of what the user does, or how the application benefits the user.
A section on the technology used
Installation instructions