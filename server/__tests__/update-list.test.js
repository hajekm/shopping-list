const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const listRouter = require('../controller/list-controller');
const userRouter = require('../controller/user-controller'); // Import your router
const {connect, closeDatabase, clearDatabase} = require('../util/test-setup');
const userModel = require('../model/user');
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
});

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

const app = express();
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/list", listRouter);

describe('Update list tests', () => {
    it('responds with updated list object', async () => {
        const listData = {title: "test", members: [user], _ownerId: user._id, status: "new", items: []}
        let list = new listModel(listData)
        await list.save();
        list.status = "done";
        const response = await request(app)
            .put(`/list/${list._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(list.toJSON())
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.createdAt).toBeDefined();
        expect(response.body._id).toBeDefined();
        expect(response.body.title).toEqual(listData.title);
        expect(response.body._ownerId).toEqual(user._id);
        expect(response.body.members.length).toBeGreaterThan(0);
        expect(response.body.members[0].createdAt).toEqual(user.createdAt);
        expect(response.body.members[0]._id).toEqual(user._id);
        expect(response.body.members[0].email).toEqual(user.email);
        expect(response.body.members[0].username).toEqual(user.username);
        expect(response.body.members[0].role).toEqual(user.role);
        expect(response.body.status).toEqual(list.status);
    });

    it('responds with insufficient rights', async () => {
        const newUserData = {email: "abcd@bcda.cz", password: "ewdewf324"}
        const newUser = new userModel(newUserData);
        await newUser.save();
        const listData = {title: "test", members: [newUser, user], _ownerId: newUser._id, status: "new", items: []}
        const list = new listModel(listData)
        await list.save();
        const response = await request(app)
            .put(`/list/${list._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(list.toJSON())
            .expect('Content-Type', /json/)
            .expect(403);
        expect(response.body.message).toEqual("Insufficient rights");
    });

    it('responds with list not found', async () => {
        const listData = {title: "test", members: [user], _ownerId: user._id, status: "new", items: []}
        const list = new listModel(listData)
        await list.save();
        await listModel.findByIdAndDelete(list._id);
        const response = await request(app)
            .put(`/list/${list._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(list.toJSON())
            .expect('Content-Type', /json/)
            .expect(404);
        expect(response.body.message).toEqual("List not found");
    });

    it('responds with title minLength error', async () => {
        const listData = {title: "test", members: [user], _ownerId: user._id, status: "new", items: []}
        let list = new listModel(listData)
        await list.save();
        list.title = "tt";
        const response = await request(app)
            .put(`/list/${list._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(list.toJSON())
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("validation of input failed");
        expect(response.body.reason[0].keyword).toEqual("minLength");
        expect(response.body.reason[0].message).toEqual("must NOT have fewer than 3 characters");
    });

    it('responds with title required error', async () => {
        const listData = {title: "test", members: [user], _ownerId: user._id, status: "new", items: []}
        const list = new listModel(listData)
        await list.save();
        let json =  list.toJSON();
        delete json.title
        const response = await request(app)
            .put(`/list/${list._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(json)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("validation of input failed");
            expect(response.body.reason[0].keyword).toEqual("required");
            expect(response.body.reason[0].message).toEqual("must have required property 'title'");
    });

    it('responds with _ownerId required error', async () => {
        const listData = {title: "test", members: [user], _ownerId: user._id, status: "new", items: []}
        const list = new listModel(listData)
        await list.save();
        let json =  list.toJSON();
        delete json._ownerId;
        const response = await request(app)
            .put(`/list/${list._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(json)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("validation of input failed");
        expect(response.body.reason[0].keyword).toEqual("required");
        expect(response.body.reason[0].message).toEqual("must have required property '_ownerId'");
    });

    it('responds with _ownerId required error', async () => {
        const listData = {title: "test", members: [user], _ownerId: user._id, status: "new", items: []}
        const list = new listModel(listData)
        await list.save();
        let json =  list.toJSON();
        json._ownerId = "cewi";
        const response = await request(app)
            .put(`/list/${list._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(json)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response.body.message).toEqual("validation of input failed");
        expect(response.body.reason[0].keyword).toEqual("format");
        expect(response.body.reason[0].message).toEqual("must match format \"objectid\"");
    });
});