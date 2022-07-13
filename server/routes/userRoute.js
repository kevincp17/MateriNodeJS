import { Router } from "express";
import indexController from "../controller/indexController";
import authJwt from "../../middleware/authJWT"

const router= new Router()

router.post('/signin',authJwt.authenticate,authJwt.login)
router.post('/signup',indexController.userController.signup)

export default router