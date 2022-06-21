import { Router } from "express";
import indexController from "../controller/indexController";

const router= new Router()

router.get('/',indexController.locationController.findAll)
router.get ('/sql',indexController.locationController.querySQL)
router.get('/:id',indexController.locationController.findOne)
router.post('/',indexController.locationController.create)
router.post('/next/',indexController.locationController.createNext,indexController.departmentController.create)
router.put('/:id',indexController.locationController.update)
router.delete('/:id',indexController.locationController.deleted)


export default router