import { Router } from "express";
import indexController from "../controller/indexController";

const router= new Router()

router.get('/',indexController.employeeController.findAll)
router.get ('/sql',indexController.employeeController.querySQL)
router.get('/:id',indexController.employeeController.findOne)
router.post('/',indexController.employeeController.create)
router.put('/:id',indexController.employeeController.update)
router.delete('/:id',indexController.employeeController.deleted)


export default router