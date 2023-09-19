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
                if(username.length > 12){
                    return res.status(400).json({
                        status: true,
                        message: 'Username must be 12 or less'
                    })
                }

                console.log(username.length);
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
                if(username.length > 12){
                    return res.status(400).json({
                        status: true,
                        message: 'Username must be 12 or less'
                    })
                }

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
            const {fullname, username, password, isActive} = req.body;

            const users = await User.findByPk(id);

            if(username.length > 12){
                return res.status(400).json({
                    status: true,
                    message: 'Username must be 12 or less'
                })
            }

            if(!users){
                return res.status(404).json({
                    status: true,
                    message: 'Sorry, data not found',
                    data: {}
                })
            }else{

                if(username.length > 12){
                    return res.status(400).json({
                        status: true,
                        message: 'Username must be 12 or less'
                    })
                }

                bcrypt.hash(password, 10, async (err, hash) => {
                    if(err){
                        return res.status(500).json({
                            success: false,
                            message: err,
                        });
                    } else{
                        const result = await User.update({
                            Fullname: fullname,
                            Username: username,
                            Password: hash,
                            isActive: isActive
                        }, {where: {id}})
            
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
                    }
                })
            } 
        }catch (error) {
            console.log(`error while updating`, error);
            res.status(400).json(error);
        }
    },

    deleteUser: async(req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const isActive = await User.findByPk(id);
            
            if(isActive?.dataValues.isActive == true){
                return res.status(400).json({
                    status: true,
                    message: `Can't delete ative account`
                })
            }
            
            const result = await User.destroy({
                where:{
                    id
                }
            })

            if(result){
                res.status(200).json({
                    status: true,
                    message: 'Delete successfully',
                    data: result
                })
            }else{
                res.status(400).json({
                    status: true,
                    message: 'Error deleted',
                })
            }
        } catch (error) {
            console.log(`error while deleteing`, error);
            res.status(400).json(error);
        }
    }
}