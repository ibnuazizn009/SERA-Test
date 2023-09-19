import { Router, Request, Response } from "express";
import userController from "../controllers/user-controller";

const router = Router();


router.get('/home', (req: Request, res: Response) => {
    res.status(200).json({
        status: true,
        message: 'This is Home'
    });
});

router.get('/users', userController.getUser);
router.get('/user/:id', userController.getUserByID);
router.post('/user/add', userController.createUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);


export default router