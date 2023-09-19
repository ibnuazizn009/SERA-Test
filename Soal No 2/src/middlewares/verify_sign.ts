import { Request, Response, NextFunction } from "express";
// import { Jwt } from "jsonwebtoken";
import jwt, {Secret, JwtPayload} from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export = {
    verifyToken: async(req: Request, res: Response, next: NextFunction) => {
        try {
            let tokenHeader = req.headers['authorization'];
    
            if (tokenHeader == null) {
                return res.status(403).json({
                    'success': false,
                    'message': 'No token provided',
                    'data': {}
                });
            }else{
                if (tokenHeader.split(' ')[0] !== 'Bearer') {
                    return res.status(401).json({
                        'success': false,
                        'message': 'Incorrect token format',
                        'data': {}
                    });
                }
    
                let token = tokenHeader.split(' ')[1];
                jwt.verify(token, process.env.SECRETKEY as string, (err, decode) => {
                    if (err) {
                        return res.status(401).json({
                            'success': false,
                            'message': err,
                            'data': {}
                        });
                    }
                    req.body.user = decode
                    next();
                })
            }
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Your session is not valid!',
            });
        }
    }
} 