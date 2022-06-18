import { Router } from "express";
import indexController from "../controller/indexController";

const router= new Router()

router.get('/',indexController.jobController.findAll)
router.get ('/sql',indexController.jobController.querySQL)
router.get('/:id',indexController.jobController.findOne)
router.post('/',indexController.jobController.create)
router.put('/:id',indexController.jobController.update)
router.delete('/:id',indexController.jobController.deleted)


export default router