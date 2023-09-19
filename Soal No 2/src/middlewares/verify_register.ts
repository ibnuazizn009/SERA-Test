import { Request, Response, NextFunction } from "express"

export = {
    verifyRegister: async(req: Request, res: Response, next: NextFunction) => {
        if(!req.body.username || req.body.username.length > 12){
            return res.status(400).json({
                success: false,
                message: 'Username must be less than 12 char'
            })
        }

        if(!req.body.password || req.body.password.length < 10){
            return res.status(400).json({
                success: false,
                message: 'Password must be more than 10 char'
            })
        }

        next();
    }
}