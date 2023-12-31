const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const listRouter = require('../controller/list-controller');
const userRouter = require('../controller/user-controller'); // Import your router
const {connect, closeDatabase, clearDatabase} = require('../util/test-setup');
const userModel = require('../model/user');
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
});

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

const app = express();
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/list", listRouter);

describe('Delete list tests', () => {
    it('responds with requested list object', async () => {
        const listData = {title: "test", members: [user], _ownerId: user._id, status: "new", items: []}
        const list = new listModel(listData)
        await list.save();
        await request(app)
            .delete(`/list/${list._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(200);
    });

    it('responds with invalid list id', async () => {
        const response = await request(app)
            .delete(`/list/3850532`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("Invalid List ID");
    });

    it('responds with list not found', async () => {
        const response = await request(app)
            .delete(`/list/659096bbc5b22975df88719a`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(404);
        expect(response.body.message).toEqual("List not found");
    });

    it('responds with insufficient rights', async () => {
        const newUserData = {email: "abcd@bcda.cz", password: "ewdewf324"}
        const newUser = new userModel(newUserData);
        await newUser.save();
        const listData = {title: "test", members: [newUser, user], _ownerId: newUser._id, status: "new", items: []}
        const list = new listModel(listData)
        await list.save();
        const response = await request(app)
            .delete(`/list/${list._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(403);
        expect(response.body.message).toEqual("Insufficient rights");
    });

    it('responds with not all items done', async () => {
        const listData = {title: "test", members: [user], _ownerId: user._id, status: "new", items: [{
                _id: new mongoose.Types.ObjectId(),
                createdAt: new Date(),
                status: "new",
                _ownerId: user._id,
                title: "test item",
                note: "test note",
            }]}
        const list = new listModel(listData)
        await list.save();
        const response = await request(app)
            .delete(`/list/${list._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("List still contains unfinished items");
    });

    it('responds with ok even if not all items done', async () => {
        const listData = {title: "test", members: [user], _ownerId: user._id, status: "new", items: [{
                _id: new mongoose.Types.ObjectId(),
                createdAt: new Date(),
                status: "new",
                _ownerId: user._id,
                title: "test item",
                note: "test note",
            }]}
        const list = new listModel(listData)
        await list.save();
        const response = await request(app)
            .delete(`/list/${list._id}?force=true`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(200);
    });
});