const express=require('express')
const adminController=require('../controller/admin.controller')

const adminRoutes=express.Router();

//dashboard routes
adminRoutes.get('/dashboard',adminController.getDashboardData)

//manage flight routes
adminRoutes.get('/flights',adminController.getAllFlights)
adminRoutes.get('/search_flight',adminController.getFlightsByFilter)
adminRoutes.post('/add_flight',adminController.createFlight)
adminRoutes.put('/update_flight/:flightId',adminController.updateFlight)
adminRoutes.delete('/delete_flight/:flightId',adminController.deleteFlight)

//manage_user routes
adminRoutes.get('/get_users',adminController.getAllUsers)
adminRoutes.get('/search_user',adminController.searchUsers)
adminRoutes.put('/update_users/:userId',adminController.updateUser)

//report routes
adminRoutes.get('/report_summary',adminController.getReportSummary)
adminRoutes.get('/revenue',adminController.getRevenue)
adminRoutes.post('/revenue_filter_date',adminController.getRevenueByFilterDate)
adminRoutes.get('/top_performers_flight',adminController.getTopPerformerFlight)
adminRoutes.post('/top_performers_flight_search_date',adminController.getTopPerformerFlightByDate)

module.exports=adminRoutes