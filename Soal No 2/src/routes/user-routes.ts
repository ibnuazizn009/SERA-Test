import { Router, Request, Response } from "express";
import userController from "../controllers/user-controller";
import middlewares from "../middlewares";

const router = Router();


router.get('/home', (req: Request, res: Response) => {
    res.status(200).json({
        status: true,
        message: 'This is Home'
    });
});

router.get('/users',middlewares.verify_sign.verifyToken, userController.getUser);
router.get('/user/:id', middlewares.verify_sign.verifyToken, userController.getUserByID);
router.post('/user/add', middlewares.verify_register.verifyRegister, userController.createUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);
router.post('/user/sign-in', userController.userSignin);


export default router