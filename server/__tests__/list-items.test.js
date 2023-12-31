const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const itemRouter = require('../controller/item-controller');
const listRouter = require('../controller/list-controller');
const userRouter = require('../controller/user-controller'); // Import your router
const {connect, closeDatabase, clearDatabase} = require('../util/test-setup');
const listModel = require("../model/list");
const mongoose = require("mongoose");
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
   let items = []
    for (let i = 0; i < 5; i++) {
        const item= {
            _id: new mongoose.Types.ObjectId(),
            createdAt: new Date(),
            status: "new",
            _ownerId: user._id,
            title: `test${i} item`,
            note: `test${i} note`,
        }
        items[i] = (item);
    }
    const listData = {title: "test", items: items}
    const responseList = await request(app)
        .post(`/list`)
        .set('Authorization', `Bearer ${token}`)
        .send(listData)
        .expect('Content-Type', /json/)
        .expect(200);
    list = responseList.body
});

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

const app = express();
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/list", listRouter);
app.use("/item", itemRouter);
describe('List items tests', () => {
    it('responds with requested list items objects', async () => {
        const response = await request(app)
            .get(`/item/${list._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.length).toEqual(5);
    });

    it('responds with invalid item id', async () => {
        const response = await request(app)
            .get(`/item/659096b`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("Invalid List ID");
    });

    it('responds with list not found', async () => {
        const response = await request(app)
            .get(`/item/659096bbc5b22975df88719a`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(404);
        expect(response.body.message).toEqual("List not found");
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
        const listData = {title: "test", members: [newUser], _ownerId: newUser._id, status: "new", items: []}
        const newList = new listModel(listData)
        await newList.save();
        const response = await request(app)
            .get(`/item/${newList._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(403);
        expect(response.body.message).toEqual("Insufficient rights");
    });
});