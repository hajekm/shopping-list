const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const listRouter = require('../controller/list-controller');
const userRouter = require('../controller/user-controller'); // Import your router
const {connect, closeDatabase, clearDatabase} = require('../util/test-setup');
const listModel = require("../model/list");
let token
let user
beforeAll(async () => await connect());

beforeEach(async () => {
    const userData = {email: "ahoj@ahoj.cz", password: "32131244"};
    const uResponse = await request(app)
        .post('/user')
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(200);
    user = uResponse.body;
    const response = await request(app)
        .post('/user/login')
        .send(userData)
        .expect('Content-Type', /json/)
        .expect(200);
    expect(response.body._id).toBeDefined();
    token = response.body._id;
    for (let i = 0; i < 5; i++) {
        const listData = {title: `test${i}`, members: [user], _ownerId: user._id, status: "new", items: []}
        const list = new listModel(listData)
        await list.save();
    }
});

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

const app = express();
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/list", listRouter);

describe('List lists tests', () => {
    it('responds with requested list objects', async () => {
        const response = await request(app)
            .get(`/list`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.length).toEqual(5);
    });

    it('responds with requested list objects where logged user is member', async () => {
        const newUserData = {email: "ahojda@ahoj.cz", password: "gd43rf43"};
        const newUserResponse = await request(app)
            .post('/user')
            .send(newUserData)
            .expect('Content-Type', /json/)
            .expect(200);
        let newUser = newUserResponse.body;
        const loginResponse = await request(app)
            .post('/user/login')
            .send(newUserData)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(loginResponse.body._id).toBeDefined();
        const newUserToken = loginResponse.body._id;
        const listData = {title: "test", members: [newUser], _ownerId: newUser._id, status: "new", items: []}
        const list = new listModel(listData)
        await list.save();
        const response = await request(app)
            .get(`/list`)
            .set('Authorization', `Bearer ${newUserToken}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.length).toEqual(1);
        response.body.forEach((l) => {
            l.members.forEach((m) => {
                expect(m.password).toEqual("****");
                expect(m._id).toEqual(newUser._id);
                expect(m.email).toEqual(newUser.email);
            })
        });
    });
});