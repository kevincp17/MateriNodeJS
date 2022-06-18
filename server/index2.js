import dotenv from "dotenv";
import express, { response } from "express";
dotenv.config();

const app=express();

const port=process.env.PORT || 3003

app.listen(port,()=>console.log(`Server is listening to ${port}`))
app.get('/',responseText)
app.get('/json',responseJson)
app.get('*',responseNotFound)

function responseText(){
    response.setHeader("Content-Type","text/plain")
    response.end("Hello")
}

function responseJson(req,res){
    res.json(
        {
            employee:{
                empId:100,
                firstName:"John",
                lastName:"Walker"
            }
        }
    )
}

function responseNotFound(req,res){
    response.setHeader("Content-Type","text/plain")
    response.end("Not Found")
}