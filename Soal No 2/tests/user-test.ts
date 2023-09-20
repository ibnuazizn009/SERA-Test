import dotenv from 'dotenv';
import User from '../src/models/user_model'
dotenv.config();

import chai, { use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server'

let should = chai.should();

process.env.NODE_ENV = 'test';

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJVU1I5RzNZM1JSNyIsImlhdCI6MTY5NTE2MzA1NiwiZXhwIjoxNjk1NzY3ODU2fQ.h16y6WUlmABCbOM3q85St1Kyjwo4waT-BYwgOd4sm50'
chai.use(chaiHttp);

describe('User', () => {
    beforeEach((done) => {
        User.truncate()
        .then((err) => {
            done()
        })
    })
})


describe('/GET home', () => {
    it('it should be GET home', (done) => {
        chai.request(server)
            .get('/api/home')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.message.should.be.eq('This is Home');
            done()
            })
    })
})


describe('/POST users', () => {
    before((done) => {
        User.truncate().then((err)=>{
            done();
        })
    })
    it('it should veify that data in database is empty', (done) => {
        chai.request(server)
            .get('/api/users')
            .set({Authorization: `Bearer ${token}`})
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.message.should.be.eq('Sorry, data not found');
            done()
            })
    })

    it('it should POST user', (done) => {
        const data = {
            id: "USR9G3Y3FG7",
            fullname: "Aziz Nurrohman",
            username: "azizibnu123",
            password: "aziz12345678",
            isActive: "true"
        }

        chai.request(server)
            .post('/api/user/add')
            .send(data)
            .set({Authorization: `Bearer ${token}`})
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.should.have.property('data');
                res.body.should.have.property('message');
            done()
            })
    })
})


describe('/GET:id users', () => {
    it('it should be GET user by given id', async() => {
        const id = await User.findAll();

        chai.request(server)
            .get('/api/user/'+id[0].dataValues.id)
            .set({Authorization: `Bearer ${token}`})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            })
    })
})

describe('/GET users', () => {
    afterEach((done) => {
        User.truncate().then((err)=>{
            done();
        })
    })
    it('it should be GET users', (done) => {
        chai.request(server)
            .get('/api/users')
            .set({Authorization: `Bearer ${token}`})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.message.should.be.eq('Data has been found');
            done()
            })
    })

    it('it should be not GET users', (done) => {
        chai.request(server)
            .get('/api/users')
            .set({Authorization: `Bearer ${token}`})
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.message.should.be.eq('Sorry, data not found');
            done()
        })
    })

})


describe('/PUT:id user', () => {
    it('it should not update user', async() => {
        const id = 'USR9G3Y3FG7'

        const updated = await User.update({
            Fullname: "Ibnu Aziz Nurr",
            Username: "ibnuaziz0900",
            Password: "ibnu123456789",
            isActive: "false",
        },{where:{id}})
        chai.request(server)
            .put('/api/user/'+id)
            .set({Authorization: `Bearer ${token}`})
            .send(updated)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.message.should.be.eq('Sorry, data not found');
        })
    });

    
})

describe('/DELETE/:id user', () => {
    it('it should delete user by given id', async() => {
        const id = await User.findAll();

        const ids = id[0].dataValues.id;
        const result = await User.destroy({
            where:{
                id: ids
            }
        })
        chai.request(server)
            .delete('/api/user/'+id[0].dataValues.id)
            .set({Authorization: `Bearer ${token}`})
            .send({result})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.message.should.be.eq('Delete successfully');
                    
            })
    })
})
