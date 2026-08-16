const adminRepository=require('../repository/admin.repository')

const getDashboardData=async(email)=>{
    const totalFlights=await adminRepository.getFlightCount();
    const totalUsers=await adminRepository.getUserCount();
    const totalBookings=await adminRepository.getBookingsCount();
    const totalRevenue=await adminRepository.getTotalRevenue();
    const recentActions=await adminRepository.recentActions(email);
    const result={
        totalFlights:totalFlights,
    totalUsers:totalUsers,
    totalBookings:totalBookings,
    totalRevenue:totalRevenue,
    recentActions:recentActions
    }
    return result;
}

const getAllFlights = async ({ page, size }) => {

    const flights =
        await adminRepository.getFlights(
            page,
            size
        );

    const totalRecords =
        await adminRepository.getFlightCount();

    return {

        flights,

        totalRecords,

        currentPage: Number(page),

        totalPages: Math.ceil(
            totalRecords / size
        )

    };

};

const getFlightsByFilter = async ({ page, size,searchText,sortBy }) => {

    const flights =
        await adminRepository.getFlightsByFilter(
            page,
            size,
            searchText,
            sortBy
        );

    const totalRecords =
        await adminRepository.getFlightCount();

    return {

        flights,

        totalRecords,

        currentPage: Number(page),

        totalPages: Math.ceil(
            totalRecords / size
        )

    };

};
const updateFlight = async (
    flightId,
    flight,
    updatedBy
) => {

    const result =
        await adminRepository.updateFlight(
            flightId,
            flight,
    updatedBy

        );

    if (result.affectedRows === 0) {

        throw {
            statusCode: 404,
            message: 'Flight not found'
        };

    }

    return result;
};

const deleteFlight = async (
    flightId
) => {

    const result =
        await adminRepository.deleteFlight(
            flightId
        );

    if (result.affectedRows === 0) {

        throw {
            statusCode: 404,
            message: 'Flight not found'
        };

    }

    return result;
};

const createFlight=async(flight,createdBy)=>{
    const flightId=await  adminRepository.createFlight(flight,createdBy)
    if(flightId<0){
        throw{
            statusCode:405,
            message:'Something went wrong'
        }
    }
    return flightId;
}


////////////////////////////manage_users service/////////////
const getAllUsers=async({page,size,sortBy})=>{
return await adminRepository.getAllUsers(page,size,sortBy);
}

const searchUsers=async({page,size,searchText,sortBy})=>{
return await adminRepository.searchUsers(page,size,searchText,sortBy);
}

const updateUser=async(userId,user)=>{
    const result=await adminRepository.updateUser(userId,user);
    if(result.affectedRows===0){
        throw {
            statusCode:404,
            message:'User not found'
        }
    }
    return result;
}


////////////////////////report service///////////////
const getReportSummary=async()=>{
    const totalFlights=await adminRepository.getFlightCount();
    const totalUsers=await adminRepository.getUserCount();
    const totalBookings=await adminRepository.getBookingsCount();
    const totalRevenue=await adminRepository.getTotalRevenue();

    const result={
        totalFlights:totalFlights,
    totalUsers:totalUsers,
    totalBookings:totalBookings,
    totalRevenue:totalRevenue
    }
    return result;
}
const getRevenue=async()=>{
    const result=await adminRepository.getRevenue();
    return result;
}

const getRevenueByFilterDate=async(from,to)=>{
    const result=await adminRepository.getRevenueByFilterDate(from,to);
    return result;
}
const getTopPerformerFlight=async()=>{
    const result=await adminRepository.getTopPerformerFlight();
    return result;
}

const getTopPerformerFlightByDate=async(from,to)=>{
    const result=await adminRepository.getTopPerformerFlightByDate(from,to);
    return result;
}


module.exports={
    getDashboardData,

    getAllFlights,
    getFlightsByFilter,
    updateFlight,
    deleteFlight,
    createFlight,

    getAllUsers,
    searchUsers,
    updateUser,

    getReportSummary,
    getRevenue,
    getRevenueByFilterDate,
    getTopPerformerFlight,
    getTopPerformerFlightByDate,
}