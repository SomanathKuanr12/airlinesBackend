
const { pool }=require('../config/db');
///Dashboard Service
const getFlightCount=async()=>{
    const query=`SELECT COUNT(flight_no) as totalFlights
                FROM flight_details
                WHERE flight_status='ACTIVE'`;
    const [count]=await pool.execute(query);
    return count;
}
const getBookingsCount=async()=>{
        const query=`SELECT COUNT(pnr_no) as totalBookings
                FROM booking_details`;
    const [count]=await pool.execute(query);
    return count;
}
const getUserCount=async()=>{
        const query=`SELECT COUNT(email) as totalUsers
                FROM user_admin_details
                WHERE role="USER"`;
    const [count]=await pool.execute(query);
    return count;
}
const getTotalRevenue=async()=>{
        const query=`SELECT SUM(total_revenue) as totalRevenue
                FROM revenue_details`;
    const [count]=await pool.execute(query);
    return count;
}
const recentActions=async(email)=>{
        const query=`SELECT action
                FROM recent_actions
                WHERE performed_by=?`;
    const [actions]=await pool.execute(query,[email]);
    return actions;
}

//FlightService
const getFlights = async (page, size) => {

    const offset =
        (page - 1) * size;

    const query = `
        SELECT flight_no,source,destination,journey_date,departure_time,arrival_time,b_class_total_seat,b_class_booked_seat,b_class_fare,e_class_total_seat,e_class_booked_seat,e_class_fare
        FROM flight_details
        WHERE flight_status='ACTIVE'
        LIMIT ?
        OFFSET ?
    `;

    const [rows] =
        await pool.execute(
            query,
            [size, offset]
        );

    return rows;

};

const getFlightsByFilter = async (
    page,
    size,
    searchText,
    sortBy
) => {

    const offset =
        (page - 1) * size;

    const allowedSortColumns = [
        'journey_date',
        'departure_time',
        'arrival_time',
        'e_class_fare',
        'b_class_fare'
    ];

    const orderBy =
        allowedSortColumns.includes(sortBy)
            ? sortBy
            : 'journey_date';

    const query = `
        SELECT
            flight_no,
            source,
            destination,
            journey_date,
            departure_time,
            arrival_time,
            b_class_total_seat,
            b_class_booked_seat,
            b_class_fare,
            e_class_total_seat,
            e_class_booked_seat,
            e_class_fare
        FROM flight_details
        WHERE flight_status='ACTIVE'
        AND source = ?
        AND destination = ?
        AND journey_date = ?
        ORDER BY ${orderBy}
        LIMIT ?
        OFFSET ?
    `;

    const [rows] =
        await pool.execute(
            query,
            [
                searchText.source||null,
                searchText.destination||null,
                searchText.date||null,
                size,
                offset
            ]
        );

    return rows;

};

const getFlightCountByFilter=async(searchText)=>{
    const query=`SELECT COUNT(flight_no) as totalFlights
                FROM flight_details
                 WHERE flight_status='ACTIVE'
                    AND source = ?
                    AND destination = ?
                    AND journey_date = ?`;
    const [count]=await pool.execute(query,[
                searchText.source||null,
                searchText.destination||null,
                searchText.date||null]);
    return count[0].totalFlights;
}

const updateFlight = async (
    flightId,
    flight,
    updatedBy
) => {
   // console.log(flightId);
    
    const timestamp=new Date();
    const query = `
        UPDATE flight_details
        SET
            flight_no = ?,
            source = ?,
            destination = ?,
            journey_date = ?,
            departure_time = ?,
            arrival_time = ?,
            b_class_total_seat = ?,
            b_class_booked_seat = ?,
            b_class_fare = ?,
            e_class_total_seat = ?,
            e_class_booked_seat = ?,
            e_class_fare = ?,
            last_updated_by=?
        WHERE flight_id=?;`;

    const [result] =
        await pool.execute(
            query,
            [
                flight.flight_no,
                flight.source,
                flight.destination,
                flight.journey_date,
                flight.departure_time,
                flight.arrival_time,
                flight.b_class_total_seat,
                flight.b_class_booked_seat,
                flight.b_class_fare,
                flight.e_class_total_seat,
                flight.e_class_booked_seat,
                flight.e_class_fare,
                updatedBy,
                flightId
            ]
        );

    return result;
};

const cancelFlight = async (
    flightId,
    canceledBy
) => {

    const query = `
        UPDATE  flight_details
        SET flight_status='CANCELED',
        canceled_by=?
        WHERE flight_id = ?
    `;

    const [result] =
        await pool.execute(
            query,
            [canceledBy,flightId]
        );

    return result;
};

const createFlight=async(flight,createdBy)=>{
    const journeyDate = new Date(flight.journey_date)
    .toISOString()
    .split('T')[0]; // gives YYYY-MM-DD

    const query=`INSERT INTO flight_details(
            flight_no,
            source,
            destination,
            journey_date,
            departure_time,
            arrival_time,
            b_class_total_seat,
            b_class_booked_seat,
            b_class_fare,
            e_class_total_seat,
            e_class_booked_seat,
            e_class_fare,
            created_by)
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?);`
    const [result]=await pool.execute(
        query,
        [
                flight.flight_no,
                flight.source,
                flight.destination,
                journeyDate,
                flight.departure_time,
                flight.arrival_time,
                flight.b_class_total_seat,
                flight.b_class_booked_seat,
                flight.b_class_fare,
                flight.e_class_total_seat,
                flight.e_class_booked_seat,
                flight.e_class_fare,
                createdBy
            ]);
            return result.insertId;
}

// {
//   "flight_no": "AI604",
//   "source": "MAA",
//   "destination": "BBI",
//   "journey_date": "2027-07-22",
//   "departure_time": "22:40:00",
//   "arrival_time": "21:30:00",
//   "b_class_total_seat": 40,
//   "b_class_booked_seat": 0,
//   "b_class_fare": 7650,
//   "e_class_total_seat": 120,
//   "e_class_booked_seat": 0,
//   "e_class_fare": 5600,
//   "created_by": "soma@ai.com"
// }


///////////////manage_user repository//////////////////
const getAllUsers=async(page,size,role,sortBy)=>{
    const allowedSortColumns = ['name', 'email', 'status']; 
    const orderBy = allowedSortColumns.includes(sortBy)? sortBy: 'name';
    const offset=(page-1)*size;
    const query=`SELECT
    u.user_id,
    u.name,
    u.email,
    u.phone_no,
    u.status,
    COUNT(pnr_no) AS totalBooking
FROM user_admin_details u
LEFT JOIN booking_details b
    ON u.email = b.booking_by
    WHERE u.role=?
GROUP BY
    u.user_id,
    u.name,
    u.email,
    u.phone_no,
    u.status
ORDER BY ${orderBy} ASC
LIMIT ?
OFFSET ?;`
        const userCountQuery=`SELECT COUNT(*) 
                            AS totalRecords
                            FROM user_admin_details
                            WHERE role=?;`
        const [users]=await pool.execute(query,[role,size,offset]);    
        const [countResult]=await pool.execute(userCountQuery,[role]);
        const result={
            users,
            totalRecords: countResult[0].totalRecords,
            currentPage:Number(page),
            totalPages:Math.ceil(countResult[0].totalRecords/size)
        }
        return result;
        
}

const searchUsers=async(page,size,searchText,role,sortBy)=>{
    const allowedSortColumns = ['name', 'email', 'status']; 
    const orderBy = allowedSortColumns.includes(sortBy)? sortBy: 'name';
    const offset=(page-1)*size;
    const query=`SELECT
    u.user_id,
    u.name,
    u.email,
    u.phone_no,
    u.status,
    COUNT(b.pnr_no) AS totalBooking
FROM user_admin_details u
LEFT JOIN booking_details b
    ON u.email = b.booking_by
WHERE u.email=?
AND u.role=?
GROUP BY
    u.user_id,
    u.name,
    u.email,
    u.phone_no,
    u.status
ORDER BY ${orderBy} ASC
LIMIT ?
OFFSET ?;`
        const userCountQuery=`SELECT COUNT(*) 
                            AS totalRecords
                            FROM user_admin_details
                            WHERE email=?
                            AND role=?;`
        const [users]=await pool.execute(query,[searchText,role,size,offset]);    
        const [countResult]=await pool.execute(userCountQuery,[searchText,role]);
        const result={
            users,
            totalRecords: countResult[0].totalRecords,
            currentPage:Number(page),
            totalPages:Math.ceil(countResult[0].totalRecords/size)
        }
        return result;
        
}

const updateUser=async(userId,user)=>{
    const userQery=`UPDATE user_admin_details
                    SET 
                        name=?,
                        email=?,
                        phone_no=?,
                        status=?
                    WHERE user_id=?;
                `
    const bookingQuery=`UPDATE booking_details
                        SET 
                            booking_by=?
                        WHERE user_id=?;`
        const [userUpdateResult]=await pool.execute(userQery,[user.name,user.email,user.phone_no,user.status,userId])
        
        if(userUpdateResult.affectedRows===1){
            const [bookingUpdateResult]=await pool.execute(bookingQuery,[user.email,userId])
        }     
        return userUpdateResult;
}

/////////////////////////report repository/////////
const getRevenue=async()=>{
    const query=`SELECT date,total_booking,total_revenue
                FROM revenue_details
                ORDER BY date asc`
    const [result]=await pool.execute(query);
    return result;
}

const getRevenueByFilterDate = async (
    from,
    to
) => {

const query = `
    SELECT
        date,
        total_booking,
        total_revenue
    FROM revenue_details
    WHERE date BETWEEN ? AND ?
    ORDER BY date ASC
`;

    const [rows] =
        await pool.execute(
            query,
            [from, to]
        );

    return rows;

};

const getTopPerformerFlight = async () => {

    const query = `
        SELECT
            flight_no,
            SUM(total_booking) AS totalBooking,
            SUM(total_revenue) AS totalRevenue
        FROM flight_revenue_details
        GROUP BY flight_no
        ORDER BY totalRevenue DESC
    `;

    const [rows] = await pool.execute(query);

    return rows;
};

const getTopPerformerFlightByDate = async (
    from,
    to
) => {
    const query = `
        SELECT
            flight_no,
            SUM(total_booking) AS totalBooking,
            SUM(total_revenue) AS totalRevenue
        FROM flight_revenue_details
        WHERE journey_date BETWEEN ? AND ?
        GROUP BY flight_no
        ORDER BY totalRevenue DESC
    `;
    

    const [rows] =
        await pool.execute(
            query,
            [from, to]
        );

    return rows;

};


module.exports={
    getBookingsCount,
    getFlightCount,
    getTotalRevenue,
    getUserCount,
    recentActions,

    getFlights,
    getFlightsByFilter,
    getFlightCountByFilter,
    updateFlight,
    cancelFlight,
    createFlight,

    getAllUsers,
    searchUsers,
    updateUser,

    getRevenue,
    getRevenueByFilterDate,
    getTopPerformerFlight,
    getTopPerformerFlightByDate,
}
