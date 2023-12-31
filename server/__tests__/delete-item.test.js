const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const itemRouter = require('../controller/item-controller');
const listRouter = require('../controller/list-controller');
const userRouter = require('../controller/user-controller'); // Import your router
const {connect, closeDatabase, clearDatabase} = require('../util/test-setup');
const userModel = require('../model/user');
const mongoose = require("mongoose");
const listModel = require("../model/list");
let token
let user
let list
let item
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
    const listData = {title: "test"}
    const responseList = await request(app)
        .post(`/list`)
        .set('Authorization', `Bearer ${token}`)
        .send(listData)
        .expect('Content-Type', /json/)
        .expect(200);
    list = responseList.body
    const itemData = {title: "test item", note: "abcd"}
    const itemResponse = await request(app)
        .post(`/item/${list._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(itemData)
        .expect('Content-Type', /json/)
        .expect(200);
    item = itemResponse.body.items[0];
});

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

const app = express();
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/list", listRouter);
app.use("/item", itemRouter);

describe('Create item tests', () => {
    it('responds with list object with deleted item', async () => {
        const response = await request(app)
            .delete(`/item/${list._id}/${item._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(200);
    });

    it('responds with invalid list id', async () => {
        const response = await request(app)
            .delete(`/item/3850532/659096bbc5b22975df88719a`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("Invalid input data");
    });

    it('responds with invalid item id', async () => {
        const response = await request(app)
            .delete(`/item/659096bbc5b22975df88719a/3850532`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("Invalid input data");
    });

    it('responds with list not found', async () => {
        const response = await request(app)
            .delete(`/item/659096bbc5b22975df88719a/659096bbc5b22975df88719a`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(404);
        expect(response.body.message).toEqual("List not found");
    });

    it('responds with item not found', async () => {
        const response = await request(app)
            .delete(`/item/${list._id}/659096bbc5b22975df88719a`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(404);
        expect(response.body.message).toEqual("Item not found");
    });


    it('responds with insufficient rights error', async () => {
        const newUserData = {email: "abcd@bcda.cz", password: "ewdewf324"}
        const newUser = new userModel(newUserData);
        await newUser.save();
        const listData = {title: "test", members: [newUser], _ownerId: newUser._id, status: "new", items: [{
                _id: new mongoose.Types.ObjectId(),
                createdAt: new Date(),
                status: "new",
                _ownerId: newUser._id,
                title: "test item",
                note: "test note",
            }]}
        const newList = new listModel(listData)
        await newList.save();
        const response = await request(app)
            .delete(`/item/${newList._id}/${newList.items[0]._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(403);
        expect(response.body.message).toEqual("Insufficient rights");
    });
});