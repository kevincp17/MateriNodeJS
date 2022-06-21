import { sequelize } from "../models/init-models"
const findAll=async (req,res)=>{
    try{
        const location=await req.context.models.locations.findAll({
            include:[{
                model:req.context.models.departments,
                as:"departments",
                required:true,
                include:[{
                    model:req.context.models.employees,
                    as:"employees",
                    required:true,
                    include:[{
                        model:req.context.models.dependents,
                        as:"dependents",
                        required:true,
                    }]
                }]
            }]
        })
        return res.send(location)
    }catch(error){
        return res.status(404).send(error)
    }
}

const findOne=async (req,res)=>{
    try{
        const location=await req.context.models.locations.findOne({
            where:{location_id:req.params.id}
        })
        return res.send(location)
    }catch(error){
        return res.status(404).send(error)
    }
}

const create=async (req,res)=>{
    const checkCountry=req.countries
    try{
        const location=await req.context.models.locations.create({
            location_id:req.body.location_id,
            street_address:req.body.street_address,
            postal_code:req.body.postal_code,
            city:req.body.city,
            state_province:req.body.state_province,
            country_id:checkCountry.country_id
        })
        return res.send(location)
    }catch(error){
        return res.status(404).send(error)
    }
}

const createNext=async (req,res,next)=>{
    try{
        const location=await req.context.models.locations.create({
            location_id:req.body.location_id,
            street_address:req.body.street_address,
            postal_code:req.body.postal_code,
            city:req.body.city,
            state_province:req.body.state_province,
            country_id:req.body.country_id
        })
        req.locations=location
        next()
    }catch(error){
        return res.status(404).send(error)
    }
}

const update=async (req,res)=>{
    try{
        const location=await req.context.models.locations.update({
            street_address:req.body.street_address
        },{returning :true,where:{location_id: req.params.id}})
        return res.send(location)
    }catch(error){
        return res.status(404).send(error)
    }
}

const deleted=async (req,res)=>{
    try{
        const location=await req.context.models.locations.destroy({
            where:{location_id: req.params.id}
        })
        return res.send('delete '+location+' rows')
    }catch(error){
        return res.status(404).send(error)
    }
}

const querySQL = async(req,res)=>{
    try {
        await sequelize.query('SELECT l.street_address, l.postal_code, l.city, l.state_province, c.country_name from locations l join countries c on l.country_id=c.country_id',
        {type : sequelize.QueryTypes.SELECT})
        .then(result =>{
            return res.send(result)
        })
    } catch (error) {
        return res.status(404).send(error)
    }
}

export default{
    findAll,
    findOne,
    create,
    createNext,
    update,
    deleted,
    querySQL
}