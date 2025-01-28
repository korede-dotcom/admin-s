const EventConfigRepository = require("../repos/eventmanager-repo")
const asynchandler = require("express-async-handler")
const booking = require("../repos/event-booking-repo");
const Services = require("../models/Services");
const EventBookingRepository = new booking ()
const EventBooking = require("../models/EventBookers");
const {Sequelize,Op} = require("sequelize");
const Expensis = require("../models/Expensis");
const Branch = require("../models/Branch");
const Manager = require("../models/Manager");
const { fn, col } = Sequelize;
const { startOfMonth, endOfMonth } = require('date-fns');

const getPkgs = asynchandler( async (req,res) => {
    const pkgs = await EventConfigRepository.getAllEventConfigs()
    return res.status(200).json({
       status:true,
        message:"pkgs fetched",
        data:{
            pkgs
        }
    })
});

const EventBookings = asynchandler(async (req,res) => {
    const bookings = await EventConfigRepository.getAllEventReport()
    return res.status(200).json({
       status:true,
        message:"bookings fetched",
        data:{
            bookings
        }
    })
})

const approve = asynchandler( async (req,res) => {

    const pkgs = await EventConfigRepository.approve(req.query.id)
    return res.status(200).json({
       status:true,
        message:"pkgs fetched",
        data:{
            pkgs
        }
    })
});


const getActivePkgs = asynchandler( async (req,res) => {
    
    if (req.user) {
        const pkgs = await EventConfigRepository.getAllEventConfigsActiveBybranch(req.user.branch)
        return res.status(200).json({
           status:true,
            message:"pkgs fetched",
            data:{
                pkgs
            }
        })
        
    } else {
        console.log("🚀 ~ file: eventmanager.js:42 ~ getActivePkgs ~ req.query.branchid:", parseInt(req.query.branchid))
        const pkgs = await EventConfigRepository.getAllEventConfigsActive(parseInt(req.query.branchid))
        return res.status(200).json({
           status:true,
            message:"pkgs fetched",
            data:{
                pkgs
            }
        })
        
    }
});

const active = asynchandler(async (req,res) => {
    const pkgs = await EventConfigRepository.getAllEventConfigsActive()
        console.log("🚀 ~ active ~ pkgs:", pkgs)
        return res.status(200).json({
           status:true,
            message:"pkgs fetched",
            data:{
                pkgs
            }
        })
})


const getPendingPkgs = asynchandler( async (req,res) => {
    if (req.user) { 
        const pkgs = await EventConfigRepository.getAllEventConfigsPendingByBranch(req.user.branch)
        return res.status(200).json({
           status:true,
            message:"pkgs fetched",
            data:{
                pkgs
            }
        })
        
    } else {
        const pkgs = await EventConfigRepository.getAllEventConfigsPending()
        return res.status(200).json({
           status:true,
            message:"pkgs fetched",
            data:{
                pkgs
            }
        })
        
    }
});

const createeventpkg = asynchandler( async (req,res) => {
    const serviceId = await Services.findOne({where:{name:"eventhall"}})
    console.log("🚀 ~ createeventpkg ~ serviceId:", serviceId)
    const createeventpackage = await EventConfigRepository.createEventConfig({...req.body,status:false})
    return res.status(200).json({
       status:true,
        message:"event package ",
        data:{
            createeventpackage
        }
    })
});

const updateeventpkg = asynchandler( async (req,res) => {
    // console.log("🚀 ~ file: Eventmanager.js:104 ~ updateeventpkg ~ req:", req.body)
//     const newObj = {};
    // const findEventpkg = await EventConfigRepository.getEventConfigById(parseInt(req.query.id))
//     console.log("🚀 ~ updateeventpkg ~ findEventpkg:", findEventpkg)
    
//     function getAndSet (key,value) {
//         if(value.lenght) {
//             newObj.key = value
//         }
//     }
//    const newDtat = getAndSet(Object.keys(req.body),Object.values(req.body))
//    console.log("🚀 ~ updateeventpkg ~ newDtat:", newDtat)

    
    if (req.user.role_id === 1) {
        const createeventpackage = await EventConfigRepository.updateEventConfig(req.query.id,{...req.body,status:true})
        return res.status(200).json({
           status:true,
            message:"event package updated ",
            data:{
                createeventpackage
            }
        })
        
    }
    const createeventpackage = await EventConfigRepository.updateEventConfig(req.query.id,{...req.body,branch_id:parseInt(req.user.branch),status:req.body.status})
    return res.status(200).json({
       status:true,
        message:"event package updated ",
        data:{
            createeventpackage
        }
    })
});

const bookForClient = asynchandler( async (req,res) => {
    console.log("🚀 ~ file: Eventmanager.js:117 ~ bookForClient ~ req.body:", req.body)
    try {
        const createeventpackage = await EventBookingRepository.create({...req.body,booked_by:req?.user?._id ? req?.user?._id : null,branch_id:parseInt(req?.user.branch) || 1 })
        return res.status(200).json({
           status:true,
            message:"event package updated ",
            data:{
                createeventpackage
            }
        })
        
    } catch (error) {
        console.log("🚀 ~ file: Eventmanager.js:126 ~ bookForClient ~ error:", error)
        return res.status(400).json({
           status:false,
            message:"event package updated ",
            data:{
                error
            }
        })
        
    }
});

const Allbookings = asynchandler( async (req,res) => {
    let createeventpackage;
    console.log("🚀 ~ file: Eventmanager.js:141 ~ Allbookings ~ req.user.role_id:", req.user.role_id)
    switch (req.user.role_id) {

        case 9:
            if (req.query.start && req.query.end) {
                createeventpackage = await EventBookingRepository.getByDate(parseInt(req.user.branch),req.query.start,req.query.end)
                return res.status(200).json({
                    status:true,
                    message:"event package updated ",
                    data:{
                        allevents:createeventpackage
                    }
                })
            }
             createeventpackage = await EventBookingRepository.getByBranchId(parseInt(req.user.branch))
            return res.status(200).json({
                status:true,
                message:"event package updated ",
                data:{
                    allevents:createeventpackage
                }
            })
            break;
    
        default:
            if (req.query.start && req.query.end) {
                createeventpackage = await EventBookingRepository.getByDateAll(req.query.start,req.query.end)
                return res.status(200).json({
                    status:true,
                    message:"event package updated ",
                    data:{
                        allevents:createeventpackage
                    }
                })
            }
             createeventpackage = await EventBookingRepository.getAll()
            return res.status(200).json({
                status:true,
                message:"event package updated ",
                data:{
                    allevents:createeventpackage
                }
            })
            break;
    }
});







const DashboardData = asynchandler(async (req,res) => {
    let count;
    let salesData,result,month,labels,data,today,totalAmount,startDate,endDate,totalExpens,totalAmounts,countBranch,countManager,formattedData,monthData,eventCount ;

    switch (req.user.role_id) {
        case 1:

         salesData = await EventBooking.findAll({
            attributes: [
              [Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM "date"')), 'month'],
              [Sequelize.fn('SUM', Sequelize.col('amount')), 'total_amount'],
            ],
            group: [Sequelize.literal('EXTRACT(MONTH FROM "date")')],
            order: [Sequelize.literal('EXTRACT(MONTH FROM "date")')],
          });
          
          // Transform the query result into the required format
           result = salesData.map((entry) => ({
            month: entry.get('month'),
            total_amount: entry.get('total_amount'),
          }));
          
          // Prepare the data for charting
           months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
           labels = [];
           data = [];
          
          for (let i = 1; i <= 12; i++) {
             monthData = result.find((item) => parseInt(item.month) === i);
            labels.push(months[i - 1]);
            data.push(monthData ? parseInt(monthData.total_amount) : 0); // Add 0 if no data for the month
          }
          
          
         

           today = new Date().toISOString().split('T')[0];  // This gives the format 'YYYY-MM-DD'

        // Query to sum the total amount for today's bookings
         totalAmount = await EventBooking.findOne({
        attributes: [[Sequelize.fn('SUM', Sequelize.col('amount')), 'total_amount']],
        where: {
            // Use Sequelize.fn to strip time from the stored date as well
            date: Sequelize.fn('DATE', Sequelize.col('date')),  // This will convert the stored timestamp to a date only
        },
        });


// Get the start and end of the current month
 startDate = startOfMonth(new Date());
 endDate = endOfMonth(new Date());

 totalExpens = await Expensis.findOne({
    attributes: [[fn('SUM', col('amount')), 'total_amount']],
    where: {
        createdAt: {
            [Op.between]: [startDate, endDate], // Filter by dates within the current month
        },
    },
});

// Get the total amount or return 0 if no records exist
 totalAmounts = totalExpens?.dataValues?.total_amount || 0;
console.log(`Total amount for the month: ${totalAmounts}`);



         countBranch = await Branch.count()

         countManager = await Manager.count()
         eventCount = await EventBooking.count()
        
          
           formattedData = {
            sales: {
              labels,
              tamount:totalAmount,
              totalExpense:totalAmounts,
              countBranch:countBranch,
              countManager:countManager,
              eventCount:eventCount,
              datasets: { label: 'Events dates', data },
            },
          };
          
          return res.status(200).json({
            status: true,
            message: 'Dashboard data fetched successfully',
            data: formattedData,
          });
          
            break;
        case 2:

         salesData = await EventBooking.findAll(
            {where: {branch_id:parseInt(req.user.branch)} ,
            attributes: [
              [Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM "date"')), 'month'],
              [Sequelize.fn('SUM', Sequelize.col('amount')), 'total_amount'],
            ],
            group: [Sequelize.literal('EXTRACT(MONTH FROM "date")')],
            order: [Sequelize.literal('EXTRACT(MONTH FROM "date")')],
          });
          
          // Transform the query result into the required format
           result = salesData.map((entry) => ({
            month: entry.get('month'),
            total_amount: entry.get('total_amount'),
          }));
          
          // Prepare the data for charting
           months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
           labels = [];
           data = [];
          
          for (let i = 1; i <= 12; i++) {
             monthData = result.find((item) => parseInt(item.month) === i);
            labels.push(months[i - 1]);
            data.push(monthData ? parseInt(monthData.total_amount) : 0); // Add 0 if no data for the month
          }
          
          
         

           today = new Date().toISOString().split('T')[0];  // This gives the format 'YYYY-MM-DD'

        // Query to sum the total amount for today's bookings
         totalAmount = await EventBooking.findOne(
            {where: {branch_id:parseInt(req.user.branch)},
        attributes: [[Sequelize.fn('SUM', Sequelize.col('amount')), 'total_amount']],
        where: {
            // Use Sequelize.fn to strip time from the stored date as well
            date: Sequelize.fn('DATE', Sequelize.col('date')),  // This will convert the stored timestamp to a date only
        },
        });


// Get the start and end of the current month
 startDate = startOfMonth(new Date());
 endDate = endOfMonth(new Date());

 totalExpens = await Expensis.findOne(
    {where: {branch_id:parseInt(req.user.branch)},
    attributes: [[fn('SUM', col('amount')), 'total_amount']],
    where: {
        createdAt: {
            [Op.between]: [startDate, endDate], // Filter by dates within the current month
        },
    },
});

// Get the total amount or return 0 if no records exist
 totalAmounts = totalExpens?.dataValues?.total_amount || 0;
console.log(`Total amount for the month: ${totalAmounts}`);



         countBranch = await Branch.count()

         countManager = await Manager.count({where: {branch_id:parseInt(req.user.branch)}})
         eventCount = await EventBooking.count({where: {branch_id:parseInt(req.user.branch)}})
        
          
           formattedData = {
            sales: {
              labels,
              tamount:totalAmount,
              totalExpense:totalAmounts,
              countBranch:countBranch,
              countManager:countManager,
              eventCount:eventCount,
              datasets: { label: 'Events dates', data },
            },
          };
          
          return res.status(200).json({
            status: true,
            message: 'Dashboard data fetched successfully',
            data: formattedData,
          });
            
            break;
        case 1:
            
            break;
        case 1:
            
            break;
        case 1:
            
            break;
    
        default:
            break;
    }
})






module.exports = {
    getPkgs,
    createeventpkg,
    updateeventpkg,
    getActivePkgs,
    getPendingPkgs,
    approve,
    active,
    bookForClient,
    Allbookings,
    EventBookings,
    DashboardData
};


