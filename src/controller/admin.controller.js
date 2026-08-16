const adminService =require('../services/admin.service');

const getDashboardData = async (
    req,
    res,
    next
) => {
try{
    const email = req.user.email;

    console.log(email);

    const result =
        await adminService.getDashboardData(
            email
        );

    return res.status(200).json({
        status: 'SUCCESS',
        message: 'Data Fetched Successfully',
        data: result
    });
}catch(err){
    next(err);
}

};

const getAllFlights = async (req,res,next) => {
    try {

        const page =Number(req.query.page) || 1;
        const size =Number(req.query.size) || 10;

const result = await adminService.getAllFlights({page,size});
            res.status(200).json({
            status: 'SUCCESS',
            message:'Flights fetched successfully',
            data: result.flights,
            totalRecords:result.totalRecords,
            currentPage:result.currentPage,
            totalPages:result.totalPages
        });
    } catch (error) {
        next(error);
    }
};

const getFlightsByFilter = async (req,res,next) => {
    try {

        const page =Number(req.query.page) || 1;
        const size =Number(req.query.size) || 10;
        const source=req.query.source
        const destination=req.query.destination
        const date=req.query.journey_date

        const sortBy=req.query.sortBy || 'journey_date'
        const searchText={
            source:source,
            destination:destination,
            date:date
        }

const result = await adminService.getFlightsByFilter({page,size,searchText,sortBy});
            res.status(200).json({
            status: 'SUCCESS',
            message:'Flights fetched successfully',
            data: result.flights,
            totalRecords:result.totalRecords,
            currentPage:result.currentPage,
            totalPages:result.totalPages
        });
    } catch (error) {
        next(error);
    }
};

const updateFlight=async(req,res,next)=>{
    try{
        const flightId=req.params.flightId;
        const flight=req.body
        const updatedBy=req.user.email
        const result=await adminService.updateFlight(flightId,flight,updatedBy);
        res.status(200).json({
            status:'SUCCESS',
            message:'Flight Updated Successfully'
        })
    }catch(error){
        next(error);
    }
}

const cancelFlight = async (
    req,
    res,
    next
) => {
  
    try {
          const canceledBy=req.user.email
        const flightId =
            req.params.flightId;

        const result =
            await adminService.cancelFlight(
                flightId,
                canceledBy
            );

        res.status(200).json({

            status: 'SUCCESS',

            message:
                'Flight canceled successfully',


        });

    } catch (error) {

        next(error);

    }

};
const createFlight=async(req,res,next)=>{
    try{
        const createdBy=req.user.email;
        const flightId=await adminService.createFlight(req.body,createdBy);
        res.status(200).json({
            status:'SUCCESS',
            message:`Flight Created Successfully with id ${flightId}`
        })
    }catch(err){
        next(err);
    }
}


////////////////////////////////manage user controller////////////////

const getAllUsers=async(req,res,next)=>{
    try{
        const page=Number(req.query.page) ||1
        const size=Number(req.query.size) ||10
        const sortBy=req.query.sortBy ||'name'
        const role=req.query.role ||'USER'
        const result=await adminService.getAllUsers({page,size,role,sortBy});
        return res.status(200).json({
            status:'SUCCESS',
            message:'User fetched Successfully',
            data:result.users,
            totalRecords:result.totalRecords,
            currentPage:result.currentPage,
            totalPages:result.totalPages
        })
    }catch(err){
        next(err);
    }
}

const searchUsers=async(req,res,next)=>{
    try{
        const page=Number(req.query.page) ||1
        const size=Number(req.query.size) ||10
        const sortBy=req.query.sortBy ||'name'
        const role=req.query.role ||'USER'
        const searchText=req.query.searchText
        const result=await adminService.searchUsers({page,size,searchText,role,sortBy});
        return res.status(200).json({
            status:'SUCCESS',
            message:'User fetched Successfully',
            data:result.users,
            totalRecords:result.totalRecords,
            currentPage:result.currentPage,
            totalPages:result.totalPages
        })
    }catch(err){
        next(err);
    }
}

const updateUser=async(req,res,next)=>{
    try{
         const userId=req.params.userId;
         const user=req.body
         const result=await adminService.updateUser(userId,user);
         res.status(200).json({
            status:'SUCCESS',
            message:'User updated successfully'
         })
    }catch(err){
        next(err);
    }
   
}


///////////////////////report controller////////////////////////////////
const getReportSummary = async (
    req,
    res,
    next
) => {
try{
    //const email = req.user.email;

    //console.log(email);

    const result =
        await adminService.getReportSummary();

    return res.status(200).json({
        status: 'SUCCESS',
        message: 'Data Fetched Successfully',
        data: result
    });
}catch(err){
    next(err);
}

};

const getRevenue=async(req,res,next)=>{
    try{
        const result=await adminService.getRevenue();
        res.status(200).json({
            status:'SUCCESS',
            message:'Revenue data fetched successfully',
            data:result
        })
    }catch(err){
        next(err);
    }
}

const getRevenueByFilterDate=async(req,res,next)=>{
    try{
        const from=req.body.from;
        const to=req.body.to;
        const result=await adminService.getRevenueByFilterDate(from,to)
        res.status(200).json({
            status:'SUCCESS',
            message:'Revenue data fetched successfully',
            data:result
        })
    }catch(err){
        next(err);
    }
}

const getTopPerformerFlight=async(req,res,next)=>{
    try{
        const result=await adminService.getTopPerformerFlight();
        res.status(200).json({
            status:'SUCCESS',
            message:'Revenue data fetched successfully',
            data:result
        })
    }catch(err){
        next(err);
    }
}

const getTopPerformerFlightByDate=async(req,res,next)=>{
    try{
        const from=req.body.from;
        const to=req.body.to;
        const result=await adminService.getTopPerformerFlightByDate(from,to)
        res.status(200).json({
            status:'SUCCESS',
            message:'Revenue data fetched successfully',
            data:result
        })
    }catch(err){
        next(err);
    }
}
module.exports = {
    getDashboardData,

    getAllFlights,
    getFlightsByFilter,
    createFlight,
    updateFlight,
    cancelFlight,

    getAllUsers,
    searchUsers,
    updateUser,

    getReportSummary,
    getRevenue,
    getRevenueByFilterDate,
    getTopPerformerFlight,
    getTopPerformerFlightByDate
};