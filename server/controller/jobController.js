import { sequelize } from "../models/init-models"
const findAll=async (req,res)=>{
    try{
        const job=await req.context.models.jobs.findAll({
            include:[{
                model:req.context.models.employees,
                as:"employees",
                required:true,
                include: {
                    model: req.context.models.dependents,
                    as:"dependents",
                    required:true
                  }
            }]
        })
        return res.send(job)
    }catch(error){
        return res.status(404).send(error)
    }
}

const findOne=async (req,res)=>{
    try{
        const job=await req.context.models.jobs.findOne({
            where:{job_id:req.params.id}
        })
        return res.send(job)
    }catch(error){
        return res.status(404).send(error)
    }
}

const create=async (req,res)=>{
    try{
        const job=await req.context.models.jobs.create({
            job_id: req.body.job_id,
            job_title:req.body.job_title,
            min_salary:req.body.min_salary,
            max_salary:req.body.max_salary
        })
        return res.send(job)
    }catch(error){
        return res.status(404).send(error)
    }
}

const createNext=async (req,res,next)=>{
    try{
        const job=await req.context.models.jobs.create({
            job_id: req.body.job_id,
            job_title:req.body.job_title,
            min_salary:req.body.min_salary,
            max_salary:req.body.max_salary
        })
        req.jobs=job
        next()
    }catch(error){
        return res.status(404).send(error)
    }
}

const update=async (req,res)=>{
    try{
        const job=await req.context.models.jobs.update({
            job_title:req.body.job_title
        },{returning :true,where:{job_id: req.params.id}})
        return res.send(job)
    }catch(error){
        return res.status(404).send(error)
    }
}

const deleted=async (req,res)=>{
    try{
        const job=await req.context.models.jobs.destroy({
            where:{job_id: req.params.id}
        })
        return res.send('delete '+job+' rows')
    }catch(error){
        return res.status(404).send(error)
    }
}

const querySQL = async(req,res)=>{
    try {
        await sequelize.query('SELECT e.first_name, e.last_name, j.job_title, e.salary, j.min_salary, j.max_salary from employees e join jobs j on e.job_id=j.job_id',
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