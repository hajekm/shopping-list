// Use this file only as a guide for first steps using routes. Delete it when you have added your own route files.
// For a detailed explanation regarding each routes property, visit:
// https://mocks-server.org/docs/usage/routes

// users data
const USERS = [
    {
        email: "owner@gmail.com",
        created_at: "2023-05-19",
        avatar: "something",
        id: "acec32c6-9f83-4e77-9228-9dab18e49a67",
    },
    {
        email: "member@gmail.com",
        created_at: "2023-05-19",
        avatar: "something",
        id: "a9ddb9d0-a32e-4c09-9dca-59a007d0b2d8",
    },
    {
        email: "notmember@gmail.com",
        created_at: "2023-05-19",
        avatar: "something",
        id: "646b2a56-599c-43e0-b15a-518c7b166d2b",
    },
    {
        email: "xxx@gmail.com",
        created_at: "2023-05-19",
        avatar: "something",
        id: "646sea56-599c-43e0-b15a-518c7b166d2b",
    },
];

module.exports = [
    {
        id: "get-users", // route id
        url: "/user", // url in express format
        method: "GET", // HTTP method
        variants: [
            {
                id: "ok", // variant id
                type: "json", // variant handler id
                options: {
                    status: 200, // status to send
                    body: USERS, // body to send
                },
            },
            {
                id: "error", // variant id
                type: "json", // variant handler id
                options: {
                    status: 400, // status to send
                    // body to send
                    body: {
                        message: "Error",
                    },
                },
            },
            {
                id: "server-error", // variant id
                type: "json", // variant handler id
                options: {
                    status: 500, // status to send
                    // body to send
                    body: {
                        message: "Server error",
                    },
                },
            },
        ],
    },
    {
        id: "get-user", // route id
        url: "/user/:id", // url in express format
        method: "GET", // HTTP method
        variants: [
            {
                id: "ok", // variant id
                type: "json", // variant handler id
                options: {
                    status: 200, // status to send
                    body: USERS[0],
                },
            },
            {
                id: "ok-member", // variant id
                type: "json", // variant handler id
                options: {
                    status: 200, // status to send
                    body: USERS[1],
                },
            },
            {
                id: "real", // variant id
                type: "middleware", // variant handler id
                options: {
                    // Express middleware to execute
                    middleware: (req, res) => {
                        const userId = req.params.id;
                        const user = USERS.find((userData) => userData.id === userId);
                        if (user) {
                            res.status(200);
                            res.send(user);
                        } else {
                            res.status(404);
                            res.send({
                                message: "User not found",
                            });
                        }
                    },
                },
            },
        ],
    },
    {
        id: "post-user", // route id
        url: "/user", // url in express format
        method: "POST", // HTTP method
        variants: [
            {
                id: "success", // variant id
                type: "json", // variant handler id
                options: {
                    status: 200, // status to send
                    body: {
                        email: "owner2@gmail.com",
                        created_at: "2023-11-30",
                        avatar: "something",
                        id: "acec3233-9f83-4e77-9228-9dab18e49a67",
                    },
                },
            },
        ],
    },
];
