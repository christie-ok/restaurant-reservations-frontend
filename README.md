#Periodic Tables: Restaurant Reservation System
Thank you for viewing this repo. This is my final project for Thinkful's Software Engineering program. The PERN stack is used in this application, including but not limited to: PostgreSQL, Express.js, React.js, Node.js, and Knex.js.


##LINK TO LIVE APPLICATION LINK TO LIVE APPLICATION

##API Documentation
###/reservations

GET: ?date=YYYY-MM-DD
Returns a list of reservations for the specific date.

GET: ?mobile_number={phone_number}
Returns a list of reservations that at least partially match the number query.


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




Documentation of your API
Screenshots of your application. This makes your application description much easier to understand.
A summary section that concisely explains what your application does. Try to frame this from the standpoint of what the user does, or how the application benefits the user.
A section on the technology used
Installation instructions