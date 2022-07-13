import 'dotenv/config';
import express from "express";
import cors from "cors";
import compress from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import models,{sequelize} from "./models/init-models";
import routes from "./routes/indexRoute";

const port=process.env.PORT || 3000
const app=express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended:true})) // for parsing application/x-www-form-urlencoded
app.use(cookieParser())//Parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(helmet())
app.use(compress())
app.use(cors())
/*
ini adalah middleware
These functions are used to modify req and res objects for tasks like parsing
 request bodies, adding response headers, etc
*/
app.use(async(req,res,next)=>{
    req.context={models}
    next()
})

app.use('/region',routes.regionRoute);
app.use('/country',routes.countryRoute);
app.use('/location',routes.locationRoute);
app.use('/department',routes.departmentRoute);
app.use('/dependent',routes.dependentRoute);
app.use('/employee',routes.employeeRoute);
app.use('/job',routes.jobRoute);
app.use('/user',routes.userRoute);

const dropDatabaseSync=false;

sequelize.sync({force:dropDatabaseSync}).then(async()=>{
    if(dropDatabaseSync){
        console.log("Database do not drop");
    }
    app.listen(port,()=>{console.log("Server is listening to port "+port)})
})

export default app