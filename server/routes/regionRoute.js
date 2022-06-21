import { Router } from "express";
import indexController from "../controller/indexController";

const router= new Router()

router.get('/',indexController.regionController.findAll)
router.get('/:id',indexController.regionController.findOne)
router.post('/',indexController.regionController.create)
router.post('/next/',indexController.regionController.createNext,indexController.countryController.create)
router.put('/:id',indexController.regionController.update)
router.delete('/:id',indexController.regionController.deleted)
router.get ('/sql/:id',indexController.regionController.querySQL)

export default router