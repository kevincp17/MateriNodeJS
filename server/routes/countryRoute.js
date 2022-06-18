import { Router } from "express";
import indexController from "../controller/indexController";

const router= new Router()

router.get('/',indexController.countryController.findAll)
router.get ('/sql',indexController.countryController.querySQL)
router.get('/:id',indexController.countryController.findOne)
router.post('/',indexController.countryController.create)
router.put('/:id',indexController.countryController.update)
router.delete('/:id',indexController.countryController.deleted)


export default router