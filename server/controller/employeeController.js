import { sequelize } from "../models/init-models"
const findAll=async (req,res)=>{
    try{
        const employee=await req.context.models.employees.findAll({
            include:[{
                model:req.context.models.dependents,
                as:"dependents",
                required:true
            }]
        })
        return res.send(employee)
    }catch(error){
        return res.status(404).send(error)
    }
}

const findOne=async (req,res)=>{
    try{
        const employee=await req.context.models.employees.findOne({
            where:{employee_id:req.params.id}
        })
        return res.send(employee)
    }catch(error){
        return res.status(404).send(error)
    }
}

const create=async (req,res)=>{
    const checkDepartment=req.departments
    const checkJob=req.jobs
    const checkDependent=req.dependents

    if(checkDepartment){
        try{
            const employee=await req.context.models.employees.create({
                employee_id:req.body.employee_id,
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                email:req.body.email,
                phone_number:req.body.phone_number,
                hire_date:req.body.hire_date,
                job_id:req.body.job_id,
                salary:req.body.salary,
                manager_id:req.body.manager_id,
                department_id:checkDepartment.department_id,
                proj_account_mgr:req.body.proj_account_mgr,
            })
            return res.send(employee)
        }catch(error){
            return res.status(404).send(error)
        }
    }else if(checkJob){
        try{
            const employee=await req.context.models.employees.create({
                employee_id:req.body.employee_id,
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                email:req.body.email,
                phone_number:req.body.phone_number,
                hire_date:req.body.hire_date,
                job_id:checkJob.job_id,
                salary:req.body.salary,
                manager_id:req.body.manager_id,
                department_id:req.body.department_id,
                proj_account_mgr:req.body.proj_account_mgr,
            })
            return res.send(employee)
        }catch(error){
            return res.status(404).send(error)
        }
    }else if(checkDependent){
        try{
            const employee=await req.context.models.employees.create({
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                email:req.body.email,
                phone_number:req.body.phone_number,
                hire_date:req.body.hire_date,
                job_id:req.body.job_id,
                salary:req.body.salary,
                manager_id:req.body.manager_id,
                department_id:req.body.department_id,
                proj_account_mgr:req.body.proj_account_mgr,
                employee_id:checkDependent.employee_id
            })
            return res.send(employee)
        }catch(error){
            return res.status(404).send(error)
        }
    }
    
}

const createNext=async (req,res,next)=>{
    try{
        const employee=await req.context.models.employees.create({
            employee_id:req.body.employee_id,
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
            phone_number:req.body.phone_number,
            hire_date:req.body.hire_date,
            job_id:req.body.job_id,
            salary:req.body.salary,
            manager_id:req.body.manager_id,
            department_id:req.body.department_id,
            proj_account_mgr:req.body.proj_account_mgr,
        })
        req.employees=employee
        next()
    }catch(error){
        return res.status(404).send(error)
    }
}

const update=async (req,res)=>{
    try{
        const employee=await req.context.models.employees.update({
            first_name:req.body.first_name
        },{returning :true,where:{employee_id: req.params.id}})
        return res.send(employee)
    }catch(error){
        return res.status(404).send(error)
    }
}

const deleted=async (req,res)=>{
    try{
        const employee=await req.context.models.employees.destroy({
            where:{employee_id: req.params.id}
        })
        return res.send('delete '+employee+' rows')
    }catch(error){
        return res.status(404).send(error)
    }
}

const querySQL = async(req,res)=>{
    try {
        await sequelize.query('SELECT e.first_name, e.last_name, e.email, e.phone_number, e.hire_date, j.job_title, e.salary, e.manager_id, d.department_name from employees e join jobs j on e.job_id=j.job_id join departments d on e.department_id=d.department_id',
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