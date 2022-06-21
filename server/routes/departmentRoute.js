import { Router } from "express";
import indexController from "../controller/indexController";

const router= new Router()

router.get('/',indexController.departmentController.findAll)
router.get ('/sql',indexController.departmentController.querySQL)
router.get('/:id',indexController.departmentController.findOne)
router.post('/',indexController.departmentController.create)
router.post('/next/',indexController.departmentController.createNext,indexController.employeeController.create)
router.put('/:id',indexController.departmentController.update)
router.delete('/:id',indexController.departmentController.deleted)


export default router