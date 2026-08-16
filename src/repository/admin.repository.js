
const { pool }=require('../config/db');
///Dashboard Service
const getFlightCount=async()=>{
    const query=`SELECT COUNT(flght_no)
                FROM flight_details`;
    const [count]=await pool.execute(query);
    return count;
}
const getBookingsCount=async()=>{
        const query=`SELECT COUNT(pnr_no)
                FROM booking_details`;
    const [count]=await pool.execute(query);
    return count;
}
const getUserCount=async()=>{
        const query=`SELECT COUNT(email)
                FROM user_admin_details
                WHERE role="USER"`;
    const [count]=await pool.execute(query);
    return count;
}
const getTotalRevenue=async()=>{
        const query=`SELECT SUM(revenue)
                FROM revenue_details`;
    const [count]=await pool.execute(query);
    return count;
}
const recentActions=async(email)=>{
        const query=`SELECT action
                FROM recent_action_details
                WHERE performed_by=`;
    const [actions]=await pool.execute(query,email);
    return actions;
}

//FlightService
const getFlights = async (page, size) => {

    const offset =
        (page - 1) * size;

    const query = `
        SELECT flight_no,source,destination,journey_date,departure_time,arrival_time,b_class_total_seat,b_class
 _booked_seat,b_class_fare,e_class_total_seat,e_class_booked_seat,e_class_fare
        FROM flight_details
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
        WHERE source = ?
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
                searchText.source,
                searchText.destination,
                searchText.date,
                size,
                offset
            ]
        );

    return rows;

};

const updateFlight = async (
    flightId,
    flight,
    updatedBy
) => {
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
            last_updated_by=?,
        WHERE flight_id = ?
    `;

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

const deleteFlight = async (
    flightId
) => {

    const query = `
        DELETE FROM flight_details
        WHERE flight_id = ?
    `;

    const [result] =
        await pool.execute(
            query,
            [flightId]
        );

    return result;
};

const createFlight=async(flight,createdBy)=>{
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
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?);`
    const [result]=await pool.execute(
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
                createdBy
            ]);
            return result.insertId;
}


///////////////manage_user repository//////////////////
const getAllUsers=async(page,size,sortBy)=>{
    const orderBy = allowedSortColumns.includes(sortBy)? sortBy: 'name';
    const offset=(page-1)*size;
    const query=`SELECT
    u.user_id,
    u.name,
    u.email,
    u.phone_no,
    u.status,
    COUNT(b.booking_id) AS totalBooking
FROM user_admin_details u
LEFT JOIN booking_details b
    ON u.email = b.booking_by
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
                            FROM user_admin_details;`
        const [users]=await pool.execute(query,[size,offset]);    
        const [countResult]=await pool.execute(userCountQuery);
        const result={
            users,
            totalRecords: countResult[0].totalRecords,
            currentPage:Number(size),
            totalPages:Math.ceil(totalRecords/size)
        }
        return result;
        
}

const searchUsers=async(page,size,searchText,sortBy)=>{
    const orderBy = allowedSortColumns.includes(sortBy)? sortBy: 'name';
    const offset=(page-1)*size;
    const query=`SELECT
    u.user_id,
    u.name,
    u.email,
    u.phone_no,
    u.status,
    COUNT(b.booking_id) AS totalBooking
FROM user_admin_details u
LEFT JOIN booking_details b
    ON u.email = b.booking_by
WHERE u.email=?
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
                            WHERE email=?;`
        const [users]=await pool.execute(query,[searchText,size,offset]);    
        const [countResult]=await pool.execute(userCountQuery,[searchText]);
        const result={
            users,
            totalRecords: countResult[0].totalRecords,
            currentPage:Number(size),
            totalPages:Math.ceil(totalRecords/size)
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
                    WHERE userId=?;
                `
    const bookingQuery=`UPDATE booking_details
                        SET 
                            booking_by=?
                        WHERE userId=?;`
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
        WHERE date BETWEEN ? AND ?
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
    updateFlight,
    deleteFlight,
    createFlight,

    getAllUsers,
    searchUsers,
    updateUser,

    getRevenue,
    getRevenueByFilterDate,
    getTopPerformerFlight,
    getTopPerformerFlightByDate,
}
