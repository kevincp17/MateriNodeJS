import { Router } from "express";
import indexController from "../controller/indexController";

const router= new Router()

router.get('/',indexController.dependentController.findAll)
router.get ('/sql',indexController.dependentController.querySQL)
router.get('/:id',indexController.dependentController.findOne)
router.post('/',indexController.dependentController.create)
router.post('/next/',indexController.dependentController.createNext,indexController.employeeController.create)
router.put('/:id',indexController.dependentController.update)
router.delete('/:id',indexController.dependentController.deleted)


export default router