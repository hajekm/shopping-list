const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const itemRouter = require('../controller/item-controller');
const listRouter = require('../controller/list-controller');
const userRouter = require('../controller/user-controller'); // Import your router
const {connect, closeDatabase, clearDatabase} = require('../util/test-setup');
const userModel = require('../model/user');
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
    // it('responds with list object with created item', async () => {
    //     const itemData = {title: "test item", note: "abcd"}
    //     const response = await request(app)
    //         .post(`/item/${list._id}`)
    //         .set('Authorization', `Bearer ${token}`)
    //         .send(itemData)
    //         .expect('Content-Type', /json/)
    //         .expect(200);
    //     expect(response.body.createdAt).toBeDefined();
    //     expect(response.body._id).toBeDefined();
    //     expect(response.body.title).toEqual(list.title);
    //     expect(response.body._ownerId).toEqual(user._id);
    //     expect(response.body.items.length).toBeGreaterThan(0);
    //     expect(response.body.items[0].createdAt).toBeDefined();
    //     expect(response.body.items[0]._id).toBeDefined();
    //     expect(response.body.items[0].title).toEqual(itemData.title);
    //     expect(response.body.items[0].note).toEqual(itemData.note);
    //     expect(response.body.items[0].status).toEqual("new");
    // });

    it('responds with invalid list id', async () => {
        const response = await request(app)
            .put(`/item/3850532/659096bbc5b22975df88719a`)
            .set('Authorization', `Bearer ${token}`)
            .send(item)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("Invalid input data");
    });

    it('responds with invalid item id', async () => {
        const response = await request(app)
            .put(`/item/659096bbc5b22975df88719a/3850532`)
            .set('Authorization', `Bearer ${token}`)
            .send(item)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("Invalid input data");
    });

    it('responds with list not found', async () => {
        const response = await request(app)
            .put(`/item/659096bbc5b22975df88719a/659096bbc5b22975df88719a`)
            .set('Authorization', `Bearer ${token}`)
            .send(item)
            .expect('Content-Type', /json/)
            .expect(404);
        expect(response.body.message).toEqual("List not found");
    });

    it('responds with title minLength error', async () => {
        item.title = "t"
        const response = await request(app)
            .put(`/item/${list._id}/${item._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(item)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("validation of input failed");
        expect(response.body.reason[0].keyword).toEqual("minLength");
        expect(response.body.reason[0].message).toEqual("must NOT have fewer than 3 characters");
    });

    it('responds with _ownerId required error', async () => {
        delete item._ownerId
        const response = await request(app)
            .put(`/item/${list._id}/${item._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(item)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("validation of input failed");
        expect(response.body.reason[0].keyword).toEqual("required");
        expect(response.body.reason[0].message).toEqual("must have required property '_ownerId'");
    });
    it('responds with title required error', async () => {
        delete item.title
        const response = await request(app)
            .put(`/item/${list._id}/${item._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(item)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("validation of input failed");
        expect(response.body.reason[0].keyword).toEqual("required");
        expect(response.body.reason[0].message).toEqual("must have required property 'title'");
    });
});