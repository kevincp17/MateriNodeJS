import { Router } from "express";
import indexController from "../controller/indexController";
import uploadDownload from "../../middleware/uploadDownload";

const router= new Router()

router.get('/',indexController.employeeController.findAll)
router.get ('/sql',indexController.employeeController.querySQL)
router.get('/:id',indexController.employeeController.findOne)
router.post('/',uploadDownload.uploadFiles,indexController.employeeController.create)
router.post('/next/',indexController.employeeController.createNext,indexController.dependentController.create)
router.put('/:id',indexController.employeeController.update)
router.delete('/:id',indexController.employeeController.deleted)
router.get('/file/:filename',uploadDownload.showFile)


export default router