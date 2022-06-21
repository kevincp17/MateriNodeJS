import { sequelize } from "../models/init-models"
const findAll=async (req,res)=>{
    try{
        const dependent=await req.context.models.dependents.findAll({
            include:[{
                all:true
            }]
        })
        return res.send(dependent)
    }catch(error){
        return res.status(404).send(error)
    }
}

const findOne=async (req,res)=>{
    try{
        const dependent=await req.context.models.dependents.findOne({
            where:{dependent_id:req.params.id}
        })
        return res.send(dependent)
    }catch(error){
        return res.status(404).send(error)
    }
}

const create=async (req,res)=>{
    const checkEmployee=req.employees
    try{
        const dependent=await req.context.models.dependents.create({
            dependent_id: req.body.dependent_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            relationship: req.body.relationship,
            employee_id: checkEmployee.employee_id
        })
        return res.send(dependent)
    }catch(error){
        return res.status(404).send(error)
    }
}

const createNext=async (req,res,next)=>{
    try{
        const dependent=await req.context.models.dependents.create({
            dependent_id: req.body.dependent_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            relationship: req.body.relationship,
            employee_id: req.body.employee_id
        })
        req.dependents=dependent
        next()
    }catch(error){
        return res.status(404).send(error)
    }
}

const update=async (req,res)=>{
    try{
        const dependent=await req.context.models.dependents.update({
            first_name:req.body.first_name
        },{returning :true,where:{dependent_id: req.params.id}})
        return res.send(dependent)
    }catch(error){
        return res.status(404).send(error)
    }
}

const deleted=async (req,res)=>{
    try{
        const dependent=await req.context.models.dependents.destroy({
            where:{dependent_id: req.params.id}
        })
        return res.send('delete '+dependent+' rows')
    }catch(error){
        return res.status(404).send(error)
    }
}

const querySQL = async(req,res)=>{
    try {
        await sequelize.query('SELECT d.first_name, d.last_name, d.relationship, e.first_name AS e_first_name,e.last_name AS e_last_name from dependents d join employees e on d.employee_id=e.employee_id',
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