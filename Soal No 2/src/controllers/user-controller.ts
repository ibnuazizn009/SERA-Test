import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import User from "../models/user_model";;
import makeid from "../config/make_id";

export = {
    getUser: async(req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await User.findAll();
            if(!users.length){
                res.status(404).json({
                    status: true,
                    message: 'Sorry, data not found',
                    data: {}
                })
            }
            res.status(200).json({
                status: true,
                message: 'Data has been found',
                data: users
            })
        } catch (error) {
            console.log(`error while getting data`, error);
            res.status(400).json(error); 
        }
    },

    getUserByID: async(req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const users = await User.findByPk(id);
            
            if(!users){
                res.status(404).json({
                    status: true,
                    message: 'Sorry, data not found',
                    data: {}
                })
            }
            res.status(200).json({
                status: true,
                message: 'Data has been found',
                data: users
            })
        } catch (error) {
            console.log(`error while getting data by ID`, error);
            res.status(400).json(error); 
        }
    },

    createUser: async(req: Request, res: Response, next: NextFunction) => {
        try {
            const {fullname, username, password} = req.body;
            const usersdata = await User.findAll();

            if(!usersdata.length){
                bcrypt.hash(password, 10, async (err, hash) => {
                    if(err){
                        return res.status(500).json({
                            success: false,
                            message: err,
                        });
                    }else{
                        const data = {
                            id: `USR${makeid(8)}`,
                            Fullname: fullname,
                            Username: username,
                            Password: hash,
                            isActive: "true"
                        }
    
                        if(!data){
                            res.status(404).json({
                                status: true,
                                message: 'Content can not be empty!'
                            })
                        }
    
                        const result = await User.create(data);
                        return res.status(200).json({
                            status: true,
                            message: 'Created successfully',
                            data: result
                        });
                    }
                })
            }else{
                if(usersdata[0].dataValues.Username === username){
                    return res.status(404).json({
                        status: true,
                        message: 'Username already exist!',
                        data: null
                    })
                }else{
                    bcrypt.hash(password, 10, async (err, hash) => {
                        if(err){
                            return res.status(500).json({
                                success: false,
                                message: err,
                            });
                        }else{
                            const data = {
                                id: `USR${makeid(8)}`,
                                Fullname: fullname,
                                Username: username,
                                Password: hash,
                                isActive: "true"
                            }
        
                            if(!data){
                                res.status(404).json({
                                    status: true,
                                    message: 'Content can not be empty!'
                                })
                            }
        
                            const result = await User.create(data);
                            return res.status(200).json({
                                status: true,
                                message: 'Created successfully',
                                data: result
                            });
                        }
                    })
                }
            }
        } catch (error) {
            console.log(`error while creatng`, error);
            res.status(400).json(error);
        }
    },

    updateUser: async(req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const {fullname, username, password} = req.body;

            const users = await User.findByPk(id);
            
            if(!users){
                return res.status(404).json({
                    status: true,
                    message: 'Sorry, data not found',
                    data: {}
                })
            }

            const data = {
                Fullname: fullname,
                username: username,
                Password: password
            }
            
            const result = await User.update({data}, {where: {id}})
            
            if ( Number(result) === 1 ) {
                return res.status(200).json({
                    status: true,
                    message: 'Update successfully',
                    data: result
                })
            } else {
                return res.status(404).json({
                    status: true,
                    message: 'Not found',
                    data: null
                })
            }

            

        } catch (error) {
            console.log(`error while updating`, error);
            res.status(400).json(error);
        }
    }
}